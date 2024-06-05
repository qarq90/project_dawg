import styledNav from '@/styles/ui/nav.module.css'
import Link from "next/link";
import {usePathname} from "next/navigation.js";
import {profileTabs} from "@/lib/profileObj.js";

const Nav = () => {

	const currentPage = usePathname()

	return (
		<div className={styledNav.headerWrapper}>
			<div className={styledNav.headerItem}>
				<div className={styledNav.authBtnGroup}>
					{profileTabs.map((link, index) => (
						<Link
							key={index}
							href={link.href}
							className={link.href === currentPage ? styledNav.currentLink : ''}
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
export default Nav
