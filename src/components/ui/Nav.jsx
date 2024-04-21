import s from '@/styles/ui/nav.module.css'
import Link from "next/link";

const Nav = () => {
    return (
        <div className={s.headerWrapper}>
            <div className={s.headerItem}>
                <Link href="/"><h1>DAWG</h1></Link>
            </div>
            <div className={s.headerItem}>
                <div className={s.searchArea}>
                    <input type="search" placeholder="Search games"/>
                </div>
            </div>
            <div className={s.headerItem}>
                <div className={s.authBtnGroup}>
                    <Link href="/auth/login">LOG IN</Link>
                    <Link href="/auth/signup">SIGN UP</Link>
                </div>
            </div>
        </div>
    )
}
export default Nav
