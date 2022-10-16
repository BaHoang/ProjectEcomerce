import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
} from '../Constants/orderConstant'

import axios from 'axios'

export const listOrders = (userInfor, page, pageSize, searchOrder) => async (dispatch) => {
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
            `http://localhost:5000/api/orders?pageNumber=${page}&limit=${pageSize}&name=${searchOrder}`,
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