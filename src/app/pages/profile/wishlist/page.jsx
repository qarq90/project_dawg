'use client'

import ProfileTabGrid from "@/components/ui/ProfileTabGrid.jsx";

export default function WishlistPage() {
    const url = '/api/pages/post/profile/wishlist'
    return (
        <ProfileTabGrid url={url} type={"Wishlist"}/>
    )
}