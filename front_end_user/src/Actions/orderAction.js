import axios from "axios"
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    ORDER_CREATE_RESET,

    LIST_MY_ORDER_REQUEST,
    LIST_MY_ORDER_SUCCESS,
    LIST_MY_ORDER_FAIL,
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

        const { data } = await axios.post(`http://localhost:5000/api/orders`, dataOrder, config)

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
            `http://localhost:5000/api/orders/myorders?pageNumber=${page}&limit=${pageSize}&name=${searchOrder}&type=${statusOrder}`,
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