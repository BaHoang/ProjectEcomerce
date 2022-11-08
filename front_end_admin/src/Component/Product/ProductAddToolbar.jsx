import { Avatar, Box, Button, FormControl, FormHelperText, IconButton, Input, InputLabel, Modal, OutlinedInput, Popover, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { borderRadius } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { addProductAdmin } from '../../Actions/productAction'
import ProductAddError from './ProductAddError'
import Loading from '../Common/Loading'
import ProductAddSuccess from './ProductAddSuccess'
import { PRODUCT_ADD_RESET } from '../../Constants/productConstant'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'

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
    maxHeight: '70vh',
}

const styleBody = {
    p: '0px 32px 0px 32px',
}

const styleHeader = {
    position: 'sticky',
    top: '0',
    backgroundColor: 'white',
    p: '20px 32px 8px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 100,
}

const styleFooter = {
    position: 'sticky',
    bottom: '0',
    backgroundColor: 'white',
    p: '12px 0px 12px 0px',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 100,
}

const CustomTextField = styled(TextField)(({ theme }) => ({

    marginTop: '20px',

    '& label.Mui-focused': {
        color: 'black',
    },

    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            border: 'solid 1px black',
            borderRadius: '28px'
        },

        borderRadius: '28px',
    },

    [theme.breakpoints.up('xs')]: {
        width: '100%',
    },

    [theme.breakpoints.up('sm')]: {
        width: '90%',
    },


    [theme.breakpoints.up('md')]: {
        width: '48%',
    },
}))

const CustomLabel = styled('label')({
    cursor: 'pointer',
})

