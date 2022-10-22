import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

const TitleScreen = (props) => {
    return (
        <Box sx={{ height: '70px', paddingTop: '30px' }}>
            <Box
                sx={{
                    boxShadow: ' 0px 6px 16px 1px rgba(115, 82, 199, 0.2 )',
                    backgroundColor: 'white',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '20px',
                    borderRadius: '10px'
                }}
            >
                <Typography component='div' variant='h5' >
                    {props.title ? props.title : ''}
                </Typography>
            </Box>
        </Box>
    )
}

export default TitleScreen