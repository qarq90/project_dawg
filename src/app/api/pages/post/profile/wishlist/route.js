import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Games from "@/models/Games.js";

export const POST = async (request) => {
    try {
        const {email_id} = await request.json();

        await connect();

        const wishlistGames = await Games.findOne({email_id: email_id});

        if (wishlistGames) {
            console.log("User games found:", wishlistGames);

            return NextResponse.json({
                message: 'User Games Retrieved Successfully',
                status: true,
                result: wishlistGames.wishlisted_games,
            });
        } else {
            return NextResponse.json({
                message: 'User not found or has no games',
                status: false,
                result: [],
            });
        }
    } catch (error) {
        console.error('Error retrieving user games:', error);
        return NextResponse.json({
            message: 'Failed to retrieve user games',
            status: false,
            error: error.message,
        });
    }
};
