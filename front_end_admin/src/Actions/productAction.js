import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,

    COMPARE_PRICE_LIST_REQUEST,
    COMPARE_PRICE_LIST_SUCCESS,
    COMPARE_PRICE_LIST_FAIL,
    
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
   
} from '../Constants/productConstant'

import axios from 'axios'
 
export const listProducts = (page, pageSize, searchProduct ) => async (dispatch) => {
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

export const productDetailAction = (id) => async (dispatch) => {
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



export const productComparePriceListAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: COMPARE_PRICE_LIST_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/dataMatching/${id}`)
        dispatch({
            type: COMPARE_PRICE_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: COMPARE_PRICE_LIST_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}

export const addProductAdmin = (userInfor, file, name, price, priceDiscount, brand, countInStock, chipset, rom, ram, operating, color, manHinh, cameraSau, cameraTruoc, pin, description) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_ADD_REQUEST,
        })

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }
        
        const formData = new FormData()
        formData.append('formFile', file)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('priceDiscount', priceDiscount)
        formData.append('brand', brand)
        formData.append('countInStock', countInStock)
        formData.append('chipset', chipset)
        formData.append('rom', rom)
        formData.append('ram', ram)
        formData.append('operating', operating)
        formData.append('color', color)
        formData.append('manHinh', manHinh)
        formData.append('cameraSau', cameraSau)
        formData.append('cameraTruoc', cameraTruoc)
        formData.append('pin', pin)
        formData.append('description', description)

        const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/product`, formData, config)

        dispatch({
            type: PRODUCT_ADD_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_ADD_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}

export const updateProductAdmin = (userInfor, idProduct, selectedFile, name, price, priceDiscount, brand, countInStock, chipset, rom, ram, operating, color, manHinh, cameraSau, cameraTruoc, pin, description) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bear ${userInfor.token}`,
            }
        }
        
        const formData = new FormData()
        formData.append('updateFile', selectedFile)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('priceDiscount', priceDiscount)
        formData.append('brand', brand)
        formData.append('countInStock', countInStock)
        formData.append('chipset', chipset)
        formData.append('rom', rom)
        formData.append('ram', ram)
        formData.append('operating', operating)
        formData.append('color', color)
        formData.append('manHinh', manHinh)
        formData.append('cameraSau', cameraSau)
        formData.append('cameraTruoc', cameraTruoc)
        formData.append('pin', pin)
        formData.append('description', description)

        const { data } = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/product/${idProduct}`, formData, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response.status ? error.response.status : 'Error',
        })
    }
}