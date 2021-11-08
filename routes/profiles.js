import { Router } from 'express'
import * as profilesCtrl from "../controllers/profiles.js"

const router = Router()

router.post('/anime', isLoggedIn, profilesCtrl.addToWatchList)
router.post('/animeComplete', isLoggedIn, profilesCtrl.addToCompletedList)
router.get('/:id/anime', isLoggedIn, profilesCtrl.aniDex)




function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/google')
}

export {
  router
}
