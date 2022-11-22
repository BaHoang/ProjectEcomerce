import {
    CART_ADD_PRODUCT_SUCCESS,
    CART_DELETE_PRODUCT_SUCCESS,
    CART_DELETE_MANY_PRODUCT_SUCCESS,
    CART_UPDATE_PRODUCT_SUCCESS,
    CART_RESET_PRODUCT,
} from '../Constants/cartConstant'

export const cartAddReducer = (state = { carts: [] }, action) => {
    var { carts } = state
    switch (action.type) {

        case CART_ADD_PRODUCT_SUCCESS:
            const productAddToCart = action.payload
            var checkSame = false
            for (let index = 0; index < carts.length; index++) {
                if (carts[index].id === productAddToCart.id) {
                    carts[index].numProductSelected = carts[index].numProductSelected + productAddToCart.numProductSelected
                    checkSame = true
                    break
                }
            }

            if (!checkSame) {
                carts.push(productAddToCart)
            }
            return { ...state, carts }


        case CART_DELETE_PRODUCT_SUCCESS:
            const index = action.payload
            var tempCart = []

            for (let i = 0; i < carts.length; i++) {
                if (i !== index) {
                    tempCart.push(carts[i])
                }
            }
            return { ...state, carts: tempCart }

        case CART_DELETE_MANY_PRODUCT_SUCCESS:
            const checkedState = action.payload
            var tempCart = []

            for (let i = 0; i < carts.length; i++) {
                if (!checkedState[i]) {
                   
                    tempCart.push(carts[i])
                }
            }

          
            return { ...state, carts: tempCart }

        case CART_UPDATE_PRODUCT_SUCCESS:

            let dataUpdate = action.payload

            carts.map((product, i) => {
                if (i === dataUpdate.index) {
                    product.numProductSelected = dataUpdate.nextNumProductSelected
                }
            })
            return { ...state, carts }

        case CART_RESET_PRODUCT:
            return { ...state, carts: [] }

        default:
            return state
    }
}

