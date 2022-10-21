import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,

    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
    ORDER_UPDATE_RESET
} from '../Constants/orderConstant'

export const orderListReducer = (state = { orders: [], totalRow: 0 }, action) => {

    var { orders } = state
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { ...state, loading: true }
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload.someOrder, totalRow: action.payload.totalRow }
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderDetailReducer = (state = { order: {} }, action) => {

    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return { loading: true, order: {} }
        case ORDER_DETAIL_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_UPDATE_REQUEST:
            return { loading: true }
        case ORDER_UPDATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

