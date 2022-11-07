import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    
} from '../Constants/productConstant'

export const productListReducer = (state = { products: [], totalRow: 0 }, action) => {

    var { products } = state
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {  loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.someProduct, totalRow: action.payload.totalRow, totalPage: action.payload.totalPage }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        

        default:
            return state
    }
}

