import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { orderDetailReducer, orderListReducer, orderUpdateReducer } from "./Reducers/orderReducers"
import { productAddReducer, productDetailReducer, productListReducer, productUpdateReducer } from "./Reducers/productReducers"
import { displaySidebarReducer } from "./Reducers/sidebarReducer"
import { revenueMonthReducer } from "./Reducers/statisticReducers"
import { detailUserReducer, listUserReducer, profileUserReducer, userInforReducer } from "./Reducers/userReducer"

const reducer = combineReducers({
    displaySidebar: displaySidebarReducer,
    user: userInforReducer,
    listUser: listUserReducer,
    detailUser: detailUserReducer,
    profileUser: profileUserReducer,
    
    productList: productListReducer,
    productDetail: productDetailReducer,
    productAdd: productAddReducer,
    productUpdate: productUpdateReducer,

    orderList: orderListReducer,
    orderDetail: orderDetailReducer,
    orderUpdate: orderUpdateReducer,

    revenueMonth: revenueMonthReducer
    
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