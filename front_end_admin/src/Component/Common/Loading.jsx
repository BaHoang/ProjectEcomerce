import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const Loading = () => {
    return (
        <Box>
            <Typography sx={{ fontSize: '20px', textAlign: 'center', mt: '30px', mb: '20px' }} component='div'>Dang load du lieu</Typography>
            <Box sx={{ textAlign: 'center', mb: '20px' }}>
                <CircularProgress />
            </Box>
        </Box>
    )
}

export default Loading