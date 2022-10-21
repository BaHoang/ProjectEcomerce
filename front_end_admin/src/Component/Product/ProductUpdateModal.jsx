import { Box, Button, FormControl, FormHelperText, IconButton, Input, Modal, styled, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { ErrorMessage, Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductAdmin } from '../../Actions/productAction'
import ProductUpdateSuccess from './ProductUpdateSuccess'
import ProductUpdateError from './ProductUpdateError'
import Loading from '../Common/Loading'

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

const ProductUpdateModal = (props) => {

  const user = useSelector(state => state.user)
  const { userInfor } = user

  const productUpdate = useSelector(state => state.productUpdate)

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
    product: productNew,
  } = productUpdate

  const dispatch = useDispatch()

  const { openUpdateModal, productInfor, handleCloseUpdateModal, loading, listsProductFunction } = props

  var name = productInfor.name ? productInfor.name : ''
  var price = productInfor.price ? productInfor.price : ''
  var priceDiscount = productInfor.priceDiscount ? productInfor.priceDiscount : ''
  var brand = productInfor.brand ? productInfor.brand : ''
  var countInStock = productInfor.countInStock ? productInfor.countInStock : ''
  var chipset = productInfor.chipset ? productInfor.chipset : ''
  var rom = productInfor.rom ? productInfor.rom : ''
  var ram = productInfor.ram ? productInfor.ram : ''
  var operating = productInfor.operating ? productInfor.operating : ''
  var color = productInfor.color ? productInfor.color : ''
  var manHinh = productInfor.manHinh ? productInfor.manHinh : ''
  var cameraSau = productInfor.cameraSau ? productInfor.cameraSau : ''
  var cameraTruoc = productInfor.cameraTruoc ? productInfor.cameraTruoc : ''
  var pin = productInfor.pin ? productInfor.pin : ''
  var description = productInfor.description ? productInfor.description : ''
  var rating = productInfor.rating ? productInfor.rating : ''
  const [image, setImage] = useState(productInfor.image)

  const validationSchema = Yup.object().shape({
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
    name,
    price,
    priceDiscount,
    brand,
    countInStock,
    chipset,
    rom,
    ram,
    operating,
    color,
    manHinh,
    cameraSau,
    cameraTruoc,
    pin,
    description,
    rating,
  }

  const onSubmit = (values, props) => {
    
    dispatch(
      updateProductAdmin(
        userInfor,
        productInfor._id,
        values.file,
        values.name,
        values.price,
        values.priceDiscount,
        values.brand,
        values.countInStock,
        values.chipset,
        values.rom,
        values.ram,
        values.operating,
        values.color,
        values.manHinh,
        values.cameraSau,
        values.cameraTruoc,
        values.pin,
        values.description
      )
    )
    props.setSubmitting(false)
  }

  useEffect(() => {
    setImage(productInfor.image)
  }, [productInfor.image])

  useEffect(() => {
    if (productUpdate.product) {
      listsProductFunction()
    }
  }, [productUpdate.product])

  return (

    <Modal
      open={openUpdateModal}
      onClose={handleCloseUpdateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={styleHeader}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
            Update Product
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleCloseUpdateModal}
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
            errorUpdate && <ProductUpdateError statusError={errorUpdate} />

          }

          {
            successUpdate && <ProductUpdateSuccess />
          }

          {
            loadingUpdate && <Loading />

          }

          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {
              (props) => (
                <Form>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>

                    <Box sx={{ width: '100%', display: 'flex' }}>
                      <Box sx={{ width: '50%' }}>
                        {
                          image ?
                            <Box
                              component="img"
                              sx={{
                                height: 'auto',
                                width: 'auto',
                                maxHeight: 150,
                                maxWidth: 300,

                              }}
                              alt="Image"
                              src={image}
                            /> : ""
                        }
                      </Box>

                      <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FormControl>

                          <Button variant='contained' >
                            <CustomLabel htmlFor="file">
                              Change Image
                            </CustomLabel>
                          </Button>

                          <Input
                            id="file"
                            name="file"
                            type="file"
                            onChange={(event) => {
                              props.setFieldValue('file', event.currentTarget.files[0])
                              setImage(URL.createObjectURL(event.currentTarget.files[0]))
                            }}
                            sx={{ display: 'none' }}
                          />

                          {/* <FormHelperText sx={{ color: 'red' }}>
                            {
                              (Boolean(props.errors.file)) ? props.errors.file : ''
                            }
                          </FormHelperText> */}

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
                      value={props.values.price}
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
                      value={props.values.priceDiscount}
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
                      placeholder="Nhap vao thuong hieu"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      value={props.values.brand}
                      required
                      error={Boolean(props.errors.brand) && props.touched.brand}
                      helperText={<ErrorMessage name='brand' />}
                    />

                    <CustomTextField
                      id="countInStock"
                      label="Count In Stock"
                      name="countInStock"
                      placeholder="Nhap vao so san pham trong kho"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      value={props.values.countInStock}
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
                      value={props.values.chipset}
                      required
                      error={Boolean(props.errors.chipset) && props.touched.chipset}
                      helperText={<ErrorMessage name='chipset' />}
                    />

                    <CustomTextField
                      id="rom"
                      label="Rom"
                      name="rom"
                      placeholder="Nhap vao rom"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      value={props.values.rom}
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
                      placeholder="Nhap vao ram"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      value={props.values.ram}
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
                      placeholder="Nhap vao he dieu hanh"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      value={props.values.operating}
                      required
                      error={Boolean(props.errors.operating) && props.touched.operating}
                      helperText={<ErrorMessage name='operating' />}
                    />

                    <CustomTextField
                      id="color"
                      label="Color"
                      name="color"
                      placeholder="Nhap vao mau sac"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      value={props.values.color}
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
                      value={props.values.pin}
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
                      value={props.values.manHinh}
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
                      value={props.values.cameraSau}
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
                      value={props.values.cameraTruoc}
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
                      value={props.values.description}
                      required
                      error={Boolean(props.errors.description) && props.touched.description}
                      helperText={<ErrorMessage name='description' />}
                    />

                  </Box>

                  <Box sx={styleFooter}>
                    <Button type="submit" variant="contained" size="large" disabled={props.isSubmitting}>
                      {props.isSubmitting ? 'Loading' : 'Update Product'}
                    </Button>
                  </Box>

                </Form>
              )}
          </Formik>

        </Box>

      </Box >
    </Modal >

  )
}

export default ProductUpdateModal