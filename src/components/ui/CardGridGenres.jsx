"use client"

import styledGlobal from "@/styles/pages/global.module.css";
import {Card} from "@/components/ui/Card";
import {useEffect, useState} from "react";
import {SkeletonCard} from "@/components/ui/Skeleton";

const CardGridPGenres = ({url}) => {

    const [cards, setCards] = useState([])
    const [pageNumber, setPageNumber] = useState(1);

    const getGames = async () => {
        try {
            const res = await fetch(url + `&page=${pageNumber}`);
            const data = await res.json();
            const newGames = data.results;

            setCards(prevState => {
                const uniqueGameIds = new Set(prevState.map(game => game.id));
                const filteredGames = newGames.filter(game => !uniqueGameIds.has(game.id));
                return [...prevState, ...filteredGames];
            });
        } catch (error) {
            console.error('Error fetching games:', error);
            await getGames()
        }
    };


    useEffect(() => {
        getGames().then(r => console.log("Games Fetched"));
    }, [pageNumber]);


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
                                                slug={card.slug}
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
                                                slug={card.slug}
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
                                                slug={card.slug}
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
            <div className={styledGlobal.bottomContainer}>
                <button
                    className={styledGlobal.loadMore}
                    onClick={() => setPageNumber(prevState => prevState + 1)}
                >
                    Load More
                </button>
            </div>
        </>
    )
}
export default CardGridPGenres
