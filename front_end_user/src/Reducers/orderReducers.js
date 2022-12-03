import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    //RESET_ORDER,
} from '../Constants/orderConstant'

export const createOrderReducer = (state = { order: {} }, action) => {
    switch (action.type) {

        case CREATE_ORDER_REQUEST:
            return { loading: true }

        case CREATE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload }

        case CREATE_ORDER_FAIL:
            return { loading: false, error: action.payload }

        // case RESET_ORDER:
        //     return { ...state, success: false }

        default:
            return state
    }
}