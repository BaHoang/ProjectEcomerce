import { Box, Container, IconButton, InputBase, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { styled } from '@mui/system'

const CustomContainer = styled(Container)(({ theme }) => ({
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '8px',
    paddingRight: '8px'
  },
}))

const NameBox = styled(Box)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: '800',
  color: 'white',
  width: '200px',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
}))

const InputBox = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: 'rgb(245, 245, 245)',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0px 1px 2px 1px rgba(98, 98, 98, 0.5)',
  borderRadius: '4px',
  height: '40px',
  [theme.breakpoints.down('sm')]: {
    height: '36px',
  },
}))

const CustomInputIconButton = styled(IconButton)(({ theme }) => ({
  padding: '5px',
  marginRight: '4px',
  width: '60px',
  backgroundColor: 'rgba(13, 92, 182, 1)',
  borderRadius: '0',
  '&:hover': {
    backgroundColor: 'rgba(13, 92, 182, 0.7)',
  },

  [theme.breakpoints.down('sm')]: {
    padding: '6px 3px 6px 3px',
    width: '52px',
  },

}))

const WrapIconBox = styled(Box)(({ theme }) => ({
  width: '280px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100px',
  },
}))

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  display: "flex",
  flexDirection: 'column',
  marginLeft: '20px',
  color: 'rgba(255, 255, 255, 1)',
  '&:hover': {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '4px',
    padding: '4px'
  },
}))

const Header = () => {
  return (
    <Box
      component='header'
      sx={{
        backgroundColor: 'rgb(26, 148, 255)',
        width: '100%',
        height: {xs: '90px', sm: '100px'},
        position: 'fixed',
        top: 0
      }}
    >

      <CustomContainer fixed >
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

            <CustomInputIconButton
              aria-label="menu"
              type='submit'
            >
              <SearchIcon sx={{ color: 'white', fontSize: {xs: 18, sm: 24} }} />
            </CustomInputIconButton>
          </InputBox>

          <WrapIconBox>

            <CustomIconButton aria-label="add to shopping cart" >
              <ShoppingCartIcon />
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Giỏ hàng
              </Typography>
            </CustomIconButton>

            <CustomIconButton aria-label="add to shopping cart" >
              <PersonOutlineIcon />
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Đăng nhập
              </Typography>
            </CustomIconButton>

          </WrapIconBox>

        </Box>
      </CustomContainer>

    </Box>
  )
}

export default Header