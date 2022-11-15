import { Box, Container, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import { styled } from '@mui/system'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../Actions/userAction'

const CustomContainer = styled(Container)(({ theme }) => ({
  height: '100%',
  [theme.breakpoints.down('lg')]: {
    paddingLeft: '8px',
    paddingRight: '8px'
  },


  [theme.breakpoints.up('lg')]: {
    paddingLeft: '0px',
    paddingRight: '0px'
  },

}))

const CustomLink = styled(NavLink)({
  textDecoration: 'none',
  color: 'white',
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
})

const CustomProfileLink = styled(NavLink)({
  textDecoration: 'none',
  color: 'black',
})


const NameBox = styled(Box)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: '800',
  width: '200px',
  [theme.breakpoints.down('md')]: {
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

  [theme.breakpoints.between('sm', 'md')]: {
    width: '160px',
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

  [theme.breakpoints.between('sm', 'md')]: {
    marginLeft: '10px',
    padding: '4px'
  },
}))

const Header = (props) => {

  const childToParent = props.childToParent

  const user = useSelector(state => state.user)
  var { userInfor } = user

  const dispatch = useDispatch()

  const [searchProduct, setSearchProduct] = useState('')

  const handleChangeSearchProduct = (event) => {
    setSearchProduct(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    childToParent(searchProduct)
  }

  const logout = () => {
    dispatch(userLogout())
  }

  return (

    <form onSubmit={handleSubmit}>

      <Box
        component='header'
        sx={{
          backgroundColor: 'rgb(26, 148, 255)',
          width: '100%',
          height: { xs: '90px', sm: '100px' },
          position: 'fixed',
          top: 0,
          zIndex: '2000',
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
            <CustomLink to={`/`}>
              <NameBox>
                ShopTelephone
              </NameBox>
            </CustomLink>

            <InputBox>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm sản phẩm ..."
                onChange={handleChangeSearchProduct}
                value={searchProduct}
              />

              <CustomInputIconButton aria-label="menu" type='submit'>
                <SearchIcon sx={{ color: 'white', fontSize: { xs: 18, sm: 24 } }} />
              </CustomInputIconButton>
            </InputBox>

            <WrapIconBox>

              <CustomIconButton aria-label="add to shopping cart" >
                <ShoppingCartIcon sx={{ fontSize: { xs: 24, sm: 28, md: 24 } }} />
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                  Giỏ hàng
                </Typography>
              </CustomIconButton>

              {
                (userInfor && Object.keys(userInfor).length !== 0) ? (
                  <Box
                    sx={{
                      position: 'relative',

                      '&:hover .CustomHover': {
                        
                          display: 'block',
                  
                      },

                    }}
                  >

                    <CustomLink to={`/user/purchase`}>
                      <CustomIconButton aria-label="add to shopping cart" >
                        <PersonOutlineIcon sx={{ fontSize: { xs: 24, sm: 28, md: 24 } }} />
                        <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                          {userInfor.name}
                        </Typography>
                      </CustomIconButton>
                    </CustomLink>

                    <Box
                      className="CustomHover"
                      sx={{
                        minHeight: '100px',
                        width: '200px',
                        position: 'absolute',
                        right: '0',
                        top: '100%',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
                        display: 'none'
                      }}

                    >
                      <List>

                        <CustomProfileLink to={`/user/profile`}>
                          <ListItem sx={{ width: '100%', padding: '0px' }}>
                            <ListItemButton >

                              <ListItemIcon sx={{ minWidth: '40px' }}>
                                <PersonOutlineIcon />
                              </ListItemIcon>

                              <ListItemText
                                primary="Tài Khoản Của Tôi"
                                primaryTypographyProps={{
                                  fontSize: 14,
                                }}
                              />

                            </ListItemButton>
                          </ListItem>
                        </CustomProfileLink>

                        <CustomProfileLink to={`/user/purchase`} >
                          <ListItem sx={{ width: '100%', padding: '0px' }}>
                            <ListItemButton >

                              <ListItemIcon sx={{ minWidth: '40px' }}>
                                <LogoutIcon />
                              </ListItemIcon>

                              <ListItemText
                                primary="Đơn Mua"
                                primaryTypographyProps={{
                                  fontSize: 14,
                                }}
                              />

                            </ListItemButton>
                          </ListItem>
                        </CustomProfileLink>


                        <ListItem sx={{ width: '100%', padding: '0px' }}>
                          <ListItemButton onClick={logout}>

                            <ListItemIcon sx={{ minWidth: '40px' }}>
                              <LogoutIcon />
                            </ListItemIcon>

                            <ListItemText
                              primary="Đăng xuất"
                              primaryTypographyProps={{
                                fontSize: 14,
                              }}
                            />

                          </ListItemButton>
                        </ListItem>

                      </List>
                    </Box>

                  </Box>
                ) : (
                  <CustomLink to={`/login`}>
                    <CustomIconButton aria-label="add to shopping cart" >
                      <PersonOutlineIcon sx={{ fontSize: { xs: 24, sm: 28, md: 24 } }} />
                      <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                        Đăng nhập
                      </Typography>
                    </CustomIconButton>
                  </CustomLink>
                )
              }

            </WrapIconBox>

          </Box>
        </CustomContainer>

      </Box >

    </form >
  )
}

export default Header