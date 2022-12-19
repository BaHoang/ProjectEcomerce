import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { listDeliveryAddressAction } from '../Actions/deliveryAddressAction'
import Loading from '../Component/Common/Loading'
import DeliveryAddressInInforAccountAddModal from '../Component/DeliveryAddressScreen/DeliveryAddressInInforAccountAddModal'
import DeliveryAddressInInforAccountUpdateModal from '../Component/DeliveryAddressScreen/DeliveryAddressInInforAccountUpdateModal'
import DeliveryAddressInInforAccountConfirmDeleteModal from '../Component/DeliveryAddressScreen/DeliveryAddressInInforAccountConfirmDeleteModal'
import { DELIVERY_ADDRESS_ADD_RESET, DELIVERY_ADDRESS_DELETE_RESET, DELIVERY_ADDRESS_UPDATE_RESET } from '../Constants/deliveryAddressConstant'

const WrapAllListDeliveryAddressBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: '1px 1px 0 rgba(0, 0, 0, 0.05)',
  padding: '12px 30px 0px 30px'
}))

const HeaderBox = styled(Box)(({ theme }) => ({
  borderBottom: '1px solid #efefef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '10px',
  paddingBottom: '20px'
}))

const ErrorBox = styled(Box)(({ theme }) => ({
  color: 'red',
  height: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const WrapDeliveryItemBox = styled(Box)(({ theme }) => ({
  color: 'rgba(0, 0, 0, 0.54)',
  paddingTop: '16px',
  paddingBottom: '18px',
  borderBottom: '1px solid rgba(0,0,0,.09)',
}))

const WrapNamePhoneBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '4px'
}))

const LineBox = styled(Box)(({ theme }) => ({
  marginLeft: '8px',
  marginRight: '8px',
  fontSize: '24px',
  lineHeight: 1,
  fontWeight: '100'
}))

const WrapDeliveryBox = styled(Box)(({ theme }) => ({
  marginBottom: '6px',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between'
}))

const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  padding: '0px'
}))

const DefaultTextBox = styled(Box)(({ theme }) => ({
  border: '1px solid red',
  color: 'red',
  fontSize: '14px',
  padding: '2px 5px',
  lineHeight: 1.2,
}))

