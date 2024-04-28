"use client"

import styledGlobal from "@/styles/pages/global.module.css";
import {useEffect, useState} from "react";
import {Skeleton, SkeletonCard} from "@/components/ui/Skeleton";
import {CardX} from "@/components/ui/CardX.jsx";

const CardGridX = ({url}) => {

    const [cards, setCards] = useState([])

    const getGames = async () => {
        const res = await fetch(url)
        const data = await res.json()
        console.clear()
        const tez = data.results[0]
        for (const key in tez) {
            console.log("Key: " + key);
        }
        console.log(tez.games)
        setCards(data.results)
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
                                        const image = card.background_image || card.image || card.image_background

                                        return index % 4 === 0 ? (
                                            <CardX
                                                key={index}
                                                image={image}
                                                slug={card.slug}
                                                name={card.name}
                                                items={card.games}
                                                count={card.games_count}
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
                                        const image = card.background_image || card.image || card.image_background

                                        return index % 4 === 1 ? (
                                           <CardX
                                                key={index}
                                                image={image}
                                                slug={card.slug}
                                                name={card.name}
                                                items={card.games}
                                                count={card.games_count}
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
                                        const image = card.background_image || card.image || card.image_background

                                        return index % 4 === 2 ? (
                                            <CardX
                                                key={index}
                                                image={image}
                                                slug={card.slug}
                                                name={card.name}
                                                items={card.games}
                                                count={card.games_count}
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
                                        const image = card.background_image || card.image || card.image_background

                                        return index % 4 === 3 ? (
                                            <CardX
                                                key={index}
                                                image={image}
                                                slug={card.slug}
                                                name={card.name}
                                                items={card.games}
                                                count={card.games_count}
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
export default CardGridX
