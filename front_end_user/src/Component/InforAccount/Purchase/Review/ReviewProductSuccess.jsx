import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const ReviewProductSuccess = () => {

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
                    Đánh giá sản phẩm thành công. Bạn hãy ấn nút trở lại để thoát.
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default ReviewProductSuccess
