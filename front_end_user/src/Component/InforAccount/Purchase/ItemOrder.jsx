import { Box, Button, styled } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import React from 'react'
import { getNameStatus } from '../../../Utils/GetNameStatus'
import { formatPrice } from '../../../Utils/FormatPrice'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { confirmReceivedOrderAction, destroyOrderAction } from '../../../Actions/orderAction'
import { useEffect } from 'react'
import { useState } from 'react'

const ImageAndNameItemBox = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',

    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginBottom: '8px',
    },
    [theme.breakpoints.up('md')]: {
        flex: 1,
        paddingRight: '16px',
    },
}))

const NameItemBox = styled(Box)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 500,
    color: 'black',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
}))

const ItemBox = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}))

const PriceBox = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginBottom: '16px',
        justifyContent: 'end'
    },

    [theme.breakpoints.between('sm', 'md')]: {
        width: '40%',
    },

    [theme.breakpoints.up('md')]: {

        width: '30%',
        justifyContent: 'end'
    },
}))

const QtyItemBox = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginBottom: '16px',
        justifyContent: 'end'
    },

    [theme.breakpoints.between('sm', 'md')]: {
        width: '20%',
        justifyContent: 'center'
    },

    [theme.breakpoints.up('md')]: {
        width: '10%',
        paddingRight: '10px',
        justifyContent: 'center'
    },
}))

const CustomLink = styled(NavLink)({
    textDecoration: 'none',
})

