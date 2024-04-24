'use client'

import s from "@/styles/ui/cardx.module.css"
import {useState} from "react";
import Link from "next/link";

export const CardX = (props) => {

    const {
        name,
        slug,
        image,
        count,
        items
    } = props

    const [fullCard, setFullCard] = useState(false)

    const ellipsis = (str, n=20) => {
        return str.length > n ? str.substr(0, n - 1) + "..." : str
    }

    return (
        <div
            className={s.card}
            onMouseEnter={() => setFullCard(true)}
            onMouseLeave={() => setFullCard(false)}
            style={{
                backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url("${image}")`
            }}
        >
            <div className={s.cardTop}>
                <div className={s.cardText}>
                    <Link href={'/pages/browse/games/' + slug}>{name}</Link>
                </div>
            </div>
            <div className={s.cardBottom}>
                <div className={s.popItemTitle}>
                    <div className={s.popItemTitleText}>Popular Items</div>
                    <div className={s.popItemCount}>{count}</div>
                </div>
                <div className={s.popItems}>
                    {
                        items?.slice(0, 3).map((item, index) => {
                            return (
                                <div className={s.popItem} key={index}>
                                    <Link href={'/pages/browse/games/' + item.slug} className={s.popItemLink}>{ellipsis(item.name)}</Link>
                                    <div className={s.popItemCount}>{item.added} <span className={s.userIcon}></span></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}