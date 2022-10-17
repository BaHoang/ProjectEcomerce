export const getNameStatus = (status) => {
    switch (status) {
      case 0: 
        return 'Chờ xác nhận'
      case 1: 
        return 'Đã xác nhận'
      case 2:
        return 'Chuẩn bị hàng'
      case 3: 
      return 'Bàn giao vận chuyển'
      case 4: 
      return 'Đang giao'
      case 5:
        return 'Đã giao'
      case 6:
        return 'Đã hủy'
      default:
        return 'Thiếu dữ liệu'
    }
  }