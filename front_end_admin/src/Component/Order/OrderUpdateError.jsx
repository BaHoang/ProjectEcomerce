import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const OrderUpdateError = (props) => {

    let { orderId } = props

    let status = props.statusError
    let message = ''

    if (status === 400) {
        message = `Update order ${orderId} failed, try again`
    }
    
    const [openSnackbar, setOpenSnackbar] = useState(true)

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    return (
        <Box
            sx={{
                mt: '20px',
            }}
        >
            <Snackbar
                open={openSnackbar}
                sx={{
                    position: 'sticky',
                    top: '60px',
                    zIndex: '0',
                    paddingBottom: '20px'
                }}
            >
                <Alert sx={{ width: '100%' }} variant="filled" severity="error" onClose={handleCloseSnackbar} >{message}</Alert>
            </Snackbar>
        </Box>
    )
}

export default OrderUpdateError