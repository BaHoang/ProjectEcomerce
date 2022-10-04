import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { productDetailReducer, productListReducer } from "./Reducers/productReducers"
import { displaySidebarReducer } from "./Reducers/sidebarReducer"
import { detailUserReducer, listUserReducer, userInforReducer } from "./Reducers/userReducer"

const reducer = combineReducers({
    displaySidebar: displaySidebarReducer,
    user: userInforReducer,
    listUser: listUserReducer,
    detailUser: detailUserReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
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