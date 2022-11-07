import { Box, Grid, Pagination, Paper } from '@mui/material'
import { styled } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Actions/productAction'
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

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { products, totalPage, loading, error } = productList

  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 18
  })

  const [searchProduct, setSearchProduct] = useState('')

  const handleChangePage = (event, value) => {
    setPageState(old => ({ ...old, page: value }))
  }

  useEffect(() => {
    dispatch(listProducts(pageState.page, pageState.pageSize, searchProduct))
  }, [pageState.page])

  return (
    <Box
      sx={{
        paddingTop: '20px',
        paddingBottom: '50px'
      }}>

      <AllProductBox>

        <TitleBox>
          Tất cả sản phẩm
        </TitleBox>

        {loading ? (
          <Box>Loadning ... </Box>
        ) : error ? (
          <Box>{error} ... </Box>
        ) : (

          <Box>

            <Grid container spacing={1}>

              {products.map((product) => (

                <Grid item key={product._id} xs={6} sm={4} md={3} lg={2}>
                  <CartProduct product={product} />
                </Grid>

              ))}

            </Grid>

            <Box
              sx={{
                paddingTop: '40px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={totalPage}
                page={pageState.page}
                onChange={handleChangePage}
                color="primary"
                size="large"
              />
            </Box>


          </Box>

        )}

      </AllProductBox>

    </Box>
  )
}

export default HomeScreen