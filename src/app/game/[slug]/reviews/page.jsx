'use client';

import styledDetails from "@/styles/pages/gameDetails.module.css";
import {UserIcon} from "../../../../../public/icon/UserIcon.jsx";
import {useEffect, useRef, useState} from "react";
import GameNav from "@/components/ui/GameNav.jsx";
import Link from "next/link";
import {ReviewIcon} from "../../../../../public/icon/ReviewIcon.jsx";
import {removeSpecialCharacters, showCustomToast} from "@/lib/helper.js";
import {CalendarIcon} from "../../../../../public/icon/CalendarIcon.jsx";
import useGameStore from "@/userStore/gameStore.js";
import {FaPlus} from "react-icons/fa";
import {BarChartIcon} from "../../../../../public/icon/BarChartIcon.jsx";
import useUserStore from "@/userStore/userStore.js";
import {Toast} from "primereact/toast";

export default function Reviews() {

	const toastRef = useRef()

	const {
		gameId,
		gameDetails,
		gameReviews,
		setGameDetails,
		setGameReviews,
	} = useGameStore();

	const {
		userEmail,
		userName
	} = useUserStore();

	const [inputReview, setInputReview] = useState("");
	const [fetchingReviews, setFetchingReviews] = useState([]);

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
					setGameReviews(data.results.slice(0, 6));
				} catch (error) {
					console.error('Error fetching game reviews:', error);
				}
			}

			fetchGameReviews();
		}

		async function fetchReviews() {
			const request = {
				game_id: gameId,
			};

			try {
				const response = await fetch(`/api/game/post/getReviews`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(request),
				});

				const data = await response.json();

				if (data.status) {
					setFetchingReviews(data.result);
				} else {
					console.log(data.message);
				}

			} catch (error) {
				console.log(error);
			}
		}

		fetchReviews();
	}, [gameId, gameDetails, gameReviews, setGameDetails, setGameReviews]);

	if (gameDetails === null) {
		return <div>Loading...</div>;
	}

	async function reviewHandler(e) {

		if (inputReview === "") {
			return;
		}

		e.preventDefault();

		const request = {
			author_name: userName,
			author_email: userEmail,
			review_string: inputReview,
			game_id: gameId,
		};

		try {
			const response = await fetch(`/api/game/post/addReview`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});

			const data = await response.json();

			if (data.status) {
				showCustomToast(
					"success",
					"Success",
					"Review added successfully.",
					"Review added successfully",
					toastRef,
					2000
				)
			} else {
				showCustomToast(
					"error",
					"Error",
					"Something went wrong.",
					"Something went wrong.",
					toastRef,
					2000
				)
			}
		} catch (error) {
			console.log(error);
		}
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
							<h3><BarChartIcon/> Overall Rating</h3>
							{
								gameDetails?.rating ?
									<div className={styledDetails.attributeValue}>
										<span>Overall : {parseInt(gameDetails.rating) * 2} / 10</span>
									</div> :
									<div className={styledDetails.notThere}>
										<div className={styledDetails.attributeValue}>
											<span>NO RATING YET</span>
										</div>
									</div>
							}
						</div>
						<div>
							<h3><CalendarIcon/> Players Ratings</h3>
							<div className={styledDetails.detailsGrid}>
								{
									gameDetails.ratings ?
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
											{fetchingReviews && fetchingReviews.map((review, index) => (
												<div className={styledDetails.reviewValue} key={index}>
													<h4>
														<div className={styledDetails.usernameAccordian}>
															{
																review?.author_name
																&&
																review?.author_name?.charAt(0).toUpperCase()
																+
																review?.author_name?.charAt(4).toUpperCase()
															}
														</div>
														{review?.author_name && review?.author_name}
													</h4>
													<br/>
													<span>{removeSpecialCharacters(review.review_string)}</span>
												</div>
											))}
										</>
								}
							</div>
						</div>
						<div className={styledDetails.reviewContainer}>
							<h3><FaPlus/> Add a Review</h3>
							<textarea
								value={inputReview}
								onChange={(e) => setInputReview(e.target.value)}
								placeholder={"Type your Review here..."}>
                            </textarea>
							<button onClick={reviewHandler}>Submit</button>
						</div>
					</div>
				</div>
			</div>
			<Toast ref={toastRef} position="top-right"/>
		</>
	);
}
