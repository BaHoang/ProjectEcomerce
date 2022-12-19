import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeliveryAddressDeleteSuccess = () => {

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
                <Alert sx={{width: '100%'}} variant="filled" severity="success" >Ban đã xóa địa chỉ thành công. Ấn nút trở lại để thoát.</Alert>
            </Snackbar>
        </Box>
    )
}

export default DeliveryAddressDeleteSuccess
