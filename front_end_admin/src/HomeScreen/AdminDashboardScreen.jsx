import { Box } from '@mui/material'
import React from 'react'
import TitleScreen from '../Component/Common/TitleScreen'

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
     
    </Box>
  )
}
