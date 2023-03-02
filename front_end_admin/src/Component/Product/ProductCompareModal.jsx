import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import ProductTable from './ProductTable'
import EditIcon from '@mui/icons-material/Edit'
import Loading from '../Common/Loading'
import ProductCompare from './ProductCompare'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { lg: '36%', md: '50%', xs: '90%', sm: '70%' },
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    overflowY: 'auto',
    height: '70vh',
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

const ProductCompareModal = (props) => {

    const { openCompareModal, handleCloseCompareModal, productInfor, loading, products } = props
    var name = productInfor.name ? productInfor.name : ''

    return (

        <Modal
            open={openCompareModal}
            onClose={handleCloseCompareModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={styleHeader}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
                        So sánh giá
                    </Typography>

                    <IconButton
                        aria-label="close"
                        onClick={props.handleCloseCompareModal}
                        sx={{
                            color: 'black',
                            padding: '0px',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>



                <Box sx={{ padding: '0px 32px 8px 32px' }}>

                    {
                        loading
                            ? <Loading />
                            : <ProductCompare products={products} />
                    }
                </Box>

            </Box>
        </Modal>

    )
}

export default ProductCompareModal