import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { orderDetailAction } from '../Actions/orderAction'
import Loading from '../Component/Common/Loading'
import FetchDetailOrderError from '../Component/InforAccount/Purchase/FetchDetailOrderError'
import OrderDetail from '../Component/InforAccount/Purchase/OrderDetail'

const DetailOrderScreen = () => {

  const params = useParams()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const { userInfor } = user

  const orderDetail = useSelector(state => state.orderDetail)

  const { loading, order, error } = orderDetail

  useEffect(() => {
    if (params.id != null) {
      dispatch(orderDetailAction(userInfor, params.id))
    }
  }, [])

  return (
    <Box
      sx={{
        backgroundColor: 'white',
       
      }}
    >
      {
        loading ? (
          <Box
            sx={{
              height: '400px',
            }}
          >
            <Loading />
          </Box>
        ) : error ? (
          <FetchDetailOrderError statusError={error} />
        ) : (
          (order && Object.keys(order).length > 0) ? (
           <OrderDetail order={order}/>
          ) : (
            <Box
              sx={{
                height: '400px',
              }}
            >
              Không có thông tin chi tiết đơn hàng.
            </Box>
          )
        )
      }
    </Box>
  )
}

export default DetailOrderScreen