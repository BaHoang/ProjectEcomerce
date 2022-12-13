import { Badge, Box, Button, Container, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import { styled } from '@mui/system'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../Actions/userAction'
import PurchaseIcon from '../../Image/SVG/PurchaseIcon'
import { formatPrice } from '../../Utils/FormatPrice'

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

  const cartAdd = useSelector(state => state.cartAdd)
  var { carts } = cartAdd

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
              height: '100%',

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

              <Box
                sx={{
                  position: 'relative',
                  '&:hover .CartHover': {
                    display: 'block',
                  },
                }}
              >
                <CustomLink to={`/cart`}>
                  <CustomIconButton aria-label="add to shopping cart" >

                    {
                      (carts && carts.length > 0) ? (
                        <Badge badgeContent={carts.length} color="primary">
                          <ShoppingCartIcon sx={{ fontSize: { xs: 24, sm: 28, md: 24 } }} />
                        </Badge>
                      ) : (
                        <ShoppingCartIcon sx={{ fontSize: { xs: 24, sm: 28, md: 24 } }} />
                      )
                    }

                    <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                      Giỏ hàng
                    </Typography>

                  </CustomIconButton>
                </CustomLink>

                <Box
                  className="CartHover"
                  sx={{
                    width: { xs: '300px', sm: '400px' },
                    padding: '10px 10px 10px 10px',
                    position: 'absolute',
                    right: '0',
                    top: '120%',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    borderRadius: '4px',
                    display: 'none',

                  }}
                >
                  <Box
                    sx={{
                      fontSize: '16px',
                      color: '#757575',
                      textTransform: 'capitalize',
                      marginBottom: '8px'
                    }}
                  >
                    Sản phẩm mới thêm
                  </Box>

                  <Box
                    sx={{
                      marginBottom: '10px',
                    }}
                  >
                    {
                      (carts && carts.length > 0) ? (
                        <>
                          {
                            carts.map((product, index) => {
                              if (index < 5) {
                                return (
                                  <Box
                                    key={index}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      paddingTop: '2px',
                                      paddingBottom: '2px',
                                      '&:hover': {
                                        backgroundColor: 'rgb(245,245,245)',
                                        cursor: 'default'
                                      }

                                    }}
                                  >

                                    <Box
                                      sx={{
                                        width: '50px',
                                        height: '50px',
                                        marginRight: '10px',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundImage: `url(${product.image ? product.image :
                                          'https://cdn.24h.com.vn/upload/3-2022/images/2022-09-05/MU-chinh-thuc-cong-bo-doi-hinh-da-cup-chau-au-3-SAO-bi-loai-Ronaldo-gop-mat-3-1662395551-785-width740height493.jpg'})`,
                                      }}
                                    >

                                    </Box>

                                    <Box
                                      sx={{
                                        flex: 1,
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '1',
                                        WebkitBoxOrient: 'vertical',
                                      }}
                                    >
                                      {product.name}
                                    </Box>

                                    <Box
                                      sx={{
                                        width: '120px',
                                        textAlign: 'end',
                                        color: 'red'
                                      }}
                                    >
                                      {formatPrice(product.priceDiscount)}
                                    </Box>

                                  </Box>
                                )
                              }
                            })
                          }
                        </>
                      ) : (
                        <Box
                          sx={{
                            textAlign: 'center'
                          }}
                        >
                          Hiện không có sản phẩm trong giỏ hàng
                        </Box>
                      )
                    }
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {
                      (carts && carts.length > 5) && (
                        <Box>
                          {carts.length - 5} thêm hàng vào giỏ
                        </Box>
                      )
                    }
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: 'end',
                        flex: 1
                      }}
                    >
                      <CustomLink to={`/cart`}>
                        <Button
                          variant='contained'
                          sx={{
                            textTransform: 'capitalize',
                            backgroundColor: 'rgb(28,147,252)',
                          }}
                        >
                          Xem giỏ hàng
                        </Button>
                      </CustomLink >
                    </Box>
                  </Box>

                </Box>
              </Box>



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

                    <CustomIconButton aria-label="account" >
                      <PersonOutlineIcon sx={{ fontSize: { xs: 24, sm: 28, md: 24 } }} />
                      <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                        {userInfor.name}
                      </Typography>
                    </CustomIconButton>

                    <Box
                      className="CustomHover"
                      sx={{
                        minHeight: '100px',
                        width: '200px',
                        position: 'absolute',
                        right: '0',
                        top: '110%',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
                        display: 'none'
                      }}
                    >
                      <List>

                        <CustomProfileLink to={`/user/account`}>
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
                                <PurchaseIcon />
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