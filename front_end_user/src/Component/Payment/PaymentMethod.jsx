import { Box, styled } from '@mui/material'
import React from 'react'

const WrapBox = styled(Box)(({ theme }) => ({
    padding: '12px',
    marginBottom: '16px',
    backgroundColor: 'white',
    borderRadius: '8px'
}))

const TitleBox = styled(Box)(({ theme }) => ({
    fontSize: '20px',
    marginBottom: '8px'
}))

const PaymentMethod = () => {
    return (
        <WrapBox>
            <TitleBox>
                Phương thức thanh toán
            </TitleBox>
        </WrapBox>
    )
}

export default PaymentMethod