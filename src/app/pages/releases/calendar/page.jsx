'use client'

import s from "@/styles/pages/global.module.css"
import Link from "next/link";
import CardGrid from "@/components/ui/CardGrid.jsx";
import useGameStore from "@/states/gameStore.js";
import {useEffect} from "react";

export default function Calendar({params}) {

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

	const getMonth = () => {
		const now = new Date();
		const date = now.toISOString().split('T')[0];
		return date.split('-')[1]
	}

	const getDates = () => {
		const now = new Date();
		const startMonth = new Date(now.getFullYear(), months.indexOf(params.month), 1);
		const startDate = startMonth.toISOString().split('T')[0];
		const endMonth = new Date(now.getFullYear(), months.indexOf(params.month), 30);
		const endDate = endMonth.toISOString().split('T')[0];
		return `${startDate},${endDate}`
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
			<h1>Release calendar - {params.month} 2024</h1>
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
				url={`https://api.rawg.io/api/games?key=${apiKey}&dates=` + getDates()}
			/>
		</div>
	)
}
