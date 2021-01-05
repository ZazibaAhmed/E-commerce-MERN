import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from '../constants/userConstants'
import axios from 'axios'


export const login = (email,password) => async (dispatch) => {
    try{

        dispatch({ type: USER_LOGIN_REQUEST })
        
        //Create a config obj, when we are sending data, we want to send a header of content type app/JSON 
        //This is where we'll also send th token for authorization
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