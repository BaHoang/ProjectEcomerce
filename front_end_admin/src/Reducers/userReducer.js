import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    LIST_USER_REQUEST,
    LIST_USER_SUCCESS,
    LIST_USER_FAIL,
    DETAIL_USER_REQUEST,
    DETAIL_USER_SUCCESS,
    DETAIL_USER_FAIL,
    ACCEPT_ADMIN_REQUEST,
    ACCEPT_ADMIN_SUCCESS,
    ACCEPT_ADMIN_FAIL,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAIL
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

export const detailUserReducer = (state = { userDetail: {} }, action) => {

    switch (action.type) {
        case DETAIL_USER_REQUEST:
            return { ...state, loading: true }
        case DETAIL_USER_SUCCESS:
            return { loading: false, userDetail: action.payload }
        case DETAIL_USER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const listUserReducer = (state = { listAllUser: [] }, action) => {

    switch (action.type) {

        case LIST_USER_REQUEST:
            return { ...state, loading: true }
        case LIST_USER_SUCCESS:
            return { loading: false, listAllUser: action.payload.getUsers, totalRow: action.payload.totalRow }
        case LIST_USER_FAIL:
            return { loading: false, error: action.payload }

        case ACCEPT_ADMIN_REQUEST:
            return { ...state, loadingAccept: true }
        case ACCEPT_ADMIN_SUCCESS:
            const userAfterUpdate = action.payload

            const { listAllUser } = state

            listAllUser.map((user) => {
                if (user._id === userAfterUpdate._id) {
                    user.isAdmin = userAfterUpdate.isAdmin
                }
            })
            return { ...state, loadingAccept: false, listAllUser }
        case ACCEPT_ADMIN_FAIL:
            return { ...state, loadingAccept: false, errorAccept: action.payload }

        default:
            return state
    }
}


export const profileUserReducer = (state = { userProfile: {} }, action) => {

    switch (action.type) {
        case PROFILE_REQUEST:
            return { loading: true }
        case PROFILE_SUCCESS:
            return { loading: false, userProfile: action.payload }
        case PROFILE_FAIL:
            return { loading: false, error: action.payload }

        // case UPDATE_REQUEST:
        //     return { loading: true }
        // case UPDATE_SUCCESS:
        //     return { loading: false, userProfile: action.payload }
        // case UPDATE_FAIL:
        //     return { loading: false, error: action.payload }
        default:
            return state
    }
}
