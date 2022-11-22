import {
    CART_ADD_PRODUCT_SUCCESS,
    CART_DELETE_PRODUCT_SUCCESS,
    CART_DELETE_MANY_PRODUCT_SUCCESS,
    CART_UPDATE_PRODUCT_SUCCESS
} from '../Constants/cartConstant'

export const cartAddProduct = (productAddToCart) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_PRODUCT_SUCCESS,
        payload: productAddToCart,
    })

    localStorage.setItem('cartProduct', JSON.stringify(getState().cartAdd.carts))
}

export const deleteItemCartAction = (index) => async (dispatch, getState) => {
    dispatch({
        type: CART_DELETE_PRODUCT_SUCCESS,
        payload: index,
    })

    localStorage.setItem('cartProduct', JSON.stringify(getState().cartAdd.carts))
}

export const deleteManyItemCartAction = (checkedState) => async (dispatch, getState) => {
    dispatch({
        type: CART_DELETE_MANY_PRODUCT_SUCCESS,
        payload: checkedState,
    })

    localStorage.setItem('cartProduct', JSON.stringify(getState().cartAdd.carts))
}

export const updateItemCartAction = (index, nextNumProductSelected) => async (dispatch, getState) => {
    dispatch({
        type: CART_UPDATE_PRODUCT_SUCCESS,
        payload: {index, nextNumProductSelected},
    })

    localStorage.setItem('cartProduct', JSON.stringify(getState().cartAdd.carts))
}





