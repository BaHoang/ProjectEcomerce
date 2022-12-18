import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeliveryAddressAddSuccess = () => {

    const [openSnackbar, setOpenSnackbar] = useState(true)

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
                >
                    Thêm một địa chỉ mới thành công. Ấn nút trở lại để thoát.
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default DeliveryAddressAddSuccess
