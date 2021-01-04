import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL 
} from '../constants/productConstants'
//This file will handle the state for products 

// A reducer takes in 2 things, the initial state ena dan action
// We will dispatch an action to this Reducer
// The 2nd action parameter is an object that has a type, and might also contain payload
// Payload - data we get
export const productListReducer =  ( state = { products: [] }, action ) => {
    //loading,products and error
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            //Loading true cause it's currently fetching
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            // done loading so set it to false
            // product will be filled with that action object
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            // error will be sent in payload
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productDetailsReducer =  ( state = { product: { reviews: [] } }, action ) => {
    //loading, product and error
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            //Add whatever is in the state
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            // done loading so set it to false
            // product will be filled with that action object
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            // error will be sent in payload
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}