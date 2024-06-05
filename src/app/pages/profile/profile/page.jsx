'use client'

import {useEffect, useRef, useState} from "react";
import styledGlobal from "@/styles/pages/global.module.css";
import styledProfile from "@/styles/pages/profile.module.css";
import {useRouter} from "next/navigation.js";
import {Toast} from "primereact/toast";
import {showCustomToast} from "@/lib/helper.js";
import ProfileNav from "@/components/ui/ProfileNav.jsx";
import Cookies from "js-cookie";
import {FaKey, FaMailBulk, FaUser} from "react-icons/fa";
import useUserStore from "@/userStore/userStore.js";

export default function ProfilePage() {

	const router = useRouter();
	const toastRef = useRef();

	const {userEmail, userPassword, userName, setUserEmail, setUserPassword, setUserName} = useUserStore()

	const [inputUsername, setInputUsername] = useState(userName);
	const [inputPassword, setInputPassword] = useState(userPassword);

	const [showPassword, setShowPassword] = useState(false);

	const topUserName = userName;

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
						setUserEmail(data.result.email_id);
						setUserPassword(data.result.password);
						setUserName(data.result.user_name);
						setInputUsername(data.result.user_name);
						setInputPassword(data.result.password);
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

		if (inputPassword === "" || inputUsername === "") {

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
			email_id: userEmail,
			password: inputPassword,
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

				setUserName(inputUsername);
				setUserPassword(inputPassword);

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
				{topUserName}
				<p className={styledProfile.userNameAccordian}>
					{userName.charAt(0).toUpperCase() + userName.charAt(1).toUpperCase()}
				</p>
			</h1>
			<ProfileNav/>
			<div className={styledProfile.formContainer}>
				<form action="">
					<p className={styledProfile.formLabel}><FaMailBulk/> Email</p>
					<input
						className={styledProfile.formInput}
						value={userEmail}
						type="text"
						disabled
					/>
					<p className={styledProfile.formLabel}><FaUser/> Username</p>
					<input
						className={styledProfile.formInput}
						value={inputUsername}
						type="text"
						onChange={(e) => setInputUsername(e.target.value)}
					/>
					<p className={styledProfile.formLabel}><FaKey/> Password</p>
					<input
						onFocus={() => setShowPassword(true)}
						onBlur={() => setShowPassword(false)}
						className={styledProfile.formInput}
						value={showPassword ? inputPassword : '**************'}
						type="text"
						onChange={(e) => setInputPassword(e.target.value)}
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
