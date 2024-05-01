'use client'

import ProfileTabGrid from "@/components/ui/ProfileTabGrid.jsx";

export default function ProfilePage() {
    const url = '/api/pages/post/profile/liked'
    return (
        <ProfileTabGrid url={url} type={"Liked Games"}/>
    )
}