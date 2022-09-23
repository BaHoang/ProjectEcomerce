import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { displaySidebarReducer } from "./Reducers/sidebarReducer"
import { userInforReducer } from "./Reducers/userReducer"

const reducer = combineReducers({
    displaySidebar: displaySidebarReducer,
    user: userInforReducer,
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