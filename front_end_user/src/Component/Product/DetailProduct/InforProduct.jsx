import { Box, Button, Grid, styled, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'
import { formatPrice } from '../../../Utils/FormatPrice'

const TitleBox = styled(Box)(({ theme }) => ({
  paddingBottom: '16px',
  fontSize: '20px',
  fontWeight: '600',
}))

const PolicyBox = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '700',
  lineHeight: 1.5,
  paddingTop: '8px',
  paddingBottom: '8px'
}))

const PolicyDetailBox = styled(Box)(({ theme }) => ({
  paddingBottom: '8px',
  fontWeight: '100',
  color: 'rgba(0, 0, 0, 0.75)'
}))

const NameBox = styled(Box)(({ theme }) => ({
  fontSize: '24px',
  lineHeight: '1.6',
  fontWeight: 500,
}))

const ReviewBox = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  paddingTop: '8px',
  paddingBottom: '8px',
  lineHeight: 1.5,
  color: '#1890ff'
}))

const BrandBox = styled(Box)(({ theme }) => ({
  color: '#3555c5',
  textTransform: 'uppercase',
  fontSize: '16px',
  fontWeight: '500'
}))

const WrapPriceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  paddingTop: '8px',
  paddingBottom: '8px',
  fontWeight: 700,
  textAlign: 'center',
}))

const OldPriceBox = styled(Box)(({ theme }) => ({
  fontSize: '20px',
  textDecoration: 'line-through',
  color: '#918e8e',
  display: 'flex',
  alignItems: 'center'
}))

const CurrentPriceBox = styled(Box)(({ theme }) => ({
  fontSize: '30px',
  color: 'red',

  [theme.breakpoints.up('sm')]: {
    marginLeft: '12px'
  },

}))

const DescriptionBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  marginTop: '30px',
  borderRadius: '4px',
  padding: '16px'
}))

const CustomNoneBackgroundTableCellContent = styled(TableCell)({
  borderBottom: 'none',
})

const CustomBackgroundTableCellContent = styled(TableCell)({
  borderBottom: 'none',
  backgroundColor: '#f3f3f3',
  borderRadius: '4px',
})

