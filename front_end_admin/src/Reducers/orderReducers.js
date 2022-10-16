import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
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


