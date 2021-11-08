import { Router } from 'express'
import * as profilesCtrl from "../controllers/profiles.js"

const router = Router()

router.post('/anime', isLoggedIn, profilesCtrl.addToWatchList)
// router.post('/anime', isLoggedIn, profilesCtrl.addToCompleted)


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/google')
}

export {
  router
}
