import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeliveryAddressUpdateSuccess = () => {

    const [openSnackbar, setOpenSnackbar] = useState(true)

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
                <Alert sx={{width: '100%'}} variant="filled" severity="success" >Cập nhật địa chỉ thành công. Ấn nút trở lại để thoát.</Alert>
            </Snackbar>
        </Box>
    )
}

export default DeliveryAddressUpdateSuccess
