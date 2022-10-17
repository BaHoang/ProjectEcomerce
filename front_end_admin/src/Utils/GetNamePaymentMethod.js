export const getNamePaymentMethod = (paymentMethod) => {
    switch (paymentMethod) {
      case 0: 
        return 'Tiền mặt '
      case 1: 
        return 'VNPay'
     
      default:
        return 'Thiếu dữ liệu'
    }
  }