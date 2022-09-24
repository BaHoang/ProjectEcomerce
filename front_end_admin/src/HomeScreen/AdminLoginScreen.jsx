import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { styled } from '@mui/system'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Form, Formik, Field, FastField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { userLogin } from '../Actions/userAction'
import ErrorLogin from '../Component/ErrorLogin'

const CustomBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  [theme.breakpoints.up('xs')]: {
    backgroundColor: '#f0f2f5'
  },

  [theme.breakpoints.up('sm')]: {
    backgroundColor: '#f0f2f5'
  },



  [theme.breakpoints.up('md')]: {
    backgroundImage: `url(${"/static/images/backgroundImage.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: 'bottom',
  },

}))

const LoginBox = styled(Box)(({ theme }) => ({
  height: '400px',
  backgroundColor: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '4px',
  boxShadow: '2px 2px 12px 4px rgba(0,0,0,0.9)',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('xs')]: {
    width: '80%',
  },

  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },

  [theme.breakpoints.up('md')]: {
    width: '30%',
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

export const AdminLoginScreen = () => {

  const [showPassword, setShowPassword] = useState(false)

  const [checkError, setCheckError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      .email('Please enter valid email')
      .required('Email is required'),
    password: Yup
      .string('Enter your password')
      .min(2, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  })

  const initialValues = {
    email: '',
    password: ''
  }

  const onSubmit = (values, props) => {
    console.log(values)
    setTimeout(() => {
      dispatch(userLogin(values.email, values.password))
      setCheckError(false)
      props.setSubmitting(false)
    }, 1000)
  }

  useEffect(() => {
    if (userInfor && Object.keys(userInfor).length !== 0) {

      if (userInfor.isAdmin) {
        setCheckError(false)
        navigate('/admin/dashboard')
      } else {
        setCheckError(true) 
        localStorage.removeItem('userInfor')
      }
      
    }
  }, [dispatch, userInfor]);

  return (

    <CustomBox>
      <Box sx={{ textAlign: 'center', fontSize: { xs: '40px', sm: '42px', md: '50px' }, color: 'black', mb: 5, fontWeight: '700' }}>ShopTelephone</Box>

      <LoginBox>

        <Box sx={{ width: '80%', margin: 'auto' }}>
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

                <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 4 }} disabled={props.isSubmitting}>
                  {props.isSubmitting ? 'Loading' : 'Sign in'}
                </Button>

              </Form>
            )}
          </Formik>

        </Box>

      </LoginBox>

    </CustomBox>
  )
}
