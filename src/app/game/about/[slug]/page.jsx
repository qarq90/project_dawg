'use client'

import styledDetails from "@/styles/pages/gameDetails.module.css";
import {GenreIcon} from "../../../../../public/icon/GenreIcon.jsx";
import {ControllerIcon} from "../../../../../public/icon/ControllerIcon.jsx";
import {CalendarIcon} from "../../../../../public/icon/CalendarIcon.jsx";
import {DevelopersIcon} from "../../../../../public/icon/DevelopersIcon.jsx";
import {PublisherIcon} from "../../../../../public/icon/PublisherIcon.jsx";
import {HashtagIcon} from "../../../../../public/icon/HashtagIcon.jsx";
import {useAtom} from "jotai";
import {gameDetailsState, gameIdState, gameNameState, gameTrailerState} from "@/states/gameState.js";
import {useEffect, useState} from "react";
import GameNav from "@/components/ui/GameNav.jsx";
import Link from "next/link";
import {splitTextIntoSentences} from "@/lib/helper.js";
import {UserIcon} from "../../../../../public/icon/UserIcon.jsx";
import {ReviewIcon} from "../../../../../public/icon/ReviewIcon.jsx";

export default function AboutGame({params}) {

    const [gameDetails, setGameDetails] = useAtom(gameDetailsState)
    const [gameTrailer, setGameTrailer] = useAtom(gameTrailerState)
    const [gameName, setGameName] = useAtom(gameNameState)
    const [gameId, setGameId] = useAtom(gameIdState)
    const [gameDescription, setGameDescription] = useState([])

    const game = params.slug

    useEffect(() => {

        if (!game) {
            console.error('No slug parameter found in the URL query string');
            return;
        }

        setGameName(game)

        async function fetchGameAbout() {
            fetch(`https://api.rawg.io/api/games/${game}?key=9560492cd5c24a7cbe8ae7e99bb58971`)

                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch game details');
                    }
                    return response.json();
                })

                .then(data => {

                    setGameDetails(data);
                    console.log(data)

                    setGameId(data.id)

                    const desc = data.description_raw;
                    const filteredDescArray = splitTextIntoSentences(desc);
                    setGameDescription(filteredDescArray);

                })

                .catch(error => {
                    console.error('Error fetching game details:', error);
                });

            if (gameId !== 0) {

                fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=9560492cd5c24a7cbe8ae7e99bb58971`)

                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch game trailer');
                        }
                        return response.json();
                    })

                    .then(data => {
                        setGameTrailer(data);
                    })

                    .catch(error => {
                        console.error('Error fetching game trailer:', error);
                    });
            }
        }

        fetchGameAbout().then(r => console.log(r))

    }, [game]);

    return (
        <>
            {gameDetails === null ? <></> :
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
                        <div className={styledDetails.gameDesc}>
                            <p>{gameDescription[0] + gameDescription[1] + gameDescription[2] + gameDescription[3]}</p>
                        </div>
                        {
                            gameTrailer === null ?
                                <div className={styledDetails.notThere}>
                                    <div className={styledDetails.attributeValue}>
                                            <span
                                                className={styledDetails.gameDescription}>NO TRAILER YET
                                            </span>
                                    </div>
                                </div> :
                                <>
                                    <div>
                                        <video controls width="95%" height="600"
                                               src={gameTrailer?.results[0]?.data?.max}/>
                                    </div>
                                </>
                        }
                        {gameDescription && (
                            <div className={styledDetails.gameDesc}>
                                {gameDescription.slice(4, 7).map((sentence, index) => (
                                    <p key={index}>{sentence}</p>
                                ))}
                            </div>
                        )}
                        <div className={styledDetails.gameDetails}>
                            <div className={styledDetails.gameDescription}>
                                <div>
                                    <h3><GenreIcon/> Genre</h3>
                                    <div className={styledDetails.attributeValue}>
                                        {gameDetails.genres.map(genre => (
                                            <span key={genre.id}> {genre.name}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3><ControllerIcon/> Platforms</h3>
                                    <div className={styledDetails.attributeValue}>
                                        {gameDetails.parent_platforms.map(platform => (
                                            <span key={platform.id}>{platform.platform.name}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3><UserIcon/> Age</h3>
                                    <div id={styledDetails.playContainer}>
                                        {
                                            gameDetails.esrb_rating ?
                                                <>
                                                    <div className={styledDetails.attributeValue}>
                                                        <span>{gameDetails?.esrb_rating?.name}</span>
                                                    </div>
                                                </> :
                                                <div className={styledDetails.notThere}>
                                                    <div className={styledDetails.attributeValue}>
                                                        <span>NO ESB RATING YET</span>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h3><ReviewIcon/> Rating</h3>
                                    <div id={styledDetails.playContainer}>
                                        {
                                            gameDetails.rating ?
                                                <>
                                                    {gameDetails.ratings.map((rating, index) => (
                                                        <div className={styledDetails.attributeValue} key={index}>
                                                            <span>{rating.title.charAt(0).toUpperCase() + rating.title.slice(1).toLowerCase()}: </span>
                                                            <span>{rating.count}k</span>
                                                        </div>
                                                    ))}
                                                </> :
                                                <div className={styledDetails.notThere}>
                                                    <div className={styledDetails.attributeValue}>
                                                        <span>NO RATING YET</span>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h3><CalendarIcon/> Released Date</h3>
                                    {
                                        gameDetails.releaseDate ?
                                            <>
                                                <div className={styledDetails.attributeValue}>
                                            <span
                                                className={styledDetails.gameDescription}>{gameDetails.released}
                                            </span>
                                                </div>
                                            </> :
                                            <div className={styledDetails.notThere}>
                                                <div className={styledDetails.attributeValue}>
                                            <span
                                                className={styledDetails.gameDescription}>NO RELEASE DATE YET
                                            </span>
                                                </div>
                                            </div>
                                    }
                                </div>
                                <div>
                                    <h3><DevelopersIcon/> Developed By</h3>
                                    <div className={styledDetails.attributeValue}>
                                        {gameDetails.developers.slice(0, 1).map(developer => (
                                            <span key={developer.id}>{developer.name} </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3><PublisherIcon/> Published By</h3>
                                    <div className={styledDetails.attributeValue}>
                                        {gameDetails.publishers.map(publisher => (
                                            <span key={publisher.id}>{publisher.name}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3><HashtagIcon/> Tags</h3>
                                    <div className={styledDetails.attributeValue} id={styledDetails.tagValues}>
                                        {gameDetails.tags.slice(0, 12).map(tag => (
                                            <span key={tag.id}>{tag.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
