import mongoose from 'mongoose'
const Schema = mongoose.Schema

const commentSchema = new Schema({
content: String,
owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true,
})


const animeSchema = new Schema({
  name: String,
  airing: Boolean,
  synopsis: String,
  type: String,
  episodes: Number,
  score: Number,
  start_date: String,
  end_date: Number,
  rated: String,
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
  Profile,
}