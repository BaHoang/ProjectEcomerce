import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    ORDER_CREATE_RESET,

    LIST_MY_ORDER_REQUEST,
    LIST_MY_ORDER_SUCCESS,
    LIST_MY_ORDER_FAIL,
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
            return { loading: false, listOrder: action.payload.someOrder, totalRow: action.payload.totalRow, totalPage: action.payload.totalPage  }

        case LIST_MY_ORDER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}