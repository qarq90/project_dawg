'use client'

import styledAuth from '@/styles/auth/auth.module.css'
import {useAtom} from "jotai"
import {currentUserEmail, currentUserName, currentUserPassword} from "@/states/userState.jsx"
import {useRouter} from "next/navigation.js"
import {emailRegex, showCustomToast} from "@/lib/helper.js"
import {useRef} from "react"
import {Toast} from "primereact/toast"

const Page = () => {

    const router = useRouter()

    const toastRef = useRef()

    const [username, setUsername] = useAtom(currentUserName)
    const [email, setEmail] = useAtom(currentUserEmail)
    const [password, setPassword] = useAtom(currentUserPassword)

    async function signupHandler(e) {

        e.preventDefault()

        if (email === "" || password === "" || username === "") {
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
            user_name: username,
        }

        try {
            const response = await fetch(`/api/auth/post/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            if (data.status) {

                router.push("/auth/login")

                console.log("acc created")

            } else {
                showCustomToast(
                    "error",
                    "Account Exists",
                    "You already have an account with this email address.",
                    "You already have an account with this email address.",
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
            <div className={styledAuth.authOverlay + ' ' + styledAuth.signup}>
            </div>
            <div className={styledAuth.authFormDiv}>
                <h2 className={styledAuth.authHeading}>Sign up</h2>
                <form id="signup-form" method="post">
                    <div className={styledAuth.inputOne}>
                        <input
                            className={styledAuth.inputField}
                            type="username"
                            placeholder="Username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}/>
                    </div>
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
                            placeholder="Create a Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                    </div>
                    <button
                        className={styledAuth.button + ' ' + styledAuth.buttonFill + ' ' + styledAuth.buttonMedium}
                        onClick={signupHandler}
                    >
                        Sign up
                    </button>
                </form>
                <div className={styledAuth.pageAdditional}>
                    <a
                        href="/auth/login"
                        rel="nofollow">
                        Already have an account? Login.
                    </a>
                </div>
            </div>
            <Toast ref={toastRef} position="top-right"/>
        </>
    )
}

export default Page