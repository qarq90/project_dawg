import React from 'react'

import {usePathname} from "next/navigation";
import {Sidebar} from "@/components/ui/Sidebar";
import Nav from "@/components/ui/Nav";

const IsSidebarRequired = () => {
    const pathname = usePathname()
    const isAuth = pathname.includes("/auth/")
    return (
        <>
            <Nav />
            {
                isAuth ? <></> : <Sidebar/>
            }
        </>
    )
}
export default IsSidebarRequired
