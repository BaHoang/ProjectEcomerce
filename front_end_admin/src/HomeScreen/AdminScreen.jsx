import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AdminSideBar } from '../Component/AdminSideBar'
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { styled } from '@mui/system'
import { activeSidebar, hiddenSidebar } from '../Actions/sidebarAction'
import LogoutIcon from '@mui/icons-material/Logout'
import { userLogout } from '../Actions/userAction'

const OverLay = styled(Box)({
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
})

export const AdminScreen = () => {

    const [openNotify, setOpenNotify] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const displaySidebar = useSelector(state => state.displaySidebar)

    const dispatch = useDispatch()

    const handleOpenNotify = (event) => {
        setOpenNotify(!openNotify)
    }

    const handleOpenProfile = (event) => {
        setOpenProfile(!openProfile);
    }

    const handleCloseNotifyProfile = () => {
        if (openNotify) {
            setOpenNotify(false);
        }
        if (openProfile) {
            setOpenProfile(false);
        }
    }

    const handledisplaySiderbar = () => {
        dispatch(activeSidebar())
    }

    const closeDisplaySidebar = () => {
        dispatch(hiddenSidebar())
    }

    const logout = () => {
        dispatch(userLogout())
    }
    return (
        <Box >
            {/* side bar */}
            <Box sx={{
                position: 'fixed',
                top: '0',
                bottom: '0',
                display: { xs: displaySidebar, sm: "block", md: "block" },
                width: { xs: '60%', sm: "8.33333333%", md: "16.66667%" },
                backgroundColor: 'rgb(17, 25, 42)',
                zIndex: '3'
            }}
                onClick={handleCloseNotifyProfile}
            >
                <AdminSideBar />
            </Box>


            <OverLay sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 2, display: { xs: displaySidebar, sm: 'none' } }} onClick={closeDisplaySidebar}> </OverLay>

            {/* app bar */}
            <Box
                sx={{
                    position: 'fixed',
                    top: '0',
                    left: { xs: 0, sm: "8.33333333%", md: "16.66667%" },
                    right: '0px',
                    height: '80px',
                    boxSizing: 'border-box',
                    backgroundColor: 'rgba(255,255,255, 0.8)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px 30px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                }}
                onClick={handleCloseNotifyProfile}
            >
                <IconButton
                    size="large"
                    edge="start"

                    aria-label="menu"
                    sx={{ display: { xs: "block", sm: "none" }, paddingLeft: '12px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', backgroundColor: 'rgba(55,55,215,0.1)', alignItems: 'center' }}
                    onClick={handledisplaySiderbar}
                >
                    <MenuIcon sx={{ color: 'blue' }} />
                </IconButton>

                <Box sx={{ marginLeft: 'auto', position: 'relative' }}>
                    <IconButton
                        size="large"
                        aria-label="notify"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        sx={{ backgroundColor: 'rgba(55,55,215,0.1)' }}
                        onClick={handleOpenNotify}
                    >
                        <NotificationsNoneIcon sx={{ color: 'blue' }} />
                    </IconButton>

                    <Box sx={{ height: '100px', width: '100px', position: 'absolute', right: '0', top: '110%', backgroundColor: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', display: (openNotify ? 'block' : 'none') }}>
                        <a href="https://viblo.asia/p/hoc-react-redux-trong-15-phut-1Je5E7q0ZnL#_22-giai-phap-3">Thong bao</a>
                    </Box>
                </Box>

                <Box sx={{ marginLeft: '16px', position: 'relative' }}>
                    <IconButton
                        size="large"
                        aria-label="account ofuser"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        sx={{ backgroundColor: 'rgba(55,55,215,0.1)' }}
                        onClick={handleOpenProfile}
                    >
                        <AccountCircle sx={{ color: 'blue' }} />
                    </IconButton>

                    <Box sx={{ height: '100px', width: '200px', position: 'absolute', right: '0', top: '110%', backgroundColor: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', display: (openProfile ? 'block' : 'none') }}>
                        <List>
                            <ListItem sx={{width: '100%', paddingLeft: '0px', paddingRight: '0px' }}>
                                <ListItemButton onClick={logout}>
                                    <ListItemIcon sx={{minWidth: '40px'}}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>

                        </List>
                    </Box>

                </Box>

            </Box>

            {/* component tuong ung */}
            <Box
                sx={{
                    marginLeft: { xs: 0, sm: "8.33333333%", md: "16.66667%" },
                    marginTop: '80px',
                    backgroundColor: 'rgb(245, 247, 250)',
                }}
                onClick={handleCloseNotifyProfile}
            >
                <Outlet />
            </Box>

        </Box>
    )
}
