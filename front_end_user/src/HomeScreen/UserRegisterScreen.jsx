import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, Button, FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import { styled } from '@mui/system'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { userRegisterAction } from '../Actions/userAction'
import SuccessRegister from '../Component/Register/SuccessRegister'
import ErrorRegister from '../Component/Register/ErrorRegister'
import { REGISTER_RESET } from '../Constants/userConstant'

const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    boxSizing: 'border-box',
    paddingTop: '80px'
}))

const RegisterBox = styled(Box)(({ theme }) => ({
    minHeight: '340px',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: '4px',
    boxShadow: '2px 2px 12px 2px rgba(0,0,0,0.2)',


    [theme.breakpoints.up('xs')]: {
        width: '80%',
    },

    [theme.breakpoints.up('sm')]: {
        width: '50%',
    },

    [theme.breakpoints.up('md')]: {
        width: '40%',
    },
}))

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'black',
    },

    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            border: 'solid 1px black'
        },
    },
    marginBottom: '16px',
})

const CustomLink = styled(NavLink)({
    textDecoration: 'none',
    color: 'black',
    marginLeft: '4px'
})

export const UserRegisterScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector(state => state.userRegister)
    var { loading, register, error } = userRegister

    const [successRegister, setSuccessRegister] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    //const [checkError, setCheckError] = useState(false)


    const handleClickShowPassword = (event) => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const validationSchema = Yup.object().shape({
        name: Yup
            .string('Enter your name')
            .required('Tên bạn là gì ?'),

        email: Yup
            .string('Enter your email')
            .email('Email không hợp lệ !')
            .required('Email bạn là gì ?'),
        password: Yup
            .string('Enter your password')
            .min(6, 'Password phải có ít nhất 6 kí tự')
            .required('Password bạn là gì ?'),
    })

    const initialValues = {
        name: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        gender: true,
    }

    const onSubmit = (values, props) => {
        dispatch(userRegisterAction(values.name, values.email, values.password, values.address, values.phoneNumber, values.gender))
        // setCheckError(false) 
        dispatch({
            type: REGISTER_RESET,
        })
        props.setSubmitting(false)
    }

    useEffect(() => {
        if (register && Object.keys(register).length !== 0) {
            //navigate('/login')
            setSuccessRegister(true)
        }
    }, [dispatch, register])

    useEffect(() => {
        dispatch({
            type: REGISTER_RESET,
        })
        setSuccessRegister(false)
    }, [])

    return (
        <CustomBox>
            <Box
                sx={{
                    color: 'black',
                    fontSize: '30px',
                    fontWeight: '600',
                    paddingBottom: '20px'
                }}
            >
                Đăng ký
            </Box>

            <RegisterBox>
                <Box sx={{ width: '80%', margin: 'auto', height: '100%', paddingTop: '48px', boxSizing: 'border-box' }}>

                    {
                        error && <ErrorRegister error={error} />
                    }

                    {
                        successRegister && <SuccessRegister />
                    }

                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {(props) => (
                            <Form>
                                <CustomTextField
                                    id="input-name"
                                    label="Name"
                                    name="name"
                                    placeholder="Nhập vào tên"
                                    fullWidth
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    required
                                    error={Boolean(props.errors.name) && props.touched.name}
                                    helperText={<ErrorMessage name='name' />}
                                />

                                <CustomTextField
                                    id="input-email"
                                    label="Email"
                                    name="email"
                                    placeholder="Nhập vào email"
                                    fullWidth
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    required
                                    error={Boolean(props.errors.email) && props.touched.email}
                                    helperText={<ErrorMessage name='email' />}
                                />

                                <CustomTextField
                                    id="input-password"
                                    label="Password"
                                    name="password"
                                    placeholder="Nhập vào password"
                                    fullWidth
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    error={Boolean(props.errors.password) && props.touched.password}
                                    helperText={<ErrorMessage name='password' />}

                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">

                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                />

                                <CustomTextField
                                    id="outlined-input"
                                    label="Địa chỉ"
                                    name="address"
                                    placeholder="Nhập vào địa chỉ"
                                    fullWidth
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                />

                                <CustomTextField
                                    id="input-phoneNumber"
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    placeholder="Nhập vào số điện thoại"
                                    fullWidth
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}

                                />

                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="gender"
                                    value={props.values.gender}
                                    onChange={props.handleChange}
                                    row
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Nam" sx={{ marginRight: '48px' }} />
                                    <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                                </RadioGroup>

                                <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }} disabled={props.isSubmitting}>
                                    {props.isSubmitting ? 'Loading' : 'Đăng ký'}
                                </Button>

                            </Form>
                        )}
                    </Formik>

                    <Box sx={{ paddingTop: '20px', paddingBottom: '10px', textAlign: 'center', marginBottom: '20px' }}>
                        Bạn đã có tài khoản ? <CustomLink to={`/login`}>Đăng nhập</CustomLink>
                    </Box>
                </Box>
            </RegisterBox>
        </CustomBox>
    )
}

// liet ke tat ca thuoc tinh cho dang ky
    // xac dinh cac truong bat buoc

    // ten *
    // email *
    // mat khau *
    // dia chi
    // so dien thoai
    // gioi tinh


// viet logic dang ky
    // neu thanh cong
        // 2. thong bao dang ky tai khoan thanh cong va dua duong link de den trang dang nhap
    // neu that bai thi hien thi thong bao loi
        // tai khoan da ton tai
        // thieu cac truong du lieu bat buoc
        // nhap khong dung dinh dang
