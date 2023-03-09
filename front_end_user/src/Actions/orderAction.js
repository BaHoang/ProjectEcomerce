import axios from "axios"
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    ORDER_CREATE_RESET,

    LIST_MY_ORDER_REQUEST,
    LIST_MY_ORDER_SUCCESS,
    LIST_MY_ORDER_FAIL,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,

    ORDER_DESTROY_REQUEST,
    ORDER_DESTROY_SUCCESS,
    ORDER_DESTROY_FAIL,


    ORDER_CONFIRM_RECEIVED_REQUEST,
    ORDER_CONFIRM_RECEIVED_SUCCESS,
    ORDER_CONFIRM_RECEIVED_FAIL,
} from '../Constants/orderConstant'

export const orderProductAction = (userInfor, listProductPlaceOrder, address, transportMethod, note, paymentMethod, shippingPrice) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST,
        })

        const dataOrder = {
            productList: listProductPlaceOrder,
            deliveryAdd: address,
            transportMethod,
            orderStatus: 0,
            transportFee: shippingPrice,
            note,
            paymentMethod,
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/orders`, dataOrder, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: dataOrder,
        })

    } catch (error) {

        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.status ? error.response.status : 400,
        })
    }
}

export const resetOrderProductAction = () => async (dispatch, getState) => {
    dispatch({
        type: ORDER_CREATE_RESET,
    })
}

export const listMyOrders = (userInfor, page, pageSize, searchOrder, statusOrder) => async (dispatch) => {
    try {
        dispatch({
            type: LIST_MY_ORDER_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/api/orders/myorders?pageNumber=${page}&limit=${pageSize}&name=${searchOrder}&type=${statusOrder}`,
            config
        )

        dispatch({
            type: LIST_MY_ORDER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LIST_MY_ORDER_FAIL,
            payload: (error.response && error.response.status) ? error.response.status : 'Error',
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

        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: (error.response && error.response.status) ? error.response.status : 400,
        })
    }
}

export const destroyOrderAction = (userInfor, id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DESTROY_REQUEST,
            payload: id,
        })

        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const article = { title: 'Axios PUT Request Example' }

        const { data } = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/orders/${id}/destroy`, article, config)

        dispatch({
            type: ORDER_DESTROY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DESTROY_FAIL,
            payload: { error: (error.response && error.response.status) ? error.response.status : 400, idOrder: id},
        })
    }
}

export const confirmReceivedOrderAction = (userInfor, id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_CONFIRM_RECEIVED_REQUEST,
            payload: id,
        })

        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const article = { title: 'Axios PUT confirm received order' }

        const { data } = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/orders/${id}/confirmReceived`, article, config)

        dispatch({
            type: ORDER_CONFIRM_RECEIVED_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_CONFIRM_RECEIVED_FAIL,
            payload: { error: (error.response && error.response.status) ? error.response.status : 400, idOrder: id},
        })
    }
}