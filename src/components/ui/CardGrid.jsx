"use client"

import styledGlobal from "@/styles/pages/global.module.css";
import {Card} from "@/components/ui/Card";
import {useEffect, useState} from "react";

const CardGrid = ({cards}) => {
    const [A, setA] = useState([])
    const [B, setB] = useState([])
    const [C, setC] = useState([])
    const [D, setD] = useState([])

    useEffect(() => {

        for (let i = 0; i < cards.length; i++) {
            if (i % 4 === 0) {
                setA(prev => [...prev, cards[i]])
            } else if (i % 4 === 1) {
                setB(prev => [...prev, cards[i]])
            } else if (i % 4 === 2) {
                setC(prev => [...prev, cards[i]])
            } else if (i % 4 === 3) {
                setD(prev => [...prev, cards[i]])
            }
            console.log(cards[i])
        }

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight') {
                console.log("A:", A)
                console.log("B:", B)
                console.log("C:", C)
                console.log("D:", D)
                console.log("Cards:", cards)
            }
        })

    }, [cards])

    return (
        <>
            <div className={styledGlobal.gamesGrid}>
                <div className={styledGlobal.gamesColumn}>
                    {
                        cards.map((card, index) => {
                            if (index % 4 === 0) {
                                return (
                                    <Card key={index} gameName={card.gameName}
                                          genres={card.genres}
                                          likes={card.likes}
                                          image={card.image}
                                          platforms={card.platforms}
                                          releaseDate={card.releaseDate}
                                          chart={card.chart}
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
                                    <Card key={index} gameName={card.gameName}
                                          genres={card.genres}
                                          likes={card.likes}
                                          image={card.image}
                                          platforms={card.platforms}
                                          releaseDate={card.releaseDate}
                                          chart={card.chart}
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
                                    <Card key={index} gameName={card.gameName}
                                          genres={card.genres}
                                          likes={card.likes}
                                          image={card.image}
                                          platforms={card.platforms}
                                          releaseDate={card.releaseDate}
                                          chart={card.chart}
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
                                    <Card key={index} gameName={card.gameName}
                                          genres={card.genres}
                                          likes={card.likes}
                                          image={card.image}
                                          platforms={card.platforms}
                                          releaseDate={card.releaseDate}
                                          chart={card.chart}
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
