'use client'

import styledDetails from "@/styles/pages/gameDetails.module.css";
import {useEffect} from "react";
import GameNav from "@/components/ui/GameNav.jsx";
import Link from "next/link";
import {imageCaptions} from "@/lib/gameObj.js";
import useGameStore from "@/states/gameStore.js";
import {SkeletonBanner, SkeletonGameNav, SkeletonGridImage, SkeletonTitle} from "@/components/ui/Skeleton.jsx";

export default function ScreenShot() {

	const {
		gameId,
		gameDetails,
		gameScreenshots,
		setGameDetails,
		setGameScreenshots,
	} = useGameStore();

	useEffect(() => {

		const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

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

		if (!gameScreenshots) {
			async function fetchGameScreenshots() {
				try {
					const response = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`)
					if (!response.ok) {
						throw new Error('Failed to fetch game screenshots');
					}
					const data = await response.json();
					setGameScreenshots(data);
				} catch (error) {
					console.error('Error fetching game screenshots:', error);
				}
			}

			fetchGameScreenshots();
		}
	}, [gameId, gameDetails, gameScreenshots, setGameDetails, setGameScreenshots]);

	const isFetching = gameDetails === null || gameScreenshots === null;
	const noImages = !isFetching && (!gameScreenshots || gameScreenshots.results.length === 0);

	return (
		<>
			{isFetching ?
				<div className={styledDetails.container}>
					<SkeletonTitle />
					<SkeletonGameNav />
					<SkeletonBanner/>
					<SkeletonGridImage />
				</div> :
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
						<div className={styledDetails.gameDescription}>
							<div className={styledDetails.screenshotContainer}>
								{
									gameDetails.background_image_additional ?
										<>
											<img src={gameDetails.background_image_additional} alt=""/>
											<h3>A Still from {gameDetails.name_original}</h3>
										</> :
										// <SkeletonBanner/>
									<></>
								}
							</div>
							<div className={styledDetails.screenshotGrid}>
								{noImages ?
									<p>No images yet</p> :
									gameScreenshots.results.map((screenshot, index) => (
										<div className={styledDetails.gridContainer} key={index}>
											<img src={screenshot.image} alt={`Screenshot ${index}`}/>
											<h3>{imageCaptions[index % imageCaptions.length]}</h3>
										</div>
									))
								}
							</div>
						</div>
					</div>
				</>
			}
		</>
	)
}
