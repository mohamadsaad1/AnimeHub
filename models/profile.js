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
  rated: Number,
  comments: [commentSchema],
  imageUrl: String,
}, {
  timestamps: true,
})


const profileSchema = new Schema({
  name: String,
  avatar: String,
  animeWatchList: [animeSchema],
  animeCompletedList: [animeSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}