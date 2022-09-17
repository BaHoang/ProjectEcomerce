import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { AdminSideBar } from '../Component/AdminSideBar'
import { AdminDashboardScreen } from './AdminDashboardScreen'
import { AdminOrderScreen } from './AdminOrderScreen'
import { AdminProductScreen } from './AdminProductScreen'
import { AdminUserScreen } from './AdminUserScreen'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'

export const AdminScreen = () => {

    return (
        <>

            <Box sx={{
                position: 'fixed',
                top: '0',
                bottom: '0',
                display: { xs: "none", sm: "block", md: "block" },
                width: { xs: 0, sm: "8.33333333%", md: "16.66667%" },
                backgroundColor: 'rgb(5, 30, 52)',
            }}>

                <AdminSideBar />

            </Box>
            <Box sx={{
                marginLeft: {xs: 0, sm: "8.33333333%", md: "16.66667%"},
                marginRight: '13px'
            }}>
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
