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
  start_date: String,
  genre: String,
  comments: [commentSchema],
  imageUrl: String,
}, {
  timestamps: true,
})


const profileSchema = new Schema({
  name: String,
  avatar: String,
  animeCompletedList: [animeSchema],
  animeWatchList: [animeSchema],
  anime: [animeSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}