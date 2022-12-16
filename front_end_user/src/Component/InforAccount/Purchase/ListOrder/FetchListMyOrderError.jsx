import { Alert, Box, Snackbar } from '@mui/material'
import React, { useState } from 'react'

const FetchListMyOrderError = (props) => {
    let status = props.statusError

    let message = ''

    if (status) {
        message = 'Không tìm thấy danh sách đơn hàng. Bạn hãy thử tải lại.'
    }

    const [openSnackbar, setOpenSnackbar] = useState(true)

    return (
        <Box>

            <Snackbar
                open={true}
                sx={{
                    position: 'sticky',
                    bottom: '0px',
                    zIndex: '1',
                    paddingBottom: '20px',
                }}
            >
                <Alert sx={{ width: '100%' }} variant="filled" severity="error"  >{message}</Alert>
            </Snackbar>
        </Box>
    )
}

export default FetchListMyOrderError