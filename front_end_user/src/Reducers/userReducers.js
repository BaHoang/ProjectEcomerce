import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,

    LOGOUT,
} from "../Constants/userConstant"

export const userInforReducer = (state = { userInfor: {} }, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true, userInfor: {} }
        case LOGIN_SUCCESS:
            return { loading: false, userInfor: action.payload }
        case LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case LOGOUT:
            return { userInfor: {} }
        default:
            return state
    }
}





