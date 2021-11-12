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
  .populate('animeWatchList.comments.owner')
  .then (profile =>{
    console.log(profile)
  const anime = profile.animeWatchList.find(anim => anim._id.equals (req.params.animeId))
  console.log("heeloooooooooooooooooo", anime)
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

function showCompletedAnime(req, res) {
  Profile.findById(req.params.profileId)
  .populate('animeCompletedList.comments.owner')
  .then (profile =>{
  const anime = profile.animeCompletedList.find(anim => anim._id.equals (req.params.animeId))
  let sum = 0
  console.log(anime.comments)
  anime.comments.forEach(comment => {
    sum += comment.rating
  })
    const averageCommentScore = sum / anime.comments.length
      res.render('profiles/showCompletedAnime', {
        anime,
        title : "title",
        profile,
        averageCommentScore
    })
  })
}





function createComment(req, res) {
  req.body.owner= req.user.profile._id
  Profile.findById(req.params.profileId)
  .then(profile => {
    const anime = profile.animeWatchList.id(req.params.animeId)
    anime.comments.push(req.body)
      profile.save()
      res.redirect(`/profiles/${req.params.profileId}/anime/${req.params.animeId}`)
    })
  .catch(err => {
    console.log(err)
      res.redirect(`/profiles/${req.params.profileId}/anime`)
  })
}

function deleteComment(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const anime = profile.animeWatchList.id(req.params.animeId)
    anime.comments.remove({_id: req.params.commentId})
      profile.save()
      .then(() => {
      res.redirect(`/profiles/${req.params.profileId}/anime/${req.params.animeId}`)
    })
  })
  .catch(err => {
    console.log(err)
      res.redirect(`/profiles/${req.params.profileId}/anime`)
  })
}


function create(req, res) {
  req.body.owner= req.user.profile._id
  Profile.findById(req.params.profileId)
  .then(profile => {
    const anime = profile.animeCompletedList.id(req.params.animeId)
    anime.comments.push(req.body)
    profile.save()
    res.redirect(`/profiles/${req.params.profileId}/animeComplete/${req.params.animeId}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.params.profileId}/anime`)
  })
}

function deleteCompletedComment(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const anime = profile.animeCompletedList.id(req.params.animeId)
    anime.comments.remove({_id: req.params.commentId})
        profile.save()
        .then(() => {
        res.redirect(`/profiles/${req.params.profileId}/animeComplete/${req.params.animeId}`)
        })
  })
  .catch(err => {
    console.log(err)
      res.redirect(`/profiles/${req.params.profileId}/anime`)
  })
}


function aniDex(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profiles/aniDex', {
      title: `${profile.name}'s aniDex`,
      user: req.user,
      profile,
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


function index (req, res) {
  console.log ("PROFFILLLEESSSS 😍😍😍😍😍😍😍😍😍😍😍😍")
  Profile.find({})
  .then(profiles => {
    res.render("profiles/index", {
      profiles,
      title: "profiles"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}


function backToMain(req, res) {
{res.redirect(`/`)}
}



export{
  addToCompletedList,
  addToWatchList,
  aniDex,
  deleteFromWatchList as delete,
  deleteFromCompletedList,
  showAnime,
  createComment,
  showCompletedAnime,
  create,
  deleteComment,
  deleteCompletedComment,
  index,
  backToMain,
}