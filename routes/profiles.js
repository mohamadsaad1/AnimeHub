import { Router } from 'express'
import * as profilesCtrl from "../controllers/profiles.js"

const router = Router()

router.post('/anime', isLoggedIn, profilesCtrl.addToWatchList)
router.post('/animeComplete', isLoggedIn, profilesCtrl.addToCompletedList)
router.get('/:id/anime', isLoggedIn, profilesCtrl.aniDex)

router.delete("/:profileId/anime/:animeId", isLoggedIn, profilesCtrl.delete)

router.delete("/:profileId/animeComplete/:animeId", isLoggedIn, profilesCtrl.deleteFromCompletedList)
router.get("/:profileId/anime/:animeId", isLoggedIn, profilesCtrl.showAnime)

router.post("/:profileId/anime/:animeId", isLoggedIn, profilesCtrl.createComment)


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/google')
}

export {
  router
}
