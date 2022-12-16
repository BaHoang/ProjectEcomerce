import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux"

import thunk from 'redux-thunk'
import { cartAddReducer } from "./Reducers/cartReducers"
import { detailProductReducer, listProductReducer, reviewProductReducer, } from "./Reducers/productReducers"
import { currentDeliveryAddressReducer, deliveryAddressAddReducer, deliveryAddressUpdateReducer, listDeliveryAddressReducer } from "./Reducers/deliveryAddressReducers"
import { userInforReducer } from "./Reducers/userReducers"
import { paymentInforReducer } from "./Reducers/paymentInforReducers"
import { confirmReceivedOrderReducer, createOrderReducer, destroyOrderReducer, listMyOrderReducer, orderDetailReducer } from "./Reducers/orderReducers"

const reducer = combineReducers({
    user: userInforReducer,

    listProduct: listProductReducer,
    detailProduct: detailProductReducer,
    reviewProduct: reviewProductReducer,

    cartAdd: cartAddReducer,

    listDeliveryAddress: listDeliveryAddressReducer,
    currentDeliveryAddress: currentDeliveryAddressReducer,
    deliveryAddressAdd: deliveryAddressAddReducer,
    deliveryAddressUpdate: deliveryAddressUpdateReducer,

    paymentInfor: paymentInforReducer,

    createOrder: createOrderReducer,
    listMyOrder: listMyOrderReducer,
    orderDetail: orderDetailReducer,
    destroyOrder: destroyOrderReducer,
    confirmReceivedOrder: confirmReceivedOrderReducer,
})

const userInfor = localStorage.getItem('userInfor') ? JSON.parse(localStorage.getItem('userInfor')) : {}
const cartProduct = localStorage.getItem('cartProduct') ? JSON.parse(localStorage.getItem('cartProduct')) : []

const initState = {
    user: {
        userInfor
    },
    cartAdd: {
        carts: cartProduct
    }
}

const middleware = [thunk]
const store = createStore(reducer, initState, applyMiddleware(...middleware))

export default store