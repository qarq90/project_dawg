'use client'

import styledGlobal from "@/styles/pages/global.module.css";
import CardGridX from "@/components/ui/CardGridX.jsx";
import {useRouter} from "next/navigation.js";
import {useEffect} from "react";
import Cookies from "js-cookie";
import useGameStore from "@/states/gameStore.js";

export default function Stores() {

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
			<h1>Stores</h1>
			<CardGridX
				url={`https://api.rawg.io/api/stores?key=${apiKey}`}
			/>
		</div>
	)
}
