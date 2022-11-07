import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    
   
} from '../Constants/productConstant'

import axios from 'axios'
 
export const listProducts = (page, pageSize, searchProduct ) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`http://localhost:5000/api/product?pageNumber=${page}&limit=${pageSize}&name=${searchProduct}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}
