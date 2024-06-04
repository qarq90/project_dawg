'use client'

import styledCard from "@/styles/ui/card.module.css"
import {useRef, useState} from "react";
import Link from "next/link";
import {WindowsIcon} from "../../../public/icon/WindowsIcon";
import {PlaystationIcon} from "../../../public/icon/PlaystationIcon";
import {XBoxIcon} from "../../../public/icon/XBoxIcon";
import {AndroidIcon} from "../../../public/icon/AndroidIcon";
import {NintendoIcon} from "../../../public/icon/NintendoIcon";
import {AppleIcon} from "../../../public/icon/AppleIcon";
import {currentUserEmail} from "@/states/userState.jsx";
import {useAtom} from "jotai";
import {Toast} from "primereact/toast";
import {showCustomToast} from "@/lib/helper.js";
import {usePathname} from "next/navigation";

export const Card = (props) => {

    const toastRef = useRef();

    const {
        genres,
        platforms,
        gameName,
        link,
        rat,
        ratTop,
        releaseDate,
        likes,
        image,
        slug,
        id,
        setTabItems
    } = props

    const pathname = usePathname()

    const [fullCard, setFullCard] = useState(false)

    const tag = slug

    const [email] = useAtom(currentUserEmail)

    function getRemoveFromValue() {
        const currentPath = pathname;

        switch (currentPath) {
            case '/pages/profile/liked':
                return 'liked_games';
            case '/pages/profile/owned':
                return 'owned_games';
            case '/pages/profile/wishlist':
                return 'wishlisted_games';
            default:
                return '';
        }
    }

    async function gameLikeHandler(e) {
        e.preventDefault()

        const request = {
            email_id: email,
            game_id: id.toString(),
            game_name: slug,
        };

        try {
            const response = await fetch(`/api/game/post/liked`, {
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
                    `Game Liked`,
                    "Please fill in all required fields.",
                    `${gameName} Added to Liked Games`,
                    toastRef,
                    2000
                );
            } else {
                showCustomToast(
                    "failed",
                    `Task Failed`,
                    "Please fill in all required fields.",
                    `${gameName} Failed to add`,
                    toastRef,
                    2000
                );
            }

        } catch (error) {
            console.log(error);
        }

    }

    async function gameWishlistHandler(e) {
        e.preventDefault()

        const request = {
            email_id: email,
            game_id: id.toString(),
            game_name: slug,
        };

        try {
            const response = await fetch(`/api/game/post/wishlist`, {
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
                    `Game Wishlisted`,
                    "Please fill in all required fields.",
                    `${gameName} Added to Wishlist`,
                    toastRef,
                    2000
                );
            } else {
                showCustomToast(
                    "failed",
                    `Task Failed`,
                    "Please fill in all required fields.",
                    `${gameName} Failed to wishlist`,
                    toastRef,
                    2000
                );
            }

        } catch (error) {
            console.log(error);
        }

    }

    async function gameOwnedHandler(e) {
        e.preventDefault()

        const request = {
            email_id: email,
            game_id: id.toString(),
            game_name: slug,
        };

        try {
            const response = await fetch(`/api/game/post/owned`, {
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
                    `Success`,
                    "Please fill in all required fields.",
                    `${gameName} Added to Owned Games`,
                    toastRef,
                    2000
                );
            } else {
                showCustomToast(
                    "failed",
                    `Task Failed`,
                    "Please fill in all required fields.",
                    `${gameName} Failed to add`,
                    toastRef,
                    2000
                );
            }

        } catch (error) {
            console.log(error);
        }

    }

    async function gameRemoveHandler(e) {
        e.preventDefault()

        const request = {
            email_id: email,
            game_id: id.toString(),
            removeFrom: getRemoveFromValue()
        };

        try {
            const response = await fetch(`/api/pages/post/profile/removeGame`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            const data = await response.json();

            if (data.status) {
                switch (request.removeFrom) {
                    case 'wishlisted_games':
                        showCustomToast(
                            "success",
                            `Success`,
                            "Please fill in all required fields.",
                            `${gameName} Removed from to Wishlist Games`,
                            toastRef,
                            2000
                        );
                        break
                    case 'owned_games':
                        showCustomToast(
                            "success",
                            `Success`,
                            "Please fill in all required fields.",
                            `${gameName} Removed from to Owned Games`,
                            toastRef,
                            2000
                        );
                        break
                    case 'liked_games':
                        showCustomToast(
                            "success",
                            `Success`,
                            "Please fill in all required fields.",
                            `${gameName} Removed from to Liked Games`,
                            toastRef,
                            2000
                        );
                        break
                }

                setTabItems(prev => {
                    console.log("PREV:", prev)
                    return prev.filter(item => item.id !== id)
                })
            } else {
                showCustomToast(
                    "failed",
                    `Task Failed`,
                    "Please fill in all required fields.",
                    `Failed to remove ${gameName} `,
                    toastRef,
                    2000
                );
            }

        } catch (error) {
            console.log(error);
        }
    }

    function formatNumber(number) {
        let numberString = number.toString();
        let parts = numberString.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    return (
        <>
            <Link
                href={`/game/${tag}`}
                className={styledCard.card}
                onMouseEnter={() => setFullCard(true)}
                onMouseLeave={() => setFullCard(false)}
            >
                <div className={styledCard.cardTop}>
                    <div className={styledCard.cardImg}>
                        <img width={300} height={160} src={image} alt=""/>
                    </div>
                </div>
                <div className={styledCard.cardBottom}>
                    <div className={styledCard.cardIconContainer}>
                        {platforms?.map((pl, index) => {
                            let icon = null;
                            switch (pl.platform.name) {
                                case "PC":
                                    icon = <WindowsIcon/>;
                                    break;
                                case "PlayStation":
                                    icon = <PlaystationIcon/>;
                                    break;
                                case "Xbox":
                                    icon = <XBoxIcon/>;
                                    break;
                                case "Android":
                                    icon = <AndroidIcon/>;
                                    break;
                                case "Nintendo":
                                    icon = <NintendoIcon/>;
                                    break;
                                case "iOS":
                                    icon = <AppleIcon/>;
                                    break;
                                default:
                                    icon = null;
                            }
                            if (icon) {
                                return (
                                    <div className={styledCard.cardIcon} key={`platform_${pl.platform.name}_${index}`}>
                                        {icon}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className={styledCard.cardText}>
                        <Link href={`/game/about/${tag}`}>{gameName}</Link>
                    </div>
                    <div className={styledCard.btnGroup}>
                        <button onClick={gameOwnedHandler}>
                            <svg
                                className="SVGInline-svg game-card-button__icon-svg game-card-button__icon_12-svg game-card-button__icon_with-offset-svg"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12">
                                <g fill="#fff" fillRule="evenodd">
                                    <rect width="3" height="12" x="4.5" rx=".75"></rect>
                                    <rect width="3" height="12" x="4.5" rx=".75" transform="rotate(-90 6 6)"></rect>
                                </g>
                            </svg>
                            {formatNumber(likes)}
                        </button>
                        <button style={{opacity: fullCard ? 1 : 0}} onClick={gameWishlistHandler}>
                            <svg className="SVGInline-svg game-card-button__icon-svg game-card-button__icon_20-svg"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 30 30">
                                <path fill="#FFF"
                                      d="M25.5 9.846h-4.746a5.87 5.87 0 00.837-.657 3.027 3.027 0 000-4.32c-1.175-1.158-3.223-1.159-4.4 0-.649.639-2.375 3.24-2.137 4.977h-.108c.237-1.738-1.488-4.339-2.138-4.978-1.176-1.158-3.224-1.157-4.4 0a3.028 3.028 0 000 4.321c.205.203.498.429.838.657H4.5A1.487 1.487 0 003 11.314v3.672c0 .405.336.734.75.734h.75v8.812c.004.813.675 1.47 1.5 1.468h18a1.487 1.487 0 001.5-1.468V15.72h.75c.414 0 .75-.329.75-.734v-3.672a1.487 1.487 0 00-1.5-1.468zM9.472 5.904a1.61 1.61 0 011.138-.464c.427 0 .83.164 1.135.464 1.011.995 2.016 3.54 1.667 3.893 0 0-.064.048-.278.048-1.036 0-3.015-1.054-3.662-1.691a1.578 1.578 0 010-2.25zm4.778 18.628H6V15.72h8.25v8.812zm0-10.28H4.5v-2.938h9.75v2.938zm4.005-8.348c.609-.598 1.665-.597 2.273 0a1.578 1.578 0 010 2.25c-.647.637-2.626 1.692-3.662 1.692-.214 0-.278-.047-.279-.049-.348-.354.657-2.898 1.668-3.893zM24 24.532h-8.25V15.72H24v8.812zm1.5-10.28h-9.75v-2.938h9.75v2.938z"></path>
                            </svg>
                        </button>
                        <button style={{opacity: fullCard ? 1 : 0}} onClick={gameLikeHandler}>
                            <svg className="SVGInline-svg game-card-button__icon-svg game-card-button__icon_20-svg"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="15" height="15">
                                <path
                                    d="M9.5449219 4C5.9299219 4 3 6.9299219 3 10.544922C3 16.837321 10.298975 22.849799 13.708984 25.527344 A 2 2 0 0 0 13.71875 25.535156C13.742115 25.5535 13.773881 25.579629 13.796875 25.597656L13.798828 25.595703 A 2 2 0 0 0 15 26 A 2 2 0 0 0 16.203125 25.595703L16.203125 25.597656C16.209855 25.59238 16.219801 25.585381 16.226562 25.580078C16.231704 25.576045 16.23898 25.570455 16.244141 25.566406 A 2 2 0 0 0 16.263672 25.548828C19.663109 22.880904 27 16.852336 27 10.544922C27 6.9299219 24.070078 4 20.455078 4C17.000078 4 15 7 15 7C15 7 12.999922 4 9.5449219 4 z"
                                    fill="#FFFFFF"/>
                            </svg>
                        </button>
                        {pathname.startsWith('/pages/profile/') ?
                            <button style={{opacity: fullCard ? 1 : 0}} onClick={gameRemoveHandler}>
                                <svg className="SVGInline-svg game-card-button__icon-svg game-card-button__icon_20-svg"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="15" height="15">
                                    <path
                                        d="M10 2L9 3L4 3L4 5L20 5L20 3L15 3L14 2L10 2 z M 5 7L5 20C5 21.1 5.9 22 7 22L17 22C18.1 22 19 21.1 19 20L19 7L5 7 z M 9.4101562 10L12 12.589844L14.589844 10L16 11.410156L13.410156 14L16 16.589844L14.589844 18L12 15.410156L9.4101562 18L8 16.589844L10.589844 14L8 11.410156L9.4101562 10 z"
                                        fill="#FFFFFF"/>
                                </svg>
                            </button> : <></>
                        }
                    </div>
                    <div className={styledCard.hoveredCard + ' ' + (fullCard ? styledCard.isHovered : '')}>
                        <div className={styledCard.hoveredCardItem}
                             style={{borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>
                            <div className={styledCard.hoveredCardItemTitle}>Release date:</div>
                            <div>{releaseDate}</div>
                        </div>
                        <div className={styledCard.hoveredCardItem}
                             style={{borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>
                            <div className={styledCard.hoveredCardItemTitle}>Genres:</div>
                            <div>
                                {
                                    genres?.map((genre, index) => {
                                        if (index === genres.length - 1) {
                                            return (
                                                <Link key={`platform_${index}`} href={"/genres/" + genre.slug}>
                                                    {genre.name}
                                                </Link>
                                            )
                                        }
                                        return (
                                            <>
                                                <Link key={`platform_${index}`} href={"/genres/" + genre.slug}>
                                                    {genre.name}
                                                </Link>,
                                                &nbsp;
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styledCard.hoveredCardItem}>
                            <div className={styledCard.hoveredCardItemTitle}>Rating:</div>
                            <div>{`${rat} / ${ratTop}`}</div>
                        </div>
                    </div>
                </div>
            </Link>
            <Toast ref={toastRef} position="top-right"/>
        </>
    )
}
