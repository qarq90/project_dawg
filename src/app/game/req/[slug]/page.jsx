'use client'

import styledDetails from "@/styles/pages/gameDetails.module.css";
import {ControllerIcon} from "../../../../../public/icon/ControllerIcon.jsx";
import {useAtom} from "jotai";
import {gameDetailsState} from "@/states/gameState.js";
import {useEffect} from "react";
import GameNav from "@/components/ui/GameNav.jsx";
import Link from "next/link";
import {WindowsIcon} from "../../../../../public/icon/WindowsIcon.jsx";
import {AppleIcon} from "../../../../../public/icon/AppleIcon.jsx";

export default function Requirements({params}) {

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
                        <div>
                            <h3><ControllerIcon/> Platforms</h3>
                            <div className={styledDetails.attributeValue}>
                                {gameDetails.parent_platforms.map(platform => (
                                    <span key={platform.id}>{platform.platform.name}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3><WindowsIcon/> <AppleIcon/> PC Requirements</h3>
                            <div className={styledDetails.attributeValue}>
                                <span>
                                    <a href={`https://www.pcgamebenchmark.com/${game}-system-requirements`}
                                       target='_blank'>
                                    See PC Requirements
                                </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}