"use client"
import React, {useEffect} from 'react'
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter()
    const storageUserID = Cookies.get("storageUserID") || ""
    if (storageUserID) {
        Cookies.remove("storageUserID")
    }
    router.push("/auth/login")

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            fontSize: '1.5rem',
            fontWeight: 'bold',
        }}>
            Logging Out...
        </div>
    )
}
export default Page
