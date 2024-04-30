'use client'

import styledGlobal from "@/styles/pages/global.module.css";
import {useAtom} from "jotai";
import {currentUserEmail, currentUserName} from "@/states/userState.jsx";
import styledProfile from '@/styles/pages/profile.module.css'
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation.js";
import ProfileNav from "@/components/ui/ProfileNav.jsx";
import {Card} from "@/components/ui/Card.jsx";
import {SkeletonCard} from "@/components/ui/Skeleton.jsx";
import {formatDate} from "@/lib/helper.js";

export default function WishlistPage() {

    const router = useRouter();

    const [username, setUsername] = useAtom(currentUserName);
    const [email_id] = useAtom(currentUserEmail);
    const [wishlistGames, setWishlistGames] = useState([]);

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
                    }

                    await fetchWishlistGames()

                } catch (error) {
                    console.log(error)
                }
            }
        }
        autoLogin()

        const fetchWishlistGames = async () => {

            try {

                const request = {
                    email_id: email_id,
                }

                const response = await fetch(`/api/pages/post/profile/wishlist`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                })

                const data = await response.json()

                if (data.result.length > 0) {
                    const fetchWishlistPromise = data.result.map(async (game) => {
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

                    const fetchedGames = await Promise.all(fetchWishlistPromise);

                    setWishlistGames((prevState) => {

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
                            alert(error + " - Failed to fetch games. Please Reload Page...")
                        }
                    });

                }
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
                <div className={styledGlobal.gamesColumn}>
                    {
                        wishlistGames?.length !== 0 ?
                            <>
                                {
                                    wishlistGames?.map((card, index) => {
                                        return index % 4 === 0 ? (
                                            <Card
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
                            </> : <SkeletonCard/>
                    }
                </div>
                <div className={styledGlobal.gamesColumn}>
                    {
                        wishlistGames?.length !== 0 ?
                            <>
                                {
                                    wishlistGames?.map((card, index) => {
                                        return index % 4 === 1 ? (
                                            <Card
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
                            </> : <SkeletonCard/>
                    }
                </div>
                <div className={styledGlobal.gamesColumn}>
                    {
                        wishlistGames?.length !== 0 ?
                            <>
                                {
                                    wishlistGames?.map((card, index) => {
                                        return index % 4 === 2 ? (
                                            <Card
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
                            </> : <SkeletonCard/>
                    }
                </div>
                <div className={styledGlobal.gamesColumn}>
                    {
                        wishlistGames?.length !== 0 ?
                            <>
                                {
                                    wishlistGames?.map((card, index) => {
                                        return index % 4 === 3 ? (
                                            <Card
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
                            </> : <SkeletonCard/>
                    }
                </div>
            </div>
        </div>
    );
}