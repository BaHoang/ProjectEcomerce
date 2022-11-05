import { Route, Routes } from 'react-router-dom'
import Footer from './Component/Footer'
import Header from './Component/Header'
import HomeScreen from './HomeScreen/HomeScreen'
import NotFound from './Component/NotFound'
import { Box, Container, styled } from '@mui/material'

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
  return (

    <>
      <Header></Header>

      <Box component="main" sx={{ backgroundColor: '#F5F5F5', marginTop: { xs: '90px', sm: '100px' }, }}>

        <CustomContainer fixed >
          <Routes>

            <Route path="/" element={<HomeScreen />} />
            <Route path="/*" element={<NotFound />} />

          </Routes>
        </CustomContainer>

      </Box>

      <Footer></Footer>
    </>

  )
}

export default App;
