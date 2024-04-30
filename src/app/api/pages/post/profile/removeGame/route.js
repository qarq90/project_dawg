import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Games from "@/models/Games.js";

export const POST = async (request) => {
    try {
        const {email_id, game_id, removeFrom} = await request.json();

        await connect();

        const userGames = await Games.findOne({email_id});

        if (!userGames) {
            return NextResponse.json({
                message: 'User not found or has no games',
                status: false,
                result: []
            });
        } else {
            const oldList = userGames[removeFrom];

            const updatedList = oldList.filter((game) => game.game_id !== game_id);

            const updateFields = {
                [removeFrom]: updatedList
            };

            const updatedUserGames = await Games.findOneAndUpdate(
                {email_id},
                updateFields,
                {new: true}
            );

            if (updatedUserGames) {
                return NextResponse.json({
                    message: `Game removed successfully from ${removeFrom}`,
                    status: true,
                    result: updatedUserGames
                });
            } else {
                return NextResponse.json({
                    message: `Failed to remove game from ${removeFrom}`,
                    status: false,
                    result: [],
                });
            }
        }

    } catch (error) {
        console.error('Error removing game:', error);
        return NextResponse.json({
            message: 'Failed to remove game',
            status: false,
            error: error.message,
        });
    }
};
