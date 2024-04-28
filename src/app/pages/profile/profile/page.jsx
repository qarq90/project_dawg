'use client'

import {useEffect, useRef, useState} from "react";
import styledGlobal from "@/styles/pages/global.module.css";
import styledProfile from "@/styles/pages/profile.module.css";
import {atom, useAtom} from "jotai";
import {currentUserEmail, currentUserName, currentUserPassword,} from "@/states/userState.jsx";
import {useRouter} from "next/navigation.js";
import {Toast} from "primereact/toast";
import {showCustomToast} from "@/lib/helper.js";
import ProfileNav from "@/components/ui/ProfileNav.jsx";
import Cookies from "js-cookie";
import {FaKey, FaMailBulk, FaUser} from "react-icons/fa";

const topUsername = atom(currentUserName)

export default function ProfilePage() {

    const router = useRouter();
    const toastRef = useRef();

    const [username, setUsername] = useAtom(currentUserName);
    const [email, setEmail] = useAtom(currentUserEmail);
    const [password, setPassword] = useAtom(currentUserPassword);

    const [inputUsername, setInputUsername] = useState(username);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const autoLogin = async () => {
            const storageUserID = Cookies.get("storageUserID") || "";

            if (storageUserID === "") {
                router.push("/auth/login");
            } else {
                const request = {
                    _id: storageUserID,
                };

                try {
                    const response = await fetch(`/api/auth/post/fetchUser`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(request),
                    });

                    const data = await response.json();

                    if (data.status) {
                        setUsername(data.result.user_name);
                        setEmail(data.result.email_id);
                        setPassword(data.result.password);
                        setInputUsername(data.result.user_name);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        autoLogin();
    }, []);

    const editHandler = async (e) => {

        e.preventDefault();

        if (password === "" || inputUsername === "") {

            showCustomToast(
                "error",
                "Empty Fields",
                "Please fill in all required fields.",
                "Please fill in all required fields.",
                toastRef,
                2000
            );
            return;
        }

        const request = {
            email_id: email,
            password: password,
            user_name: inputUsername,
        };

        try {
            const response = await fetch(`/api/pages/post/profile/update`, {
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
                    "Account Updated",
                    "Account Details Updated Successfully.",
                    "Account Details Updated Successfully.",
                    toastRef,
                    2000
                );

                setUsername(inputUsername);
                setPassword(password);

            } else {

                showCustomToast(
                    "failed",
                    "Failed",
                    data.message,
                    data.message,
                    toastRef,
                    2000
                );

            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styledGlobal.container}>
            <h1>
                {username}
                <p className={styledProfile.userNameAccordian}>
                    {username.charAt(0).toUpperCase() + username.charAt(1).toUpperCase()}
                </p>
            </h1>
            <ProfileNav/>
            <div className={styledProfile.formContainer}>
                <form action="">
                    <p className={styledProfile.formLabel}><FaMailBulk/> Email</p>
                    <input
                        className={styledProfile.formInput}
                        value={email}
                        type="text"
                        disabled
                    />
                    <p className={styledProfile.formLabel}><FaUser/> Username</p>
                    <input
                        className={styledProfile.formInput}
                        value={inputUsername}
                        type="text"
                        onChange={(e) => setInputUsername(e.target.value)} // Update inputUsername state
                    />
                    <p className={styledProfile.formLabel}><FaKey/> Password</p>
                    <input
                        onFocus={() => setShowPassword(true)}
                        onBlur={() => setShowPassword(false)}
                        className={styledProfile.formInput}
                        value={showPassword ? password : '*********'}
                        type="text"
                        onChange={(e) => setPassword(e.target.value)} // Update inputPassword state
                    />
                    <button
                        className={
                            styledProfile.button +
                            " " +
                            styledProfile.buttonFill +
                            " " +
                            styledProfile.buttonMedium
                        }
                        onClick={editHandler}
                    >
                        Save Changes
                    </button>
                </form>
            </div>
            <Toast ref={toastRef} position="top-right"/>
        </div>
    );
}
