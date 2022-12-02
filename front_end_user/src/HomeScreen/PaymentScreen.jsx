import { Box } from '@mui/material'
import React from 'react'
import NamePageBody from '../Component/Layout/NamePageBody'
import Address from '../Component/Payment/DeliveryAddress/Address'

import ListProduct from '../Component/Payment/ListProduct'
import Message from '../Component/Payment/Message'
import PaymentMethod from '../Component/Payment/PaymentMethod'
import TransportMethod from '../Component/Payment/TransportMethod'

const PaymentScreen = () => {
    return (
        <Box
            sx={{
                paddingTop: '20px',
                paddingBottom: '50px'
            }}
        >

            <NamePageBody namePage="Tiến hành thanh toán" />

           <Address />
           <TransportMethod />
           <ListProduct />
           <Message />
           <PaymentMethod />

        </Box >
    )
}

export default PaymentScreen