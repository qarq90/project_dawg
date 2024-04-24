import mongoose from 'mongoose'

const {Schema} = mongoose

const reviewSchema = new Schema({
    user_name: String,
    wishlisted_games: [],
    liked_games: [],
    owned_games: [],
})

let Games

try {
    Games = mongoose.model('Games')
} catch (e) {
    Games = mongoose.model('Games', reviewSchema)
}

export default Games