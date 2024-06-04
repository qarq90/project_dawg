'use client'

import styledDetails from "@/styles/pages/gameDetails.module.css";
import {UserIcon} from "../../../../../public/icon/UserIcon.jsx";
import {useEffect} from "react";
import GameNav from "@/components/ui/GameNav.jsx";
import Link from "next/link";
import {ReviewIcon} from "../../../../../public/icon/ReviewIcon.jsx";
import {removeSpecialCharacters} from "@/lib/helper.js";
import {CalendarIcon} from "../../../../../public/icon/CalendarIcon.jsx";
import useGameStore from "@/states/gameStore.js";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss.js";

export default function Reviews() {

	const {
		gameId,
		gameDetails,
		gameReviews,
		setGameDetails,
		setGameReviews,
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

		if (!gameReviews) {
			async function fetchGameReviews() {
				try {
					const response = await fetch(`https://api.rawg.io/api/games/${gameId}/reviews?key=${apiKey}`);
					if (!response.ok) {
						throw new Error('Failed to fetch game reviews');
					}
					const data = await response.json();
					setGameReviews(data.results);
				} catch (error) {
					console.error('Error fetching game reviews:', error);
				}
			}

			fetchGameReviews();
		}
	}, [gameId, gameDetails, gameReviews, setGameDetails, setGameReviews]);

	if (gameDetails === null) {
		return <div>Loading...</div>;
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
							<h3><CalendarIcon/> Players Ratings</h3>
							<div className={styledDetails.detailsGrid}>
								{
									gameDetails.rating ?
										<>
											{gameDetails.ratings.map((rating, index) => (
												<div className={styledDetails.attributeValue} key={index}>
													<span>{rating.title.charAt(0).toUpperCase() + rating.title.slice(1).toLowerCase()} : </span>
													<span>{rating.count}k</span>
												</div>
											))}
										</> :
										<div className={styledDetails.notThere}>
											<div className={styledDetails.attributeValue}>
												<span>NO RATING YET</span>
											</div>
										</div>
								}
							</div>
						</div>
						<div>
							<h3><UserIcon/> Players Played</h3>
							<div id={styledDetails.tagValues}>
								{Object.entries(gameDetails.added_by_status).map(([key, value]) => (
									<div className={styledDetails.attributeValue} key={key}>
										<span>{key.charAt(0).toUpperCase() + key.slice(1)} : </span>
										<span>{value}k</span>
									</div>
								))}
							</div>
						</div>
						<div>
							<h3><ReviewIcon/> Reviews</h3>
							<div className={styledDetails.reviewGrid}>
								{
									gameReviews === null || gameReviews.length === 0 ?
										<div className={styledDetails.attributeValue}>
											<span>NO REVIEWS YET</span>
										</div> :
										<>
											{gameReviews.map((review, index) => (
												<div className={styledDetails.reviewValue} key={index}>
													<h4>
														<div className={styledDetails.usernameAccordian}>
															{
																review?.user
																&&
																review?.user?.username?.charAt(0).toUpperCase()
																+
																review?.user?.username?.charAt(4).toUpperCase()
															}
														</div>
														{review?.user && review?.user?.username}
													</h4>
													<br/>
													<span>{removeSpecialCharacters(review.text)}</span>
												</div>
											))}
										</>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
