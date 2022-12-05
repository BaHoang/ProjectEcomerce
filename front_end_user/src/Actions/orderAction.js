import axios from "axios"
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    
    ORDER_CREATE_RESET,
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