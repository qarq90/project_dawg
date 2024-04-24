'use client'

import styledAuth from '@/styles/auth/auth.module.css'
import {useEffect, useRef} from "react";
import {useAtom} from "jotai";
import {currentUserEmail, currentUserPassword} from "@/states/userState.jsx";
import {useRouter} from "next/navigation.js";
import {emailRegex, showCustomToast} from "@/lib/helper.js";
import Cookies from "js-cookie";
import {Toast} from "primereact/toast";

const Page = () => {

    const router = useRouter();

    const toastRef = useRef()

    const [email, setEmail] = useAtom(currentUserEmail)
    const [password, setPassword] = useAtom(currentUserPassword)



    useEffect(() => {

        const storageUserID = Cookies.get("storageUserID") || "";

        if (storageUserID === "") {

            router.push("/auth/login")

        }

    }, []);

    async function loginHandler(e) {

        e.preventDefault();

        if (email === "" || password === "") {
            showCustomToast(
                "error",
                "Empty Fields",
                "Please fill in all required fields.",
                "Please fill in all required fields.",
                toastRef,
                2000
            )
            return
        }

        if (!emailRegex.test(email)) {
            showCustomToast(
                "error",
                "Invalid Email Format",
                "Please enter a valid email address.",
                "Valid email address format is yourname@example.com.",
                toastRef,
                2000
            )
            return
        }

        const request = {
            email_id: email,
            password: password,
        }

        try {

            const response = await fetch(`/api/auth/post/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            if (data.status) {

                setEmail(data.result.email_id)
                setPassword(data.result.password)

                const userId = data.result._id;
                Cookies.set("storageUserID", userId);

                router.push("/")

            } else {
                showCustomToast(
                    "error",
                    "Incorrect Credentials",
                    "Email and Password are Incorrect.",
                    "Email and Password are Incorrect.",
                    toastRef,
                    2000
                )
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div className={styledAuth.authOverlay + ' ' + styledAuth.login}>
            </div>
            <div className={styledAuth.authFormDiv}>
                <h2 className={styledAuth.authHeading}>Log in</h2>
                <form id="login-form" method="post">
                    <div className={styledAuth.inputOne}>
                        <input
                            className={styledAuth.inputField}
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}/>
                    </div>
                    <div className={styledAuth.inputTwo}>
                        <input
                            className={styledAuth.inputField}
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                    </div>
                    <button
                        className={styledAuth.button + ' ' + styledAuth.buttonFill + ' ' + styledAuth.buttonMedium}
                        onClick={loginHandler}
                    >
                        Log in
                    </button>
                </form>
                <div className={styledAuth.pageAdditional}>
                    <a
                        href="/auth/signup"
                        rel="nofollow">
                        Don&#39;t have an account? Sign up.
                    </a>
                </div>
            </div>
            <Toast ref={toastRef} position="top-right"/>
        </>
    )
}

export default Page