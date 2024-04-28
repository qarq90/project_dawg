'use client'

import styledDetails from "@/styles/pages/gameDetails.module.css";
import {useAtom} from "jotai";
import {gameDetailsState, gameIdState, gameNameState, gameScreenshotsState} from "@/states/gameState.js";
import {useEffect} from "react";
import GameNav from "@/components/ui/GameNav.jsx";
import Link from "next/link";
import {imageCaptions} from "@/lib/gameObj.js";

export default function ScreenShot({params}) {

    const [gameDetails, setGameDetails] = useAtom(gameDetailsState)
    const [gameScreenshots, setGameScreenshots] = useAtom(gameScreenshotsState)
    const [gameId, setGameId] = useAtom(gameIdState)
    const [gameName] = useAtom(gameNameState)

    const game = gameName

    useEffect(() => {

        if (!game) {
            console.error('No slug parameter found in the URL query string');
            return;
        }

        fetch(`https://api.rawg.io/api/games/${gameId}?key=9560492cd5c24a7cbe8ae7e99bb58971`)

            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch game details');
                }
                return response.json();
            })

            .then(data => {
                setGameDetails(data);
                setGameId(data.id)
            })

            .catch(error => {
                console.error('Error fetching game details:', error);
            });

        fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=9560492cd5c24a7cbe8ae7e99bb58971`)

            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch game details');
                }
                return response.json();
            })

            .then(data => {
                setGameScreenshots(data);
            })

            .catch(error => {
                console.error('Error fetching game details:', error);
            });

    }, []);

    return (
        <>
            {gameDetails === null || gameScreenshots === null ? <></> :
                <>
                    <div
                        style={{
                            backgroundImage: `url(${gameDetails?.background_image})`,
                        }}
                        className={styledDetails.gameDetailsContainer}
                    >
                    </div>
                    <div className={styledDetails.container}>
                        <Link href={gameDetails.website}
                              target='_blank'
                              className={styledDetails.gameTitle}>{gameDetails.name}</Link>
                        <GameNav/>
                        <div className={styledDetails.gameDescription}>
                            <div className={styledDetails.screenshotContainer}>
                                <img src={gameDetails.background_image_additional} alt=""/>
                                <h3>A Still from {gameDetails.name_original}</h3>
                            </div>
                            <div className={styledDetails.screenshotGrid}>
                                {gameScreenshots.results && gameScreenshots.results.map((screenshot, index) => (
                                    <div className={styledDetails.gridContainer} key={index}>
                                        <img src={screenshot.image} alt={`Screenshot ${index}`}/>
                                        <h3>{imageCaptions[index % imageCaptions.length]}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}