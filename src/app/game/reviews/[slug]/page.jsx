'use client'

import styledDetails from "@/styles/pages/gameDetails.module.css";
import {UserIcon} from "../../../../../public/icon/UserIcon.jsx";
import {useAtom} from "jotai";
import {gameDetailsState, gameIdState} from "@/states/gameState.js";
import {useEffect, useState} from "react";
import GameNav from "@/components/ui/GameNav.jsx";
import Link from "next/link";
import {ReviewIcon} from "../../../../../public/icon/ReviewIcon.jsx";
import {removeSpecialCharacters} from "@/lib/helper.js";
import {CalendarIcon} from "../../../../../public/icon/CalendarIcon.jsx";

export default function Reviews({params}) {

    const [gameDetails, setGameDetails] = useAtom(gameDetailsState)
    const [gameId, setGameId] = useAtom(gameIdState)
    const [gameReviews, setGameReviews] = useState(null)

    const game = params.slug

    useEffect(() => {

        if (!game) {
            console.error('No slug parameter found in the URL query string');
            return;
        } else {
            const fetchGameDetails = async () => {

                fetch(`https://api.rawg.io/api/games/${gameId}?key=9560492cd5c24a7cbe8ae7e99bb58971`)

                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch game details');
                        }
                        return response.json();
                    })

                    .then(data => {
                        setGameDetails(data);
                        console.log(gameDetails);
                    })

                    .catch(error => {
                        console.error('Error fetching game details:', error);
                    });

                if (gameId) {

                    fetch(`https://api.rawg.io/api/games/${gameId}/reviews?key=9560492cd5c24a7cbe8ae7e99bb58971`)

                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to fetch game reviews');
                            }
                            return response.json();
                        })

                        .then(data => {
                            setGameReviews(data.results);
                            console.log(data.results);
                        })

                        .catch(error => {
                            console.error('Error fetching game reviews:', error);
                        });
                }
            }

            fetchGameDetails();
        }

    }, []);


    if (gameDetails === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${gameDetails?.background_image})`,
                }}
                className={styledDetails.gameDetailsContainer}
            >
            </div>
            <div className={styledDetails.container}>
                <Link href={gameDetails.website} className={styledDetails.gameTitle}>{gameDetails.name}</Link>
                <GameNav/>
                <div className={styledDetails.gameDetails}>
                    <div className={styledDetails.gameDescription}>
                        <div>
                            <h3><CalendarIcon/> Players Ratings</h3>
                            <div id={styledDetails.playContainer}>
                                {gameDetails.ratings.map((rating, index) => (
                                    <div className={styledDetails.attributeValue} key={index}>
                                        <span>{rating.title.charAt(0).toUpperCase() + rating.title.slice(1).toLowerCase()}: </span>
                                        <span>{rating.count}k</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3><UserIcon/> Players Played</h3>
                            <div id={styledDetails.tagValues}>
                                {Object.entries(gameDetails.added_by_status).map(([key, value]) => (
                                    <div className={styledDetails.attributeValue} key={key.id}>
                                        <span>{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                                        <span>{value}k</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3><ReviewIcon/> Reviews</h3>
                            <div className={styledDetails.reviewGrid}>
                                {gameReviews && gameReviews.map((review, index) => (
                                    <div className={styledDetails?.reviewValue} key={index}>
                                        <h4>
                                            <div className={styledDetails?.usernameAccordian}>
                                                {
                                                    review.user
                                                    &&
                                                    review.user.username.charAt(0).toUpperCase()
                                                    +
                                                    review.user.username.charAt(4).toUpperCase()
                                                }
                                            </div>
                                            {review.user && review.user.username}</h4>
                                        <br/>
                                        <span>{removeSpecialCharacters(review.text)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}