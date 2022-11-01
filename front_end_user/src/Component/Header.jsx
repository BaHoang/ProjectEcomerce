
import { Box, Container, IconButton, InputBase, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { styled } from '@mui/system'

const CustomIconButton = styled(IconButton)({
  display: "flex",
  flexDirection: 'column',
  marginLeft: '20px',
  color: 'rgba(255, 255, 255, 1)',
  '&:hover': {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
  },

})

const InputBox = styled(Box)({
  flex: 1,
  backgroundColor: 'rgb(245, 245, 245)',
  display: 'flex',
  alignItems: 'center',
  height: '40px',
  boxShadow: '0px 1px 2px 1px rgba(98, 98, 98, 0.5)'
  //rgb(98 98 98 / 50%) 0px 1px 2px 0px
})

const WrapIconBox = styled(Box)({
  width: '280px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  alignItems: 'center'
})

const NameBox = styled(Box)({
  fontSize: '22px',
  fontWeight: '800',
  color: 'white',
  width: '200px'
})

const Header = () => {
  return (
    <Box
      component='header'
      sx={{
        backgroundColor: 'rgb(26, 148, 255)',
        width: '100%',
        height: '100px',
        position: 'fixed',
        top: 0
      }}
    >

      <Container fixed sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%'
          }}
        >
          <NameBox>
            ShopTelephone
          </NameBox>

          <InputBox>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm kiếm sản phẩm ..."
            // onChange={handleChange}
            // value={tempText}
            />

            <IconButton
              sx={{
                p: '5px',
                marginRight: '4px',
                width: '60px',
                bgcolor: 'rgb(13, 92, 182)',
                borderRadius: '0',
                '&:hover': {
                  backgroundColor: 'rgba(13, 92, 182, 0.8)',
                },
              }}
              aria-label="menu"
              type='submit'
            >
              <SearchIcon sx={{ color: 'white' }} />
            </IconButton>
          </InputBox>

          <WrapIconBox>

            <CustomIconButton aria-label="add to shopping cart" >
              <ShoppingCartIcon />
              <Typography variant="body2" >
                Giỏ hàng
              </Typography>
            </CustomIconButton>

            <CustomIconButton aria-label="add to shopping cart" >
              <PersonOutlineIcon />
              <Typography variant="body2" >
                Đăng nhập
              </Typography>
            </CustomIconButton>

          </WrapIconBox>

        </Box>
      </Container>

    </Box>
  )
}

export default Header