import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, tooltipClasses } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/system'

const CustomLink = styled(NavLink)({
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    height: '50px',

    '&:hover': {
        backgroundColor: 'rgba(71, 98, 130, 0.3)',
    },
});

const CustomListItemButton = styled(ListItemButton)({
    padding: 0,
    justifyContent: 'center',
    
    
});

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

const CustomListItemText = styled(ListItemText)(({ theme }) => ({

    [theme.breakpoints.up('xs')]: {
        display: 'none',
    },

    [theme.breakpoints.up('md')]: {
        display: 'block',
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
}));

export const AdminSideBar = () => {
    return (
        
            <List
                sx={{ width: '100%', maxWidth: 360 }}
                component="nav"
            >

                <CustomLink to='/admin/dashboard'>
                    <CustomListItemButton>
                        <CustomTooltip title="Dashboard" placement='right'>
                            <CustomListItemIcon >

                                <DashboardIcon sx={{ color: 'white', fontSize: '24px' }} />

                            </CustomListItemIcon>
                        </CustomTooltip>
                        <CustomListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: '18px' }} />
                    </CustomListItemButton>
                </CustomLink>

                <CustomLink to='/admin/product'>
                    <CustomListItemButton>
                        <CustomTooltip title="Product" placement='right'>
                            <CustomListItemIcon >

                                <DraftsIcon sx={{ color: 'white', fontSize: '24px' }} />

                            </CustomListItemIcon>
                        </CustomTooltip>
                        <CustomListItemText primary="Product" primaryTypographyProps={{ fontSize: '18px' }} />
                    </CustomListItemButton>
                </CustomLink>

                <CustomLink to='/admin/user'>
                    <CustomListItemButton>
                        <CustomTooltip title="User"  placement='right'>
                            <CustomListItemIcon >

                                <PeopleAltIcon sx={{ color: 'white', fontSize: '24px' }} />

                            </CustomListItemIcon>
                        </CustomTooltip>
                        <CustomListItemText primary="User" primaryTypographyProps={{ fontSize: '18px' }} />
                    </CustomListItemButton>
                </CustomLink>

                <CustomLink to='/admin/order'>
                    <CustomListItemButton>
                        <CustomTooltip title="Order" placement='right'>
                            <CustomListItemIcon >

                                <ShoppingCartIcon sx={{ color: 'white', fontSize: '24px' }} />

                            </CustomListItemIcon>
                        </CustomTooltip>
                        <CustomListItemText primary="Order" primaryTypographyProps={{ fontSize: '18px' }} />
                    </CustomListItemButton>
                </CustomLink>

                <CustomLink to='/admin/logout'>
                    <CustomListItemButton>
                        <CustomTooltip title="Logout" placement='right'>
                            <CustomListItemIcon >

                                <LogoutIcon sx={{ color: 'white', fontSize: '24px' }} />

                            </CustomListItemIcon>
                        </CustomTooltip>
                        <CustomListItemText primary="Logout" primaryTypographyProps={{ fontSize: '18px' }} />
                    </CustomListItemButton>
                </CustomLink>

            </List>
        
    )
}
