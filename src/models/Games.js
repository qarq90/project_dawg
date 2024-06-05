import mongoose from 'mongoose'

const {Schema} = mongoose

const reviewSchema = new Schema({
	email_id: String,
	wishlisted_games: [
		{
			game_id: String,
			game_name: String
		},
	],
	liked_games: [
		{
			game_id: String,
			game_name: String
		},
	],
	owned_games: [
		{
			game_id: String,
			game_name: String
		},
	],
});

let Games

try {
	Games = mongoose.model('Games')
} catch (e) {
	Games = mongoose.model('Games', reviewSchema)
}

export default Games