const ProductAddToolbar = (props) => {

    const { listsProductFunction } = props

    const [openAddModal, setOpenAddModal] = useState(false)

    const user = useSelector(state => state.user)
    const { userInfor } = user

    const productAdd = useSelector(state => state.productAdd)

    const {
        loading: loadingAdd,
        error: errorAdd,
        success: successAdd,
        product: productNew,
    } = productAdd

    const [productInforAdd, setproductInforAdd] = useState({
        file: null,
        name: '',
        price: '',
        priceDiscount: '',
        brand: '',
        countInStock: '',
        chipset: '',
        rom: '',
        ram: '',
        operating: '',
        color: '',
        manHinh: '',
        cameraSau: '',
        cameraTruoc: '',
        pin: '',
        description: ''
    })

    const [anchorEl, setAnchorEl] = useState(null)
    const openPopoverAdd = Boolean(anchorEl)
    const id = openPopoverAdd ? 'simple-popover' : undefined

    const handleClosePopoverAdd = () => {
        setAnchorEl(null)
        
    }

    const dispatch = useDispatch()

    const handleOpenAddModal = () => {
        setOpenAddModal(true)
    }

    const handleCloseAddModal = () => {
        dispatch({
            type: PRODUCT_ADD_RESET,
        })
        setOpenAddModal(false)
        listsProductFunction()
    }

    const validationSchema = Yup.object().shape({
        file: Yup.mixed().required('Image is required'),
        name: Yup.string('Enter name').required('Name is required').min(0, 'Min value 0.'),
        price: Yup.number('Enter price').required("Price is required").min(0, 'Min value 0.'),
        priceDiscount: Yup.number('Enter price').min(0, 'Min value 0.'),
        brand: Yup.string('Enter brand').required('Brand is required'),
        countInStock: Yup.number('Enter count in stock').required("Count In Stock is required").min(0, 'Min value 0.'),
        chipset: Yup.string('Enter chipset').required("Chipset is required"),
        rom: Yup.number('Enter rom').required("Rom is required").min(0, 'Min value 0.'),
        ram: Yup.number('Enter ram').required("Ram is required").min(0, 'Min value 0.'),
        operating: Yup.string('Enter operating').required("Operating is required"),
        color: Yup.string('Enter color').required("Color is required"),
        pin: Yup.string('Enter pin').required("Pin is required"),
        description: Yup.string('Enter description').required("Description is required"),
    })

    const initialValues = {
        file: null,
        name: '',
        price: '',
        priceDiscount: '',
        brand: '',
        countInStock: '',
        chipset: '',
        rom: '',
        ram: '',
        operating: '',
        color: '',
        manHinh: '',
        cameraSau: '',
        cameraTruoc: '',
        pin: '',
        description: '',
    }

    const onSubmit = (values, props) => {

        setproductInforAdd(old => ({
            ...old,
            file: values.file,
            name: values.name,
            price: values.price,
            priceDiscount: values.priceDiscount,
            brand: values.brand,
            countInStock: values.countInStock,
            chipset: values.chipset,
            rom: values.rom,
            ram: values.ram,
            operating: values.operating,
            color: values.color,
            manHinh: values.manHinh,
            cameraSau: values.cameraSau,
            cameraTruoc: values.cameraTruoc,
            pin: values.pin,
            description: values.description
        }))
        props.setSubmitting(false)
    }

    const addProductSubmit = () => {
        dispatch(
            addProductAdmin(
                userInfor,
                productInforAdd.file,
                productInforAdd.name,
                productInforAdd.price,
                productInforAdd.priceDiscount,
                productInforAdd.brand,
                productInforAdd.countInStock,
                productInforAdd.chipset,
                productInforAdd.rom,
                productInforAdd.ram,
                productInforAdd.operating,
                productInforAdd.color,
                productInforAdd.manHinh,
                productInforAdd.cameraSau,
                productInforAdd.cameraTruoc,
                productInforAdd.pin,
                productInforAdd.description
            )
        )
        setAnchorEl(null)
    }

    const handleClickPopoverAdd = (event, errors) => {
        if (!(errors && Object.keys(errors).length !== 0)) {
            setAnchorEl(event.currentTarget)
        }
    }

    return (
        <Box sx={{ marginLeft: 'auto', marginRight: '10px' }}>
            <Button variant='contained' startIcon={<AddIcon />} onClick={handleOpenAddModal}>Add</Button>

            <Modal
                open={openAddModal}
                onClose={handleCloseAddModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={styleHeader}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
                            Add Product
                        </Typography>

                        <IconButton
                            aria-label="close"
                            onClick={handleCloseAddModal}
                            sx={{
                                color: 'black',
                                padding: '0px',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box sx={styleBody}>

                        {
                            errorAdd && <ProductAddError statusError={errorAdd} />
                        }

                        {
                            successAdd && <ProductAddSuccess />
                        }

                        {
                            loadingAdd && <Loading />

                        }

                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {
                                (props) => (
                                    <Form>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                            <Box sx={{ width: '100%', display: 'flex' }}>
                                                <Box sx={{ width: '50%' }}>
                                                    {
                                                        props.values.file ?
                                                            <Box
                                                                component="img"
                                                                sx={{
                                                                    height: 150,
                                                                    width: 'auto',
                                                                    maxHeight: { xs: 100, sm: 130, md: 167 },

                                                                }}
                                                                alt="Image"
                                                                src={URL.createObjectURL(props.values.file)}
                                                            /> : ""
                                                    }
                                                </Box>

                                                <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <FormControl>

                                                        <Button variant='contained' >
                                                            <CustomLabel htmlFor="file">
                                                                Select Image
                                                            </CustomLabel>
                                                        </Button>

                                                        <Input
                                                            id="file"
                                                            name="file"
                                                            type="file"
                                                            onChange={(event) => props.setFieldValue('file', event.currentTarget.files[0])}
                                                            sx={{ display: 'none' }}
                                                        />

                                                        <FormHelperText sx={{ color: 'red' }}>
                                                            {
                                                                (Boolean(props.errors.file)) ? props.errors.file : ''
                                                            }
                                                        </FormHelperText>
                                                    </FormControl>
                                                </Box>

                                            </Box>

                                            <CustomTextField
                                                id="name"
                                                label="Name"
                                                name="name"
                                                placeholder="Nhap vao ten san pham"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                value={props.values.name}
                                                required
                                                error={Boolean(props.errors.name) && props.touched.name}
                                                helperText={<ErrorMessage name='name' />}
                                            />

                                            <CustomTextField
                                                id="price"
                                                label="Price"
                                                name="price"
                                                placeholder="Nhap vao gia san pham"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                required
                                                error={Boolean(props.errors.price) && props.touched.price}
                                                helperText={<ErrorMessage name='price' />}
                                                type='number'
                                                InputProps={{
                                                    inputProps: { min: 0 }
                                                }}
                                            />

                                            <CustomTextField
                                                id="priceDiscount"
                                                label="Price Discount"
                                                name="priceDiscount"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                required
                                                error={Boolean(props.errors.priceDiscount) && props.touched.priceDiscount}
                                                helperText={<ErrorMessage name='priceDiscount' />}
                                                type='number'
                                                InputProps={{
                                                    inputProps: { min: 0 }
                                                }}
                                            />

                                            <CustomTextField
                                                id="brand"
                                                label="Brand"
                                                name="brand"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                required
                                                error={Boolean(props.errors.brand) && props.touched.brand}
                                                helperText={<ErrorMessage name='brand' />}
                                            />

                                            <CustomTextField
                                                id="countInStock"
                                                label="Count In Stock"
                                                name="countInStock"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}

                                                required
                                                error={Boolean(props.errors.countInStock) && props.touched.countInStock}
                                                helperText={<ErrorMessage name='countInStock' />}
                                                type='number'
                                                InputProps={{
                                                    inputProps: { min: 0 }
                                                }}
                                            />

                                            <CustomTextField
                                                id="chipset"
                                                label="Chipset"
                                                name="chipset"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                required
                                                error={Boolean(props.errors.chipset) && props.touched.chipset}
                                                helperText={<ErrorMessage name='chipset' />}
                                            />

                                            <CustomTextField
                                                id="rom"
                                                label="Rom"
                                                name="rom"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                required
                                                error={Boolean(props.errors.rom) && props.touched.rom}
                                                helperText={<ErrorMessage name='rom' />}
                                                type='number'
                                                InputProps={{
                                                    inputProps: { min: 0 }
                                                }}
                                            />

                                            <CustomTextField
                                                id="ram"
                                                label="Ram"
                                                name="ram"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                required
                                                error={Boolean(props.errors.ram) && props.touched.ram}
                                                helperText={<ErrorMessage name='ram' />}
                                                type='number'
                                                InputProps={{
                                                    inputProps: { min: 0 }
                                                }}
                                            />

                                            <CustomTextField
                                                id="operating"
                                                label="Operating"
                                                name="operating"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                required
                                                error={Boolean(props.errors.operating) && props.touched.operating}
                                                helperText={<ErrorMessage name='operating' />}
                                            />

                                            <CustomTextField
                                                id="color"
                                                label="Color"
                                                name="color"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                required
                                                error={Boolean(props.errors.color) && props.touched.color}
                                                helperText={<ErrorMessage name='color' />}
                                            />

                                            <CustomTextField
                                                id="pin"
                                                label="Pin"
                                                name="pin"
                                                placeholder="Nhap vao dung luong pin"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                required
                                                error={Boolean(props.errors.pin) && props.touched.pin}
                                                helperText={<ErrorMessage name='pin' />}
                                            />

                                            <CustomTextField
                                                id="manHinh"
                                                label="Man Hinh"
                                                name="manHinh"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}

                                                error={Boolean(props.errors.manHinh) && props.touched.manHinh}
                                                helperText={<ErrorMessage name='manHinh' />}
                                            />

                                            <CustomTextField
                                                id="cameraSau"
                                                label="Camera sau"
                                                name="cameraSau"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                error={Boolean(props.errors.cameraSau) && props.touched.cameraSau}
                                                helperText={<ErrorMessage name='cameraSau' />}
                                            />

                                            <CustomTextField
                                                id="cameraTruoc"
                                                label="Camera Truoc"
                                                name="cameraTruoc"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}

                                                error={Boolean(props.errors.cameraTruoc) && props.touched.cameraTruoc}
                                                helperText={<ErrorMessage name='cameraTruoc' />}
                                            />

                                            <CustomTextField
                                                id="description"
                                                label="Description"
                                                name="description"
                                                placeholder="Nhap vao gia da giam"
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                required
                                                error={Boolean(props.errors.description) && props.touched.description}
                                                helperText={<ErrorMessage name='description' />}
                                            />

                                        </Box>

                                        <Box sx={styleFooter}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                disabled={props.isSubmitting}
                                                aria-describedby={id}
                                                onClick={(event) => handleClickPopoverAdd(event, props.errors)}
                                            >
                                                {props.isSubmitting ? 'Loading' : 'Add Product'}
                                            </Button>

                                            <Popover
                                                id={id}
                                                open={openPopoverAdd}
                                                anchorEl={anchorEl}
                                                onClose={handleClosePopoverAdd}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                                PaperProps={{
                                                    style: {
                                                        backgroundColor: "transparent",
                                                        boxShadow: "none",
                                                        width: '100%',
                                                    }
                                                }}
                                                sx={{ top: '-90px' }}
                                            >
                                                <Box sx={{
                                                    backgroundColor: 'white',
                                                    position: "relative",
                                                    borderRadius: '5px',
                                                    width: '200px',
                                                    margin: '2px auto 12px',
                                                    boxShadow: '1px 1px 3px 2px rgba(0,0,0, 0.3)',
                                                    "&::before": {
                                                        backgroundColor: "white",
                                                        content: '""',
                                                        display: "block",
                                                        position: "absolute",
                                                        width: 12,
                                                        height: 12,
                                                        bottom: -6,
                                                        transform: "rotate(225deg)",
                                                        left: "calc(50% - 6px)",
                                                        boxShadow: '-2px -2px 4px -1px rgba(0,0,0,0.5)',
                                                    }
                                                }}>
                                                    <Typography component='div' sx={{ padding: '4px 4px 0px 18px', display: 'flex', alignItems: 'center', color: 'red' }}>
                                                        <PriorityHighIcon sx={{ bgcolor: 'rgb(255, 204, 0)', color: 'white', fontSize: '12px', padding: '2px 2px', borderRadius: '12px', marginRight: '8px' }} />
                                                        Are you sure ?
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', paddingBottom: '10px' }}>
                                                        <Button variant="contained" sx={{ fontSize: '10px' }} onClick={handleClosePopoverAdd}>Cancel</Button>
                                                        <Button onClick={addProductSubmit} variant="contained" sx={{ fontSize: '10px' }} >Yes</Button>
                                                    </Box>
                                                </Box>

                                            </Popover>

                                        </Box>

                                    </Form>
                                )}
                        </Formik>

                    </Box>

                </Box >
            </Modal >
        </Box >

    )
}

export default ProductAddToolbar