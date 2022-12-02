import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux"

import thunk from 'redux-thunk'
import { cartAddReducer } from "./Reducers/cartReducers"
import { detailProductReducer, listProductReducer,  } from "./Reducers/productReducers"
import { currentDeliveryAddressReducer, deliveryAddressAddReducer, deliveryAddressUpdateReducer, listDeliveryAddressReducer  } from "./Reducers/deliveryAddressReducers"
import { userInforReducer } from "./Reducers/userReducers"

const reducer = combineReducers({
    user: userInforReducer,

    listProduct: listProductReducer,
    detailProduct: detailProductReducer,

    cartAdd: cartAddReducer,

    listDeliveryAddress: listDeliveryAddressReducer,
    currentDeliveryAddress: currentDeliveryAddressReducer,
    deliveryAddressAdd: deliveryAddressAddReducer,
    deliveryAddressUpdate: deliveryAddressUpdateReducer,

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