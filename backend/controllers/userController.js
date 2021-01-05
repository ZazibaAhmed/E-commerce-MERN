import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
// For Login
const authUser = asyncHandler( async (req, res) => {
    //destructuring th email and password from body
    const { email, password } = req.body
    
    //We're finding an email that matches the email from req body
    // const user = await User.findOne({ email })  //CAN ALSO BE WRITTEN LIKE THIS SINCE THEY'RE SAME
    const user = await User.findOne({ email: email })
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(404)
        throw new Error('Invalid email or password')
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserprofile = asyncHandler( async (req, res) => {
    //current logged in user
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

export { authUser, getUserprofile }