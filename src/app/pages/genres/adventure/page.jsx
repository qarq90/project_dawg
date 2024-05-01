'use client'

import styledGlobal from "@/styles/pages/global.module.css"
import CardGridGenres from "@/components/ui/CardGridGenres";
import {useRouter} from "next/navigation.js";
import {useEffect} from "react";
import Cookies from "js-cookie";

export default function Adventure() {
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
            <h1>Adventure</h1>
            <CardGridGenres
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&genres=3'}
            />
        </div>
    )
}