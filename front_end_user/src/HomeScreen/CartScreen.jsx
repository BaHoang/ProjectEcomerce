import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'

import { Box, Button, Checkbox, IconButton, Input, InputBase, styled } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { formatPrice } from '../Utils/FormatPrice'

import { deleteItemCartAction, deleteManyItemCartAction, updateItemCartAction } from '../Actions/cartAction'
import { useEffect } from 'react'
import NotifyCheckOutModal from '../Component/Cart/NotifyCheckOutModal'
import NamePageBody from '../Component/Layout/NamePageBody'
import { listProductAction } from '../Actions/paymentInforAction'

const NamePageBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '8px',
  paddingRight: '8px',
  borderRadius: '18px'
}))

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  marginRight: '8px',
  color: '#1c93fc',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    color: 'rgba(28,147,252,0.6)'
  },
}))

const TitleBox = styled(Box)(({ theme }) => ({
  paddingBottom: '16px',
  fontSize: '20px',
  fontWeight: '600',

}))

const CartItemBox = styled(Box)(({ theme }) => ({
  marginBottom: '12px',
  backgroundColor: 'white',
  borderRadius: '4px',
  padding: '12px',
  boxSizing: 'border-box',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

const ImageAndNameItemBox = styled(Box)(({ theme }) => ({

  boxSizing: 'border-box',
  marginBottom: '8px',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    paddingLeft: '16px',
  },
  [theme.breakpoints.up('md')]: {
    flex: 1,
    paddingRight: '16px',
  },
}))

const ImageItemBox = styled(Box)(({ theme }) => ({
  minWidth: '64px',
  width: '64px',
  height: '64px',
  marginRight: '16px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
}))

const NameItemBox = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: 'black',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
}))

const CustomLink = styled(NavLink)({
  textDecoration: 'none',
})

const PriceItemBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingRight: '10px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('361')]: {
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '0px',
    marginBottom: '16px',
    justifyContent: 'end'
  },

  [theme.breakpoints.between('361', 'md')]: {
    width: '60%',
    paddingLeft: '10%',
    marginBottom: '16px',

  },

  [theme.breakpoints.up('md')]: {
    width: '20%',
  },
}))

const PriceOldItemBox = styled(Box)(({ theme }) => ({
  marginRight: '10px',
  textDecoration: 'line-through',
  color: 'rgba(0,0,0,.54)',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'end'
}))

const QtyItemBox = styled(Box)(({ theme }) => ({
  width: "20%",

  boxSizing: 'border-box',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',

  [theme.breakpoints.down('361')]: {
    width: '100%',
    paddingLeft: '10%',
    marginBottom: '16px',
    justifyContent: 'end'
  },

  [theme.breakpoints.between('361', 'md')]: {
    width: '40%',
    marginBottom: '16px',
    justifyContent: 'end'
  },
  [theme.breakpoints.up('md')]: {
    width: '20%',
    paddingRight: '10px',
  },
}))

const CustomErrorBox = styled(Box)(({ theme }) => ({
  color: 'red',
  marginTop: '8px',

  [theme.breakpoints.down('413')]: {
    marginLeft: '0px',
  },

}))

const TotalPriceItemBox = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  color: 'rgb(28,147,252)',
  fontWeight: '500',

  [theme.breakpoints.down('361')]: {
    width: '100%',
    paddingLeft: '10%',
    marginBottom: '16px',
    textAlign: 'end'
  },

  [theme.breakpoints.between('361', 'md')]: {
    width: '100%',
    paddingRight: '0px',
    textAlign: 'end'
  },

  [theme.breakpoints.up('md')]: {
    width: '10%',
    paddingRight: '10px',
  },
}))

const DeleteBox = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',

  [theme.breakpoints.down('361')]: {
    width: '100%',
    paddingLeft: '10%',
    marginBottom: '8px',
    textAlign: 'end',
  },

  [theme.breakpoints.between('361', 'md')]: {
    width: '100%',
    textAlign: 'end',
  },

  [theme.breakpoints.up('md')]: {
    width: '5%',
  },
}))

const WrapChangeNumProductSelected = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',

}))

const ChangeNumProductIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  border: '1px solid rgba(0,0,0,.09)',
  borderRadius: '0px',
  height: '32px',
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

const SummaryBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '4px',
  padding: '12px',
  boxSizing: 'border-box',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'center'
}))

const SummaryPriceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  flexWrap: 'wrap',
  fontSize: '16px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },

  [theme.breakpoints.up('md')]: {
    flex: 1,
    justifyContent: 'end',
  },
}))

const SummaryPriceTextBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '16px',
    marginTop: '8px',
    textAlign: 'end',
  },

}))

const SummaryPriceTotalBox = styled(Box)(({ theme }) => ({
  fontSize: '24px',
  position: 'relative',
  top: '2px',
  color: 'red',

  [theme.breakpoints.down('361')]: {
    width: '100%',
    marginBottom: '16px',
    textAlign: 'end'
  },

  [theme.breakpoints.between('361', 'md')]: {
    width: '100%',
    marginBottom: '16px',
    textAlign: 'end'
  },

  [theme.breakpoints.up('md')]: {

  },
}))

const WrapMuaHangBox = styled(Box)(({ theme }) => ({
  marginBottom: '10px',

  [theme.breakpoints.down('md')]: {
    width: '100%'
  },

  [theme.breakpoints.up('md')]: {
    width: '210px',
    marginLeft: '16px',
    display: "flex",
    justifyContent: "end",
  },
}))

const MuaHangButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  color: 'white',
  backgroundColor: 'rgb(28,147,252)',
  fontSize: '16px',
  lineHeight: 1,
  boxSizing: 'border-box',
  width: '100%',
  padding: '12px 36px 12px 36px',

  '&:hover': {
    backgroundColor: 'rgba(28,147,252,0.8)',
    color: 'rgba(255,255,255,0.8)'
  },

}))

const CartScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartAdd = useSelector(state => state.cartAdd)
  var { carts } = cartAdd

  const [numProductSelected, setNumProductSelected] = useState(
    [...Array(carts.length)].map((product, index) => Number(carts[index].numProductSelected))
  )
  const [textError, setTextError] = useState(
    [...Array(carts.length)].map(x => '')
  )
  const [checkedState, setCheckedState] = useState(
    new Array(carts.length).fill(false)
  )
  const [checkedStateAll, setCheckedStateAll] = useState(false)
  const [total, setTotal] = useState(0)
  const [numProductMovePayment, setNumProductMovePayment] = useState(0)

  const [openModal, setOpenModal] = useState(false)

  const handleOnChangeStateAll = () => {

    if (checkedStateAll) {
      setCheckedStateAll(false)
      const updatedCheckedState = checkedState.map((item, index) => false)

      setCheckedState(updatedCheckedState)
    } else {
      setCheckedStateAll(true)
      const updatedCheckedState = checkedState.map((item, index) => true)

      setCheckedState(updatedCheckedState)
    }
  }

  const handleOnChange = (position) => {

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )

    var tempCheckedStateAll = true
    for (let i = 0; i < updatedCheckedState.length; i++) {
      if (!updatedCheckedState[i]) {
        tempCheckedStateAll = false
        break
      }
    }

    setCheckedStateAll(tempCheckedStateAll)
    setCheckedState(updatedCheckedState)
  }

  const decreaseNumProductSelected = (index) => {
    if (numProductSelected[index] > 1) {
      var nextNumProductSelected = []
      for (let i = 0; i < carts.length; i++) {
        nextNumProductSelected.push(numProductSelected[i])
      }
      nextNumProductSelected[index] = numProductSelected[index] - 1
      setNumProductSelected(nextNumProductSelected)
      setTextError('')
      dispatch(updateItemCartAction(index, numProductSelected[index] - 1))
    }
  }

  const increaseNumProductSelected = (product, index) => {
    if (numProductSelected[index] < product.countInStock) {
      var nextNumProductSelected = []
      for (let i = 0; i < carts.length; i++) {
        nextNumProductSelected.push(numProductSelected[i])
      }
      nextNumProductSelected[index] = numProductSelected[index] + 1
      setNumProductSelected(nextNumProductSelected)
      dispatch(updateItemCartAction(index, numProductSelected[index] + 1))
    } else {
      var nextTextError = []
      for (let i = 0; i < carts.length; i++) {
        nextTextError.push(textError[i])
      }
      nextTextError[index] = 'Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này'
      setTextError(nextTextError)
    }
  }

  const handleChangeNumProductSelected = (event, product, index) => {
    // qua buoc nay thi co hai loai la NaN va so nguyen lo hon hoac bang 0
    var value = Number(event.target.value)

    var nextNumProductSelected = []
    var nextTextError = []
    for (let i = 0; i < carts.length; i++) {
      nextNumProductSelected.push(numProductSelected[i])
      nextTextError.push(textError[i])
    }

    // loai tat ca NaN
    if (isNaN(value)) {
      nextTextError[index] = 'Phải là một số lớn hơn không'
      nextNumProductSelected[index] = ''

      setNumProductSelected(nextNumProductSelected)
      setTextError(nextTextError)
      return
    }

    // loai tat ca lon hon so luong san pham trong kho
    if (value > product.countInStock) {
      nextNumProductSelected[index] = product.countInStock
      nextTextError[index] = 'Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này'

      setNumProductSelected(nextNumProductSelected)
      setTextError(nextTextError)
      return
    }

    // loai truong hop so san pham bang 0
    if (value === 0) {
      nextNumProductSelected[index] = ''
      setNumProductSelected(nextNumProductSelected)
      return
    }

    // truong hop thoa man
    nextNumProductSelected[index] = value
    setNumProductSelected(nextNumProductSelected)

    nextTextError[index] = ''
    setTextError(nextTextError)

    return
  }

  const handleOnBlur = (index) => {

    if (Number(numProductSelected[index]) === 0) {
      var nextNumProductSelected = []
      for (let i = 0; i < carts.length; i++) {
        nextNumProductSelected.push(numProductSelected[i])
      }
      nextNumProductSelected[index] = 1
      setNumProductSelected(nextNumProductSelected)

      dispatch(updateItemCartAction(index, nextNumProductSelected[index]))
    } else {
      dispatch(updateItemCartAction(index, numProductSelected[index]))
    }
  }

  const deleteItemCart = (index) => {
    dispatch(deleteItemCartAction(index))
    var newCheckedState = []
    for (let i = 0; i < checkedState.length; i++) {
      if (i !== index) {
        newCheckedState.push(checkedState[i])
      }
    }
    setCheckedState(newCheckedState)
  }

  const deleteManyItemCart = (checkedState) => {
    dispatch(deleteManyItemCartAction(checkedState))
    var newCheckedState = []
    for (let i = 0; i < checkedState.length; i++) {
      if (!checkedState[i]) {
        newCheckedState.push(false)
      }
    }
    setCheckedState(newCheckedState)
  }

  const checkOut = (checkedState) => {

    const count = checkedState.reduce((accumulator, currentState) => {
      if (currentState === true) {
        return accumulator + 1
      }

      return accumulator
    }, 0)

    if (count === 0) {
      setOpenModal(true)
    } else {
      dispatch(listProductAction(checkedState))
      navigate('/payment')
    }

  }

  const handleCloseModal = () => setOpenModal(false)

  // cap nhat khi xoa san pham trong gio hang
  useEffect(() => {
    setNumProductSelected([...Array(carts.length)].map((product, index) => Number(carts[index].numProductSelected)))
    setTextError([...Array(carts.length)].map(x => ''))

  }, [cartAdd.carts])

  // tinh tong price, tong so san pham duoc thanh toan
  useEffect(() => {
    const totalPrice = checkedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + carts[index].priceDiscount * numProductSelected[index]
        }
        return sum
      },
      0
    )

    const count = checkedState.reduce((accumulator, currentState) => {
      if (currentState === true) {
        return accumulator + 1;
      }

      return accumulator;
    }, 0)

    setTotal(totalPrice)
    setNumProductMovePayment(count)


  }, [numProductSelected, checkedState])

  return (
    <Box
      sx={{
        paddingTop: '20px',
        paddingBottom: '50px'
      }}
    >

      <NamePageBody namePage="Giỏ hàng của bạn"/>

      <TitleBox>
        Giỏ hàng của bạn có {(carts.length > 0) ? carts.length : 0} sản phẩm
      </TitleBox>

      {
        (carts && carts.length > 0) ? (
          <>
            {
              carts.map((product, index) => (
                <CartItemBox key={product.id}>

                  <Box
                    sx={{
                      width: { xs: '10%', md: '5%' },
                      marginBottom: '8px'
                    }}
                  >
                    <Checkbox
                      id={`custom-checkbox-${index}`}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                  </Box>

                  <ImageAndNameItemBox>
                    <CustomLink to={`/product/${product.id}`}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <ImageItemBox
                          sx={{
                            backgroundImage: `url(${product.image ? product.image :
                              'https://cdn.24h.com.vn/upload/3-2022/images/2022-09-05/MU-chinh-thuc-cong-bo-doi-hinh-da-cup-chau-au-3-SAO-bi-loai-Ronaldo-gop-mat-3-1662395551-785-width740height493.jpg'})`,
                          }}
                        >
                        </ImageItemBox>

                        <NameItemBox>
                          {product.name}
                        </NameItemBox>
                      </Box>

                    </CustomLink>
                  </ImageAndNameItemBox>

                  <PriceItemBox>
                    <PriceOldItemBox>
                      {formatPrice(product.price)}
                    </PriceOldItemBox>

                    <Box>
                      {formatPrice(product.priceDiscount)}
                    </Box>
                  </PriceItemBox>

                  <QtyItemBox>

                    <WrapChangeNumProductSelected>
                      <ChangeNumProductIconButton onClick={() => decreaseNumProductSelected(index)}>
                        <RemoveIcon sx={{ fontSize: 16 }} />
                      </ChangeNumProductIconButton>

                      <CustomInputBase
                        value={numProductSelected[index]}
                        onChange={(event) => handleChangeNumProductSelected(event, product, index)}
                        onBlur={() => handleOnBlur(index)}
                      />

                      <ChangeNumProductIconButton onClick={() => increaseNumProductSelected(product, index)}>
                        <AddIcon sx={{ fontSize: 16 }} />
                      </ChangeNumProductIconButton>
                    </WrapChangeNumProductSelected>

                    <CustomErrorBox>
                      {textError[index]}
                    </CustomErrorBox>

                  </QtyItemBox>

                  <TotalPriceItemBox>
                    {formatPrice(numProductSelected[index] * product.priceDiscount)}
                  </TotalPriceItemBox>

                  <DeleteBox  >
                    <IconButton aria-label="delete" onClick={() => deleteItemCart(index)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </DeleteBox>

                </CartItemBox>
              ))
            }

            <SummaryBox>

              <Box
                sx={{
                  width: { xs: '10%', md: '5%' },
                }}
              >
                <Checkbox
                  id={`custom-checkbox-all`}
                  checked={checkedStateAll}
                  onChange={handleOnChangeStateAll}
                />
              </Box>

              <Box
                sx={{
                  width: { xs: '70%', sm: '80%', md: '10%' },
                  paddingLeft: { xs: '16px', md: '0px' },
                  boxSizing: 'border-box'
                }}
              >
                Chọn tất cả {carts.length}
              </Box>

              <Box
                sx={{
                  width: { xs: '20%', sm: '10%', md: '5%' },
                  textAlign: 'end'
                }}
              >
                <Button
                  sx={{
                    textTransform: 'capitalize',
                    color: 'black'
                  }}
                  onClick={() => deleteManyItemCart(checkedState)}
                >
                  Xóa
                </Button>
              </Box>

              <SummaryPriceBox>

                <SummaryPriceTextBox>
                  Tổng thanh toán ({numProductMovePayment} sản phẩm):
                </SummaryPriceTextBox>

                <SummaryPriceTotalBox>
                  {formatPrice(total)}
                </SummaryPriceTotalBox>

              </SummaryPriceBox>

              <WrapMuaHangBox>
                <MuaHangButton
                  onClick={() => checkOut(checkedState)}
                >
                  Mua hàng
                </MuaHangButton>
              </WrapMuaHangBox>

            </SummaryBox>
          </>

        ) : (
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '18px',
            }}
          >
            Hiện trong giỏ hàng không có sản phẩm
          </Box>
        )
      }

      <NotifyCheckOutModal
        open={openModal}
        onClose={handleCloseModal}        
      />

    </Box >
  )
}

export default CartScreen