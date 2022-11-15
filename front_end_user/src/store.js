import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux"

import thunk from 'redux-thunk'
import { detailProductReducer, listProductReducer,  } from "./Reducers/productReducers"
import { userInforReducer } from "./Reducers/userReducers"

const reducer = combineReducers({
    user: userInforReducer,

    listProduct: listProductReducer,
    detailProduct: detailProductReducer,

})

const userInfor = localStorage.getItem('userInfor') ? JSON.parse(localStorage.getItem('userInfor')) : {}

const initState = {
    user: {
        userInfor
    }
}

const middleware = [thunk]
const store = createStore(reducer, initState, applyMiddleware(...middleware))

export default store