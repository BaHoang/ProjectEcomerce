import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeliveryAddressUpdateSuccess = () => {

    const [openSnackbar, setOpenSnackbar] = useState(true)

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    return (
        <Box
            sx={{
                paddingBottom: '20px',
            }}
        >
            <Snackbar
                open={openSnackbar}
                sx={{
                    position: 'sticky',
                    top: '60px',
                    zIndex: '1400'
                }}
            >
                <Alert sx={{width: '100%'}} variant="filled" severity="success" onClose={handleCloseSnackbar} >Cập nhật địa chỉ thành công.</Alert>
            </Snackbar>
        </Box>
    )
}

export default DeliveryAddressUpdateSuccess
