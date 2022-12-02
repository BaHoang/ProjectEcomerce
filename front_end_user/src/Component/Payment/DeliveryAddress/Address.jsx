import { Box, Button, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentDeliveryAddressAction, listDeliveryAddressAction } from '../../../Actions/deliveryAddressAction'
import Loading from '../../Common/Loading'
import DeliveryAddressAddModal from './DeliveryAddressAddModal'
import DeliveryAddressListModal from './DeliveryAddressListModal'
import DeliveryAddressUpdateModal from './Update/DeliveryAddressUpdateModal'

const WrapBox = styled(Box)(({ theme }) => ({
    padding: '12px',
    marginBottom: '16px',
    backgroundColor: 'white',
    borderRadius: '8px'
}))

const TitleBox = styled(Box)(({ theme }) => ({
    fontSize: '20px',
    marginBottom: '8px'
}))

const DefaultTextBox = styled(Box)(({ theme }) => ({
    border: '1px solid red',
    color: 'red',
    fontSize: '10px',
    padding: '2px 5px',
    lineHeight: 1.2,
    marginLeft: '16px',
}))

const Address = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    var { userInfor } = user

    const listDeliveryAddress = useSelector(state => state.listDeliveryAddress)
    const { listAddress, loading, error } = listDeliveryAddress

    const currentDeliveryAddress = useSelector(state => state.currentDeliveryAddress)
    const { address, selectedValue, isDefault } = currentDeliveryAddress

    const [openModal, setOpenModal] = useState(false)
    const [openDeliveryAddressAddModal, setOpenDeliveryAddressAddModal] = useState(false)
    const [openDeliveryAddressUpdateModal, setOpenDeliveryAddressUpdateModal] = useState(false)
    const [deliveryAddressBeforeUpdate, setDeliveryAddressBeforeUpdate] = useState({})
    const [indexDeliveryAddressUpdate, setIndexDeliveryAddressUpdate] = useState()

    const handleCloseModal = () => setOpenModal(false)
    const handleCloseDeliveryAddressAddModal = () => setOpenDeliveryAddressAddModal(false)
    const handleCloseDeliveryAddressUpdateModal = () => setOpenDeliveryAddressUpdateModal(false)

    const handleChangeDeliveryAddress = () => {
        setOpenModal(true)
    }

    const handleOpenDeliveryAddressAddModal = () => {
        setOpenDeliveryAddressAddModal(true)
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

    useEffect(() => {
        if (userInfor && Object.keys(userInfor).length !== 0) {
            dispatch(listDeliveryAddressAction(userInfor))
        }
    }, [])

    useEffect(() => {
        if (listAddress && listAddress.length > 0) {

            if (address && Object.keys(address).length !== 0) {
                dispatch(currentDeliveryAddressAction(address, selectedValue, isDefault))
            } else {
                dispatch(currentDeliveryAddressAction(listAddress[0], 0, true))
            }
        }
    }, [listDeliveryAddress.listAddress])

    return (
        <WrapBox>
            <TitleBox>
                Địa Chỉ Nhận Hàng
            </TitleBox>

            {
                loading ? (
                    <Loading />
                ) : error ? (
                    <Box>
                        Hien khong co dia chi, ban hay thu tai lai
                    </Box>
                ) : (
                    (listAddress.length === 0) ? (
                        <Box>
                            Hiện không có địa chỉ
                        </Box>
                    ) : (
                        (address && Object.keys(address).length !== 0) && (
                            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>

                                <Box sx={{ fontWeight: 700 }}>
                                    {address.name}&nbsp; &nbsp;{address.phone}
                                </Box>

                                <Box sx={{ marginLeft: '20px' }}>
                                    {address.address.details}, &nbsp;
                                    {address.address.wards}, &nbsp;
                                    {address.address.district}, &nbsp;
                                    {address.address.province}
                                </Box>

                                {
                                    (isDefault && (
                                        <DefaultTextBox>
                                            Mặc Định
                                        </DefaultTextBox>
                                    ))
                                }

                                <Box>
                                    <Button
                                        sx={{
                                            textTransform: 'capitalize',
                                            marginLeft: '32px'
                                        }}
                                        onClick={handleChangeDeliveryAddress}
                                    >
                                        Thay Đổi
                                    </Button>
                                </Box>

                            </Box>
                        )
                    )
                )
            }

            {
                openModal && (
                    <DeliveryAddressListModal
                        open={openModal}
                        onClose={handleCloseModal}
                        handleOpenDeliveryAddressAddModal={handleOpenDeliveryAddressAddModal}
                        handleOpenDeliveryAddressUpdateModal={handleOpenDeliveryAddressUpdateModal}
                    />
                )
            }

            <DeliveryAddressAddModal
                openDeliveryAddressAddModal={openDeliveryAddressAddModal}
                handleCloseDeliveryAddressAddModal={handleCloseDeliveryAddressAddModal}
                handleOpenDeliveryAddressListModal={() => setOpenModal(true)}
            />

            <DeliveryAddressUpdateModal
                openDeliveryAddressUpdateModal={openDeliveryAddressUpdateModal}
                handleCloseDeliveryAddressUpdateModal={handleCloseDeliveryAddressUpdateModal}
                handleOpenDeliveryAddressListModal={() => setOpenModal(true)}
                deliveryAddressBeforeUpdate={deliveryAddressBeforeUpdate}
                indexDeliveryAddressUpdate={indexDeliveryAddressUpdate}
            />

        </WrapBox>
    )
}

export default Address