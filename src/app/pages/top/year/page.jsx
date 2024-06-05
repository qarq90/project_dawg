'use client'

import styledGlobal from "@/styles/pages/global.module.css"
import CardGrid from "@/components/ui/CardGrid.jsx";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {bestOfFrom, bestOfTo, currentDay, currentMonth} from "@/lib/helper.js";
import useGameStore from "@/userStore/gameStore.js";

export default function Year() {
	const router = useRouter()

	const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

	const {
		setGameId,
		setGameTrailer,
		setGameDetails,
		setGameName,
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

		const autoLogin = async () => {
			const storageUserID = Cookies.get("storageUserID") || ""

			if (storageUserID === "") {
				router.push("/auth/login")
			}
		}
		autoLogin()

	}, [])

	return (
		<div className={styledGlobal.container}>
			<h1>Best of the Year</h1>
			<CardGrid
				url={`https://api.rawg.io/api/games?key=${apiKey}&dates=${bestOfFrom},${bestOfTo}&ordering=-rating,-metacritic`}
			/>
		</div>
	)
}
