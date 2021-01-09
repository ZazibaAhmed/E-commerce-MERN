import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    }
    else{
        const order = new Order({
            orderItems,
            user: req.user._id, //this is Logged in user.Since protected route, we'll get token and get user id from token
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          })
        
        //Saving the order we just instantiated and saving it
        const createdOrder = await order.save()

        //status 201 - sth was created
        res.status(201).json(createdOrder)
    }
})

export { addOrderItems }