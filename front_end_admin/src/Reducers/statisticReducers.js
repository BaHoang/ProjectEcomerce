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

export const revenueMonthReducer = (state = { revenue: {} }, action) => {

    switch (action.type) {
        case REVENUE_MONTH_REQUEST:
            return { loading: true }
        case REVENUE_MONTH_SUCCESS:
            return { loading: false, revenue: action.payload }
        case REVENUE_MONTH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const numberProductSuccessMonthReducer = (state = { numProdSuccessMonth: {} }, action) => {

    switch (action.type) {
        case NUMBER_PRODUCT_SUCCESS_MONTH_REQUEST:
            return { loading: true }
        case NUMBER_PRODUCT_SUCCESS_MONTH_SUCCESS:
            return { loading: false, numProdSuccessMonth: action.payload }
        case NUMBER_PRODUCT_SUCCESS_MONTH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const numberRegisterUserMonthReducer = (state = { numRegisterUserMonth: {} }, action) => {

    switch (action.type) {
        case NUMBER_REGISTER_USER_MONTH_REQUEST:
            return { loading: true }
        case NUMBER_REGISTER_USER_MONTH_SUCCESS:
            return { loading: false, numRegisterUserMonth: action.payload }
        case NUMBER_REGISTER_USER_MONTH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const numberTypeAndCountInStockProductBrandReducer = (state = { productBrand: {}, numProdInStockBrand: {} }, action) => {

    switch (action.type) {
        case NUMBER_TYPE_AND_COUNT_IN_STOCK_REQUEST:
            return { loading: true }
        case NUMBER_TYPE_AND_COUNT_IN_STOCK_SUCCESS:
            return { loading: false, productBrand: action.payload.productBrand, numProdInStockBrand:  action.payload.numProdInStockBrand}
        case NUMBER_TYPE_AND_COUNT_IN_STOCK_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const revenueAndNumberProductBoughtBrandReducer = (state = { productBoughtBrand: {}, revenueBrand: {} }, action) => {

    switch (action.type) {
        case REVENUE_BRAND_AND_NUMBER_PRODUCT_BOUGHT_REQUEST:
            return { loading: true }
        case REVENUE_BRAND_AND_NUMBER_PRODUCT_BOUGHT_SUCCESS:
            return { loading: false, revenueBrand: action.payload.revenueBrand, productBoughtBrand:  action.payload.productBoughtBrand}
        case REVENUE_BRAND_AND_NUMBER_PRODUCT_BOUGHT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}