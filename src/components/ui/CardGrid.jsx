"use client"

import styledGlobal from "@/styles/pages/global.module.css";
import {Card} from "@/components/ui/Card";
import {useEffect, useState} from "react";

const CardGrid = ({url}) => {

    const [cards, setCards] = useState([])

    const getGames = async () => {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data.results[0])
        setCards(data.results)
    }

    useEffect(() => {
        getGames().then(r => console.log("DONE"))
    }, [])

    return (
        <>
            <div className={styledGlobal.gamesGrid}>
                <div className={styledGlobal.gamesColumn}>
                    {
                        cards.map((card, index) => {
                            if (index % 4 === 0) {
                                return (
                                    <Card key={index} gameName={card.name}
                                          genres={card.genres}
                                          likes={card.ratings_count}
                                          image={card.background_image}
                                          platforms={card.parent_platforms}
                                          releaseDate={card.released}
                                          rat={card.rating}
                                          ratTop={card.rating_top}
                                    />
                                )
                            }
                            return null
                        })
                    }
                </div>
                <div className={styledGlobal.gamesColumn}>
                    {
                        cards.map((card, index) => {
                            if (index % 4 === 1) {
                                return (
                                    <Card key={index} gameName={card.name}
                                          genres={card.genres}
                                          likes={card.ratings_count}
                                          image={card.background_image}
                                          platforms={card.parent_platforms}
                                          releaseDate={card.released}
                                          rat={card.rating}
                                          ratTop={card.rating_top}
                                    />
                                )
                            }
                            return null
                        })
                    }
                </div>
                <div className={styledGlobal.gamesColumn}>
                    {
                        cards.map((card, index) => {
                            if (index % 4 === 2) {
                                return (
                                    <Card key={index} gameName={card.name}
                                          genres={card.genres}
                                          likes={card.ratings_count}
                                          image={card.background_image}
                                          platforms={card.parent_platforms}
                                          releaseDate={card.released}
                                          rat={card.rating}
                                          ratTop={card.rating_top}
                                    />
                                )
                            }
                            return null
                        })
                    }
                </div>
                <div className={styledGlobal.gamesColumn}>
                    {
                        cards.map((card, index) => {
                            if (index % 4 === 3) {
                                return (
                                    <Card key={index} gameName={card.name}
                                          genres={card.genres}
                                          likes={card.ratings_count}
                                          image={card.background_image}
                                          platforms={card.parent_platforms}
                                          releaseDate={card.released}
                                          rat={card.rating}
                                          ratTop={card.rating_top}
                                    />
                                )
                            }
                            return null
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default CardGrid
