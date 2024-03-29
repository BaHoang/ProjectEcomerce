import {
    DELIVERY_ADDRESS_LIST_REQUEST,
    DELIVERY_ADDRESS_LIST_SUCCESS,
    DELIVERY_ADDRESS_LIST_FAIL,

    CURRENT_DELIVERY_ADDRESS,

    DELIVERY_ADDRESS_ADD_REQUEST,
    DELIVERY_ADDRESS_ADD_SUCCESS,
    DELIVERY_ADDRESS_ADD_FAIL,

    DELIVERY_ADDRESS_UPDATE_REQUEST,
    DELIVERY_ADDRESS_UPDATE_SUCCESS,
    DELIVERY_ADDRESS_UPDATE_FAIL,

    DELIVERY_ADDRESS_DELETE_REQUEST,
    DELIVERY_ADDRESS_DELETE_SUCCESS,
    DELIVERY_ADDRESS_DELETE_FAIL,

    DELIVERY_ADDRESS_SET_DEFAULT_REQUEST,
    DELIVERY_ADDRESS_SET_DEFAULT_SUCCESS,
    DELIVERY_ADDRESS_SET_DEFAULT_FAIL,
} from '../Constants/deliveryAddressConstant'

import axios from 'axios'

export const listDeliveryAddressAction = (userInfor) => async (dispatch) => {
    try {
        dispatch({
            type: DELIVERY_ADDRESS_LIST_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/deliveryAddress`, config)
                     

        dispatch({
            type: DELIVERY_ADDRESS_LIST_SUCCESS,
            payload: data.list,
        })

    } catch (error) {
        dispatch({
            type: DELIVERY_ADDRESS_LIST_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}

export const currentDeliveryAddressAction = (address, selectedValue, isDefault) => async (dispatch) => {

    dispatch({
        type: CURRENT_DELIVERY_ADDRESS,
        payload: { address, selectedValue, isDefault },
    })

}

export const deliveryAddressAddAction = (userInfor, name, phone, province, district, village, details) => async (dispatch) => {
    try {

        dispatch({
            type: DELIVERY_ADDRESS_ADD_REQUEST
        })

        const newDeliveryAddress = {
            name: name,
            phone: phone,
            address: {
                province: province,
                district: district,
                wards: village,
                details: details
            }
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/deliveryAddress`, newDeliveryAddress, config)

        dispatch({
            type: DELIVERY_ADDRESS_ADD_SUCCESS,
            payload: newDeliveryAddress,
        })

    } catch (error) {
        dispatch({
            type: DELIVERY_ADDRESS_ADD_FAIL,
            payload: error.response.status ? error.response.status : 400,
        })
    }

}

export const deliveryAddressUpdateAction = (userInfor,indexDeliveryAddressUpdate, name, phone, province, district, village, details) => async (dispatch) => {
    try {

        dispatch({
            type: DELIVERY_ADDRESS_UPDATE_REQUEST
        })

        const newDeliveryAddress = {
            name: name,
            phone: phone,
            address: {
                province: province,
                district: district,
                wards: village,
                details: details
            }
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/deliveryAddress/${indexDeliveryAddressUpdate + 1}`, newDeliveryAddress, config)

        dispatch({
            type: DELIVERY_ADDRESS_UPDATE_SUCCESS,
            payload: newDeliveryAddress,
        })

    } catch (error) {
        dispatch({
            type: DELIVERY_ADDRESS_UPDATE_FAIL,
            payload: error.response.status ? error.response.status : 400,
        })
    }

}

export const deliveryAddressDeleteAction = (userInfor,indexDeliveryAddressDelete) => async (dispatch) => {
    try {

        dispatch({
            type: DELIVERY_ADDRESS_DELETE_REQUEST
        })
       
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/deliveryAddress?item=${indexDeliveryAddressDelete + 1}`, config)

        dispatch({
            type: DELIVERY_ADDRESS_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: DELIVERY_ADDRESS_DELETE_FAIL,
            payload: error.response.status ? error.response.status : 400,
        })
    }

}

export const deliveryAddressSetDefaultAction = (userInfor,index) => async (dispatch) => {
    try {

        dispatch({
            type: DELIVERY_ADDRESS_SET_DEFAULT_REQUEST,
            payload: index+1
        })

    
        const article = { title: 'Axios PUT confirm received order' }
                      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/deliveryAddress/updateDefault?item=${index + 1}`, article, config)

        dispatch({
            type: DELIVERY_ADDRESS_SET_DEFAULT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: DELIVERY_ADDRESS_SET_DEFAULT_FAIL,
                        payload: { error: (error.response && error.response.status) ? error.response.status : 400, idDeliveryAddress: index+1},
        })
    }

}
