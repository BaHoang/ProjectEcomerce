import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeliveryAddressInforNotEnoughError = (props) => {

    const [openSnackbar, setOpenSnackbar] = useState(true)

    return (
        <Box >
            <Snackbar
                open={openSnackbar}
                sx={{
                    position: 'sticky',
                    top: '60px',
                    zIndex: '1',
                    paddingBottom: '20px'
                }}
            >
                <Alert sx={{ width: '100%' }} variant="filled" severity="error" >
                    Bạn hãy điền đầy đủ thông tin
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default DeliveryAddressInforNotEnoughError