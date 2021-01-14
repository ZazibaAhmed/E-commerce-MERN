import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import axios from 'axios'


export const login = (email,password) => async (dispatch) => {
    try{

        dispatch({ type: USER_LOGIN_REQUEST })
        
        //Create a config obj, when we are sending data, we want to send a header of content type app/JSON 
        //This is where we'll also send the token for authorization
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        //Make our request
        const response = await axios.post(
            '/api/users/login',
            {email,password},
            config
        )

        dispatch({ 
            type: USER_LOGIN_SUCCESS,
            payload: response.data 
        })
        //Storing our user inf o inlocal storage //This will the user obj
        localStorage.setItem('userInfo', JSON.stringify(response.data))

    }
    catch(error){
        dispatch({ 
            type: USER_LOGIN_FAIL,                   
            payload:  error.response && error.response.data.message 
                ? error.response.data.message //custom message
                : error.message //generic message 
        })
    }

}

export const logout = () => async (dispatch) => {

    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    //When we log out those states should reset
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
  
}

export const register = ( name,email,password ) => async (dispatch) => {
    try{

        dispatch({ type: USER_REGISTER_REQUEST })
        
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        //Make our request
        const response = await axios.post(
            '/api/users',
            { name, email, password},
            config
        )

        dispatch({ 
            type: USER_REGISTER_SUCCESS,
            payload: response.data 
        })

        dispatch({ 
            type: USER_LOGIN_SUCCESS,
            payload: response.data 
        })

        //Storing our user inf o inlocal storage //This will the user obj
        localStorage.setItem('userInfo', JSON.stringify(response.data))

    }
    catch(error){
        dispatch({ 
            type: USER_REGISTER_FAIL,                   
            payload:  error.response && error.response.data.message 
                ? error.response.data.message //custom message
                : error.message //generic message 
        })
    }

}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try{

        dispatch({ type: USER_DETAILS_REQUEST })
        
        //Destructuring the user to get token in state, (destructuring 2 levels here)
        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //The id might be profile
        const response = await axios.get(
            `/api/users/${id}`, config
        )

        dispatch({ 
            type: USER_DETAILS_SUCCESS,
            payload: response.data 
        })

    }
    catch(error){
        dispatch({ 
            type: USER_DETAILS_FAIL,                   
            payload:  error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }

}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try{

        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
        
        //Destructuring the user to get token in state, (destructuring 2 levels here)
        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //The id might be profile
        const response = await axios.put(
            `/api/users/profile`, user, config
        )

        dispatch({ 
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: response.data 
        })

        dispatch({ 
            type: USER_LOGIN_SUCCESS,
            payload: response.data 
        })
        
        localStorage.setItem('userInfo', JSON.stringify(response.data))
    }
    catch(error){
        dispatch({ 
            type: USER_UPDATE_PROFILE_FAIL,                   
            payload:  error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }

}