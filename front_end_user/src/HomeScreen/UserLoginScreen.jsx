import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { styled } from '@mui/system'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { userLogin } from '../Actions/userAction'
import ErrorLogin from '../Component/Login/ErrorLogin'
import { LOGIN_RESET } from '../Constants/userConstant'

const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    boxSizing: 'border-box',
    paddingTop: '80px'

}))

const LoginBox = styled(Box)(({ theme }) => ({
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
})

const CustomLink = styled(NavLink)({
    textDecoration: 'none',
    color: 'black',
    marginLeft: '4px'
    // '&:hover': {
    //     color: 'rgba(255, 255, 255, 0.7)',
    // },
})

export const UserLoginScreen = () => {

    const [showPassword, setShowPassword] = useState(false)

    const [checkError, setCheckError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const user = useSelector(state => state.user)
    var { loading, userInfor, error } = user

    const handleClickShowPassword = (event) => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const validationSchema = Yup.object().shape({
        email: Yup
            .string('Enter your email')
            .email('Email không hợp lệ !')
            .required('Email bạn là gì ?'),
        password: Yup
            .string('Enter your password')
            .min(6, 'Password phải có ít nhất 6 kí tự')
            .required('Password bạn là gì'),
    })

    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = (values, props) => {
        dispatch(userLogin(values.email, values.password))
        setCheckError(false)
        props.setSubmitting(false)
    }

    useEffect(() => {
        if (userInfor && Object.keys(userInfor).length !== 0) {
            const redirect = location.search ? location.search.split('=')[1] : '/'
            navigate(redirect)
        }
    }, [dispatch, userInfor]);

    useEffect(() => {
        dispatch({
            type: LOGIN_RESET,
        })
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
                Đăng nhập
            </Box>

            <LoginBox>
                <Box sx={{ width: '80%', margin: 'auto', height: '100%', paddingTop: '48px', boxSizing: 'border-box' }}>

                    {
                        error && <ErrorLogin error='Please provide a valid email address and password.' />
                    }

                    {
                        checkError && <ErrorLogin error='Account is not exist' />
                    }
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {(props) => (
                            <Form>

                                <CustomTextField
                                    id="outlined-input"
                                    label="Email"
                                    name="email"
                                    placeholder="Nhap vao email"
                                    fullWidth
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    required
                                    error={Boolean(props.errors.email) && props.touched.email}
                                    helperText={<ErrorMessage name='email' />}
                                />

                                <CustomTextField
                                    id="outlined-password"
                                    label="Password"
                                    name="password"
                                    placeholder="Nhap vao password"
                                    fullWidth
                                    margin="normal"
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

                                <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }} disabled={props.isSubmitting}>
                                    {props.isSubmitting ? 'Loading' : 'Đăng nhập'}
                                </Button>

                            </Form>
                        )}
                    </Formik>

                    <Box sx={{ paddingTop: '20px', paddingBottom: '10px', textAlign: 'center' }}>
                        Bạn chưa có tài khoản ? <CustomLink to={`/register`}> Đăng ký</CustomLink>
                    </Box>
                </Box>
            </LoginBox>
        </CustomBox>
    )
}
