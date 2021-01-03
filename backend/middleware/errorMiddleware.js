// Custom Error handling using middleware
// Overriding the default error handler
const notFound = (req,res,next ) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = ( err,req,res,next ) => {
    // Sometimes we get a 200 status even though there is an error
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler} 