'use client'

import styledGlobal from "@/styles/pages/global.module.css";
import CardGridX from "@/components/ui/CardGridX.jsx";
import {useRouter} from "next/navigation.js";
import {useEffect} from "react";
import Cookies from "js-cookie";

export default function Platforms() {
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
            <h1>Platforms</h1>
            <CardGridX
                url={'https://api.rawg.io/api/platforms?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}