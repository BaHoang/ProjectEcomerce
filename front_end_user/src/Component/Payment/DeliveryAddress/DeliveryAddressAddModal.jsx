import { Box, Button, IconButton, Modal, Radio, styled, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deliveryAddressAddAction, listDeliveryAddressAction } from '../../../Actions/deliveryAddressAction'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import DeliveryAddressAddError from './DeliveryAddressAddError'
import Loading from '../../Common/Loading'
import DeliveryAddressAddSuccess from './DeliveryAddressAddSuccess'
import { DELIVERY_ADDRESS_ADD_RESET } from '../../../Constants/deliveryAddressConstant'

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

const DeliveryAddressAddModal = (props) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    var { userInfor } = user

    const deliveryAddressAdd = useSelector(state => state.deliveryAddressAdd)

    const {
        loading: loadingAdd,
        error: errorAdd,
        success: successAdd,
        deliveryAddress: deliveryAddress,
    } = deliveryAddressAdd

    const { openDeliveryAddressAddModal, handleCloseDeliveryAddressAddModal, handleOpenDeliveryAddressListModal } = props

    const handleGoBack = () => {
        dispatch({
            type: DELIVERY_ADDRESS_ADD_RESET,
        })

        if (userInfor && Object.keys(userInfor).length !== 0) {
            dispatch(listDeliveryAddressAction(userInfor))
        }

        handleCloseDeliveryAddressAddModal()
        handleOpenDeliveryAddressListModal()
    }

    const initialValues = {
        name: '',
        phone: '',
        province: '',
        district: '',
        village: '',
        details: '',
    }

    const onSubmit = (values, props) => {
        dispatch(deliveryAddressAddAction(userInfor, values.name, values.phone, values.province, values.district, values.village, values.details))
        props.setSubmitting(false)
    }

    const validationSchema = Yup.object().shape({
        name: Yup
            .string('Nh???p t??n c???a b???n')
            .required('T??n c???a b???n l?? g?? ?'),

        phone: Yup
            .string('Nh???p s??? ??i???n tho???i c???a b???n')
            .required('S??? ??i???n tho???i c???a b???n l?? g?? ?'),

        province: Yup
            .string('Nh???p t??n t???nh/th??nh ph??? c???a b???n')
            .required('T??n t???nh/th??nh ph??? c???a b???n l?? g?? ?'),

        district: Yup
            .string('Nh???p t??n huy???n/qu???n c???a b???n')
            .required('T??n huy???n/qu???n c???a b???n l?? g?? ?'),

        village: Yup
            .string('Nh???p t??n x??/ph?????ng c???a b???n')
            .required('T??n x??/ph?????ng c???a b???n l?? g?? ?'),

        details: Yup
            .string('Nh???p ?????a ch??? c??? th??? c???a b???n')
            .required('?????a ch??? c??? th??? c???a b???n l?? g?? ?'),
    })

    return (

        <Modal
            open={openDeliveryAddressAddModal}
            onClose={handleCloseDeliveryAddressAddModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={styleHeader}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
                        ?????a ch??? m???i
                    </Typography>
                </Box>

                <Box>

                    {
                        errorAdd && <DeliveryAddressAddError statusError={errorAdd} />
                    }

                    {
                        successAdd && <DeliveryAddressAddSuccess />
                    }

                    {
                        loadingAdd && <Loading />

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
                                                Th??ng tin ng?????i nh???n h??ng
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
                                                    placeholder="H??? v?? t??n *"
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
                                                    placeholder="S??? ??i???n tho???i *"
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
                                                ?????a ch??? giao h??ng
                                            </Box>

                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                                <CustomTextField
                                                    id="province"
                                                    name="province"
                                                    placeholder="T???nh/th??nh ph??? *"
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
                                                    placeholder="Huy???n/qu???n *"
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
                                                    placeholder="X??/ph?????ng *"
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
                                                    placeholder="?????a ch??? c??? th??? *"
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
                                            Tr??? l???i
                                        </Button>

                                        <Button
                                            type="submit"
                                            variant='contained'
                                            sx={{ fontSize: { xs: '10px', md: '14px' }, textTransform: 'capitalize', width: '120px' }}
                                            disabled={props.isSubmitting}
                                        >
                                            {props.isSubmitting ? 'Loading' : 'Th??m'}
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

export default DeliveryAddressAddModal