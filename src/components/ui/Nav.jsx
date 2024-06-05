import styledNav from '@/styles/ui/nav.module.css'
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation.js";
import {useState} from "react";
import useUserStore from "@/userStore/userStore.js";
import useGameStore from "@/userStore/gameStore.js";

const Nav = () => {

	const router = useRouter();

	const pathname = usePathname()
	const isAuth = pathname.includes("/auth/")

	const [searchedGame, setSearchedGame] = useState('')

	const {userName} = useUserStore()
	const {setGameName} = useGameStore()

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			let tag = searchedGame.toLowerCase().replace(/\s+/g, '-');
			setGameName(tag)
			router.push(`/search/${tag}`)
		}
	}

	return (
		<div className={styledNav.headerWrapper}>
			<div className={styledNav.headerItem}>
				<Link href="/"><h1>DAWG</h1></Link>
			</div>
			<div className={styledNav.headerItem}>
				<div className={styledNav.searchArea}>
					<input
						type="search"
						placeholder="Search games"
						value={searchedGame}
						onChange={(e) => setSearchedGame(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>
			<div className={styledNav.headerItem}>
				<div className={styledNav.authBtnGroup}>
					{
						isAuth ?
							<>
								<Link href='/auth/login'>LOGIN</Link>
								<Link href='/auth/signup'>SIGN UP</Link>
							</> :
							<>
								<Link
									className={styledNav.userNameAccordian}
									href='/pages/profile/profile'
								>
									<p>
										{userName.charAt(0).toUpperCase() + userName.charAt(1).toUpperCase()}
									</p>
								</Link>
								<Link href='/auth/logout'>LOG OUT</Link>
							</>
					}
				</div>
			</div>
		</div>
	)
}
export default Nav
