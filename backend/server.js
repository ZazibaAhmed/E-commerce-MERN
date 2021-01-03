import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler} from './middleware/errorMiddleware.js' 

dotenv.config() 

connectDB()

const app = express()

// app.use( (req, res, next) => {
//     console.log("Original URL: "+req.originalUrl);
//     next()
// })

app.get('/', (req, res) => {
    res.send("API is running...");
})

// Anything that goes to the link wil be linked to this route
app.use('/api/products', productRoutes)

// Handling error
app.use(notFound)
app.use(errorHandler)

const PORT= process.env.PORT || 5000

// Server Listens to Port
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));