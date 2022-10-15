import { Alert, Box, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const ProductUpdateSuccess = () => {

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
                <Alert sx={{width: '100%'}} variant="filled" severity="success" onClose={handleCloseSnackbar} >Update product success</Alert>
            </Snackbar>
        </Box>
    )
}

export default ProductUpdateSuccess
