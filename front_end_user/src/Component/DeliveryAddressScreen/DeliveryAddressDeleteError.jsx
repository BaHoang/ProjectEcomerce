import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeliveryAddressDeleteError = (props) => {
    let status = props.statusError
    let message = ''

    if (status === 400) {
        message = 'Xóa địa chỉ thất bại. Bạn hãy thử lại.'
    }

    const [openSnackbar, setOpenSnackbar] = useState(true)

    return (
        <Box >
            <Snackbar
                open={openSnackbar}
                sx={{
                    position: 'sticky',
                    top: '60px',
                    zIndex: '1400',
                    paddingBottom: '20px'
                }}
            >
                <Alert sx={{width: '100%'}} variant="filled" severity="error" >{message}</Alert>
            </Snackbar>
        </Box>
    )
}

export default DeliveryAddressDeleteError