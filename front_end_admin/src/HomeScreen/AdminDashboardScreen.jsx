import { Box } from '@mui/material'
import React, { useState } from 'react'
import TitleScreen from '../Component/Common/TitleScreen'
import StatisticNumberCountInStockBrand from '../Component/Statistic/StatisticNumberCountInStockBrand'
import StatisticNumberProductBoughtBrand from '../Component/Statistic/StatisticNumberProductBoughtBrand'
import StatisticNumberProductMonth from '../Component/Statistic/StatisticNumberProductMonth'
import StatisticNumberTypeProductBrand from '../Component/Statistic/StatisticNumberTypeProductBrand'
import StatisticRegisterUserMonth from '../Component/Statistic/StatisticRegisterUserMonth'
import StatisticRevenueBrand from '../Component/Statistic/StatisticRevenueBrand'
import StatisticRevenueMonth from '../Component/Statistic/StatisticRevenueMonth'

export const AdminDashboardScreen = () => {

  return (
    <Box
      sx={{
        margin: 'auto',
        width: { xs: '92%', sm: '94%', md: '90%' },
        minHeight: 'calc(100vh - 80px)',
        mb: '30px'
      }}
    >
      <TitleScreen title="Dashboard" />

      <Box sx={{  marginTop: '30px' }}>
        <StatisticRevenueMonth />
        <StatisticNumberProductMonth />
        <StatisticRegisterUserMonth />
        <StatisticNumberTypeProductBrand />
        <StatisticNumberCountInStockBrand />
        <StatisticRevenueBrand />
        <StatisticNumberProductBoughtBrand />
      </Box>

    </Box>
  )
}
