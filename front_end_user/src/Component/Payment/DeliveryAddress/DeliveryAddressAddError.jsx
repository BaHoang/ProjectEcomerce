import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeliveryAddressAddError = (props) => {
    let status = props.statusError
    let message = ''
   
    if (status === 400) {
        message = 'Thêm một địa chỉ mới thất bại. Bạn hãy thử lại.'
    }

    const [openSnackbar, setOpenSnackbar] = useState(true)

    return (
        <Box>

            <Snackbar
                open={openSnackbar}
                sx={{
                    position: '-webkit-sticky',
                    position: 'sticky',
                    bottom: '0px',
                    zIndex: '-1',
                    paddingBottom: '20px',
                }}
            >
                <Alert sx={{ width: '100%' }} variant="filled" severity="error" >{message}</Alert>
            </Snackbar>
        </Box>
    )
}

export default DeliveryAddressAddError