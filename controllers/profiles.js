import { Profile } from "../models/profile.js"


function addToWatchList(req, res) {
  console.log(req.body)
  // Find the profile
  Profile.findById(req.user.profile._id)
  .then(profile => {
    // Push the anime data (req.body) into anime Schema
    profile.animeWatchList.push(req.body)
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.user.profile._id}/anime`)
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
      res.redirect(`/profiles/${req.user.profile._id}/anime`)
    })
  })
}

function showAnime(req, res) {
  Profile.findById(req.params.profileId)
  .then (profile =>{
  const anime = profile.animeWatchList.find(anim => anim._id.equals (req.params.animeId))
  let sum = 0
  anime.comments.forEach(comment => {
    sum += comment.rating
  })
  console.log(anime)
    const averageCommentScore = sum / anime.comments.length
      res.render('profiles/showAnime', {
            anime,
            title : "title",
            profile,
            averageCommentScore
        })

  })
}


function createComment(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const anime = profile.animeWatchList.id(req.params.animeId)
    anime.comments.push(req.body)
        profile.save()
        res.redirect(`/profiles/${req.user.profile._id}/anime/${req.params.animeId}`)
  })
  .catch(err => {
    console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}/anime`)
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

function deleteFromWatchList(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.animeWatchList.remove({_id:req.params.animeId})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}/anime`)
    })
  })
}


function deleteFromCompletedList(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.animeCompletedList.remove({_id:req.params.animeId})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}/anime`)
    })
  })
}



export{
  addToCompletedList,
  addToWatchList,
  aniDex,
  deleteFromWatchList as delete,
  deleteFromCompletedList,
  showAnime,
  createComment
}