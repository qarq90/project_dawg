'use client'

import styledSidebar from "@/styles/ui/sidebar.module.css"
import {sidebarBrowse, sidebarGenres, sidebarNewReleases, sidebarPlatforms, sidebarTop} from "@/lib/sidebarObj";
import Link from "next/link";
import {usePathname} from "next/navigation";

export const Sidebar = () => {

    const currentPage = usePathname()

    return (
        <div className={styledSidebar.sidebarContainer}>
            <ul className={styledSidebar.sidebarUL}>
                <Link className={styledSidebar.linkHeader} href="/">Home</Link>
            </ul>
            <ul className={styledSidebar.sidebarUL}>
                <Link className={styledSidebar.linkHeader} href="/">New Releases</Link>
                {
                    sidebarNewReleases.map((link, index) => (
                        <Link
                            className={link.path === currentPage ? styledSidebar.currentLink : styledSidebar.styledSidebarLink}
                            key={index}
                            href={link.path}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))
                }
            </ul>
            <ul className={styledSidebar.sidebarUL}>
                <h1 className={styledSidebar.linkHeader}>Top</h1>
                {
                    sidebarTop.map((link, index) => (
                        <Link
                            className={link.path === currentPage ? styledSidebar.currentLink : styledSidebar.styledSidebarLink}
                            key={index}
                            href={link.path}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))
                }
            </ul>
            <ul className={styledSidebar.sidebarUL}>
                <Link className={styledSidebar.linkHeader} href="/pages/allGames">All Games</Link>
            </ul>
            <ul className={styledSidebar.sidebarUL}>
                <h1 className={styledSidebar.linkHeader}>Browse</h1>
                {
                    sidebarBrowse.map((link, index) => (
                        <Link
                            className={link.path === currentPage ? styledSidebar.currentLink : styledSidebar.styledSidebarLink}
                            key={index}
                            href={link.path}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))
                }
            </ul>
            <ul className={styledSidebar.sidebarUL}>
                <h1 className={styledSidebar.linkHeader}>Platforms</h1>
                {
                    sidebarPlatforms.map((link, index) => (
                        <Link
                            className={link.path === currentPage ? styledSidebar.currentLink : styledSidebar.styledSidebarLink}
                            key={index}
                            href={link.path}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))
                }
            </ul>
            <ul className={styledSidebar.sidebarUL}>
                <h1 className={styledSidebar.linkHeader}>Genres</h1>
                {
                    sidebarGenres.map((link, index) => (
                        <Link
                            className={link.path === currentPage ? styledSidebar.currentLink : styledSidebar.styledSidebarLink}
                            key={index}
                            href={link.path}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}