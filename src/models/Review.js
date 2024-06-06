import mongoose from 'mongoose'

const {Schema} = mongoose

const reviewSchema = new Schema({
		author_name: String,
		author_email: String,
		review_string: String,
		game_id: Number,
	})
;

let Reviews

try {
	Reviews = mongoose.model('Reviews')
} catch (e) {
	Reviews = mongoose.model('Reviews', reviewSchema)
}

export default Reviews
