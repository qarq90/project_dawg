'use client'

import styledDetails from "@/styles/pages/gameDetails.module.css";
import Link from "next/link";
import GameNav from "@/components/ui/GameNav.jsx";
import {GenreIcon} from "../../../../public/icon/GenreIcon.jsx";
import {ControllerIcon} from "../../../../public/icon/ControllerIcon.jsx";
import {CalendarIcon} from "../../../../public/icon/CalendarIcon.jsx";
import {DevelopersIcon} from "../../../../public/icon/DevelopersIcon.jsx";
import {PublisherIcon} from "../../../../public/icon/PublisherIcon.jsx";
import {HashtagIcon} from "../../../../public/icon/HashtagIcon.jsx";
import {UserIcon} from "../../../../public/icon/UserIcon.jsx";
import {ReviewIcon} from "../../../../public/icon/ReviewIcon.jsx";
import useGameStore from "@/userStore/gameStore.js";
import {
	SkeletonDescription,
	SkeletonGameNav,
	SkeletonGridFour,
	SkeletonGridOne,
	SkeletonGridTwelve,
	SkeletonGridTwo,
	SkeletonTitle,
	SkeletonTrailer
} from "@/components/ui/Skeleton.jsx";
import {useEffect} from "react";
import {splitTextIntoSentences} from "@/lib/helper.js";

