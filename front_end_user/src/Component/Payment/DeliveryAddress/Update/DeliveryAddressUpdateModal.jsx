import { Box, Button, IconButton, Modal, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { currentDeliveryAddressAction, deliveryAddressUpdateAction, listDeliveryAddressAction } from '../../../../Actions/deliveryAddressAction'
import Loading from '../../../Common/Loading'
import DeliveryAddressUpdateSuccess from './DeliveryAddressUpdateSuccess'
import DeliveryAddressUpdateError from './DeliveryAddressUpdateError'
import { DELIVERY_ADDRESS_UPDATE_RESET } from '../../../../Constants/deliveryAddressConstant'

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
    padding: '0px 24px',
    boxSizing: 'border-box'
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

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'black',
    },

    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            border: 'solid 1px black'
        },
    },

    '& .MuiOutlinedInput-input': {
        padding: '10px',
        fontSize: '14px',
        lineHeight: 1.5,
    },

    width: '48%',
    marginBottom: '10px'
})

const DeliveryAddressUpdateModal = (props) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    var { userInfor } = user

    const currentDeliveryAddress = useSelector(state => state.currentDeliveryAddress)
    const { selectedValue } = currentDeliveryAddress

    const deliveryAddressUpdate = useSelector(state => state.deliveryAddressUpdate)

    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
        deliveryAddress: deliveryAddress,
    } = deliveryAddressUpdate

    const {
        openDeliveryAddressUpdateModal,
        handleCloseDeliveryAddressUpdateModal,
        handleOpenDeliveryAddressListModal,
        deliveryAddressBeforeUpdate,
        indexDeliveryAddressUpdate
    } = props

    if (deliveryAddressBeforeUpdate && Object.keys(deliveryAddressBeforeUpdate).length !== 0) {
        var name = deliveryAddressBeforeUpdate.name ? deliveryAddressBeforeUpdate.name : ''
        var phone = deliveryAddressBeforeUpdate.phone ? deliveryAddressBeforeUpdate.phone : ''
        var province = deliveryAddressBeforeUpdate.address.province ? deliveryAddressBeforeUpdate.address.province : ''
        var district = deliveryAddressBeforeUpdate.address.district ? deliveryAddressBeforeUpdate.address.district : ''
        var village = deliveryAddressBeforeUpdate.address.wards ? deliveryAddressBeforeUpdate.address.wards : ''
        var details = deliveryAddressBeforeUpdate.address.details ? deliveryAddressBeforeUpdate.address.details : ''
    } else {
        var name = ''
        var phone = ''
        var province = ''
        var district = ''
        var village = ''
        var details = ''
    }

    const initialValues = {
        name,
        phone,
        province,
        district,
        village,
        details,
    }

    const onSubmit = (values, props) => {
        dispatch(deliveryAddressUpdateAction(userInfor, indexDeliveryAddressUpdate, values.name, values.phone, values.province, values.district, values.village, values.details))
        props.setSubmitting(false)
    }

    const validationSchema = Yup.object().shape({
        name: Yup
            .string('Nhập tên của bạn')
            .required('Tên của bạn là gì ?'),

        phone: Yup
            .string('Nhập số điện thoại của bạn')
            .required('Số điện thoại của bạn là gì ?'),

        province: Yup
            .string('Nhập tên tỉnh/thành phố của bạn')
            .required('Tên tỉnh/thành phố của bạn là gì ?'),

        district: Yup
            .string('Nhập tên huyện/quận của bạn')
            .required('Tên huyện/quận của bạn là gì ?'),

        village: Yup
            .string('Nhập tên xã/phường của bạn')
            .required('Tên xã/phường của bạn là gì ?'),

        details: Yup
            .string('Nhập địa chỉ cụ thể của bạn')
            .required('Địa chỉ cụ thể của bạn là gì ?'),
    })

    const handleGoBack = () => {

        dispatch({
            type: DELIVERY_ADDRESS_UPDATE_RESET,
        })

        if (userInfor && Object.keys(userInfor).length !== 0) {
            dispatch(listDeliveryAddressAction(userInfor))
        }

        if (selectedValue === indexDeliveryAddressUpdate) {
            let isDefault = (selectedValue === 0) ? true : false
            dispatch(currentDeliveryAddressAction(deliveryAddress, selectedValue, isDefault))
        }

        handleCloseDeliveryAddressUpdateModal()
        handleOpenDeliveryAddressListModal()
    }

    return (

        <Modal
            open={openDeliveryAddressUpdateModal}
            onClose={handleCloseDeliveryAddressUpdateModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={styleHeader}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
                        Cập nhật địa chỉ
                    </Typography>
                </Box>

                <Box>

                    {
                        errorUpdate && <DeliveryAddressUpdateError statusError={errorUpdate} />
                    }

                    {
                        successUpdate && <DeliveryAddressUpdateSuccess />
                    }

                    {
                        loadingUpdate && <Loading />
                    }

                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {
                            (props) => (
                                <Form>
                                    <Box>
                                        <Box sx={{ marginBottom: '16px' }}>
                                            <Box
                                                sx={{
                                                    marginBottom: '16px',
                                                    fontSize: '16px'
                                                }}
                                            >
                                                Thông tin người nhận hàng
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <CustomTextField
                                                    id="name"
                                                    name="name"
                                                    placeholder="Họ và tên *"
                                                    onBlur={props.handleBlur}
                                                    onChange={props.handleChange}
                                                    value={props.values.name}
                                                    required
                                                    error={Boolean(props.errors.name) && props.touched.name}
                                                    helperText={<ErrorMessage name='name' />}
                                                />

                                                <CustomTextField
                                                    id="phone"
                                                    name="phone"
                                                    placeholder="Số điện thoại *"
                                                    onBlur={props.handleBlur}
                                                    onChange={props.handleChange}
                                                    value={props.values.phone}
                                                    required
                                                    error={Boolean(props.errors.phone) && props.touched.phone}
                                                    helperText={<ErrorMessage name='phone' />}
                                                />
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Box
                                                sx={{
                                                    marginBottom: '16px',
                                                    fontSize: '16px'
                                                }}
                                            >
                                                Địa chỉ giao hàng
                                            </Box>

                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                                <CustomTextField
                                                    id="province"
                                                    name="province"
                                                    placeholder="Tỉnh/thành phố *"
                                                    onBlur={props.handleBlur}
                                                    onChange={props.handleChange}
                                                    value={props.values.province}
                                                    required
                                                    error={Boolean(props.errors.province) && props.touched.province}
                                                    helperText={<ErrorMessage name='province' />}
                                                />

                                                <CustomTextField
                                                    id="district"
                                                    name="district"
                                                    placeholder="Huyện/quận *"
                                                    onBlur={props.handleBlur}
                                                    onChange={props.handleChange}
                                                    value={props.values.district}
                                                    required
                                                    error={Boolean(props.errors.district) && props.touched.district}
                                                    helperText={<ErrorMessage name='district' />}
                                                />

                                                <CustomTextField
                                                    id="village"
                                                    name="village"
                                                    placeholder="Xã/phường *"
                                                    onBlur={props.handleBlur}
                                                    onChange={props.handleChange}
                                                    value={props.values.village}
                                                    required
                                                    error={Boolean(props.errors.village) && props.touched.village}
                                                    helperText={<ErrorMessage name='village' />}
                                                />

                                                <CustomTextField
                                                    id="details"
                                                    name="details"
                                                    placeholder="Địa chỉ cụ thể *"
                                                    onBlur={props.handleBlur}
                                                    onChange={props.handleChange}
                                                    value={props.values.details}
                                                    required
                                                    error={Boolean(props.errors.details) && props.touched.details}
                                                    helperText={<ErrorMessage name='details' />}
                                                    sx={{
                                                        width: '100%'
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={styleFooter}>
                                        <Button
                                            variant='outlined'
                                            sx={{ fontSize: { xs: '10px', md: '14px' }, textTransform: 'capitalize', width: '120px', marginRight: '16px' }}
                                            onClick={handleGoBack}
                                        >
                                            Trở lại
                                        </Button>

                                        <Button
                                            type="submit"
                                            variant='contained'
                                            sx={{ fontSize: { xs: '10px', md: '14px' }, textTransform: 'capitalize', width: '120px' }}
                                            disabled={props.isSubmitting}
                                        >
                                            {props.isSubmitting ? 'Loading' : 'Hoàn thành'}
                                        </Button>
                                    </Box>

                                </Form>
                            )
                        }
                    </Formik>
                </Box>
            </Box>
        </Modal>

    )
}

export default DeliveryAddressUpdateModal