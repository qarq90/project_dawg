'use client'

import s from "@/styles/pages/global.module.css"
import Link from "next/link";
import CardGrid from "@/components/ui/CardGrid.jsx";
import {currentYear, getMonthDates, months} from "@/lib/helper.js";
import useGameStore from "@/states/gameStore.js";
import {useEffect} from "react";

export default function Calendar({params}) {

	const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

	const getMonth = () => {
		const now = new Date();
		const date = now.toISOString().split('T')[0];
		return date.split('-')[1]
	}

	const {
		setGameId,
		setGameTrailer,
		setGameDetails, setGameName,
		setGameDescription,
		setGameScreenshots,
		setGameReviews
	} = useGameStore()

	useEffect(() => {

		setGameId(0)
		setGameName(null)
		setGameDetails(null)
		setGameTrailer(null)
		setGameDescription([])
		setGameScreenshots(null)
		setGameReviews(null)

	}, [])

	return (
		<div className={s.container}>
			<h1>Release calendar - {params.month} {currentYear}</h1>
			<div className={s.calendarLinks}>
				{
					months.map((month, index) => (
						<Link className={s.calendarLink + ' ' + (params.month === month ? s.calendarLinkActive : '')}
						      key={index} href={'/pages/releases/calendar/' + month}>
							{month}
						</Link>
					))
				}
			</div>
			<CardGrid
				url={`https://api.rawg.io/api/games?key=${apiKey}&dates=` + getMonthDates(params)}
			/>
		</div>
	)
}
