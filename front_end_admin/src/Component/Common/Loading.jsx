import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const Loading = () => {
    return (
        <Box>
            <Typography sx={{ fontSize: '24px', fontWeight: '500', textAlign: 'center', mt: '30px', mb: '20px' }} component='div'>Loading ....</Typography>
            <Box sx={{ textAlign: 'center', mb: '20px' }}>
                <CircularProgress />
            </Box>
        </Box>
    )
}

export default Loading