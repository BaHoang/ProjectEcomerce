import { Typography } from '@mui/material'
import React from 'react'

const ErrorFetchData = (props) => {
    let message = props.message ? props.message : ''
    return (
        <Typography variant='h6' sx={{ color: 'red', mt: '20px', mb: '20px', textAlign: 'center' }}>{message}. Please try again or check network</Typography>
    )
}

export default ErrorFetchData