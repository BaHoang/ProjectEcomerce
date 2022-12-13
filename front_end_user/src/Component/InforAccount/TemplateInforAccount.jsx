import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import AccountSidebar from './AccountSidebar'

const TemplateInforAccount = () => {
  return (
    <Box
      sx={{
        paddingTop: '20px',
        paddingBottom: '50px',
        position: "relative"
      }}
    >

      {/* side bar */}
      <Box
        sx={{
          width: { xs: '0%', sm: "8.33333333%", md: "16.66667%" },
          position: 'absolute',
          top: '20px',
          left: '0',
        }}
      >
        <AccountSidebar />
      </Box>
      
      {/* content */}
      <Box
        sx={{
          marginLeft: { xs: 0, sm: "8.33333333%", md: "16.66667%" },
          minHeight: '166px'
        }}
      >
        <Outlet />
      </Box>

    </Box>
  )
}

export default TemplateInforAccount