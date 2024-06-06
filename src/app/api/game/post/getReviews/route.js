import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Review from "@/models/Review.js";

export const POST = async (request) => {
	try {

		const {game_id} = await request.json();

		await connect();

		const result = await Review.find(
			{
				game_id: game_id,
			}
		);

		if (result) {
			return NextResponse.json({
				message: 'Reviews fetched Successfully',
				status: true,
				result: result,
			});
		} else {
			return NextResponse.json({
				message: 'Failed To fetch reviews',
				status: false,
				result: result,
			});
		}
	} catch (error) {
		console.error('Error creating or updating document:', error);
		return NextResponse.json({
			message: 'Failed to create or update document',
			status: false,
			error: error.message,
		});
	}
};
