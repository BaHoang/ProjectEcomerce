export const getNameTransportMethod = (transportMethod) => {
    switch (transportMethod) {
        case 0:
            return 'Tiêu chuẩn '
        case 1:
            return 'Tiết kiệm'
        case 2:
            return 'Nhanh'
        default:
            return 'Thiếu dữ liệu'
    }
}