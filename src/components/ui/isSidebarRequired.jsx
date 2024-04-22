import React from 'react'

import {usePathname} from "next/navigation";
import {Sidebar} from "@/components/ui/Sidebar";
import Nav from "@/components/ui/Nav";

const IsSidebarRequired = ({children}) => {
    const pathname = usePathname()
    const isAuth = pathname.includes("/auth/")
    return (
        <div className="layout">
            <Nav />
            {
                isAuth ? <></> : <Sidebar/>
            }
            {children}
        </div>
    )
}
export default IsSidebarRequired
