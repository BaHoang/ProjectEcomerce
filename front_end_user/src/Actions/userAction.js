import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,

    LOGOUT,
} from "../Constants/userConstant"

import axios from 'axios'

export const userLogin = (email, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const dataLogin = { email, password }

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
     
        const { data } = await axios.post(`http://localhost:5000/api/user/login`, dataLogin, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfor', JSON.stringify(data))
    } catch (error) {
        
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.message ? error.response.status : error.response,
        })
    }
}

export const userLogout = () => async (dispatch) => {
    dispatch({ type: LOGOUT })
    localStorage.removeItem('userInfor')
}




