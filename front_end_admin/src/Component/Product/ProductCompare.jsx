import { Box, Button, styled, Link } from '@mui/material'
import React from 'react'
import { formatPrice } from '../../Utils/FormatPrice'
import {  NavLink } from 'react-router-dom';
const ImageItemBox = styled(Box)(({ theme }) => ({
    minWidth: '60px',
    width: '60px',
    height: '60px',
    marginRight: '10px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
}))

const CustomLink = styled(NavLink)({
    color: 'white',
    textDecoration: 'none',
    display: 'block',
})

const ProductCompare = (props) => {

    const { products } = props
    return (
        <>
            {
                (products && products.length > 0) ? (

                    products.map((product, index) => (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#fbfafa',
                                boxSizing: 'border-box',
                                marginBottom: '12px',
                                padding: '8px 3px 8px 3px',
                                borderRadius: '4px',
                                boxShadow: '1px 1px 4px 1px #e1d2d2'
                            }}
                        >
                            <ImageItemBox
                                sx={{
                                    backgroundImage: `url(${product.image ? product.image :
                                        ''})`,
                                }}
                            >
                            </ImageItemBox>

                            <Box
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: 'black',
                                    width: '50%',
                                }}
                            >
                                <Box
                                    sx={{
                                        fontWeight: 'bold',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical',
                                        marginBottom: '12px',
                                    }}
                                >
                                    {product.name}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            marginRight: '12px',
                                        }}
                                    >
                                        Ram: <Box component='span' sx={{ fontWeight: 'bold' }}>{product.ram}</Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            marginRight: '12px',
                                        }}
                                    >
                                        Rom: <Box component='span' sx={{ fontWeight: 'bold' }}>{product.rom}</Box>
                                    </Box>
                                    <Box>
                                        Color: <Box component='span' sx={{ fontWeight: 'bold' }}>{product.color}</Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >

                                <Box
                                    sx={{
                                        fontSize: '12px',
                                        color: 'rgba(0,0,0,.54)',
                                        textDecoration: 'line-through'
                                    }}
                                >

                                    {formatPrice(product.price)}
                                </Box>
                                <Box
                                    sx={{
                                        color: 'red',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}
                                >
                                    {formatPrice(product.priceDiscount)}

                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    width: '18%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >

                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        marginBottom: '4px',
                                        fontSize: '14px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {product.namePage}
                                </Box>

                                <Link href={product.linkProduct} target="_blank">
                                    <Button
                                        variant='contained'
                                        sx={{
                                            textTransform: 'none',
                                            padding: '2px 6px 2px 6px',
                                            fontSize: '12px'
                                        }}
                                    >
                                        Tới nơi bán
                                    </Button>
                                </Link>

                            </Box>

                        </Box>
                    ))

                ) : (
                    <Box
                        sx={{
                            textAlign: 'center',
                            fontSize: '18px',
                        }}
                    >
                        Hiện không có sản phẩm
                    </Box>
                )
            }
        </>
    )
}

export default ProductCompare