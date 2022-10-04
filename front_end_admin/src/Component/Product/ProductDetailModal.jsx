import { Box, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import ProductTable from './ProductTable'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { lg: '40%', md: '50%', xs: '90%', sm: '70%' },
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  overflowY: 'scroll',
  height: '60vh',
}

const ProductDetailModal = (props) => {
  
  const { open, productInfor, loading, onClose } = props

  return (

    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{position: 'sticky', top: '0', backgroundColor: 'white', p: '20px 32px 8px 32px',  display: 'flex', justifyContent: 'space-between'}}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
            Detail Product
          </Typography>

          <IconButton
            aria-label="close"
            onClick={props.onClose}
            sx={{

              color: 'black',
              padding: '0px',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <ProductTable productInfor={productInfor} loading={loading} />

      </Box>
    </Modal>

  )
}

export default ProductDetailModal