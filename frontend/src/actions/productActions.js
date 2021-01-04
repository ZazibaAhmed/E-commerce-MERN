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
//Disptach the actions to reducers
//Previously we were fetcing directly from components, now we make requests in actions


//This is wehere Redux THUNK comes in. Allows us to add a function within a function
export const listProducts = () => async (dispatch) => {
    try{
        //Will call the reducer in the reducer file
        //This calls the reducer which sets loeading to true
        dispatch({ type: PRODUCT_LIST_REQUEST })

        //Make our request
        const response = await axios.get('/api/products')

        //^ If this fails it will fire off in the catch block 
        // otherwise it will go down to dispatch 
        
        //After we get our successful response
        //Sending the response data as payload
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
            ? error.response.data.message //custom message
            : error.message //generic message 
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