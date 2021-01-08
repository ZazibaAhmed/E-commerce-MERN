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

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
// For Login
const registerUser = asyncHandler( async (req, res) => {
    //destructuring th email and password from body
    const { name, email, password } = req.body
    
    const userExists = await User.findOne({ email: email })

    if(userExists){
        res.status(404)
        throw new Error('User already exists')
    }
    // .create is syntactic sugar for the save method
    const user = await User.create({ 
        name,
        email,
        password 
    })
    if(user){
        // status 201 means sth was CREATED
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) // We want to authenticate right after we register
        })
    }
    else{
        res.status(404)
        throw new Error('Invalid user data')
    }
   
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserprofile = asyncHandler( async (req, res) => {
    //current logged in user
    //After creating the middleware
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

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserprofile = asyncHandler( async (req, res) => {
    //current logged in user
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name //in case name in req body is empty
        user.email = req.body.email || user.email
        // Using the middleware in the Model, passowrd is encrypted before being saved
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})


export { authUser, registerUser, getUserprofile, updateUserprofile }