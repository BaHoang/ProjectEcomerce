import { Box } from '@mui/material'
import React from 'react'

const EmptyOrder = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: ' 0px 6px 16px 1px rgba(115, 82, 199, 0.2 )',

            }}
        >
            Chưa có đơn hàng
        </Box>
    )
}

export default EmptyOrder