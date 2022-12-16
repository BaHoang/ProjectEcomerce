import { Box, Button, styled } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import React from 'react'
import { getNameStatus } from '../../../../Utils/GetNameStatus'
import { formatPrice } from '../../../../Utils/FormatPrice'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { confirmReceivedOrderAction, destroyOrderAction } from '../../../../Actions/orderAction'
import { useEffect } from 'react'
import { useState } from 'react'
import ReviewModal from '../Review/ReviewModal'
import axios from 'axios'

const OrderItemBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    marginBottom: '12px',
    padding: '24px',
    boxShadow: '0 1px 1px 0 rgb(0, 0, 0, 0.05)'
}))

const OrderStatusBox = styled(Box)(({ theme }) => ({
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(0,0,0,0.09)',
    textTransform: 'uppercase',
    textAlign: 'end',
    color: '#1c93fc'
}))

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

const WrapItemBox = styled(Box)(({ theme }) => ({
    paddingTop: '12px',
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(0,0,0,0.09)'
}))

const ItemBox = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

const PriceOldBox = styled(Box)(({ theme }) => ({
    paddingRight: '10px',
    textDecoration: 'line-through',
    fontSize: '12px',
    color: '#bebebe'
}))

const PriceDiscountBox = styled(Box)(({ theme }) => ({
    color: '#1c93fc'
}))

const TotalPriceBox = styled(Box)(({ theme }) => ({
    paddingTop: '24px',
    paddingBottom: '12px',
    textAlign: 'end'
}))

const WrapButtonBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
}))

const ErrorNotifyBox = styled(Box)(({ theme }) => ({
    color: 'red',
    fontSize: '12px',
    width: '126px',
    marginTop: '8px'
}))

const ActionBox = styled(Box)(({ theme }) => ({
    paddingTop: '12px',
}))

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

    const [openReviewModal, setOpenReviewModal] = useState(false)
    const [checkReview, setCheckReview] = useState(false)

    const handleRePurchase = () => {
        navigate(`/product/${idProduct}`)
    }

    const handleDestroyOrder = () => {
        dispatch(destroyOrderAction(userInfor, order._id))
    }

    const handleConfirmReceived = () => {
        dispatch(confirmReceivedOrderAction(userInfor, order._id))
    }

    const handleReviewOrder = () => {
        setOpenReviewModal(true)
    }

    const handleCloseReviewModal = () => {
        setOpenReviewModal(false)
    }

    useEffect(() => {
        const checkProductReview = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/product/${idProduct}`)
                const listReview = data.reviews


                for (let i = 0; i < listReview.length; i++) {
                    if (listReview[i].userId.toString() === userInfor._id.toString()) {
                        setCheckReview(true)
                        break
                    }
                }
            } catch (error) {
                console.log("loi")
            }
        }

        checkProductReview()
    }, [])

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
        <OrderItemBox>
            <OrderStatusBox>
                {getNameStatus(orderStatus)}
            </OrderStatusBox>

            <WrapItemBox>
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
                            <PriceOldBox>
                                {formatPrice(price)}
                            </PriceOldBox>

                            <PriceDiscountBox>
                                {formatPrice(priceDiscount)}
                            </PriceDiscountBox>
                        </PriceBox>
                    </ItemBox>
                </CustomLink >
            </WrapItemBox>

            <TotalPriceBox>
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
            </TotalPriceBox>

            <ActionBox>
                {
                    (orderStatus < 3) && (
                        <WrapButtonBox>
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
                                    <ErrorNotifyBox>
                                        Lỗi không thể hủy đơn hàng. Bạn hãy thử lại.
                                    </ErrorNotifyBox>
                                )
                            }
                        </WrapButtonBox>
                    )
                }

                {
                    (orderStatus === 4) && (
                        <WrapButtonBox>
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
                                    <ErrorNotifyBox>
                                        Lỗi.Bạn hãy thử lại.
                                    </ErrorNotifyBox>
                                )
                            }
                        </WrapButtonBox>
                    )
                }

                {
                    (orderStatus === 5) && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            {
                                checkReview ? (
                                    <Box sx={{ color: 'rgba(0,0,0,.54)', fontSize: '12px' }}>
                                        Sản phẩm đã được nhận xét.
                                    </Box>
                                ) : (
                                    <Box sx={{ color: 'black', fontSize: '12px' }}>
                                        Sản phẩm chưa được nhận xét.
                                    </Box>
                                )
                            }

                            <Box>
                                <Button
                                    variant='contained'
                                    onClick={handleReviewOrder}
                                    disabled={checkReview}
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
                            </Box>
                        </Box>
                    )
                }

                {
                    (orderStatus === 6) && (
                        <WrapButtonBox>
                            <Button
                                variant='contained'
                                onClick={handleRePurchase}
                                sx={{
                                    textTransform: 'capitalize',
                                }}
                            >
                                Mua lại
                            </Button>
                        </WrapButtonBox>
                    )
                }
            </ActionBox>

            {
                (openReviewModal) && <ReviewModal
                    openReviewModal={openReviewModal}
                    handleCloseReviewModal={handleCloseReviewModal}
                    idProduct={idProduct}
                />
            }
        </OrderItemBox>
    )
}

export default ItemOrder