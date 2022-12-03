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
    borderRadius: '8px',
    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.1)'
}))

const TitleBox = styled(Box)(({ theme }) => ({
    fontSize: '20px',
    marginBottom: '8px'
}))

const WrapDeliveryAddressBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',

    [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
    },

    [theme.breakpoints.between('sm', 'md')]: {
        flexWrap: 'wrap',
    },

    [theme.breakpoints.up('md')]: {
        flexWrap: 'nowrap',
    },
}))

const NameAndPhoneBox = styled(Box)(({ theme }) => ({

    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginBottom: '8px',
    },

    [theme.breakpoints.between('sm', 'md')]: {
        width: '100%',
        marginBottom: '8px',
    },

}))

const DetailAddressBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginBottom: '8px',
    },

    [theme.breakpoints.between('sm', 'md')]: {
        width: '100%',
        marginBottom: '8px',
    },

    [theme.breakpoints.up('md')]: {
        marginLeft: '20px',
    },
}))

const DefaultTextBox = styled(Box)(({ theme }) => ({
    color: 'red',
    fontSize: '10px',
    border: '1px solid red',
    padding: '2px 5px',
    lineHeight: 1.2,
    height: '12px',
    display: "flex",
    alignItems: 'center',

    [theme.breakpoints.up('md')]: {
        marginLeft: '16px',
    },
}))

const CustomButton = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    marginLeft: '32px',
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
                            <WrapDeliveryAddressBox>

                                <NameAndPhoneBox>
                                    {address.name}&nbsp; &nbsp;{address.phone}
                                </NameAndPhoneBox>

                                <DetailAddressBox >
                                    {address.address.details}, &nbsp;
                                    {address.address.wards}, &nbsp;
                                    {address.address.district}, &nbsp;
                                    {address.address.province}
                                </DetailAddressBox>

                                {
                                    (isDefault && (
                                        <DefaultTextBox>
                                            Mặc Định
                                        </DefaultTextBox>
                                    ))
                                }

                                <Box>
                                    <CustomButton onClick={handleChangeDeliveryAddress}>
                                        Thay Đổi
                                    </CustomButton>
                                </Box>

                            </WrapDeliveryAddressBox>
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