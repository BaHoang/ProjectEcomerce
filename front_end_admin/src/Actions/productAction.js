import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
   
} from '../Constants/productConstant'

import axios from 'axios'
 
export const listProducts = (page, pageSize) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`http://localhost:5000/api/product?pageNumber=${page}&limit=${pageSize}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.message ? error.message : error.response,
        })
    }
}