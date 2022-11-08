import { Box, Container, styled, Typography } from '@mui/material'
import React from 'react'

const CustomContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    paddingLeft: '8px',
    paddingRight: '8px'
  },


  [theme.breakpoints.up('lg')]: {
    paddingLeft: '0px',
    paddingRight: '0px'
  },
}))

const NameCompanyBox = styled(Box)(({ theme }) => ({
  fontSize: '20px',
  marginBottom: '24px',
  textAlign: 'center',
  color: 'rgba(0, 0, 0, 0.65)',

  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    marginBottom: '12px',
  },
}))

const CustomBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: 1.5,
  marginBottom: '4px',
  color: 'rgba(0, 0, 0, 0.65)',

  [theme.breakpoints.down('sm')]: {
    textAlign: 'left',
    fontSize: '12px',
  },

}))

const Footer = () => {
  return (
    <Box component="footer" sx={{ paddingTop: { xs: '24px', sm: '42px' }, paddingBottom: { xs: '20px', sm: '36px' } }}>
      <CustomContainer fixed >

        <NameCompanyBox>
          Công ty cổ phần thương mại - dịch vụ shoptelephone
        </NameCompanyBox>

        <CustomBox>
          <Box component="span" sx={{ fontWeight: '900' }}>
            Trụ sở: {" "}
          </Box>
          Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
        </CustomBox>

        <CustomBox>
          <Box component="span" sx={{ fontWeight: '900' }}>
            Văn phòng: {" "}
          </Box>
          Tòa nhà B1, Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
        </CustomBox>

        <CustomBox>
          <Box component="span" sx={{ fontWeight: '900' }}>
            Điện thoại: {" "}
          </Box>
          0354135378
        </CustomBox>

        <CustomBox>
          <Box component="span" sx={{ fontWeight: '900' }}>
            Email: {" "}
          </Box>
          hoang.pb173141@sis.hust.edu.vn
        </CustomBox>

        <CustomBox>
          © 2015 - Bản quyền thuộc về Phan Bá Hoàng
        </CustomBox>

      </CustomContainer>
    </Box>
  )
}

export default Footer