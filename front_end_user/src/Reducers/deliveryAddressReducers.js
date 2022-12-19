import {
    DELIVERY_ADDRESS_LIST_REQUEST,
    DELIVERY_ADDRESS_LIST_SUCCESS,
    DELIVERY_ADDRESS_LIST_FAIL,

    CURRENT_DELIVERY_ADDRESS,

    DELIVERY_ADDRESS_ADD_REQUEST,
    DELIVERY_ADDRESS_ADD_SUCCESS,
    DELIVERY_ADDRESS_ADD_FAIL,
    DELIVERY_ADDRESS_ADD_RESET,

    DELIVERY_ADDRESS_UPDATE_REQUEST,
    DELIVERY_ADDRESS_UPDATE_SUCCESS,
    DELIVERY_ADDRESS_UPDATE_FAIL,
    DELIVERY_ADDRESS_UPDATE_RESET,

    DELIVERY_ADDRESS_DELETE_REQUEST,
    DELIVERY_ADDRESS_DELETE_SUCCESS,
    DELIVERY_ADDRESS_DELETE_FAIL,
    DELIVERY_ADDRESS_DELETE_RESET
} from '../Constants/deliveryAddressConstant'

export const listDeliveryAddressReducer = (state = { listAddress: [] }, action) => {

    switch (action.type) {
        case DELIVERY_ADDRESS_LIST_REQUEST:
            return { loading: true }
        case DELIVERY_ADDRESS_LIST_SUCCESS:
            return { loading: false, listAddress: action.payload }
        case DELIVERY_ADDRESS_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const currentDeliveryAddressReducer = (state = { address: {} }, action) => {

    switch (action.type) {
        case CURRENT_DELIVERY_ADDRESS:
            return { address: action.payload.address, selectedValue: action.payload.selectedValue, isDefault: action.payload.isDefault }

        default:
            return state
    }
}

export const deliveryAddressAddReducer = (state = {}, action) => {

    switch (action.type) {

        case DELIVERY_ADDRESS_ADD_REQUEST:
            return { loading: true }
        case DELIVERY_ADDRESS_ADD_SUCCESS:
            return { loading: false, success: true, deliveryAddress: action.payload, }
        case DELIVERY_ADDRESS_ADD_FAIL:
            return { loading: false, error: action.payload }
        case DELIVERY_ADDRESS_ADD_RESET:
            return {}
        default:
            return state
    }
}

export const deliveryAddressUpdateReducer = (state = {}, action) => {

    switch (action.type) {

        case DELIVERY_ADDRESS_UPDATE_REQUEST:
            return { loading: true }
        case DELIVERY_ADDRESS_UPDATE_SUCCESS:
            return { loading: false, success: true, deliveryAddress: action.payload, }
        case DELIVERY_ADDRESS_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case DELIVERY_ADDRESS_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const deliveryAddressDeleteReducer = (state = {}, action) => {

    switch (action.type) {

        case DELIVERY_ADDRESS_DELETE_REQUEST:
            return { loading: true }
        case DELIVERY_ADDRESS_DELETE_SUCCESS:
            return { loading: false, success: true }
        case DELIVERY_ADDRESS_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case DELIVERY_ADDRESS_DELETE_RESET:
            return {}
        default:
            return state
    }
}