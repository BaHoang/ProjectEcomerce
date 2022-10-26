import { Box } from '@mui/material'
import React, { useState } from 'react'
import TitleScreen from '../Component/Common/TitleScreen'
import StatisticRevenueMonth from '../Component/Statistic/StatisticRevenueMonth'

export const AdminDashboardScreen = () => {
  
  return (
    <Box
      sx={{
        margin: 'auto',
        width: { xs: '92%', sm: '94%', md: '90%' },
        minHeight: 'calc(100vh - 80px)'
      }}
    >
      <TitleScreen title="Dashboard" />

      <Box sx={{ marginBottom: '30px', marginTop: '30px', }}>
        <StatisticRevenueMonth  />
        
      </Box>

    </Box>
  )
}
