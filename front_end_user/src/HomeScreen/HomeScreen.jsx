import { Box, Grid, Paper } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import CartProduct from '../Component/CartProduct'

const TitleBox = styled(Box)(({ theme }) => ({
  paddingTop: '16px',
  paddingLeft: '16px',
  paddingBottom: '16px',
  fontSize: '22px',
  fontWeight: '400',
  color: 'rgb(26, 148, 255)',
  backgroundColor: 'white',
  
  borderBottom: '4px solid rgb(26, 148, 255)',
  marginBottom: '10px',
  position: 'sticky',

  [theme.breakpoints.down('sm')]: {
    top: '90px',
  },


  [theme.breakpoints.up('sm')]: {
    top: '100px',
  },
 
  zIndex: '1000'
}))

const AllProductBox = styled(Box)(({ theme }) => ({
  
}))



const HomeScreen = () => {
  return (
    <Box
      sx={{
        paddingTop: '20px',
        paddingBottom: '32px'

      }}>

      <AllProductBox>

        <TitleBox>
          Tất cả sản phẩm
        </TitleBox>

        <Box>
          <Grid container spacing={1}>

            <Grid item xs={6} sm={4} md={3} lg={2}>
             <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

            <Grid item xs={6} sm={4} md={3} lg={2}>
               <CartProduct />
            </Grid>

          </Grid>
        </Box>

      </AllProductBox>

    </Box>
  )
}

export default HomeScreen