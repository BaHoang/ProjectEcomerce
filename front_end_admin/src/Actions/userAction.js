import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,

    LOGOUT,

    LIST_USER_REQUEST,
    LIST_USER_SUCCESS,
    LIST_USER_FAIL,

    DETAIL_USER_REQUEST,
    DETAIL_USER_SUCCESS,
    DETAIL_USER_FAIL,

    ACCEPT_ADMIN_REQUEST,
    ACCEPT_ADMIN_SUCCESS,
    ACCEPT_ADMIN_FAIL,

    PROFILE_REQUEST,
    PROFILE_SUCCESS, 
    PROFILE_FAIL

} from "../Constants/userConstant"

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

        const { data } = await axios.post(`http://localhost:5000/api/user/login`, dataLogin, config)


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

export const userLogout = () => async (dispatch) => {
    dispatch({ type: LOGOUT })
    localStorage.removeItem('userInfor')
}

export const listUserByAdmin = (userInfor, page, pageSize, textSearch) => async (dispatch) => {
    try {
        dispatch({ type: LIST_USER_REQUEST })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            },
        }
        if (!textSearch) {
            textSearch = ''
        }
        
        const { data } = await axios.get(`http://localhost:5000/api/user?pageNumber=${page}&limit=${pageSize}&name=${textSearch}`, config)
        console.log(data)
        
        dispatch({
            type: LIST_USER_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: LIST_USER_FAIL,
            payload: error.response && error.message ? error.response.status : error.response,
        })

    }
}

export const detailUserByAdmin = (id, userInfor) => async (dispatch) => {
    try {
        dispatch({ type: DETAIL_USER_REQUEST })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            },
        }

        const { data } = await axios.get(`http://localhost:5000/api/user/${id}`, config)

        dispatch({
            type: DETAIL_USER_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: DETAIL_USER_FAIL,
            payload: error.response && error.message ? error.response.status : error.response,
        })
    }
}

export const acceptAdminAction = (id, userInfor) => async (dispatch) => {
    try {
        dispatch({ type: ACCEPT_ADMIN_REQUEST })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            },
        }

        const article = { title: 'Axios PUT Request Example' }
        const { data } = await axios.put(`http://localhost:5000/api/user/${id}`, article, config)

        dispatch({
            type: ACCEPT_ADMIN_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ACCEPT_ADMIN_FAIL,
            payload: error.response && error.message ? error.response.status : error.response,
        })
    }
}

export const myProfile = (userInfor) => async (dispatch, getState) => {
    try {
        dispatch({ type: PROFILE_REQUEST })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            },
        }

        const { data } = await axios.get(`http://localhost:5000/api/user/profile`, config)

        dispatch({
            type: PROFILE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PROFILE_FAIL,
            payload: error.response && error.message ? error.response.status : error.response,
        })
    }
}