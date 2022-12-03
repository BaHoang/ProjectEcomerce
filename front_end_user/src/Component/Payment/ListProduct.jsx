import { Box, styled } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from '../../Utils/FormatPrice'

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

const CartItemBox = styled(Box)(({ theme }) => ({
    marginBottom: '12px',
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '12px',
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px dashed #bdb7b7',
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

const ImageItemBox = styled(Box)(({ theme }) => ({
    minWidth: '64px',
    width: '64px',
    height: '64px',
    marginRight: '16px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
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

const PriceItemBox = styled(Box)(({ theme }) => ({
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
        paddingRight: '10px',
        width: '20%',
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

const TotalPriceItemBox = styled(Box)(({ theme }) => ({
    color: 'rgb(28,147,252)',
    fontWeight: '500',
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
        justifyContent: 'end'
    },

    [theme.breakpoints.up('md')]: {
        width: '20%',
        justifyContent: 'end'
    },
}))

const ListProduct = () => {
    const cartAdd = useSelector(state => state.cartAdd)
    var { carts } = cartAdd

    const paymentInfor = useSelector(state => state.paymentInfor)
    var { listProduct } = paymentInfor
    return (
        <WrapBox>
            <TitleBox>
                Sản phẩm
            </TitleBox>

            <Box>
                {
                    listProduct.map((item, index) => {
                        if (item) {
                            return (
                                <CartItemBox>

                                    <ImageAndNameItemBox>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <ImageItemBox
                                                sx={{
                                                    backgroundImage: `url(${carts[index].image ? carts[index].image :
                                                        'https://cdn.24h.com.vn/upload/3-2022/images/2022-09-05/MU-chinh-thuc-cong-bo-doi-hinh-da-cup-chau-au-3-SAO-bi-loai-Ronaldo-gop-mat-3-1662395551-785-width740height493.jpg'})`,
                                                }}
                                            >
                                            </ImageItemBox>

                                            <NameItemBox>
                                                {carts[index].name}
                                            </NameItemBox>
                                        </Box>

                                    </ImageAndNameItemBox>

                                    <PriceItemBox>
                                        {formatPrice(carts[index].priceDiscount)}
                                    </PriceItemBox>

                                    <QtyItemBox>
                                        {carts[index].numProductSelected}
                                    </QtyItemBox>

                                    <TotalPriceItemBox>
                                        {formatPrice(carts[index].numProductSelected * carts[index].priceDiscount)}
                                    </TotalPriceItemBox>

                                </CartItemBox>
                            )
                        }
                    })
                }
            </Box>

        </WrapBox>
    )
}

export default ListProduct