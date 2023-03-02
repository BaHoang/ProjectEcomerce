export const formatPrice = (price) => {
    if (price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ'
    } else {
        return '0 đ'
    }
}