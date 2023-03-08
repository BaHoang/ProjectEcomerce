import { Alert, Box, Snackbar, styled } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const CustomLink = styled(NavLink)({
    
    color: 'white',
    marginLeft: '4px'
})
const SuccessRegister = () => {
    return (
        <Box
            sx={{
                paddingBottom: '20px',
            }}
        >
            <Snackbar
                open={true}
                sx={{
                    position: 'sticky',
                    top: '60px',
                    zIndex: '1400'
                }}
            >
                <Alert sx={{ width: '100%' }} variant="filled" severity="success" >
                Đăng ký thành công. Bạn hãy đến trang  <CustomLink to={`/login`}>Đăng nhập</CustomLink>
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default SuccessRegister




