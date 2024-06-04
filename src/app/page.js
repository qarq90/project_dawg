'use client'

import styledGlobal from "@/styles/pages/global.module.css"
import CardGrid from "@/components/ui/CardGrid"
import {useEffect} from "react"
import Cookies from "js-cookie"
import {useRouter} from "next/navigation.js"
import {useAtom} from "jotai"
import {currentUserEmail, currentUserName, currentUserPassword} from "@/states/userState.jsx"
import useGameStore from "@/states/gameStore.js"

export default function Home() {

	const router = useRouter()

	const [username, setUsername] = useAtom(currentUserName)
	const [email, setEmail] = useAtom(currentUserEmail)
	const [password, setPassword] = useAtom(currentUserPassword)

	const {
		setGameId,
		setGameTrailer,
		setGameDetails,
		setGameDescription,
		setGameScreenshots,
		setGameReviews
	} = useGameStore()

	useEffect(() => {

		setGameId(0)
		setGameDetails(null)
		setGameTrailer(null)
		setGameDescription([])
		setGameScreenshots(null)
		setGameReviews(null)

		const autoLogin = async () => {
			const storageUserID = Cookies.get("storageUserID") || ""

			if (storageUserID === "") {
				router.push("/auth/login")
			} else {
				const request = {
					_id: storageUserID,
				}

				try {
					const response = await fetch(`/api/auth/post/fetchUser`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(request),
					})

					const data = await response.json()

					if (data.status) {
						setUsername(data.result.user_name)
						setEmail(data.result.email_id)
						setPassword(data.result.password)
					}

				} catch (error) {
					console.log(error)
				}
			}
		}

		autoLogin()

	}, [])

	return (
		<>
			<div className={styledGlobal.container}>
				<h1>Home</h1>
				<CardGrid
					url={`https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971`}
				/>
			</div>
		</>
	)
}
