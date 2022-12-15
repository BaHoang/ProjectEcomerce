import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    ORDER_CREATE_RESET,

    LIST_MY_ORDER_REQUEST,
    LIST_MY_ORDER_SUCCESS,
    LIST_MY_ORDER_FAIL,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,

    ORDER_DESTROY_REQUEST,
    ORDER_DESTROY_SUCCESS,
    ORDER_DESTROY_FAIL,
    ORDER_DESTROY_RESET,
    
    ORDER_CONFIRM_RECEIVED_REQUEST,
    ORDER_CONFIRM_RECEIVED_SUCCESS,
    ORDER_CONFIRM_RECEIVED_FAIL,
    ORDER_CONFIRM_RECEIVED_RESET
} from '../Constants/orderConstant'

export const createOrderReducer = (state = { order: {} }, action) => {
    switch (action.type) {

        case CREATE_ORDER_REQUEST:
            return { loading: true }

        case CREATE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload }

        case CREATE_ORDER_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const listMyOrderReducer = (state = { listOrder: [] }, action) => {
    switch (action.type) {

        case LIST_MY_ORDER_REQUEST:
            return { loading: true }

        case LIST_MY_ORDER_SUCCESS:
            return { loading: false, listOrder: action.payload.someOrder, totalRow: action.payload.totalRow, totalPage: action.payload.totalPage }

        case LIST_MY_ORDER_FAIL:
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

export const destroyOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DESTROY_REQUEST:
            return { loading: true, idOrder: action.payload }
        case ORDER_DESTROY_SUCCESS:
            return { loading: false, success: true, orderAfterDestroy: action.payload }
        case ORDER_DESTROY_FAIL:
            return { loading: false, error: action.payload.error, idOrder: action.payload.idOrder }
        case ORDER_DESTROY_RESET:
            return {}
        default:
            return state
    }
}

export const confirmReceivedOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CONFIRM_RECEIVED_REQUEST:
            return { loading: true, idOrder: action.payload }
        case ORDER_CONFIRM_RECEIVED_SUCCESS:
            return { loading: false, success: true, orderAfterConfirmReceived: action.payload }
        case ORDER_CONFIRM_RECEIVED_FAIL:
            return { loading: false, error: action.payload.error, idOrder: action.payload.idOrder }
        case ORDER_CONFIRM_RECEIVED_RESET:
            return {}
        default:
            return state
    }
}