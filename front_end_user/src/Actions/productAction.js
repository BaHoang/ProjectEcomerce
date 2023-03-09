import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,

    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
} from '../Constants/productConstant'

import axios from 'axios'

export const listProductAction = (page, pageSize, searchProduct) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/product?pageNumber=${page}&limit=${pageSize}&name=${searchProduct}`)
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

export const detailProductAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/product/${id}`)
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}

export const reviewProductAction = (id, userInfor, valueComment, valueRating) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_REVIEW_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const dataReview = { comment: valueComment, rating: valueRating }
        console.log(dataReview)
        const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/product/review/${id}`, dataReview, config)

        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: (error.response && error.response.status) ? error.response.status : 400
        })
    }
}