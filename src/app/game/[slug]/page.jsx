'use client'

import {useEffect} from "react";
import styledDetails from '@/styles/pages/gameDetails.module.css'
import Link from "next/link";
import GameNav from "@/components/ui/GameNav.jsx";
import {useAtom} from "jotai";
import {gameDetailsState, gameNameState} from "@/states/gameState.js";
import {GenreIcon} from "../../../../public/icon/GenreIcon.jsx";
import {ControllerIcon} from "../../../../public/icon/ControllerIcon.jsx";
import {CalendarIcon} from "../../../../public/icon/CalendarIcon.jsx";
import {DevelopersIcon} from "../../../../public/icon/DevelopersIcon.jsx";
import {PublisherIcon} from "../../../../public/icon/PublisherIcon.jsx";
import {HashtagIcon} from "../../../../public/icon/HashtagIcon.jsx";
import {UserIcon} from "../../../../public/icon/UserIcon.jsx";

export default function Page({params}) {

    const game = params.slug

    const [gameName, setGameName] = useAtom(gameNameState)
    const [gameDetails, setGameDetails] = useAtom(gameDetailsState);

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
            })

            .catch(error => {
                console.error('Error fetching game details:', error);
            });

        setGameName(game);
        console.log(gameName)

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
                <Link href={`${gameDetails ? gameDetails.website : '/'}`}
                      className={styledDetails.gameTitle}>{gameDetails.name}</Link>
                <GameNav slug={game}/>
                <div className={styledDetails.gameDetails}>
                    <div className={styledDetails.gameDescription}>
                        <div>
                            <h3><GenreIcon/> Genre</h3>
                            <div className={styledDetails.attributeValue}>
                                {gameDetails.genres && gameDetails.genres.map(genre => (
                                    <span key={genre.id}> {genre.name}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3><ControllerIcon/> Platforms</h3>
                            <div className={styledDetails.attributeValue}>
                                {gameDetails.parent_platforms && gameDetails.parent_platforms.map(platform => (
                                    <span key={platform.id}>{platform.platform.name}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3><CalendarIcon/> Released Date</h3>
                            <div className={styledDetails.attributeValue}>
                                <span className={styledDetails.gameDescription}>{gameDetails.released}</span>
                            </div>
                        </div>
                        <div>
                            <h3><DevelopersIcon/> Developed By</h3>
                            <div className={styledDetails.attributeValue}>
                                {gameDetails.developers && gameDetails.developers.slice(0, 1).map(developer => (
                                    <span key={developer.id}>{developer.name} </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3><PublisherIcon/> Published By</h3>
                            <div className={styledDetails.attributeValue}>
                                {gameDetails.publishers && gameDetails.publishers.map(publisher => (
                                    <span key={publisher.id}>{publisher.name}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3><HashtagIcon/> Tags</h3>
                            <div className={styledDetails.attributeValue} id={styledDetails.tagValues}>
                                {gameDetails.tags && gameDetails.tags.slice(0, 12).map(tag => (
                                    <span key={tag.id}>{tag.name}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3><UserIcon/> Players Played</h3>
                            <div id={styledDetails.tagValues}>
                                {gameDetails.added_by_status && Object.entries(gameDetails.added_by_status).map(([key, value]) => (
                                    <div className={styledDetails.attributeValue} key={key.id}>
                                        <span>{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                                        <span>{value}k</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
