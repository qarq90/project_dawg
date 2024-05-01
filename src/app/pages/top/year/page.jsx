'use client'

import styledGlobal from "@/styles/pages/global.module.css"
import CardGrid from "@/components/ui/CardGrid.jsx";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

export default function Year() {
    const router = useRouter()

    useEffect(() => {
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
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&dates=2024-01-01,2024-12-31&ordering=-rating,-metacritic'}
            />
        </div>
    )
}