const InforProduct = (props) => {

  const { product } = props

  console.log(product)
  if (product && Object.keys(product).length !== 0) {
    var chipset = product.chipset ? product.chipset : ''
    var rom = product.rom ? product.rom : ''
    var ram = product.ram ? product.ram : ''
    var operating = product.operating ? product.operating : ''
    var color = product.color ? product.color : ''
    var manHinh = product.manHinh ? product.manHinh : ''
    var cameraSau = product.cameraSau ? product.cameraSau : ''
    var cameraTruoc = product.cameraTruoc ? product.cameraTruoc : ''
  }

  return (
    <>
      <Box>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Box
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                borderRadius: '4px',
                padding: '16px'
              }}
            >
              <Box
                sx={{
                  width: '30%',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${product.image ? product.image :
                    'https://cdn.24h.com.vn/upload/3-2022/images/2022-09-05/MU-chinh-thuc-cong-bo-doi-hinh-da-cup-chau-au-3-SAO-bi-loai-Ronaldo-gop-mat-3-1662395551-785-width740height493.jpg'})`,
                }}
              >
              </Box>

              <Box
                sx={{
                  width: '70%',
                  paddingLeft: '24px'
                }}
              >
                <NameBox>
                  {product.name}
                </NameBox>

                <ReviewBox>
                  (Có {product.numReviews} đánh giá)
                </ReviewBox>

                <Box
                  sx={{
                    color: 'rgb(170, 170, 170)'
                  }}
                >
                  Thương hiệu:{" "}

                  <BrandBox component='span'>
                    {product.brand}
                  </BrandBox>

                </Box>

                <WrapPriceBox>

                  <OldPriceBox component='span'>

                    {
                      (product.priceDiscount !== product.price) ? (

                        `${formatPrice(product.price)}`

                      ) : (
                        ''
                      )
                    }

                  </OldPriceBox>

                  <CurrentPriceBox component='span'>
                    {formatPrice(product.priceDiscount)}
                  </CurrentPriceBox>

                </WrapPriceBox>

                <Box>
                  Chon so luong:
                </Box>

                <Box>
                  <Button variant='contained'>Them gio hang</Button>
                </Box>

              </Box>

            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '16px'
              }}
            >
              <PolicyBox>Chính sách bán hàng</PolicyBox>
              <PolicyDetailBox>Cam kết chính hãng 100%</PolicyDetailBox>
              <PolicyDetailBox>Đổi trả miễn phí trong 7 ngày</PolicyDetailBox>
              <PolicyBox>Dịch vụ thêm</PolicyBox>
              <PolicyDetailBox>Miễn phí bảo hành tại nhà</PolicyDetailBox>
            </Box>
          </Grid>

        </Grid>
      </Box>

      <DescriptionBox>

        <Grid container >

          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Box >
              <TitleBox>
                Mô tả sản phẩm
              </TitleBox>
              <Box>
                {product.description}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Box sx={{ paddingLeft: '16px' }}>
              <TitleBox>
                Thông số kĩ thuật
              </TitleBox>

              <Box>
                <Table>
                  <TableBody>

                    <TableRow>
                      <CustomBackgroundTableCellContent component="th" scope="row">
                        Chipset
                      </CustomBackgroundTableCellContent>
                      <CustomBackgroundTableCellContent align='left'>
                        {chipset}
                      </CustomBackgroundTableCellContent>
                    </TableRow>

                    <TableRow>
                      <CustomNoneBackgroundTableCellContent component="th" scope="row">
                        Bộ nhớ trong (GB)
                      </CustomNoneBackgroundTableCellContent>
                      <CustomNoneBackgroundTableCellContent align='left'>
                        {rom}
                      </CustomNoneBackgroundTableCellContent>
                    </TableRow>

                    <TableRow>
                      <CustomBackgroundTableCellContent component="th" scope="row">
                        Ram (GB)
                      </CustomBackgroundTableCellContent>
                      <CustomBackgroundTableCellContent align='left'>
                        {ram}
                      </CustomBackgroundTableCellContent>
                    </TableRow>

                    <TableRow>
                      <CustomNoneBackgroundTableCellContent component="th" scope="row">
                        Hệ điều hành
                      </CustomNoneBackgroundTableCellContent>
                      <CustomNoneBackgroundTableCellContent align='left'>
                        {operating}
                      </CustomNoneBackgroundTableCellContent>
                    </TableRow>

                    <TableRow>
                      <CustomBackgroundTableCellContent component="th" scope="row">
                        Màu sắc
                      </CustomBackgroundTableCellContent>
                      <CustomBackgroundTableCellContent align='left'>
                        {color}
                      </CustomBackgroundTableCellContent>
                    </TableRow>

                    <TableRow>
                      <CustomNoneBackgroundTableCellContent component="th" scope="row">
                        Màn hình
                      </CustomNoneBackgroundTableCellContent>
                      <CustomNoneBackgroundTableCellContent align='left'>
                        {manHinh}
                      </CustomNoneBackgroundTableCellContent>
                    </TableRow>

                    <TableRow>
                      <CustomBackgroundTableCellContent component="th" scope="row">
                        Camera sau
                      </CustomBackgroundTableCellContent>
                      <CustomBackgroundTableCellContent align='left'>
                        {cameraSau}
                      </CustomBackgroundTableCellContent>
                    </TableRow>

                    <TableRow>
                      <CustomNoneBackgroundTableCellContent component="th" scope="row">
                        Camera trước
                      </CustomNoneBackgroundTableCellContent>
                      <CustomNoneBackgroundTableCellContent align='left'>
                        {cameraTruoc}
                      </CustomNoneBackgroundTableCellContent>
                    </TableRow>

                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Grid>

        </Grid>

      </DescriptionBox>
    </>
  )
}

export default InforProduct