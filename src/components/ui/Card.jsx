'use client'

import styledCard from "@/styles/ui/card.module.css"
import {useState} from "react";

export const Card = (props) => {

    const [fullCard, setFullCard] = useState(false)

    return (
        <div
            className={styledCard.card}
            onMouseEnter={() => setFullCard(true)}
            onMouseLeave={() => setFullCard(false)}
        >
            <div className={styledCard.cardVid}>
                {/*  Game Video Goes Here  */}
            </div>
            <div className={styledCard.cardBottom}>
                <div className={styledCard.cardIconContainer}>
                    {props.platforms.map((platform, index) => (
                        <div key={index}>
                            {platform}
                        </div>
                    ))}
                </div>
                <div className={styledCard.cardText}>
                    <p>{props.gameName}</p>
                    <p>Hello</p>
                    <p>Hello</p>
                    <p>Hello</p>
                </div>
                {
                    fullCard ?
                        <>
                            <div className={styledCard.hoveredCard}>
                                <p>Hello</p>
                                <p>Hello</p>
                                <p>Hello</p>
                            </div>
                        </> : <></>
                }
            </div>
        </div>
    )
}