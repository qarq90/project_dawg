"use client"

import styledGlobal from "@/styles/pages/global.module.css";
import {Card} from "@/components/ui/Card";
import {useEffect, useState} from "react";
import {SkeletonCard} from "@/components/ui/Skeleton";

const CardGridPGenres = ({url}) => {

    const [cards, setCards] = useState([])

    const getGames = async () => {
        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data.results[0])
            console.log(url)
            setCards(data.results)
        } catch (error) {
            alert(error + " - Failed to fetch games. Please Reload Page...")
        }
    }

    useEffect(() => {
        getGames().then(r => console.log("Games Fetched"));
    }, []);


    return (
        <>
            <div className={styledGlobal.gamesGrid}>
                <div className={styledGlobal.gamesColumn}>
                    {
                        cards.length !== 0 ?
                            <>
                                {
                                    cards.map((card, index) => {
                                        return index % 4 === 0 ? (
                                            <Card
                                                id={card.id}
                                                key={index}
                                                gameName={card.name}
                                                genres={card.genres}
                                                likes={card.ratings_count}
                                                image={card.background_image}
                                                platforms={card.parent_platforms}
                                                releaseDate={card.released}
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
                        cards.length !== 0 ?
                            <>
                                {
                                    cards.map((card, index) => {
                                        return index % 4 === 1 ? (
                                            <Card
                                                id={card.id}
                                                key={index}
                                                gameName={card.name}
                                                genres={card.genres}
                                                likes={card.ratings_count}
                                                image={card.background_image}
                                                platforms={card.parent_platforms}
                                                releaseDate={card.released}
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
                        cards.length !== 0 ?
                            <>
                                {
                                    cards.map((card, index) => {
                                        return index % 4 === 2 ? (
                                            <Card
                                                id={card.id}
                                                key={index}
                                                gameName={card.name}
                                                genres={card.genres}
                                                likes={card.ratings_count}
                                                image={card.background_image}
                                                platforms={card.parent_platforms}
                                                releaseDate={card.released}
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
                        cards.length !== 0 ?
                            <>
                                {
                                    cards.map((card, index) => {
                                        return index % 4 === 3 ? (
                                            <Card
                                                id={card.id}
                                                key={index}
                                                gameName={card.name}
                                                genres={card.genres}
                                                likes={card.ratings_count}
                                                image={card.background_image}
                                                platforms={card.parent_platforms}
                                                releaseDate={card.released}
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
        </>
    )
}
export default CardGridPGenres
