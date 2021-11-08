import { Profile } from "../models/profile.js"

function addToWatchList(req, res) {
  // Find the profile
  Profile.findById(req.user.profile._id)
  .then(profile => {
    // Push the anime data (req.body) into anime Schema
    profile.animeWatchedList.push(req.body)
    profile.save()
    .then(()=> {
      res.redirect('/')
    })
  })
}

export{
  addToWatchList
}