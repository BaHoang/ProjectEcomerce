import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const OrderUpdateSuccess = (props) => {

    let { orderId } = props
    
    const [openSnackbar, setOpenSnackbar] = useState(true)

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    return (
        <Box
            sx={{
                mt: '20px',
                paddingBottom: '20px',
            }}
        >
            <Snackbar
                open={openSnackbar}
                sx={{
                    position: 'sticky',
                    top: '60px',
                    zIndex: '0'
                }}
            >
                <Alert sx={{width: '100%'}} variant="filled" severity="success" onClose={handleCloseSnackbar} >Cập nhật đơn hàng {orderId} thành công</Alert>
            </Snackbar>
        </Box>
    )
}

export default OrderUpdateSuccess
