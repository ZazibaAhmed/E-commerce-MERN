import {  
    CART_ADD_ITEM, //These can be considered actual actions
    CART_REMOVE_ITEM
} from '../constants/cartConstants'
import axios from 'axios'

// id and qty we'll get from URL
//getState allows us to get our entire state tree
export const addToCart = ( id, qty ) => async (dispatch, getState) => {
    //destructuring response.data
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    })
    //this is where we use out getState parameter which gives a JSON obj
    //Saving to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = ( id ) => async (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
     
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}
