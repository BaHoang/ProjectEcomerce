export const getNamePaymentMethod = (paymentMethod) => {
    switch (paymentMethod) {
      case 0: 
        return 'Thanh toán khi nhận hàng'
      case 1: 
        return 'VNPay'
     
      default:
        return 'Thiếu dữ liệu'
    }
  }