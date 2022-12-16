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
    PRODUCT_REVIEW_RESET
} from '../Constants/productConstant'

export const listProductReducer = (state = { products: [], totalRow: 0 }, action) => {

    var { products } = state
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.someProduct, totalRow: action.payload.totalRow, totalPage: action.payload.totalPage }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const detailProductReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true }
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const reviewProductReducer = (state = {}, action) => {

    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_REVIEW_RESET:
            return {}
        default:
            return state
    }
}
