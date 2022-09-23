import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../Constants/userConstant"
import axios from 'axios'

export const userLogin = (email, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const dataLogin = { email, password }

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`https://telephone-shop.herokuapp.com/api/user/login`, dataLogin, config)

        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        })
        
        localStorage.setItem('userInfor', JSON.stringify(getState().user.userInfor))
    } catch (error) {
        console.log(error.response.status, error.response.data, error.response.statusText)
        console.log(error.message)
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.message ? error.response.status : error.response,
        })
    }
}

