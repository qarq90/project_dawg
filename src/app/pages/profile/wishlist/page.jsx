'use client'

import styledGlobal from "@/styles/pages/global.module.css";
import {useAtom} from "jotai";
import {currentUserName} from "@/states/userState.jsx";
import styledProfile from '@/styles/pages/profile.module.css'
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation.js";
import ProfileNav from "@/components/ui/ProfileNav.jsx";
import CardGridPlatforms from "@/components/ui/CardGridPlatforms.jsx";

export default function ProfilePage() {

    const router = useRouter();

    const [username, setUsername] = useAtom(currentUserName);

    useEffect(() => {

        const autoLogin = async () => {
            const storageUserID = Cookies.get("storageUserID") || ""

            if (storageUserID === "") {
                router.push("/auth/login")
            } else {
                const request = {
                    _id: storageUserID,
                }

                try {
                    const response = await fetch(`/api/auth/post/fetchUser`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(request),
                    })

                    const data = await response.json()

                    if (data.status) {
                        setUsername(data.result.user_name)
                    }

                } catch (error) {
                    console.log(error)
                }
            }
        }
        autoLogin()
    }, [])

    return (
        <div className={styledGlobal.container}>
            <h1>{username}
                <p
                    className={styledProfile.userNameAccordian}>{username.charAt(0).toUpperCase() + username.charAt(1).toUpperCase()}
                </p>
            </h1>
            <ProfileNav/>
            <CardGridPlatforms
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&platforms=18'}
            />
        </div>
    );
}