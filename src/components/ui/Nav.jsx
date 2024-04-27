import styledNav from '@/styles/ui/nav.module.css'
import Link from "next/link";
import {useAtom} from "jotai";
import {currentUserName} from "@/states/userState.jsx";
import {usePathname} from "next/navigation.js";

const Nav = () => {

    const [username, setUsername] = useAtom(currentUserName);

    const pathname = usePathname()
    const isAuth = pathname.includes("/auth/")

    return (
        <div className={styledNav.headerWrapper}>
            <div className={styledNav.headerItem}>
                <Link href="/"><h1>DAWG</h1></Link>
            </div>
            <div className={styledNav.headerItem}>
                <div className={styledNav.searchArea}>
                    <input type="search" placeholder="Search games"/>
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
