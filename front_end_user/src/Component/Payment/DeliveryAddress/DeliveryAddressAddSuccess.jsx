import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeliveryAddressAddSuccess = () => {

    const [openSnackbar, setOpenSnackbar] = useState(true)

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    return (
        <Box >
            <Snackbar
                open={openSnackbar}
                sx={{
                    position: 'sticky',
                    top: '60px',
                    zIndex: '-1',
                    paddingBottom: '20px'
                }}
            >
                <Alert
                    sx={{ width: '100%' }}
                    variant="filled"
                    severity="success"
                    onClose={handleCloseSnackbar}
                >
                    Thêm một địa chỉ mới thành công.
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default DeliveryAddressAddSuccess
