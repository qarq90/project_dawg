"use client"

import styledGlobal from "@/styles/pages/global.module.css";
import {Card} from "@/components/ui/Card";
import {useEffect, useState} from "react";
import {SkeletonCard} from "@/components/ui/Skeleton";
import {formatDate} from "@/lib/helper.js";
import {router} from "next/navigation.js";

const CardGrid = ({url}) => {

    const [cards, setCards] = useState([])

    const getGames = async () => {
        try {
            const res = await fetch(url)
            const data = await res.json()
            setCards(data.results)
        } catch (error) {
            await getGames()
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
                        cards.length !== 0 ?
                            <>
                                {
                                    cards.map((card, index) => {
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
                        cards.length !== 0 ?
                            <>
                                {
                                    cards.map((card, index) => {
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
                        cards.length !== 0 ?
                            <>
                                {
                                    cards.map((card, index) => {
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
        </>
    )
}
export default CardGrid
