import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
content: String,
})


const animeSchema = new Schema({
  name: String,
  releaseDate: String,
  genre: String,
  comments: [commentSchema],

})


const profileSchema = new Schema({
  name: String,
  avatar: String,
  animeCompletedList: [animeSchema],
  animeWatchedList: [animeSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}