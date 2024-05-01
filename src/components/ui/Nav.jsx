import styledNav from '@/styles/ui/nav.module.css'
import Link from "next/link";
import {useAtom} from "jotai";
import {currentUserName} from "@/states/userState.jsx";
import {usePathname, useRouter} from "next/navigation.js";
import {useState} from "react";

const Nav = () => {

    const [username, setUsername] = useAtom(currentUserName);

    const router = useRouter();

    const pathname = usePathname()
    const isAuth = pathname.includes("/auth/")

    const [searchedGame, setSearchedGame] = useState('')

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {

            let tag = searchedGame.toLowerCase().replace(/\s+/g, '-');
            router.push(`/game/about/${tag}`)
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
                                        {username.charAt(0).toUpperCase() + username.charAt(1).toUpperCase()}
                                    </p>
                                </Link>
                                <Link href='/pages/profile/profile'>LIBRARY</Link>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
export default Nav
