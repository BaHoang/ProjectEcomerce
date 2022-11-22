import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Rating,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import React from 'react'
import { formatPrice } from '../../../Utils/FormatPrice'
import { cartAddProduct } from '../../../Actions/cartAction'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TitleBox = styled(Box)(({ theme }) => ({
  paddingBottom: '16px',
  fontSize: '20px',
  fontWeight: '600',
}))

const OverallInforBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  borderRadius: '4px',
  padding: '16px',
  width: '100%',
  boxSizing: 'border-box'
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
  lineHeight: '1.6',
  fontWeight: 500,

  [theme.breakpoints.up('sm')]: {
    fontSize: '24px'
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '20px'
  },
}))

const ReviewBox = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  paddingTop: '0px',
  paddingBottom: '0px',
  lineHeight: 1.5,
  color: '#1890ff',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  [theme.breakpoints.down('300')]: {
    flexDirection: 'column',
    alignItems: 'start',
  },

}))

const WrapBox = styled(Box)(({ theme }) => ({
  color: '#757575',
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '24px',
  flexWrap: 'wrap',
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
  paddingTop: '16px',
  paddingBottom: '16px',
  fontWeight: 500,
  textAlign: 'center',
}))

const OldPriceBox = styled(Box)(({ theme }) => ({
  fontSize: '20px',
  textDecoration: 'line-through',
  color: '#918e8e',
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
  },
}))

const CurrentPriceBox = styled(Box)(({ theme }) => ({
  fontSize: '30px',
  color: 'red',
  marginLeft: '12px',

  [theme.breakpoints.up('sm')]: {
    fontSize: '30px',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  },

  [theme.breakpoints.down('300')]: {
    marginLeft: '0px',
  },

}))

const CustomInputBase = styled(InputBase)(({ theme }) => ({
  border: '1px solid rgba(0,0,0,.09)',
  width: '50px',
  height: '32px',
  fontSize: '16px',
  '& .MuiInputBase-input': {
    textAlign: 'center',
  },
}))

const CustomErrorBox = styled(Box)(({ theme }) => ({
  color: 'red',
  marginTop: '8px',
  marginLeft: '90px',
  [theme.breakpoints.down('413')]: {
    marginLeft: '0px',
  },

}))

const ChangeNumProductIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  border: '1px solid rgba(0,0,0,.09)',
  borderRadius: '0px',
  height: '32px',
}))

