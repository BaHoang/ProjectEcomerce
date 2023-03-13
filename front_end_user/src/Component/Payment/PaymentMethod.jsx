import { Box, Radio, styled } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paymentMethodAction } from '../../Actions/paymentInforAction'

const WrapBox = styled(Box)(({ theme }) => ({
    padding: '12px',
    marginBottom: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.1)'
}))

const TitleBox = styled(Box)(({ theme }) => ({
    fontSize: '20px',
    marginBottom: '8px'
}))

const ItemBox = styled(Box)(({ theme }) => ({

    display: "flex",
    alignItems: 'center',
    cursor: 'pointer',

    [theme.breakpoints.down('700')]: {
        width: '100%',
        marginBottom: '8px',
    },

    [theme.breakpoints.up('700')]: {
        marginRight: '16px',
    },

}))

const PaymentMethod = () => {
    const listPaymentMethod = ["Thanh toán khi nhận hàng", "Thanh toán Online qua cổng VNPAY"]

    const dispatch = useDispatch()

    const paymentInfor = useSelector(state => state.paymentInfor)
    var { paymentMethod } = paymentInfor

    const handleChangePaymentMethod = (index) => {
        if (index == 0) {
            dispatch(paymentMethodAction(index))
        }

    }
    return (
        <WrapBox>
            <TitleBox>
                Phương thức thanh toán
            </TitleBox>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    fontSize: '16px'
                }}
            >
                {
                    listPaymentMethod.map((paymentMethodText, index) => (
                        <ItemBox
                            onClick={() => handleChangePaymentMethod(index)}
                            key={index}

                        >
                            <Box sx={{ paddingRight: '8px' }}>
                                <Radio
                                    checked={paymentMethod === index}
                                    onChange={() => handleChangePaymentMethod(index)}
                                    value={index}
                                    name="radio-buttons"
                                    sx={{
                                        padding: '0px',
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 20,
                                        },
                                    }}
                                />
                            </Box>

                            <Box>
                                {paymentMethodText}
                            </Box>
                        </ItemBox>
                    ))
                }
            </Box>
        </WrapBox>
    )
}

export default PaymentMethod