const DeliveryAddressScreen = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  var { userInfor } = user

  const listDeliveryAddress = useSelector(state => state.listDeliveryAddress)
  const { listAddress, loading, error } = listDeliveryAddress

  const [openDeliveryAddressAddModal, setOpenDeliveryAddressAddModal] = useState(false)
  const [openDeliveryAddressUpdateModal, setOpenDeliveryAddressUpdateModal] = useState(false)
  const [deliveryAddressBeforeUpdate, setDeliveryAddressBeforeUpdate] = useState({})
  const [indexDeliveryAddressUpdate, setIndexDeliveryAddressUpdate] = useState()
  const [indexDeliveryAddressDelete, setIndexDeliveryAddressDelete] = useState()

  const [openDeliveryAddressConfirmDeleteModal, setOpenDeliveryAddressConfirmDeleteModal] = useState(false)

  const addNewDeliveryAddress = () => {
    handleOpenDeliveryAddressAddModal()
    dispatch({
      type: DELIVERY_ADDRESS_ADD_RESET,
    })
  }

  const handleOpenDeliveryAddressAddModal = () => setOpenDeliveryAddressAddModal(true)
  const handleCloseDeliveryAddressAddModal = () => setOpenDeliveryAddressAddModal(false)

  const updateDeliveryAddress = (index) => {
    handleOpenDeliveryAddressUpdateModal(index)
    dispatch({
      type: DELIVERY_ADDRESS_UPDATE_RESET,
    })
  }

  const handleOpenDeliveryAddressUpdateModal = (index) => {
    setOpenDeliveryAddressUpdateModal(true)
    if (typeof index !== "undefined") {
      if (listAddress && listAddress.length > index) {
        setDeliveryAddressBeforeUpdate(listAddress[index])
        setIndexDeliveryAddressUpdate(index)
      }
    }
  }

  const handleCloseDeliveryAddressUpdateModal = () => setOpenDeliveryAddressUpdateModal(false)

  const deleteDeliveryAddress = (index) => {
    handleOpenDeliveryAddressConfirmDeleteModal()
    setIndexDeliveryAddressDelete(index)
    dispatch({
      type: DELIVERY_ADDRESS_DELETE_RESET,
    })
  }

  const handleOpenDeliveryAddressConfirmDeleteModal = () => setOpenDeliveryAddressConfirmDeleteModal(true)
  const handleCloseDeliveryAddressConfirmDeleteModal = () => setOpenDeliveryAddressConfirmDeleteModal(false)

  useEffect(() => {
    if (userInfor && Object.keys(userInfor).length !== 0) {
      dispatch(listDeliveryAddressAction(userInfor))
    }
  }, [])

  return (
    <WrapAllListDeliveryAddressBox>
      <HeaderBox>
        <Box sx={{ fontSize: '20px', fontWeight: '600' }}>
          Địa chỉ của tôi
        </Box>

        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={addNewDeliveryAddress}
          sx={{
            textTransform: 'capitalize'
          }}
        >
          Thêm địa chỉ mới
        </Button>
      </HeaderBox>

      {
        loading ? (

          <Loading />

        ) : error ? (

          <ErrorBox>
            Hiện đang bị lỗi, bạn hãy tải lại.
          </ErrorBox>

        ) : (

          (listAddress && listAddress.length > 0) ? (
            listAddress.map((address, index) => (
              <WrapDeliveryItemBox key={index}>
                <WrapNamePhoneBox>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box sx={{ fontSize: '16px', color: 'black' }}>{address.name}</Box>

                    <LineBox>
                      |
                    </LineBox>

                    <Box
                      sx={{
                        position: 'relative',
                        top: '1px'
                      }}
                    >
                      {address.phone}
                    </Box>
                  </Box>

                  <Box>
                    <CustomButton
                      onClick={() => updateDeliveryAddress(index)}
                    >
                      Cập nhật
                    </CustomButton>

                    <CustomButton
                      onClick={() => deleteDeliveryAddress(index)}
                    >
                      Xóa
                    </CustomButton>
                  </Box>
                </WrapNamePhoneBox>

                <WrapDeliveryBox>
                  <Box>
                    <Box>
                      {address.address.details}
                    </Box>

                    <Box>
                      {address.address.wards}, &nbsp;
                      {address.address.district}, &nbsp;
                      {address.address.province}
                    </Box>
                  </Box>

                  <CustomButton
                    variant='outlined'
                    // onClick={addNewDeliveryAddress}
                    sx={{
                      padding: '4px 12px 4px 12px'
                    }}
                  >
                    Thiết lập mặc định
                  </CustomButton>
                </WrapDeliveryBox>

                {
                  ((index === 0) && (
                    <DefaultTextBox component='span'>
                      Mặc Định
                    </DefaultTextBox>
                  ))
                }

              </WrapDeliveryItemBox>
            ))
          ) : (
            <ErrorBox>
              Không có địa chỉ nào. Bạn hãy thêm một địa chỉ mới.
            </ErrorBox>
          )

        )
      }

      <DeliveryAddressInInforAccountAddModal
        openDeliveryAddressAddModal={openDeliveryAddressAddModal}
        handleCloseDeliveryAddressAddModal={handleCloseDeliveryAddressAddModal}
      />

      <DeliveryAddressInInforAccountUpdateModal
        openDeliveryAddressUpdateModal={openDeliveryAddressUpdateModal}
        handleCloseDeliveryAddressUpdateModal={handleCloseDeliveryAddressUpdateModal}
        deliveryAddressBeforeUpdate={deliveryAddressBeforeUpdate}
        indexDeliveryAddressUpdate={indexDeliveryAddressUpdate}
      />

      <DeliveryAddressInInforAccountConfirmDeleteModal
        openDeliveryAddressConfirmDeleteModal={openDeliveryAddressConfirmDeleteModal}
        handleCloseDeliveryAddressConfirmDeleteModal={handleCloseDeliveryAddressConfirmDeleteModal}
        indexDeliveryAddressDelete={indexDeliveryAddressDelete}
      />

    </WrapAllListDeliveryAddressBox >
  )
}

export default DeliveryAddressScreen