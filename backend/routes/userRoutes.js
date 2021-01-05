import express from 'express'
import { authUser, getUserprofile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/login', authUser)
//To implement middleware we put protect as first argument 
router.route('/profile').get(protect, getUserprofile)

export default router;