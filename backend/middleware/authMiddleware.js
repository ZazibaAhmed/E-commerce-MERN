import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//If you dont use asyncHandler the request hangs
const protect = asyncHandler(async (req, res, next) => {
    let token
    // console.log(req.headers.authorization)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1] //splitting the bearer from the code
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        
        //We'll fetch the user                   //Select everything but password
        req.user = await User.findById(decoded.id).select('-password')
  
        next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
})



export { protect }