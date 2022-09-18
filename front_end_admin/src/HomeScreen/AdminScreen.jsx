import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { AdminSideBar } from '../Component/AdminSideBar'
import { AdminDashboardScreen } from './AdminDashboardScreen'
import { AdminOrderScreen } from './AdminOrderScreen'
import { AdminProductScreen } from './AdminProductScreen'
import { AdminUserScreen } from './AdminUserScreen'
import Grid from '@mui/material/Grid'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { styled } from '@mui/system'

const OverLay = styled(Box)({
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 3,
})

export const AdminScreen = () => {

    const [anchorEl, setAnchorEl] = useState(null)

    const [xsDisplay, setXsDisplay] = useState('none')

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleXsDisplay = () => {
        setXsDisplay('block')
    };

    const closeXsDisplay = () => {
        setXsDisplay('none')
    };

    return (
        <>
            <Box sx={{
                position: 'fixed',
                top: '0',
                bottom: '0',
                display: { xs: xsDisplay, sm: "block", md: "block" },
                width: { xs: '50%', sm: "8.33333333%", md: "16.66667%" },
                backgroundColor: 'rgb(17, 25, 42)',
                zIndex: '4'
            }}>

                <AdminSideBar displaySidebar={xsDisplay} />

            </Box>

            <OverLay sx={{ display: { xs: xsDisplay, sm: 'none' } }} onClick={closeXsDisplay}> </OverLay>

            <Box
                sx={{
                    position: 'fixed',
                    top: '0',
                    left: { xs: 0, sm: "8.33333333%", md: "16.66667%" },
                    right: '0',
                    height: '80px',
                    boxSizing: 'border-box',
                    backgroundColor: 'rgba(255,255,255, 0.8)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 2,
                    // backgroundColor: 'red',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px 30px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
                }}
            >
                <IconButton
                    size="large"
                    edge="start"

                    aria-label="menu"
                    sx={{ mr: 2, display: { xs: "block", sm: "none" }, }}
                    onClick={handleXsDisplay}
                >
                    <MenuIcon sx={{ color: 'blue' }} />
                </IconButton>

                <Box sx={{ marginLeft: 'auto' }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        sx={{ backgroundColor: 'rgba(55,55,215,0.1)' }}

                    >
                        <NotificationsNoneIcon sx={{ color: 'blue' }} />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}


                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Box>

                <Box >
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        sx={{ backgroundColor: 'rgba(55,55,215,0.1)', marginLeft: '10px' }}

                    >
                        <AccountCircle sx={{ color: 'blue' }} />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}

                        keepMounted
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Box>

            <Box
                sx={{
                    marginLeft: { xs: 0, sm: "8.33333333%", md: "16.66667%" },
                    marginTop: '80px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Routes>
                    <Route path="order" element={<AdminOrderScreen />} />
                    <Route path="user" element={<AdminUserScreen />} />
                    <Route path="dashboard" element={<AdminDashboardScreen />} />
                    <Route path="product" element={<AdminProductScreen />} />
                </Routes>
            </Box>

        </>
    )
}
