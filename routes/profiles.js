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


router.get("/:profileId/animeComplete/:animeId", isLoggedIn, profilesCtrl.showCompletedAnime)
router.post("/:profileId/animeComplete/:animeId", isLoggedIn, profilesCtrl.create)


router.delete("/:profileId/anime/:animeId/:commentId", isLoggedIn, profilesCtrl.deleteComment)
router.delete("/:profileId/animeComplete/:animeId/:commentId", isLoggedIn, profilesCtrl.deleteCompletedComment)




router.get("/", isLoggedIn, profilesCtrl.index)
router.get("/", isLoggedIn, profilesCtrl.backToMain)


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/google')
}

export {
  router
}
