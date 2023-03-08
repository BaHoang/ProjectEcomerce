import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_RESET,

    LOGOUT,

    PROFILE_FAIL,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,

    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_RESET
} from "../Constants/userConstant"

export const userInforReducer = (state = { userInfor: {} }, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true, userInfor: {} }
        case LOGIN_SUCCESS:
            return { loading: false, userInfor: action.payload }
        case LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case LOGIN_RESET:
            return { userInfor: {}}
        case LOGOUT:
            return { userInfor: {} }
        default:
            return state
    }
}


export const userProfileReducer = (state = { profile: {} }, action) => {

    switch (action.type) {
        case PROFILE_REQUEST:
            return { loading: true }
        case PROFILE_SUCCESS:
            return { loading: false, profile: action.payload }
        case PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userRegisterReducer = (state = { register: {} }, action) => {

    switch (action.type) {
        case REGISTER_REQUEST:
            return { loading: true }
        case REGISTER_SUCCESS:
            return { loading: false, register: action.payload }
        case REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case REGISTER_RESET:
            return { register: {} }
        default:
            return state
    }
}




