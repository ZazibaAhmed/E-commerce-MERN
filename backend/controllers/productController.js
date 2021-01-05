import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc  Fetch all products
// @route GET api/products
// @access  Public
const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({})
    // throw new Error("Some Error")
    res.json(products);
})


// @desc  Fetch a prooduct
// @route GET api/products/:/id
// @access  Public
const getProductById = asyncHandler( async (req, res) => {
    // const product = products.find( p => p._id === req.params.id)
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }
    else{
        // res.status(404).json({ message : 'Product not found'}) //OLD WAY

        // This will go through our new custom error handler
        res.status(404)
        throw new Error('Product not found') 
    }
})

export { getProducts, getProductById }