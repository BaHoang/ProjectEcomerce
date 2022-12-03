import {
    TRANSPORT_METHOD,
    NOTE,
    PAYMENT_METHOD,
    LIST_PRODUCT
} from '../Constants/paymentInforConstant'

export const transportMethodAction = (index) => async (dispatch) => {
    dispatch({
        type: TRANSPORT_METHOD,
        payload: index,
    })
}

export const noteAction = (note) => async (dispatch) => {
    dispatch({
        type: NOTE,
        payload: note,
    })
}

export const paymentMethodAction = (index) => async (dispatch) => {
    dispatch({
        type: PAYMENT_METHOD,
        payload: index,
    })
}

export const listProductAction = (listProduct) => async (dispatch) => {
    dispatch({
        type: LIST_PRODUCT,
        payload: listProduct,
    })
}