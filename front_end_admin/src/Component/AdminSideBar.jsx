import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, tooltipClasses } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import DraftsIcon from '@mui/icons-material/Drafts'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LogoutIcon from '@mui/icons-material/Logout'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { hiddenSidebar } from '../Actions/sidebarAction'
import { userLogout } from '../Actions/userAction'

const CustomLink = styled(NavLink)({
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    height: '50px',
    '&:hover': {
        backgroundColor: 'rgba(71, 98, 130, 0.3)',
    },
})

const CustomListItemButton = styled(ListItemButton)({
    padding: 0,
    justifyContent: 'center',
})

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    justifyContent: 'center',
    height: '50px',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
        minWidth: '50px',
    },
    [theme.breakpoints.up('lg')]: {
        minWidth: '80px',
    },
}))

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'black',
        padding: '6px',
        [theme.breakpoints.up('xs')]: {
            display: 'block',
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}))

const LogoutItemButton = styled(ListItemButton)({
    color: 'white',
    height: '50px',
    display: 'flex',
    padding: 0,
    justifyContent: 'center',
    '&:hover': {
        backgroundColor: 'rgba(71, 98, 130, 0.3)',
    },
})

export const AdminSideBar = (props) => {

    const displaySidebar = useSelector(state => state.displaySidebar)

    const CustomListItemText = styled(ListItemText)(({ theme }) => ({

        [theme.breakpoints.up('xs')]: {
            display: displaySidebar,
        },

        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },

        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    }))

    const dispatch = useDispatch()

    const closeDisplaySidebar = () => {
        dispatch(hiddenSidebar())
    }

    const logout = () => {
        dispatch(userLogout())
    }

    return (

        <List
            sx={{ width: '100%', maxWidth: 360 }}
            component="nav"
        >

            <CustomLink to='/admin/dashboard' onClick={closeDisplaySidebar}>
                <CustomListItemButton>
                    <CustomTooltip title="Dashboard" placement='right'>
                        <CustomListItemIcon >

                            <DashboardIcon sx={{ color: 'white', fontSize: '20px' }} />

                        </CustomListItemIcon>
                    </CustomTooltip>
                    <CustomListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: '16px' }} />
                </CustomListItemButton>
            </CustomLink>

            <CustomLink to='/admin/product' onClick={closeDisplaySidebar}>
                <CustomListItemButton>
                    <CustomTooltip title="Product" placement='right'>
                        <CustomListItemIcon >

                            <DraftsIcon sx={{ color: 'white', fontSize: '20px' }} />

                        </CustomListItemIcon>
                    </CustomTooltip>
                    <CustomListItemText primary="Product" primaryTypographyProps={{ fontSize: '16px' }} />
                </CustomListItemButton>
            </CustomLink>

            <CustomLink to='/admin/user' onClick={closeDisplaySidebar}>
                <CustomListItemButton>
                    <CustomTooltip title="User" placement='right'>
                        <CustomListItemIcon >

                            <PeopleAltIcon sx={{ color: 'white', fontSize: '20px' }} />

                        </CustomListItemIcon>
                    </CustomTooltip>
                    <CustomListItemText primary="User" primaryTypographyProps={{ fontSize: '16px' }} />
                </CustomListItemButton>
            </CustomLink>

            <CustomLink to='/admin/order' onClick={closeDisplaySidebar}>
                <CustomListItemButton>
                    <CustomTooltip title="Order" placement='right'>
                        <CustomListItemIcon >

                            <ShoppingCartIcon sx={{ color: 'white', fontSize: '20px' }} />

                        </CustomListItemIcon>
                    </CustomTooltip>
                    <CustomListItemText primary="Order" primaryTypographyProps={{ fontSize: '16px' }} />
                </CustomListItemButton>
            </CustomLink>

            <LogoutItemButton onClick={logout}>
                <CustomTooltip title="Logout" placement='right'>
                    <CustomListItemIcon >

                        <LogoutIcon sx={{ color: 'white', fontSize: '20px' }} />

                    </CustomListItemIcon>
                </CustomTooltip>
                <CustomListItemText primary="Logout" primaryTypographyProps={{ fontSize: '16px' }} />
            </LogoutItemButton>

        </List>

    )
}
