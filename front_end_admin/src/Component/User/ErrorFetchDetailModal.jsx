import { Alert, Box, Snackbar } from '@mui/material'
import React, { useState } from 'react'

const ErrorFetchDetailModal = (props) => {

    let status = props.statusError
    let message = ''

    if (status === 400) {
        message = `Không tìm thấy dữ liệu, thử lại`
    }

    return (
        <Box
            sx={{
                mt: '20px',
                mb: '20px'
            }}
        >

            <Alert variant="filled" severity="error" >{message}</Alert>

        </Box>
    )
}

export default ErrorFetchDetailModal