import mongoose from 'mongoose'
const Schema = mongoose.Schema

const commentSchema = new Schema({
content: String,
author: {type: Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true,
})


const animeSchema = new Schema({
  name: String,
  releaseDate: String,
  genre: String,
  comments: [commentSchema],
  images: {type: Schema.Types.ObjectId, ref: 'Anime'},
}, {
  timestamps: true,
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