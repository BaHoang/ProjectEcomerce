import { Alert, Box, CircularProgress, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const OrderUpdateLoading = (props) => {

    let { orderId } = props
    
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
                <Alert sx={{ width: '100%' }} variant="filled" severity="info" onClose={handleCloseSnackbar} >Đang cập nhật trạng thái đơn hàng {orderId}.</Alert>

            </Snackbar>
        </Box>
    )
}

export default OrderUpdateLoading