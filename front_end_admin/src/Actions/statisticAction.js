import {
    REVENUE_MONTH_REQUEST,
    REVENUE_MONTH_SUCCESS,
    REVENUE_MONTH_FAIL,

    NUMBER_PRODUCT_SUCCESS_MONTH_REQUEST,
    NUMBER_PRODUCT_SUCCESS_MONTH_SUCCESS,
    NUMBER_PRODUCT_SUCCESS_MONTH_FAIL,

    NUMBER_REGISTER_USER_MONTH_REQUEST,
    NUMBER_REGISTER_USER_MONTH_SUCCESS,
    NUMBER_REGISTER_USER_MONTH_FAIL,

    NUMBER_TYPE_AND_COUNT_IN_STOCK_REQUEST,
    NUMBER_TYPE_AND_COUNT_IN_STOCK_SUCCESS,
    NUMBER_TYPE_AND_COUNT_IN_STOCK_FAIL,

    REVENUE_BRAND_AND_NUMBER_PRODUCT_BOUGHT_REQUEST,
    REVENUE_BRAND_AND_NUMBER_PRODUCT_BOUGHT_SUCCESS,
    REVENUE_BRAND_AND_NUMBER_PRODUCT_BOUGHT_FAIL,
} from '../Constants/statisticConstant'

import axios from 'axios'

export const getRevenueMonth = (year, userInfor) => async (dispatch) => {
    try {
        
        dispatch({
            type: REVENUE_MONTH_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/statistic/revenueMonth?year=${year}`, config)

        dispatch({
            type: REVENUE_MONTH_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: REVENUE_MONTH_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}

export const getNumberProductSuccessMonth = (year, userInfor) => async (dispatch) => {
    try {
        
        dispatch({
            type: NUMBER_PRODUCT_SUCCESS_MONTH_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/statistic/orderSuccessMonth?year=${year}`, config)

        dispatch({
            type: NUMBER_PRODUCT_SUCCESS_MONTH_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: NUMBER_PRODUCT_SUCCESS_MONTH_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}

export const getNumberRegisterUserMonth = (year, userInfor) => async (dispatch) => {
    try {
        
        dispatch({
            type: NUMBER_REGISTER_USER_MONTH_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/statistic/registerUser?year=${year}`, config)

        dispatch({
            type: NUMBER_REGISTER_USER_MONTH_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: NUMBER_REGISTER_USER_MONTH_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}

export const getNumberTypeAndCountInStockProductBrand = (userInfor) => async (dispatch) => {
    try {
        
        dispatch({
            type: NUMBER_TYPE_AND_COUNT_IN_STOCK_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/statistic/productBrand`, config)

        dispatch({
            type: NUMBER_TYPE_AND_COUNT_IN_STOCK_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: NUMBER_TYPE_AND_COUNT_IN_STOCK_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}

export const getRevenueAndNumberProductBoughtBrand = (userInfor) => async (dispatch) => {
    try {
        
        dispatch({
            type: REVENUE_BRAND_AND_NUMBER_PRODUCT_BOUGHT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bear ${userInfor.token}`,
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/statistic/productBoughtBrand`, config)

        dispatch({
            type: REVENUE_BRAND_AND_NUMBER_PRODUCT_BOUGHT_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: REVENUE_BRAND_AND_NUMBER_PRODUCT_BOUGHT_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}