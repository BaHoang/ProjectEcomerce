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
import NamePageBody from '../../Layout/NamePageBody'

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
    var chipset = product.chipset ? product.chipset : '??ang c???p nh???t'
    var rom = product.rom ? product.rom : '??ang c???p nh???t'
    var ram = product.ram ? product.ram : '??ang c???p nh???t'
    var operating = product.operating ? product.operating : '??ang c???p nh???t'
    var color = product.color ? product.color : '??ang c???p nh???t'
    var manHinh = product.manHinh ? product.manHinh : '??ang c???p nh???t'
    var cameraSau = product.cameraSau ? product.cameraSau : '??ang c???p nh???t'
    var cameraTruoc = product.cameraTruoc ? product.cameraTruoc : '??ang c???p nh???t'
    var countInStock = product.countInStock ? product.countInStock : '??ang c???p nh???t'

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
      setTextError('S??? l?????ng b???n ch???n ???? ?????t m???c t???i ??a c???a s???n ph???m n??y')
    }
  }

  const handleChangeNumProductSelected = (event) => {

    // qua buoc nay thi co hai loai la NaN va so nguyen lo hon hoac bang 0
    var value = Number(event.target.value)

    // loai tat ca NaN
    if (isNaN(value)) {
      setTextError('Ph???i l?? m???t s??? l???n h??n kh??ng')
      setNumProductSelected('')
      return
    }

    // loai tat ca lon hon so luong san pham trong kho

    if (value > (countInStock - numProductInCart())) {
      setTextError('S??? l?????ng b???n ch???n ???? ?????t m???c t???i ??a c???a s???n ph???m n??y')
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
        setTextError(`B???n ???? c?? ${countInStock} s???n ph???m trong gi??? h??ng. Kh??ng th??? th??m s??? l?????ng ???? ch???n v??o gi??? h??ng v?? s??? v?????t qu?? gi???i h???n mua h??ng c???a b???n. `)
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

      <NamePageBody namePage={product.name}/>

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
                    (C?? {product.numReviews} ????nh gi??)
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
                    Th????ng hi???u
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
                      S??? L?????ng
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
                        {countInStock} s???n ph???m c?? s???n
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
                    Th??m v??o gi??? h??ng
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
              <PolicyBox>Ch??nh s??ch b??n h??ng</PolicyBox>
              <PolicyDetailBox>Cam k???t ch??nh h??ng 100%</PolicyDetailBox>
              <PolicyDetailBox>?????i tr??? mi???n ph?? trong 7 ng??y</PolicyDetailBox>
              <PolicyBox>D???ch v??? th??m</PolicyBox>
              <PolicyDetailBox>Mi???n ph?? b???o h??nh t???i nh??</PolicyDetailBox>
            </Box>
          </Grid>

        </Grid>
      </Box>

      <DescriptionBox>

        <Grid container >

          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Box >
              <TitleBox>
                M?? t??? s???n ph???m
              </TitleBox>
              <Box>
                {product.description}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Box sx={{ paddingLeft: { md: '16px' }, paddingTop: { xs: '16px', md: '0px' } }}>
              <TitleBox>
                Th??ng s??? k?? thu???t
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
                        B??? nh??? trong (GB)
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
                        H??? ??i???u h??nh
                      </CustomNoneBackgroundTableCellContent>
                      <CustomNoneBackgroundTableCellContent align='left'>
                        {operating}
                      </CustomNoneBackgroundTableCellContent>
                    </TableRow>

                    <TableRow>
                      <CustomBackgroundTableCellContent component="th" scope="row">
                        M??u s???c
                      </CustomBackgroundTableCellContent>
                      <CustomBackgroundTableCellContent align='left'>
                        {color}
                      </CustomBackgroundTableCellContent>
                    </TableRow>

                    <TableRow>
                      <CustomNoneBackgroundTableCellContent component="th" scope="row">
                        M??n h??nh
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
                        Camera tr?????c
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