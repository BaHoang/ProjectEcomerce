import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import OrderInfor from './OrderInfor'
import { getNameStatus } from '../../Utils/GetNameStatus'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { lg: '60%', md: '70%', xs: '90%', sm: '80%' },
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  paddingBottom: '10px',
  overflowY: 'auto',
  maxHeight: '90vh'
}

const styleHeader = {
  position: 'sticky',
  top: '0',
  backgroundColor: 'white',
  p: '20px 32px 8px 32px',
  display: 'flex',
  justifyContent: 'space-between'
}

const styleFooter = {
  position: 'sticky',
  bottom: '0',
  backgroundColor: 'white',
  p: '12px 32px 12px 32px',
  display: 'flex',
  justifyContent: 'center'
}

const OrderDetailModal = (props) => {

  const { open, onCloseModalDetailOrder, orderInfor, loading, handleChangeStatusOrder } = props

  return (

    <Modal
      open={open}
      onClose={onCloseModalDetailOrder}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={styleHeader}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
            Detail Order - {" "}
            <Typography variant="h5" component='span' sx={{ color: '#1976d2', fontWeight: '600', fontStyle: 'italic' }}>
              Đơn hàng {getNameStatus(orderInfor.orderStatus)}
            </Typography>

          </Typography>

          <IconButton
            aria-label="close"
            onClick={onCloseModalDetailOrder}
            sx={{
              color: 'black',
              padding: '0px',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <OrderInfor
          orderInfor={orderInfor}
          loading={loading}
          onCloseModalDetailOrder={onCloseModalDetailOrder}
          handleChangeStatusOrder={handleChangeStatusOrder}
        />

      </Box>
    </Modal>

  )
}

export default OrderDetailModal