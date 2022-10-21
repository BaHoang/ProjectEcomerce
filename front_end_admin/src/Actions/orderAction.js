import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,

    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
} from '../Constants/orderConstant'

import axios from 'axios'

export const listOrders = (userInfor, page, pageSize, searchOrder, statusOrder) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.get(
            `http://localhost:5000/api/orders?pageNumber=${page}&limit=${pageSize}&name=${searchOrder}&type=${statusOrder}`,
            config
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}

export const orderDetailAction = (userInfor, id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAIL_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}

export const orderUpdateStatusAction = (userInfor, id, status) => async (dispatch) => {
    try {

        dispatch({
            type: ORDER_UPDATE_REQUEST,
        })

        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const statusUpdate = { orderStatus: status + 1 }
       
        const { data } = await axios.put(`http://localhost:5000/api/orders/${id}/status`, statusUpdate, config)

        dispatch({
            type: ORDER_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_UPDATE_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}