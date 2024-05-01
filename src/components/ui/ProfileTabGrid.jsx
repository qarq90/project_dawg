'use client'

import styledGlobal from "@/styles/pages/global.module.css";
import {useAtom} from "jotai";
import {currentUserEmail, currentUserName} from "@/states/userState.jsx";
import styledProfile from '@/styles/pages/profile.module.css'
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import ProfileNav from "@/components/ui/ProfileNav.jsx";
import {Card} from "@/components/ui/Card.jsx";
import {SkeletonCard} from "@/components/ui/Skeleton.jsx";
import {formatDate} from "@/lib/helper.js";
import ErrorCard from "@/components/ui/ErrorCard.jsx";

export default function ProfileTabGrid({url, type}) {

    const router = useRouter();

    const [username, setUsername] = useAtom(currentUserName);
    const [email_id, setEmailID] = useAtom(currentUserEmail);
    const [tabItems, setTabItems] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const autoLogin = async () => {
            const storageUserID = Cookies.get("storageUserID") || ""

            if (storageUserID === "") {
                router.push("/auth/login")
            } else {
                const request = {
                    _id: storageUserID,
                }

                try {
                    const response = await fetch(`/api/auth/post/fetchUser`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(request),
                    })

                    const data = await response.json()

                    if (data.status) {
                        setUsername(data.result.user_name)
                        setEmailID(data.result.email_id)
                    }

                } catch (error) {
                    console.log(error)
                }
            }
        }

        autoLogin().then(() => fetchWishlistGames())

        const fetchWishlistGames = async () => {

            try {
                const request = {
                    email_id: email_id,
                }
                console.log("URL", url, email_id)
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                })

                const data = await response.json()

                if (data.result.length > 0) {
                    const fetchTabItemPromise = data.result.map(async (game) => {
                        const game_id = game.game_id;

                        try {
                            const response = await fetch(
                                `https://api.rawg.io/api/games/${game_id}?key=9560492cd5c24a7cbe8ae7e99bb58971`
                            );

                            if (!response.ok) {
                                throw new Error('Failed to fetch game details');
                            }

                            return await response.json();
                        } catch (error) {
                            console.error('Error fetching game details:', error);
                            return null;
                        }
                    });

                    const fetchedGames = await Promise.all(fetchTabItemPromise);

                    setTabItems((prevState) => {
                        const filteredGames = [...prevState, ...fetchedGames];

                        const uniqueGameIds = new Set();

                        try {
                            return filteredGames.filter((game) => {
                                if (!uniqueGameIds?.has(game?.id)) {
                                    uniqueGameIds.add(game.id);
                                    return true;
                                }
                                return false;
                            });
                        } catch (error) {
                            router.reload()
                        }
                    });
                }
                setIsFetching(false)
            } catch (error) {
                console.error('Error fetching wishlist games:', error);
            }

        }
    }, [email_id])

    return (
        <div className={styledGlobal.container}>
            <h1>{username}
                <p
                    className={styledProfile.userNameAccordian}>{username.charAt(0).toUpperCase() + username.charAt(1).toUpperCase()}
                </p>
            </h1>
            <ProfileNav/>
            <div className={styledGlobal.gamesGrid}>
                {
                    [0, 1, 2, 3].map((a) => (
                        <div key={a} className={styledGlobal.gamesColumn}>
                            {
                                tabItems?.length !== 0 ?
                                    <>
                                        {
                                            tabItems?.map((card, index) => {
                                                return index % 4 === a ? (
                                                    <Card
                                                        setTabItems={setTabItems}
                                                        id={card.id}
                                                        slug={card.slug}
                                                        key={index}
                                                        gameName={card.name}
                                                        genres={card.genres}
                                                        likes={card.ratings_count}
                                                        image={card.background_image}
                                                        platforms={card.parent_platforms}
                                                        releaseDate={formatDate(card.released) || '-'}
                                                        rat={card.rating}
                                                        ratTop={card.rating_top}
                                                    />
                                                ) : null;
                                            })
                                        }
                                    </> : (isFetching ? <SkeletonCard/> : null)
                            }
                        </div>
                    ))
                }
            </div>
            {
                !isFetching && tabItems?.length === 0 && <ErrorCard type={type}/>
            }
        </div>
    );
}