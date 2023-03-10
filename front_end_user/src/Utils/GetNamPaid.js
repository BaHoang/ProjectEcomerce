export const getNamePaid = (isPaid) => {
    switch (isPaid) {
        case true:
            return 'Rồi'
        case false:
            return 'Chưa'
        default:
            return 'Thiếu dữ liệu'
    }
}