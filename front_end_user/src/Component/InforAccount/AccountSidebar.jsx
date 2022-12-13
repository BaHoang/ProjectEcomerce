
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, tooltipClasses } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import React from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import PurchaseIcon from '../../Image/SVG/PurchaseIcon'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/system'

const CustomLink = styled(NavLink)({
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  height: '50px',

})

const CustomListItemButton = styled(ListItemButton)({
  padding: 0,
  justifyContent: 'center',
})

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  justifyContent: 'center',
  height: '50px',
  alignItems: 'center',
  minWidth: '50px',
}))

const AccountSidebar = (props) => {

  const CustomListItemText = styled(ListItemText)(({ theme }) => ({

    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },

    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },

    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  
  }))

  return (

    <List
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
    >

      <CustomLink to='/user/account'>
        <CustomListItemButton>
          <CustomListItemIcon >
            <PersonOutlineIcon sx={{ color: 'black', fontSize: '20px' }} />
          </CustomListItemIcon>
          <CustomListItemText
            primary="Tài Khoản Của Tôi"
            primaryTypographyProps={{
              fontSize: '14px',
              color: 'rgba(0,0,0,.87)',


            }}
          />
        </CustomListItemButton>
      </CustomLink>

      <CustomLink to='/user/purchase'>
        <CustomListItemButton>
          <CustomListItemIcon >
            <PurchaseIcon sx={{ color: 'black', fontSize: '20px' }} />
          </CustomListItemIcon>
          <CustomListItemText primary="Đơn Mua" primaryTypographyProps={{ fontSize: '14px', color: 'rgba(0,0,0,.87)' }} />
        </CustomListItemButton>
      </CustomLink>

      <CustomLink to='/user/deliveryAddress'>
        <CustomListItemButton>
          <CustomListItemIcon >
            <PeopleAltIcon sx={{ color: 'black', fontSize: '20px' }} />
          </CustomListItemIcon>
          <CustomListItemText primary="Địa chỉ" primaryTypographyProps={{ fontSize: '14px', color: 'rgba(0,0,0,.87)' }} />
        </CustomListItemButton>
      </CustomLink>


    </List>

  )
}

export default AccountSidebar
