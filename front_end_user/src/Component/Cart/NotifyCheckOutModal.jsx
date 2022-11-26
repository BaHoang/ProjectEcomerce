import { Box, Button, IconButton, Modal } from '@mui/material'
import React from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    overflowY: 'auto',
    boxSizing: 'border-box',
    width: { xs: '80%', sm: '70%', md: '40%', lg: '30%' },
    p: '24px 24px 24px 24px',
}

const NotifyCheckOutModal = (props) => {

    const { open, onClose } = props

    return (

        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <Box sx={{mt: '40px', textAlign: 'center'}}>
                    Bạn vẫn chưa chọn sản phẩm nào để mua.
                </Box>

                <Box sx={{mt: '100px'}}>
                    <Button
                        variant='contained'
                        sx={{ fontSize: { xs: '10px', md: '14px' }, width: '100%' }}
                        onClick={onClose}
                    >
                        Ok
                    </Button>
                </Box>

            </Box>
        </Modal>

    )
}

export default NotifyCheckOutModal