const ItemOrder = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { order, handleChangeStatusOrder } = props

    const user = useSelector(state => state.user)
    const { userInfor } = user

    const destroyOrder = useSelector(state => state.destroyOrder)
    const {
        loading: loadingDestroy,
        error: errorDestroy,
        idOrder: idOrderDestroy,
        success: successDestroy,
    } = destroyOrder

    const confirmReceivedOrder = useSelector(state => state.confirmReceivedOrder)
    const {
        loading: loadingConfirmReceived,
        error: errorConfirmReceived,
        idOrder: idOrderConfirmReceived,
        success: successConfirmReceived,
    } = confirmReceivedOrder

    var orderStatus = ''
    var numOfProd = 0
    var name = ''
    var price = ''
    var priceDiscount = ''
    var id = ''
    var idProduct = ''

    if (order) {
        orderStatus = (typeof order.orderStatus !== "undefined") ? order.orderStatus : ''
        numOfProd = order.numOfProd ? order.numOfProd : 0
        name = order.orderProd && order.orderProd.name ? order.orderProd.name : ''
        price = order.orderProd && order.orderProd.price ? order.orderProd.price : ''
        priceDiscount = order.orderProd && order.orderProd.priceDiscount ? order.orderProd.priceDiscount : ''
        id = order._id ? order._id : ''
        idProduct = order.orderProd && order.orderProd.id ? order.orderProd.id : ''
    }

    const handleRePurchase = () => {
        navigate(`/product/${idProduct}`)
    }

    const handleDestroyOrder = () => {
        dispatch(destroyOrderAction(userInfor, order._id))
    }

    const handleConfirmReceived = () => {
        dispatch(confirmReceivedOrderAction(userInfor, order._id))
    }

    useEffect(() => {
        if (successDestroy) {
            handleChangeStatusOrder(6)
        }
    }, [successDestroy])

    useEffect(() => {
        if (successConfirmReceived) {
            handleChangeStatusOrder(5)
        }
    }, [successConfirmReceived])

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                marginBottom: '12px',
                padding: '24px',
                boxShadow: '0 1px 1px 0 rgb(0, 0, 0, 0.05)'
            }}
        >
            <Box>
                <Box
                    sx={{
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(0,0,0,0.09)',
                        textTransform: 'uppercase',
                        textAlign: 'end',
                        color: '#1c93fc'
                    }}
                >
                    {getNameStatus(orderStatus)}
                </Box>

                <Box
                    sx={{
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(0,0,0,0.09)'
                    }}
                >
                    <CustomLink to={`/user/purchase/order/${id}`}>
                        <ItemBox>
                            <ImageAndNameItemBox>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <NameItemBox>
                                        {name}
                                    </NameItemBox>
                                </Box>
                            </ImageAndNameItemBox>

                            <QtyItemBox>
                                {numOfProd}
                            </QtyItemBox>

                            <PriceBox>
                                <Box
                                    sx={{
                                        paddingRight: '10px',
                                        textDecoration: 'line-through',
                                        fontSize: '12px',
                                        color: '#bebebe'
                                    }}
                                >
                                    {formatPrice(price)}
                                </Box>

                                <Box
                                    sx={{
                                        color: '#1c93fc'
                                    }}
                                >
                                    {formatPrice(priceDiscount)}
                                </Box>
                            </PriceBox>
                        </ItemBox>
                    </CustomLink >
                </Box>
            </Box>

            <Box
                sx={{
                    paddingTop: '24px',
                    paddingBottom: '12px',
                    textAlign: 'end'
                }}
            >
                <Box component='span'>
                    Tổng số tiền:{" "}
                </Box>

                <Box
                    component='span'
                    sx={{
                        fontSize: '24px',
                        color: 'red'
                    }}
                >
                    {formatPrice(priceDiscount * numOfProd)}
                </Box>
            </Box>

            <Box
                sx={{
                    paddingTop: '12px',
                    display: 'flex',
                    justifyContent: 'end'
                }}
            >
                {
                    (orderStatus < 3) && (
                        <Box>
                            <LoadingButton
                                variant="contained"
                                onClick={handleDestroyOrder}
                                loading={(loadingDestroy && idOrderDestroy) && (idOrderDestroy == id)}

                                sx={{
                                    textTransform: 'capitalize'
                                }}
                            >
                                Hủy đơn hàng
                            </LoadingButton>

                            {
                                ((errorDestroy && idOrderDestroy) && (idOrderDestroy == id)) && (
                                    <Box
                                        sx={{
                                            color: 'red',
                                            fontSize: '12px',
                                            width: '126px',
                                            marginTop: '8px'
                                        }}
                                    >
                                        Lỗi không thể hủy đơn hàng. Bạn hãy thử lại.
                                    </Box>
                                )
                            }
                        </Box>
                    )
                }

                {
                    (orderStatus === 4) && (
                        <Box>
                            <LoadingButton
                                variant="contained"
                                onClick={handleConfirmReceived}
                                loading={(loadingConfirmReceived && idOrderConfirmReceived) && (idOrderConfirmReceived == id)}

                                sx={{
                                    textTransform: 'capitalize'
                                }}
                            >
                                Đã nhân hàng
                            </LoadingButton>

                            {
                                ((errorConfirmReceived && idOrderConfirmReceived) && (idOrderConfirmReceived == id)) && (
                                    <Box
                                        sx={{
                                            color: 'red',
                                            fontSize: '12px',
                                            width: '126px',
                                            marginTop: '8px'
                                        }}
                                    >
                                        Lỗi. Bạn hãy thử lại.
                                    </Box>
                                )
                            }
                        </Box>
                    )
                }


                {
                    (orderStatus === 5) && (
                        <>
                            <Button
                                variant='contained'
                                sx={{
                                    textTransform: 'capitalize'
                                }}
                            >
                                Nhận xét
                            </Button>

                            <Button
                                variant='outlined'
                                onClick={handleRePurchase}
                                sx={{
                                    textTransform: 'capitalize',
                                    marginLeft: '16px'
                                }}
                            >
                                Mua lại
                            </Button>
                        </>

                    )
                }

                {
                    (orderStatus === 6) && (
                        <>
                            <Button
                                variant='contained'
                                onClick={handleRePurchase}
                                sx={{
                                    textTransform: 'capitalize',
                                }}
                            >
                                Mua lại
                            </Button>
                        </>

                    )
                }
            </Box>
        </Box >
    )
}

export default ItemOrder