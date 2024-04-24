"use client"

import styledGlobal from "@/styles/pages/global.module.css"
import {Card} from "@/components/ui/Card"
import {useEffect, useState} from "react"
import {Skeleton} from "@/components/ui/Skeleton"

const CardGridGenres = ({url,filter}) => {

    const [cards, setCards] = useState([])

    const getGames = async () => {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data.results[0])
        console.log(url)
        setCards(data.results)
    }

    useEffect(() => {
        getGames().then(r => console.log("Games Fetched"))
    }, [])


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
                                                key={index}
                                                gameName={card.name}
                                                genres={card.genres}
                                                likes={card.ratings_count}
                                                image={card.image_background}
                                                platforms={card.parent_platforms}
                                                releaseDate={card.released}
                                                rat={card.rating}
                                                ratTop={card.rating_top}
                                            />
                                        ) : null

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
                                                key={index}
                                                gameName={card.name}
                                                genres={card.genres}
                                                likes={card.ratings_count}
                                                image={card.image_background}
                                                platforms={card.parent_platforms}
                                                releaseDate={card.released}
                                                rat={card.rating}
                                                ratTop={card.rating_top}
                                            />
                                        ) : null

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
                                                key={index}
                                                gameName={card.name}
                                                genres={card.genres}
                                                likes={card.ratings_count}
                                                image={card.image_background}
                                                platforms={card.parent_platforms}
                                                releaseDate={card.released}
                                                rat={card.rating}
                                                ratTop={card.rating_top}
                                            />
                                        ) : null

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
                                                key={index}
                                                gameName={card.name}
                                                genres={card.genres}
                                                likes={card.ratings_count}
                                                image={card.image_background}
                                                platforms={card.parent_platforms}
                                                releaseDate={card.released}
                                                rat={card.rating}
                                                ratTop={card.rating_top}
                                            />
                                        ) : null

                                    })
                                }
                            </> : <Skeleton/>
                    }
                </div>
            </div>
        </>
    )
}
export default CardGridGenres
