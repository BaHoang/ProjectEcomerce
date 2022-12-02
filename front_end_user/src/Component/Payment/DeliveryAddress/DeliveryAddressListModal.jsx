import { Box, Button, IconButton, Modal, Radio, styled, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentDeliveryAddressAction } from '../../../Actions/deliveryAddressAction'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    overflowY: 'auto',
    width: { lg: '28%', md: '50%', xs: '90%', sm: '70%' },
    maxHeight: '60vh',
    padding: '0px 24px ',
    boxSizing: 'border-box',
}

const styleHeader = {
    position: 'sticky',
    top: '0',
    paddingTop: '16px',
    paddingBottom: '12px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 100
}

const styleFooter = {
    position: 'sticky',
    bottom: '0px',
    paddingTop: '12px',
    paddingBottom: '16px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'end',
    zIndex: 100,
}

const DefaultTextBox = styled(Box)(({ theme }) => ({
    border: '1px solid red',
    color: 'red',
    fontSize: '14px',
    padding: '2px 5px',
    lineHeight: 1.2,
}))

const DeliveryAddressListModal = (props) => {
    const dispatch = useDispatch()

    const { open, onClose, handleOpenDeliveryAddressAddModal, handleOpenDeliveryAddressUpdateModal } = props

    const listDeliveryAddress = useSelector(state => state.listDeliveryAddress)
    const { listAddress } = listDeliveryAddress

    const currentDeliveryAddress = useSelector(state => state.currentDeliveryAddress)
    const { address, isDefault } = currentDeliveryAddress

    const [selectedValue, setSelectedValue] = React.useState(0)

    const handleChangeDeliveryAddress = (index) => {
        setSelectedValue(Number(index))
    }

    const acceptNewDeliveryAddress = () => {
        let isDefault = selectedValue === 0 ? true : false
        dispatch(currentDeliveryAddressAction(listAddress[selectedValue], selectedValue, isDefault))
        onClose()
    }

    const updateDeliveryAddress = (index) => {
        onClose()
        handleOpenDeliveryAddressUpdateModal(index)
    }

    const addNewDeliveryAddress = () => {
        onClose()
        handleOpenDeliveryAddressAddModal()
    }

    useEffect(() => {
        if (address && listAddress) {
            for (let i = 0; i < listAddress.length; i++) {
                if (JSON.stringify(listAddress[i].address) === JSON.stringify(address.address)) {
                    setSelectedValue(i)
                }
            }
        }
    }, [listAddress])

    return (

        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={styleHeader}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
                        Địa Chỉ Của Tôi
                    </Typography>
                </Box>

                <Box
                    sx={{
                        marginBottom: '12px'
                    }}
                >
                    {
                        (listAddress && listAddress.length > 0) ? (
                            listAddress.map((address, index) => (
                                <Box
                                    key={index}
                                    onClick={() => handleChangeDeliveryAddress(index)}
                                    sx={{
                                        color: 'rgba(0, 0, 0, 0.54)',
                                        paddingTop: '16px',
                                        paddingBottom: '18px',
                                        borderBottom: '1px solid rgba(0,0,0,.09)',
                                        display: 'flex',
                                    }}
                                >
                                    <Box sx={{ paddingRight: '10px' }}>
                                        <Radio
                                            checked={selectedValue === index}
                                            onChange={() => handleChangeDeliveryAddress(index)}
                                            value={index}
                                            name="radio-buttons"
                                            sx={{
                                                padding: '0px',
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 20,
                                                },
                                            }}
                                        />
                                    </Box>

                                    <Box sx={{ width: '100%' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '4px'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Box sx={{ fontSize: '16px', color: 'black' }}>{address.name}</Box>

                                                <Box
                                                    sx={{
                                                        marginLeft: '8px',
                                                        marginRight: '8px',
                                                        fontSize: '24px',
                                                        lineHeight: 1,
                                                        fontWeight: '100'
                                                    }}
                                                >
                                                    |
                                                </Box>

                                                <Box
                                                    sx={{
                                                        position: 'relative',
                                                        top: '1px'
                                                    }}
                                                >
                                                    {address.phone}
                                                </Box>
                                            </Box>

                                            <Box>
                                                <Button
                                                    onClick={() => updateDeliveryAddress(index)}
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        padding: '0px'
                                                    }}
                                                >
                                                    Cập nhật
                                                </Button>
                                            </Box>
                                        </Box>

                                        <Box
                                            sx={{
                                                marginBottom: '6px'
                                            }}
                                        >
                                            <Box>
                                                {address.address.details}
                                            </Box>

                                            <Box>
                                                {address.address.wards}, &nbsp;
                                                {address.address.district}, &nbsp;
                                                {address.address.province}
                                            </Box>
                                        </Box>

                                        {
                                            ((index === 0) && (
                                                <DefaultTextBox component='span'>
                                                    Mặc Định
                                                </DefaultTextBox>
                                            ))
                                        }
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Box>
                                Hiện đang bị lỗi, bạn hãy tải lại.
                            </Box>
                        )
                    }

                    <Box
                        sx={{
                            marginTop: '20px'
                        }}
                    >
                        <Button
                            variant='outlined'
                            startIcon={<AddIcon />}
                            onClick={addNewDeliveryAddress}
                            sx={{
                                textTransform: 'capitalize'
                            }}
                        >
                            Thêm địa chỉ mới
                        </Button>
                    </Box>
                </Box>

                <Box sx={styleFooter}>

                    <Button
                        variant='outlined'
                        sx={{ fontSize: { xs: '10px', md: '14px' }, textTransform: 'capitalize', width: '120px', marginRight: '16px' }}
                        onClick={props.onClose}
                    >
                        Hủy
                    </Button>

                    <Button
                        variant='contained'
                        sx={{ fontSize: { xs: '10px', md: '14px' }, textTransform: 'capitalize', width: '120px' }}
                        onClick={acceptNewDeliveryAddress}
                    >
                        Xác nhận
                    </Button>
                </Box>

            </Box>
        </Modal>

    )
}

export default DeliveryAddressListModal