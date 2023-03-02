import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,
    PRODUCT_ADD_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    COMPARE_PRICE_LIST_REQUEST,
    COMPARE_PRICE_LIST_SUCCESS,
    COMPARE_PRICE_LIST_FAIL,
    
} from '../Constants/productConstant'

export const productListReducer = (state = { products: [], totalRow: 0 }, action) => {

    var { products } = state
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.someProduct, totalRow: action.payload.totalRow }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        // case PRODUCT_UPDATE_REQUEST:
        //     return { ...state, loading: true }
        // case PRODUCT_UPDATE_SUCCESS:
        //     const productAfterUpdate = action.payload
        //     for (let index = 0; index < products.length; index++) {
        //         if (products[index]._id === productAfterUpdate._id) {
        //             products[index] = productAfterUpdate
        //             break
        //         }
        //     }
        //     return {  loading: false, totalPage: state.totalPage, products }
        // case PRODUCT_UPDATE_FAIL:
        //     return { ...state, loading: false, error: action.payload }

        // case RESET_LIST_PRODUCT:
        //     return { loading: false, products: [], totalPage: 0 }

        default:
            return state
    }
}

export const productAddReducer = (state = {}, action) => {

    var { products } = state
    switch (action.type) {

        case PRODUCT_ADD_REQUEST:
            return { loading: true }
        case PRODUCT_ADD_SUCCESS:
            let { totalRow } = state
            return { loading: false, success: true, product: action.payload, }
        case PRODUCT_ADD_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_ADD_RESET:
            return {}

        default:
            return state
    }
}

export const productUpdateReducer = (state = {}, action) => {

   
    switch (action.type) {

        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const productDetailReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true, product: {} }
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productComparePriceListReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case COMPARE_PRICE_LIST_REQUEST:
            return { ...state, loading: true }
        case COMPARE_PRICE_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case COMPARE_PRICE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}