const WrapChangeNumProductSelected = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginRight: '16px'
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
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  var { userInfor } = user

  const cartAdd = useSelector(state => state.cartAdd)
  var { carts } = cartAdd

  const { product } = props

  if (product && Object.keys(product).length !== 0) {
    var chipset = product.chipset ? product.chipset : 'Đang cập nhật'
    var rom = product.rom ? product.rom : 'Đang cập nhật'
    var ram = product.ram ? product.ram : 'Đang cập nhật'
    var operating = product.operating ? product.operating : 'Đang cập nhật'
    var color = product.color ? product.color : 'Đang cập nhật'
    var manHinh = product.manHinh ? product.manHinh : 'Đang cập nhật'
    var cameraSau = product.cameraSau ? product.cameraSau : 'Đang cập nhật'
    var cameraTruoc = product.cameraTruoc ? product.cameraTruoc : 'Đang cập nhật'
    var countInStock = product.countInStock ? product.countInStock : 'Đang cập nhật'

    var id = product._id
    var name = product.name
    var image = product.image
    var price = product.price
    var priceDiscount = product.priceDiscount
  }

  const [numProductSelected, setNumProductSelected] = useState(1)
  const [textError, setTextError] = useState('')

  const numProductInCart = () => {
    var numProductInCart = 0
    if (carts) {
      for (let index = 0; index < carts.length; index++) {
        if (carts[index].id === product._id) {
          numProductInCart = carts[index].numProductSelected
          break
        }
      }
    }
    return numProductInCart
  }

  const decreaseNumProductSelected = () => {
    if (numProductSelected > 1) {
      setNumProductSelected(numProductSelected - 1)
    }
  }

  const increaseNumProductSelected = () => {
    if (numProductSelected < (countInStock - numProductInCart())) {
      setNumProductSelected(numProductSelected + 1)
    } else {
      setTextError('Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này')
    }
  }

  const handleChangeNumProductSelected = (event) => {

    // qua buoc nay thi co hai loai la NaN va so nguyen lo hon hoac bang 0
    var value = Number(event.target.value)

    // loai tat ca NaN
    if (isNaN(value)) {
      setTextError('Phải là một số lớn hơn không')
      setNumProductSelected('')
      return
    }

    // loai tat ca lon hon so luong san pham trong kho

    if (value > (countInStock - numProductInCart())) {
      setTextError('Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này')
      setNumProductSelected(countInStock - numProductInCart())
      return
    }

    // loai truong hop so san pham bang 0
    if (value == 0) {
      setNumProductSelected('')
      return
    }

    // truong hop thoa man
    setNumProductSelected(value)
    setTextError('')
    return
  }

  const handleOnBlur = () => {
    if (Number(numProductSelected) === 0) {
      setNumProductSelected(1)
    }
  }

  const addToCard = () => {
    if (userInfor && Object.keys(userInfor).length !== 0) {
      if (numProductInCart() === countInStock) {
        setTextError(`Bạn đã có ${countInStock} sản phẩm trong giỏ hàng. Không thể thêm số lượng đã chọn vào giỏ hàng vì sẽ vượt quá giới hạn mua hàng của bạn. `)
      } else {
        const productAddToCart = { id, name, numProductSelected, price, priceDiscount, image, countInStock }
        dispatch(cartAddProduct(productAddToCart))
      }
    } else {
      navigate('/login')
    }
  }

  return (
    <>

      <Box sx={{ display: 'flex', paddingBottom: '36px' }}>

        <NavLink to={`/`}>
          <IconButton
            aria-label="home"
            sx={{
              backgroundColor: 'white',
              marginRight: '8px',
              color: '#1c93fc',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                color: 'rgba(28,147,252,0.6)'
              },
            }}
          >
            <HomeOutlinedIcon />
          </IconButton>
        </NavLink>

        <Box sx={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
          {'>'}
        </Box>

        <Box sx={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', paddingLeft: '8px', paddingRight: '8px', borderRadius: '18px' }}>
          {product.name}
        </Box>
      </Box>

      <Box>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={12} md={9} lg={9}>
            <OverallInforBox>

              <Box
                sx={{
                  width: { xs: '100%', sm: '30%' },
                  paddingTop: { xs: '100%', sm: '0%' },
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
                  width: { xs: '100%', sm: '70%' },
                  paddingLeft: '24px',
                  boxSizing: 'border-box',
                }}
              >
                <NameBox>
                  {product.name}
                </NameBox>

                <ReviewBox>
                  <Rating name="rating" value={product.rating} precision={0.5} readOnly sx={{ color: '#fadb14' }} />
                  <Box sx={{ position: 'relative', top: '3px', left: '8px' }}>
                    (Có {product.numReviews} đánh giá)
                  </Box>
                </ReviewBox>

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

                <WrapBox>
                  <Box
                    sx={{
                      width: '90px'
                    }}
                  >
                    Thương hiệu
                  </Box>

                  <BrandBox component='span'>
                    {product.brand}
                  </BrandBox>

                </WrapBox>

                <Box
                  sx={{
                    paddingBottom: '24px'
                  }}
                >
                  <Box
                    sx={{
                      color: '#757575',
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box
                      sx={{
                        width: '90px',
                      }}
                    >
                      Số Lượng
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                      }}
                    >
                      <WrapChangeNumProductSelected>
                        <ChangeNumProductIconButton onClick={decreaseNumProductSelected}>
                          <RemoveIcon sx={{ fontSize: 16 }} />
                        </ChangeNumProductIconButton>

                        <CustomInputBase
                          value={numProductSelected}
                          onChange={handleChangeNumProductSelected}
                          onBlur={handleOnBlur}
                        />

                        <ChangeNumProductIconButton onClick={increaseNumProductSelected}>
                          <AddIcon sx={{ fontSize: 16 }} />
                        </ChangeNumProductIconButton>
                      </WrapChangeNumProductSelected>

                      <Box>
                        {countInStock} sản phẩm có sẵn
                      </Box>
                    </Box>

                  </Box>

                  <CustomErrorBox>
                    {textError}
                  </CustomErrorBox>
                </Box>

                <Box >

                  <Button
                    variant='outlined'
                    startIcon={<AddShoppingCartIcon />}
                    sx={{
                      textTransform: 'capitalize',
                      marginRight: '16px',
                      marginTop: '8px',
                      backgroundColor: 'rgb(224,241,235)'
                    }}
                    disabled={countInStock === 0}
                    onClick={addToCard}
                  >
                    Thêm vào giỏ hàng
                  </Button>

                  <Button
                    variant='contained'
                    sx={{
                      textTransform: 'capitalize',
                      marginTop: '8px',
                      backgroundColor: 'rgb(28,147,252)'
                    }}
                  >
                    Mua ngay
                  </Button>

                </Box>

              </Box>

            </OverallInforBox>
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
            <Box sx={{ paddingLeft: { md: '16px' }, paddingTop: { xs: '16px', md: '0px' } }}>
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