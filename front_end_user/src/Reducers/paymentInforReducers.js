import {
    TRANSPORT_METHOD,
    NOTE,
    PAYMENT_METHOD,
    LIST_PRODUCT
} from '../Constants/paymentInforConstant'

export const paymentInforReducer = (state = { transportMethod: 0, note: '', paymentMethod: 0, listProduct: [] }, action) => {

    switch (action.type) {
        case TRANSPORT_METHOD:
            return { ...state, transportMethod: action.payload }
        case NOTE:
            return { ...state, note: action.payload }
        case PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload }
        case LIST_PRODUCT:
            return {...state, listProduct: action.payload}

        default:
            return state
    }
}