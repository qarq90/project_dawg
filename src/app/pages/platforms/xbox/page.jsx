'use client'

import styledGlobal from "@/styles/pages/global.module.css"
import CardGridPlatforms from "@/components/ui/CardGridPlatforms";
import {useRouter} from "next/navigation.js";
import {useEffect} from "react";
import Cookies from "js-cookie";

export default function XBox() {
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
            <h1>XBox</h1>
            <CardGridPlatforms
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&platforms=1'}
            />
        </div>
    )
}