import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Review from "@/models/Review.js";

export const POST = async (request) => {
	try {
		const {game_id, author_name, author_email, review_string} = await request.json();

		await connect();

		const result = await Review.create({
			game_id: game_id,
			author_name: author_name,
			author_email: author_email,
			review_string: review_string,
		});

		if (result) {
			return NextResponse.json({
				message: 'Review Created Successfully',
				status: true,
				result: result,
			});
		} else {
			return NextResponse.json({
				message: 'Failed To Create a addReview',
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
