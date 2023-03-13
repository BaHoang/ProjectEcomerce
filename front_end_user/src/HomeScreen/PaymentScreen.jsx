import { Box, Button, styled, Table, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteManyItemCartAction } from '../Actions/cartAction'
import { orderProductAction, resetOrderProductAction } from '../Actions/orderAction'
import Loading from '../Component/Common/Loading'
import DeliveryAddressInforNotEnoughError from '../Component/DeliveryAddressScreen/DeliveryAddressInforNotEnoughError'
import NamePageBody from '../Component/Layout/NamePageBody'
import Address from '../Component/Payment/DeliveryAddress/Address'

import ListProduct from '../Component/Payment/ListProduct'
import Message from '../Component/Payment/Message'
import PaymentMethod from '../Component/Payment/PaymentMethod'
import TransportMethod from '../Component/Payment/TransportMethod'
import { formatPrice } from '../Utils/FormatPrice'

const WrapBox = styled(Box)(({ theme }) => ({
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.1)',

}))

const SummaryBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },

    [theme.breakpoints.between('sm', 'md')]: {
        width: '70%',
    },

    [theme.breakpoints.between('md', 'lg')]: {
        width: '60%',
    },

    [theme.breakpoints.up('lg')]: {
        width: '40%',
    },

    marginLeft: 'auto'
}))

const CustomTableCell = styled(TableCell)(({ theme }) => ({

    color: 'rgba(0, 0, 0, 0.6)',
    borderBottom: 'none',
    [theme.breakpoints.up('sm')]: {
        textAlign: 'right',
    },
    [theme.breakpoints.up('md')]: {
        textAlign: 'right',
    },
    paddingTop: '8px',
    paddingBottom: '8px'
}))

const WrapPlaceOrderBox = styled(Box)(({ theme }) => ({
    borderTop: '1px dashed rgba(0, 0, 0, 0.1)',
    paddingTop: '30px',
    paddingBottom: '18px',
    display: 'flex',
    justifyContent: 'end'

}))

const PlaceOrderButton = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: 'rgb(28,147,252)',
    fontSize: '16px',
    lineHeight: 1,
    boxSizing: 'border-box',

    padding: '12px 36px 12px 36px',

    [theme.breakpoints.down('md')]: {
        width: '100%'
    },

    [theme.breakpoints.up('md')]: {
        width: '210px',
    },

    '&:hover': {
        backgroundColor: 'rgba(28,147,252,0.8)',
        color: 'rgba(255,255,255,0.8)'
    },

}))
const PaymentScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const shippingPrice = 0

    const user = useSelector(state => state.user)
    var { userInfor } = user

    const createOrder = useSelector(state => state.createOrder)
    const { loading, success, error } = createOrder

    const currentDeliveryAddress = useSelector(state => state.currentDeliveryAddress)
    const { address } = currentDeliveryAddress

    const cartAdd = useSelector(state => state.cartAdd)
    var { carts } = cartAdd

    const paymentInfor = useSelector(state => state.paymentInfor)
    var { transportMethod, note, paymentMethod, listProduct } = paymentInfor

    const [totalPrice, setTotalPrice] = useState(0)
    const [errorNotEnoughInfor, setErrorNotEnoughInfor] = useState(false)

    const placeOrder = () => {

        var checkData = true

        if (Object.keys(address).length === 0) {
            checkData = false
        }

        if (listProduct.length === 0) {
            checkData = false
        } else {
            var listProductPlaceOrder = []
            for (let i = 0; i < listProduct.length; i++) {
                if (listProduct[i]) {
                    let numOfProd = carts[i].numProductSelected
                    let name = carts[i].name
                    let price = carts[i].price
                    let priceDiscount = carts[i].priceDiscount
                    let discount = 1 - priceDiscount / price
                    let id = carts[i].id

                    let orderProd = {
                        name,
                        price,
                        priceDiscount,
                        discount,
                        id
                    }

                    listProductPlaceOrder.push({ numOfProd, orderProd })
                }
            }
        }

        if (checkData) {
            dispatch(orderProductAction(userInfor, listProductPlaceOrder, address, transportMethod, note, paymentMethod, shippingPrice))
        } else {
            setErrorNotEnoughInfor(true)
        }
    }

    useEffect(() => {
        const total = listProduct.reduce(
            (sum, stateProduct, index) => {
                if (stateProduct === true) {
                    return sum + carts[index].priceDiscount * carts[index].numProductSelected
                }
                return sum
            },
            0
        )

        setTotalPrice(total)
    }, [carts, listProduct])

    // cap nhat khi xoa san pham trong gio hang
    useEffect(() => {
        if (listProduct.length === 0) {
            navigate('/cart')
        }

    }, [listProduct])

    // dan cho de sua navigate
    useEffect(() => {
        if (success) {
            dispatch(deleteManyItemCartAction(listProduct))
            dispatch(resetOrderProductAction())
            navigate('/user/purchase?statusOrder=0')
        }

    }, [success])


    // dan cho de sua navigate
    useEffect(() => {
        if (address && Object.keys(address).length !== 0) {
            setErrorNotEnoughInfor(false)
        }

    }, [address])

    return (
        <Box
            sx={{
                paddingTop: '20px',
                paddingBottom: '50px'
            }}
        >
            <NamePageBody namePage="Tiến hành thanh toán" />
            {
                loading && <Loading />
            }

            {
                error && <Box>Order Product Fail. Try again</Box>
            }

            {
                errorNotEnoughInfor && <DeliveryAddressInforNotEnoughError />
            }
            <Address />
            <TransportMethod />
            <ListProduct />
            <Message />
            <PaymentMethod />

            <WrapBox>
                <SummaryBox>
                    <Table>
                        <TableBody>
                            <TableRow >
                                <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                                    Tổng tiền hàng
                                </CustomTableCell>
                                <CustomTableCell sx={{ paddingRight: '0px', color: 'black' }}>
                                    {formatPrice(totalPrice)}
                                </CustomTableCell>
                            </TableRow>

                            <TableRow>
                                <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                                    Phí vận chuyển
                                </CustomTableCell>
                                <CustomTableCell sx={{ paddingRight: '0px', color: 'black', }}>
                                    {formatPrice(shippingPrice)}
                                </CustomTableCell>
                            </TableRow>

                            <TableRow>
                                <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                                    Tổng thanh toán
                                </CustomTableCell>
                                <CustomTableCell sx={{ color: 'red', paddingRight: '0px', fontSize: '24px' }}>
                                    {formatPrice(totalPrice + shippingPrice)}
                                </CustomTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </SummaryBox>

                <WrapPlaceOrderBox>
                    <PlaceOrderButton
                        onClick={() => placeOrder()}
                    >
                        Đặt hàng
                    </PlaceOrderButton>
                </WrapPlaceOrderBox>
            </WrapBox>

        </Box >
    )
}

export default PaymentScreen