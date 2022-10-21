export const getNameButtonUpdate = (status) => {
    switch (status) {
        case 0:
            return 'Xác nhận đơn hàng'
        case 1:
            return 'Chuẩn bị hàng'
        case 2:
            return 'Bàn giao vận chuyển'
        case 3:
            return 'Giao hàng'
        case 4:
            return 'Giao hàng thành công'
        default:
            return 'Thiếu dữ liệu'
    }
}
