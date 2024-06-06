'use client'

import styledDetails from "@/styles/pages/gameDetails.module.css";
import {ControllerIcon} from "../../../../../public/icon/ControllerIcon.jsx";
import {useEffect} from "react";
import GameNav from "@/components/ui/GameNav.jsx";
import Link from "next/link";
import {WindowsIcon} from "../../../../../public/icon/WindowsIcon.jsx";
import {AppleIcon} from "../../../../../public/icon/AppleIcon.jsx";
import useGameStore from "@/userStore/gameStore.js";
import {SkeletonGameNav, SkeletonGridFour, SkeletonGridOne, SkeletonTitle} from "@/components/ui/Skeleton.jsx";
import {PCIcon} from "../../../../../public/icon/PCIcon.jsx";

export default function Requirements() {

	const {gameId, gameName, gameDetails, setGameDetails} = useGameStore();

	useEffect(() => {

		const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

		if (!gameId) {
			console.error('No game ID found in the Zustand store');
			return;
		}

		if (!gameDetails) {
			async function fetchGameDetails() {
				try {
					const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
					if (!response.ok) {
						throw new Error('Failed to fetch game details');
					}
					const data = await response.json();
					setGameDetails(data);
				} catch (error) {
					console.error('Error fetching game details:', error);
				}
			}

			fetchGameDetails();
		}
	}, [gameId, gameDetails, setGameDetails]);

	if (gameDetails === null) {
		return (
			<div className={styledDetails.container}>
				<SkeletonTitle/>
				<SkeletonGameNav/>
				<SkeletonGridFour/>
				<SkeletonGridOne/>
			</div>
		)
	}

	return (
		<>
			<div
				style={{
					backgroundImage: `url(${gameDetails?.background_image})`,
				}}
				className={styledDetails.gameDetailsContainer}
			>
			</div>
			<div className={styledDetails.container}>
				<Link href={gameDetails.website}
				      target='_blank'
				      className={styledDetails.gameTitle}>{gameDetails.name}</Link>
				<GameNav/>
				<div className={styledDetails.gameDetails}>
					<div className={styledDetails.gameDescription}>
						<div>
							<h3><ControllerIcon/> Platforms</h3>
							<div className={styledDetails.attributeValue}>
								{gameDetails.parent_platforms.map(platform => (
									<span key={platform.platform.id}>{platform.platform.name}</span>
								))}
							</div>
						</div>
						<div>
							<h3><PCIcon/> PC Requirements</h3>
							<div className={styledDetails.attributeValue}>
				                <span>
				                  <a href={`https://www.pcgamebenchmark.com/${gameName}-system-requirements`}
				                     target='_blank'>
				                    See PC Requirements
				                  </a>
				                </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
