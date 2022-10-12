import { Typography } from '@mui/material'
import React from 'react'

const ProductAddError = (props) => {
    let status = props.statusError
    let message = ''
    if (status === 401) {
        message = 'Product exist, try again'
    }

    if (status === 400) {
        message = 'Create product failed, try again'
    }
    return (
        <>
            <Typography variant='h6' sx={{ color: 'red', mt: '20px', mb: '20px', textAlign: 'center' }}>{message}</Typography>
        </>
    )
}

export default ProductAddError