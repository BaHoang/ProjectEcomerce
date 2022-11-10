import { Box, styled } from '@mui/material'
import React from 'react'

const ReviewBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  marginTop: '30px',
  borderRadius: '4px',
  padding: '16px'
}))

const TitleBox = styled(Box)(({ theme }) => ({
  paddingBottom: '16px',
  fontSize: '20px',
  fontWeight: '600',
}))

const ReviewProduct = () => {
  return (
    <ReviewBox>
      <TitleBox>
        Nhận xét của khách hàng
      </TitleBox>
    </ReviewBox>
  )
}

export default ReviewProduct