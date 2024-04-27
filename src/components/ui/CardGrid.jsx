"use client"

import styledGlobal from "@/styles/pages/global.module.css";
import {Card} from "@/components/ui/Card";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/Skeleton";

const CardGrid = ({url}) => {

    const [cards, setCards] = useState([])

    const getGames = async () => {
        const res = await fetch(url)
        const data = await res.json()
        console.log(url)
        console.log(data.results[0])
        setCards(data.results)
    }

    useEffect(() => {
        getGames().then(r => console.log("Games Fetched"));
    }, []);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const options = {month: 'short', day: '2-digit', year: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    }

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
                            </> : <Skeleton/>
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
                            </> : <Skeleton/>
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
                            </> : <Skeleton/>
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
                            </> : <Skeleton/>
                    }
                </div>
            </div>
        </>
    )
}
export default CardGrid
