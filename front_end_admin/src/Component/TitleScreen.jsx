import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

const TitleScreen = (props) => {
    return (
        <Box sx={{ height: '70px', paddingTop: '30px' }}>
            <Paper elevation="1" sx={{ height: '100%', display: 'flex', alignItems: 'center', paddingLeft: '20px', borderRadius: '10px' }}>
                <Typography component='div' variant='h5' >
                    {props.title ? props.title : ''}
                </Typography>
            </Paper>
        </Box>
    )
}

export default TitleScreen