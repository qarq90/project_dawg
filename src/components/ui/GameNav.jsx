import styledNav from '@/styles/ui/nav.module.css'
import Link from "next/link";
import {usePathname} from "next/navigation.js";
import {gameTabs} from "@/lib/gameObj.js";
import {useAtom} from "jotai";
import {gameNameState} from "@/states/gameState.js";

export default function GameNav() {

    const currentPage = usePathname();

    const [gameName] = useAtom(gameNameState);

    const tabs = gameTabs(gameName);

    return (
        <div className={styledNav.headerWrapper}>
            <div className={styledNav.headerItem}>
                <div className={styledNav.authBtnGroup}>
                    {tabs.map((link, index) => (
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
    );
}
;
