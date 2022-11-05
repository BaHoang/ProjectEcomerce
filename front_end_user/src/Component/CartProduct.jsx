import { Box, styled, Typography } from '@mui/material'
import React from 'react'

const CartBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    backgroundColor: 'white',
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.1)',
    transition: 'transform linear 0.1s',

    '&:hover': {
        transform: 'translateY(-1px)',
    },
}))

const NameProductTypography = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 500,
    margin: ' 7px 10px ',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
}))

const WrapPriceBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    justifyContent: 'space-between'
}))

const OldPriceBox = styled(Box)(({ theme }) => ({
    fontSize: '12px',
    textDecoration: 'line-through',
    color: '#918e8e',
    marginLeft: '10px',
}))


const CurrentPriceBox = styled(Box)(({ theme }) => ({
    fontSize: '14px',
    color: 'red',
    marginLeft: '10px',
    marginRight: '10px'
}))

const NumberProductInStockBox = styled(Box)(({ theme }) => ({

    margin: '7px 10px 0px 10px',
    paddingBottom: '7px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    color: 'rgba(0,0,0,.87)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '12px',
}))

const CartProduct = () => {
    return (
        <CartBox>

            <Box
                sx={{
                    paddingTop: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundImage: "url('https://cdn.24h.com.vn/upload/3-2022/images/2022-09-05/MU-chinh-thuc-cong-bo-doi-hinh-da-cup-chau-au-3-SAO-bi-loai-Ronaldo-gop-mat-3-1662395551-785-width740height493.jpg')",
                }}
            >
            </Box>

            <NameProductTypography variant='h4'>
                Bong dong luc dung rat tot. Da duoc ro su dung tot dep qua
            </NameProductTypography>

            <WrapPriceBox>
                <OldPriceBox component='span'>
                    12.300.000d
                </OldPriceBox>

                <CurrentPriceBox component='span'>
                    10.000.000d
                </CurrentPriceBox>

            </WrapPriceBox>

            <NumberProductInStockBox>
                <Box component='span'>
                    Chỉ còn 2
                </Box>
            </NumberProductInStockBox>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '40px',
                    height: '36px',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 216, 64, 0.95)',
                   
                    
                    '&::before': {
                        content: '""',
                        borderWidth: '0px 20px 6px',
                        borderStyle: 'solid',
                        borderColor: 'transparent rgba(255, 216, 64, 0.95) transparent rgba(255, 216, 64, 0.95)',
                        position: 'absolute',
                        top: '100%',
                        right: '0',
                    }
                }}
            >
                <Box
                    sx={{
                        color: 'red',
                        fontWeight: 600,
                        fontSize: '12px',
                        lineHeight: '16px',
                        paddingTop: '4px'
                    }}
                    >
                    10%
                </Box>

                <Box  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '12px',
                }}>
                    GIAM
                </Box>
            </Box>

        </CartBox >

    )
}

export default CartProduct