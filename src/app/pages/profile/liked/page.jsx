'use client'

import ProfileTabGrid from "@/components/ui/ProfileTabGrid.jsx";
import {useRouter} from "next/navigation.js";
import {useEffect} from "react";
import Cookies from "js-cookie";

export default function ProfilePage() {

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
    const url = '/api/pages/post/profile/liked'
    return (
        <ProfileTabGrid url={url} type={"Liked Games"}/>
    )
}
