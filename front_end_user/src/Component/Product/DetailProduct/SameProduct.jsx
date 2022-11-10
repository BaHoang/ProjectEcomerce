import { Box, Grid, styled, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from '../CartProduct'

const TitleBox = styled(Box)(({ theme }) => ({
    paddingBottom: '16px',
    fontSize: '20px',
    fontWeight: '600',
}))

const SameBox = styled(Box)(({ theme }) => ({
    marginTop: '30px',
    borderRadius: '4px',
    padding: '16px'
  }))

const SameProduct = (props) => {

    const { product } = props
    const { brand, _id } = product
    const [listProductSame, setListProductSame] = useState([])

    useEffect(() => {
        const getSameProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/product/same?brand=${brand}&id=${_id}`)
                setListProductSame(data)
            } catch (error) {
                console.log("chec", error.response.status)
            }
        }
        getSameProduct()
    }, [])

    return (
        <SameBox>
            <TitleBox>
                Sản phẩm tương tự
            </TitleBox>

            <Box>

                <Grid container spacing={1}>

                    {
                        (
                            (listProductSame.length > 0)
                                ? listProductSame.map((product) => (
                                    <Grid item key={product._id} xs={6} sm={4} md={3} lg={2}>
                                        <CartProduct product={product} />
                                    </Grid>
                                ))
                                : (
                                    <Box
                                        sx={{
                                            margin: 'auto',
                                            fontSize: '20px',
                                        }}
                                    >
                                        Hiện không có sản phẩm tương tự
                                    </Box>
                                )
                        )
                    }

                </Grid>

            </Box >

        </SameBox >
    )
}

export default SameProduct