import {
    CART_ADD_PRODUCT_SUCCESS, CART_RESET_PRODUCT,
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
                console.log(checkSame)
                carts.push(productAddToCart)
            }
            return { ...state, carts }
        
        case CART_RESET_PRODUCT:
            return {...state, carts: []}

        default:
            return state
    }
}

