import { Route, Routes } from 'react-router-dom'
import Footer from './Component/Layout/Footer'
import Header from './Component/Layout/Header'
import HomeScreen from './HomeScreen/HomeScreen'
import { Box, Container, styled } from '@mui/material'
import NotFound from './Component/Common/NotFound'
import { useState } from 'react'
import ProductDetailScreen from './HomeScreen/ProductDetailScreen'
import { UserLoginScreen } from './HomeScreen/UserLoginScreen'
import PrivateRoutes from './Component/Login/PrivateRoutes'
import CartScreen from './HomeScreen/CartScreen'
import PaymentScreen from './HomeScreen/PaymentScreen'
import TemplateInforAccount from './Component/InforAccount/TemplateInforAccount'
import PurchaseScreen from './HomeScreen/PurchaseScreen'
import AccountScreen from './HomeScreen/AccountScreen'
import DeliveryAddressScreen from './HomeScreen/DeliveryAddressScreen'
import DetailOrderScreen from './HomeScreen/DetailOrderScreen'

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

      <Box component="main" sx={{ backgroundColor: '#f1f1f1', marginTop: { xs: '90px', sm: '100px' }, }}>

        <CustomContainer fixed >
          <Routes>
            <Route path="/" element={<HomeScreen searchProduct={searchProduct} />} />
            <Route path="/product/:id" element={<ProductDetailScreen />} />
            <Route path="/login" element={<UserLoginScreen />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path='/user' element={<TemplateInforAccount />}>
                <Route path="purchase" element={<PurchaseScreen />} />
                <Route path="account" element={<AccountScreen />} />
                <Route path="deliveryAddress" element={<DeliveryAddressScreen />} />
                <Route path="purchase/order/:id" element={<DetailOrderScreen />} />
              </Route>
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </CustomContainer>

      </Box>

      <Footer></Footer>
    </>

  )
}

export default App;