export default function AboutGame({params}) {

	const {
		gameId,
		gameDetails,
		gameTrailer,
		gameDescription,
		setGameId,
		setGameDetails,
		setGameTrailer,
		setGameDescription,
		setGameName
	} = useGameStore();

	const game = params.slug;

	useEffect(() => {

		const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

		setGameName(game)

		if (!gameDetails) {
			async function fetchGameAbout() {
				try {

					const response = await fetch(`https://api.rawg.io/api/games/${game}?key=${apiKey}`);
					if (!response.ok) {
						throw new Error('Failed to fetch game details');
					}

					const data = await response.json();

					setGameDetails(data);
					setGameId(data.id);

					const desc = data.description_raw;
					const filteredDescArray = splitTextIntoSentences(desc);

					console.log(data)

					setGameDescription(filteredDescArray);
				} catch (error) {
					console.error('Error fetching game details:', error);
				}
			}

			fetchGameAbout();
		}

		if (gameId !== 0 && !gameTrailer) {
			async function fetchGameTrailer() {
				try {
					const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`);
					if (!response.ok) {
						throw new Error('Failed to fetch game trailer');
					}
					const data = await response.json();
					setGameTrailer(data);
					console.log("Trailer:")
					console.log(data)
				} catch (error) {
					console.error('Error fetching game trailer:', error);
				}
			}

			fetchGameTrailer();
		}
	}, [game, gameDetails, gameId, gameTrailer, setGameDetails, setGameId, setGameTrailer, setGameDescription]);

	return (
		<>
			{gameDetails === null ?
				<div className={styledDetails.container}>
					<SkeletonTitle/>
					<SkeletonGameNav/>
					<SkeletonDescription/>
					<SkeletonTrailer/>
					<SkeletonDescription/>
					<SkeletonGridOne/>
					<SkeletonGridTwo/>
					<SkeletonGridOne/>
					<SkeletonGridFour/>
					<SkeletonGridOne/>
					<SkeletonGridOne/>
					<SkeletonGridOne/>
					<SkeletonGridTwelve/>
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
						<Link href={gameDetails?.website ? gameDetails.website : ''}
						      target='_blank'
						      className={styledDetails.gameTitle}>{gameDetails?.name}</Link>
						<GameNav/>
						<div className={styledDetails.gameDesc}>
							<p>{gameDescription[0] + gameDescription[1] + gameDescription[2] + gameDescription[3]}</p>
						</div>
						{
							gameTrailer === null ?
								<div className={styledDetails.trailer + ' ' + styledDetails.attributeValue}
								     style={{marginLeft: "2rem"}}>
					                  <span
						                  className={styledDetails.gameDescription}>NO TRAILER YET
					                  </span>
								</div> :
								<>
									<div>
										<video controls width="95%" height="600"
										       src={gameTrailer?.results[0]?.data?.max}/>
									</div>
								</>
						}
						{gameDescription && (
							<div className={styledDetails.gameDesc}>
								{gameDescription.slice(4, 7).map((sentence, index) => (
									<p key={index}>{sentence}</p>
								))}
							</div>
						)}
						<div className={styledDetails.gameDetails}>
							<div className={styledDetails.gameDescription}>
								<div>
									{
										gameDetails?.genres?.length !== 0 ?
											<>
												<h3><GenreIcon/> Genre</h3>
												<div className={styledDetails.attributeValue}>
													{gameDetails?.genres?.map(genre => (
														<span key={genre.id}> {genre.name}</span>
													))}
												</div>
											</> : <></>
									}
								</div>
								<div>
									<h3><ControllerIcon/> Platforms</h3>
									<div className={styledDetails.attributeValue}>
										{gameDetails?.parent_platforms?.map(platform => (
											<span key={platform.id}>{platform.platform.name}</span>
										))}
									</div>
								</div>
								<div>
									<h3><UserIcon/> Age</h3>
									{
										gameDetails?.esrb_rating ?
											<div className={styledDetails.attributeValue}>
												<span>{gameDetails?.esrb_rating?.name}</span>
											</div>
											:
											<div className={styledDetails.notThere}>
												<div className={styledDetails.attributeValue}>
													<span>NO ESB RATING YET</span>
												</div>
											</div>
									}
								</div>
								<div>
									<h3><ReviewIcon/> Rating</h3>
									<div className={styledDetails.detailsGrid}>

										{
											gameDetails?.rating ?
												<>
													{gameDetails?.ratings.map((rating, index) => (
														<div className={styledDetails.attributeValue} key={index}>
															<span>{rating.title.charAt(0).toUpperCase() + rating.title.slice(1).toLowerCase()}: </span>
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
									<h3><CalendarIcon/> Released Date</h3>
									{
										gameDetails?.released ?
											<>
												<div className={styledDetails.attributeValue}>
						                          <span
							                          className={styledDetails.gameDescription}>{gameDetails?.released}
						                          </span>
												</div>
											</> :
											<div className={styledDetails.notThere}>
												<div className={styledDetails.attributeValue}>
						                          <span
							                          className={styledDetails.gameDescription}>NO RELEASE DATE YET
						                          </span>
												</div>
											</div>
									}
								</div>
								<div>
									<h3><DevelopersIcon/> Developed By</h3>
									<div className={styledDetails.attributeValue}>
										{gameDetails?.developers?.slice(0, 1).map(developer => (
											<span key={developer.id}>{developer.name} </span>
										))}
									</div>
								</div>
								<div>
									<h3><PublisherIcon/> Published By</h3>
									<div className={styledDetails.attributeValue}>
										{gameDetails?.publishers?.map(publisher => (
											<span key={publisher.id}>{publisher.name}</span>
										))}
									</div>
								</div>
								<div>
									<h3><HashtagIcon/> Tags</h3>
									{
										gameDetails?.tags?.length !== 0 ?
											<div className={styledDetails.attributeValue}
											     id={styledDetails.tagValues}>
												{gameDetails?.tags?.slice(0, 12).map(tag => (
													<span key={tag.id}>{tag.name}</span>
												))}
											</div> :
											<div className={styledDetails.notThere}>
												<div className={styledDetails.attributeValue}>
						                          <span
							                          className={styledDetails.gameDescription}>NO TAGS YET
						                          </span>
												</div>
											</div>
									}
								</div>
							</div>
						</div>
					</div>
				</>
			}
		</>
	)
}

const RenderSkeleton = () => {
	return (
		<div className={styledDetails.skeleton}>
			<div className={styledDetails.gameDetailsContainer}></div>
			<div className={styledDetails.container}>
				<div className={styledDetails.gameTitle}></div>
				<div className={styledDetails.gameNav}></div>
				<div className={styledDetails.gameDesc}></div>
				<div className={styledDetails.trailer}></div>
				<div className={styledDetails.gameDetails}>
					<div className={styledDetails.gameDescription}></div>
				</div>
			</div>
		</div>
	);
}
