import { Route, Routes } from 'react-router-dom'
import Footer from './Component/Layout/Footer'
import Header from './Component/Layout/Header'
import HomeScreen from './HomeScreen/HomeScreen'
import { Box, Container, styled } from '@mui/material'
import NotFound from './Component/Common/NotFound'
import { useState } from 'react'
import ProductDetailScreen from './HomeScreen/ProductDetailScreen'

const CustomContainer = styled(Container)(({ theme }) => ({

  [theme.breakpoints.down('lg')]: {
    paddingLeft: '8px',
    paddingRight: '8px'
  },


  [theme.breakpoints.up('lg')]: {
    paddingLeft: '0px',
    paddingRight: '0px'
  },
}))

function App() {

  const [searchProduct, setSearchProduct] = useState('')

  const childToParent = (searchProduct) => {
    setSearchProduct(searchProduct)
  }

  return (

    <>
      <Header childToParent={childToParent}></Header>

      <Box component="main" sx={{ backgroundColor: '#F5F5F5', marginTop: { xs: '90px', sm: '100px' }, }}>

        <CustomContainer fixed >
          <Routes>

            <Route path="/" element={<HomeScreen searchProduct={searchProduct}/>} />
            <Route path="/product/:id" element={<ProductDetailScreen />} />
            <Route path="/*" element={<NotFound />} />

          </Routes>
        </CustomContainer>

      </Box>

      <Footer></Footer>
    </>

  )
}

export default App;
