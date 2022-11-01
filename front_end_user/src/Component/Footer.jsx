import { Box, Container, styled, Typography } from '@mui/material'
import React from 'react'

const NameCompanyBox = styled(Box)({
  fontSize: '20px',
 
  marginBottom: '24px',
  textAlign: 'center',
  color: 'rgba(0, 0, 0, 0.65)'
})

const CustomBox = styled(Box)({
  textAlign: 'center',
  fontSize: '12px',
  lineHeight: 1.5,
  marginBottom: '4px',
  color: 'rgba(0, 0, 0, 0.65)'
})

const Footer = () => {
  return (
    <Box component="footer" sx={{paddingTop: '42px', paddingBottom: '36px'}}>
      <Container fixed >

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

      </Container>
    </Box>
  )
}

export default Footer