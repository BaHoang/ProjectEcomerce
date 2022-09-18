import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from 'redux-thunk'
import { displaySidebarReducer } from "./Reducers/sidebarReducer";

const reducer = combineReducers({
    displaySidebar: displaySidebarReducer,
})

const initState = {
    
}

const middleware = [thunk]
const store = createStore(reducer, initState, applyMiddleware(...middleware))

export default store