import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const ProductAddSuccess = () => {

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
                <Alert sx={{width: '100%'}} variant="filled" severity="success" onClose={handleCloseSnackbar} >Add product success. Please go to page last for more detail</Alert>
            </Snackbar>
        </Box>
    )
}

export default ProductAddSuccess
