'use client'

import styledGlobal from "@/styles/pages/global.module.css"
import CardGrid from "@/components/ui/CardGrid.jsx";
import {useRouter} from "next/navigation.js";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {getDates} from "@/lib/helper.js";
import useGameStore from "@/states/gameStore.js";

export default function Latest() {

	const router = useRouter()

	const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

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
			<h1>Last 30 days</h1>
			<CardGrid
				url={`https://api.rawg.io/api/games?key=${apiKey}&dates=` + getDates()}
			/>
		</div>
	)
}
