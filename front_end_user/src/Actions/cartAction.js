import {
    CART_ADD_PRODUCT_SUCCESS,
} from '../Constants/cartConstant'

export const cartAddProduct = (productAddToCart) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_PRODUCT_SUCCESS,
        payload: productAddToCart,
    })

    localStorage.setItem('cartProduct', JSON.stringify(getState().cartAdd.carts))
}




