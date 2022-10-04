import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
} from '../Constants/productConstant'

export const productListReducer = (state = { products: [], totalPage: 0, totalRow: 0 }, action) => {

    var { products } = state
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.someProduct, totalPage: action.payload.totalPage, totalRow: action.payload.totalRow }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        // case PRODUCT_ADD_REQUEST:
        //     return { ...state, loading: true }
        // case PRODUCT_ADD_SUCCESS:
        //     let { totalPage } = state
        //     let lengthProducts = products.length
        //     let numberProductPerPage = 10
        //     if ((lengthProducts - numberProductPerPage * totalPage) === 0) {
        //         totalPage = totalPage + 1
        //     }
        //     products.push(action.payload)
        //     return { loading: false, products, totalPage }
        // case PRODUCT_ADD_FAIL:
        //     return { ...state, loading: false, error: action.payload }

        // case PRODUCT_UPDATE_REQUEST:
        //     return { ...state, loading: true }
        // case PRODUCT_UPDATE_SUCCESS:
        //     const productAfterUpdate = action.payload
        //     for (let index = 0; index < products.length; index++) {
        //         if (products[index]._id === productAfterUpdate._id) {
        //             products[index] = productAfterUpdate
        //             break
        //         }
        //     }
        //     return {  loading: false, totalPage: state.totalPage, products }
        // case PRODUCT_UPDATE_FAIL:
        //     return { ...state, loading: false, error: action.payload }

        // case RESET_LIST_PRODUCT:
        //     return { loading: false, products: [], totalPage: 0 }
            
        default:
            return state
    }
}

export const productDetailReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true, product: {} }
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}