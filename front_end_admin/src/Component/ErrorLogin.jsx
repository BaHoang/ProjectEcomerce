import React from 'react'
import WarningIcon from '@mui/icons-material/Warning'
import { Box, IconButton } from '@mui/material'
import { styled } from '@mui/system'

const CustomBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   marginBottom: '20px',
  })

const ErrorLogin = () => {
    return (
        <CustomBox>
            <IconButton color="error" aria-label="add an warning">
                <WarningIcon />
            </IconButton>
            <Box sx={{ color: 'red', fontSize: '16px' }}>
                Please provide a valid email address and password.
            </Box>

        </CustomBox>
    )
}

export default ErrorLogin