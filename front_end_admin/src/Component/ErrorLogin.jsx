import React from 'react'
import WarningIcon from '@mui/icons-material/Warning'
import { Box, IconButton } from '@mui/material'
import { styled } from '@mui/system'

const CustomBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   marginBottom: '20px',
  })

const ErrorLogin = (props) => {
    return (
        <CustomBox>
            <IconButton color="error" aria-label="add an warning">
                <WarningIcon />
            </IconButton>
            <Box sx={{ color: 'red', fontSize: '16px' }}>
                {
                    props.error
                }
                
            </Box>

        </CustomBox>
    )
}

export default ErrorLogin