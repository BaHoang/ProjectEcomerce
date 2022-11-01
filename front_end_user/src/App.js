import { Route, Routes } from 'react-router-dom'
import Footer from './Component/Footer';
import Header from './Component/Header';
import HomeScreen from './HomeScreen/HomeScreen';
import NotFound from './Component/NotFound';
import { Box, Container } from '@mui/material';

function App() {
  return (

    <>
      <Header></Header>
      <Box component="main" sx={{ backgroundColor: '#efefef' }}>

        <Container fixed >
          <Routes>

            <Route path="/" element={<HomeScreen />} />
            <Route path="/*" element={<NotFound />} />

          </Routes>
        </Container>

      </Box>
      <Footer></Footer>
    </>

  )
}

export default App;
