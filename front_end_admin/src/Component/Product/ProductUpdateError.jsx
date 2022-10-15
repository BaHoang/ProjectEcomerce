import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const ProductUpdateError = (props) => {
    let status = props.statusError
    let message = ''

    if (status === 400) {
        message = 'Update product failed, try again'
    }

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
                    zIndex: '1400',
                    paddingBottom: '20px'
                }}
            >
                <Alert sx={{width: '100%'}} variant="filled" severity="error" onClose={handleCloseSnackbar} >{message}</Alert>
            </Snackbar>
        </Box>
    )
}

export default ProductUpdateError