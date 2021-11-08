import { Profile } from "../models/profile.js"

function addToWatchList(req, res) {
  // Find the profile
  Profile.findById(req.user.profile._id)
  .then(profile => {
    // Push the anime data (req.body) into anime Schema
    profile.animeWatchList.push(req.body)
    profile.save()
    .then(()=> {
      res.redirect('/')
    })
  })
}
function addToCompletedList(req, res) {
  // Find the profile
  Profile.findById(req.user.profile._id)
  .then(profile => {
    // Push the anime data (req.body) into anime Schema
    profile.animeCompletedList.push(req.body)
    profile.save()
    .then(()=> {
      res.redirect('/')
    })
  })
}

function aniDex(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profiles/aniDex', {
      title: `${profile.name}'s aniDex`,
      user: req.user,
      profile
    })
  })
}


export{
  addToCompletedList,
  addToWatchList,
  aniDex,
}