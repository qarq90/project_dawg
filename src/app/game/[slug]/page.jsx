'use client'

import {useEffect, useState} from "react";
import styledDetails from '@/styles/pages/gameDetails.module.css'
import Link from "next/link";
import {GenreIcon} from "../../../../public/icon/GenreIcon.jsx";
import {ControllerIcon} from "../../../../public/icon/ControllerIcon.jsx";
import {DevelopersIcon} from "../../../../public/icon/DevelopersIcon.jsx";
import {PublisherIcon} from "../../../../public/icon/PublisherIcon.jsx";
import {CalendarIcon} from "../../../../public/icon/CalendarIcon.jsx";
import {HashtagIcon} from "../../../../public/icon/HashtagIcon.jsx";
import {UserIcon} from "../../../../public/icon/UserIcon.jsx";

export default function Page({params}) {

    const game = params.slug

    const [gameDetails, setGameDetails] = useState(null);

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
                console.log(data);
            })

            .catch(error => {
                console.error('Error fetching game details:', error);
            });

    }, [game]);


    if (!gameDetails) {
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
            <div className={styledDetails.gameDetails}>

                <Link href={gameDetails.website} className={styledDetails.gameTitle}>{gameDetails.name}</Link>

                <div className={styledDetails.gameDescription}>
                    <div>
                        <h3><GenreIcon/> Genre</h3>
                        <div>
                            {gameDetails.genres.map(genre => (
                                <span key={genre.id}> {genre.name}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3><ControllerIcon/> Platforms</h3>
                        <div>
                            {gameDetails.parent_platforms.map(platform => (
                                <span key={platform.id}>{platform.platform.name}, </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3><CalendarIcon/> Released Date</h3>
                        <div>
                            <span className={styledDetails.gameDescription}>{gameDetails.released}</span>
                        </div>
                    </div>
                    <div>
                        <h3><DevelopersIcon/> Developed By</h3>
                        <div>
                            {gameDetails.developers.slice(0, 1).map(developer => (
                                <span key={developer.id}>{developer.name} </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3><PublisherIcon/> Published By</h3>
                        <div>
                            {gameDetails.publishers.map(publisher => (
                                <span key={publisher.id}>{publisher.name}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3><HashtagIcon/> Tags</h3>
                        <div>
                            {gameDetails.tags.slice(0, 3).map(tag => (
                                <span key={tag.id}>{tag.name}, </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3><UserIcon/> Players Played</h3>
                        {Object.entries(gameDetails.added_by_status).map(([key, value]) => (
                            <div key={key}>
                                <span>{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
