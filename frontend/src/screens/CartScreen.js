import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, ListGroup, Image, Form} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

//location to get query string
//history to redirect
const CartScreen = ({match, location, history }) => {

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    // console.log(qty)

    const dispatch = useDispatch()

    const cart = useSelector( state => state.cart)
    const { cartItems } = cart
    // console.log(cartItems)
     
    //We only want to dispatch if there's a product id
    useEffect(() => {
        if(productId){
            dispatch( addToCart(productId, qty) )
        }
        else{

        }
    }, [dispatch, productId, qty])

    return (
        <div>
            Cart
        </div>
    )
}

export default CartScreen
