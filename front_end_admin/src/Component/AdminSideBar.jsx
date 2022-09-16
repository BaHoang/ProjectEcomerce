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
    display: 'flex',
    height: '50px',
   
});

const CustomListItemButton = styled(ListItemButton)({
    padding: 0,
    justifyContent: 'center',
    
    '&:hover': {
        backgroundColor: 'rgba(71, 98, 130, 0.3)',
    },
});

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    justifyContent: 'center',
   
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

const LabelTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'black',
        position: 'relative',
        padding: '6px',
        top: '-25px',
        left: '40px'
    },
}));

export const AdminSideBar = () => {
    return (
        <Box>
            <List
                sx={{ width: '100%', maxWidth: 360 }}
                component="nav"
            >

                <CustomLink to='/admin/dashboard'>
                    <CustomListItemButton>
                        <LabelTooltip title="Dashboard" >
                            <CustomListItemIcon >

                                <DashboardIcon sx={{ color: 'white', fontSize: '24px' }} />

                            </CustomListItemIcon>
                        </LabelTooltip>
                        <CustomListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: '18px' }} />
                    </CustomListItemButton>
                </CustomLink>

                <CustomLink to='/admin/product'>
                    <CustomListItemButton>
                        <LabelTooltip title="Product" >
                            <CustomListItemIcon >

                                <DraftsIcon sx={{ color: 'white', fontSize: '24px' }} />

                            </CustomListItemIcon>
                        </LabelTooltip>
                        <CustomListItemText primary="Product" primaryTypographyProps={{ fontSize: '18px' }} />
                    </CustomListItemButton>
                </CustomLink>

                <CustomLink to='/admin/user'>
                    <CustomListItemButton>
                        <LabelTooltip title="User" >
                            <CustomListItemIcon >

                                <PeopleAltIcon sx={{ color: 'white', fontSize: '24px' }} />

                            </CustomListItemIcon>
                        </LabelTooltip>
                        <CustomListItemText primary="User" primaryTypographyProps={{ fontSize: '18px' }} />
                    </CustomListItemButton>
                </CustomLink>

                <CustomLink to='/admin/order'>
                    <CustomListItemButton>
                        <LabelTooltip title="Order" >
                            <CustomListItemIcon >

                                <ShoppingCartIcon sx={{ color: 'white', fontSize: '24px' }} />

                            </CustomListItemIcon>
                        </LabelTooltip>
                        <CustomListItemText primary="Order" primaryTypographyProps={{ fontSize: '18px' }} />
                    </CustomListItemButton>
                </CustomLink>

                <CustomLink to='/admin/logout'>
                    <CustomListItemButton>
                        <LabelTooltip title="Logout" >
                            <CustomListItemIcon >

                                <LogoutIcon sx={{ color: 'white', fontSize: '24px' }} />

                            </CustomListItemIcon>
                        </LabelTooltip>
                        <CustomListItemText primary="Logout" primaryTypographyProps={{ fontSize: '18px' }} />
                    </CustomListItemButton>
                </CustomLink>

            </List>
        </Box>
    )
}
