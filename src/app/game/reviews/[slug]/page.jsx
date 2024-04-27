'use client'

import styledDetails from "@/styles/pages/gameDetails.module.css";
import {UserIcon} from "../../../../../public/icon/UserIcon.jsx";
import {useAtom} from "jotai";
import {gameDetailsState} from "@/states/gameState.js";
import {useEffect} from "react";
import GameNav from "@/components/ui/GameNav.jsx";
import Link from "next/link.js";

export default function Review({params}) {

    const [gameDetails, setGameDetails] = useAtom(gameDetailsState)

    const game = params.slug

    useEffect(() => {

        if (!game) {
            console.error('No slug parameter found in the URL query string');
            return;
        }

        fetch(`https://api.rawg.io/api/games/${game}?key=9560492cd5c24a7cbe8ae7e99bb58971`)

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

    }, [game]);


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
                        <h3><UserIcon/> Ratings</h3>
                        <div id={styledDetails.tagValues}>
                            <div className={styledDetails.attributeValue}>
                                {gameDetails.ratings.map((rating, index) => (
                                    <div key={index}>
                                        <span>{rating.title}: </span>
                                        <span>{rating.count}</span>
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