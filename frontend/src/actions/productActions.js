import { 
    PRODUCT_LIST_REQUEST, //These can be considered actual actions
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'
import axios from 'axios'

//These functions can be considered action creators
//Disptach to dispatch the actions
export const listProducts = () => async (dispatch) => {
    try{
        //Will call the reducer in the reducer file
        dispatch({ type: PRODUCT_LIST_REQUEST })

        //Make our request
        const response = await axios.get('/api/products')
        
        //After we get our successful response
        dispatch({ 
            type: PRODUCT_LIST_SUCCESS,
            payload: response.data 
        })

    }
    catch(error){
        //When something goes wrong
        //We are getting out backend errors in front end states
        dispatch({ 
            type: PRODUCT_LIST_FAIL,
            payload:  error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        })
    }

}

export const listProductDetails = (id) => async (dispatch) => {
    try{
        //Will call the reducer in the reducer file
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        //Make our request
        const response = await axios.get(`/api/products/${id}`)
        
        //After we get our successful response
        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS,
            payload: response.data 
        })

    }
    catch(error){
        //When something goes wrong
        //We are getting out backend errors in front end states
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL,
            payload:  error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        })
    }

}