import { Box, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listMyOrders } from '../Actions/orderAction'
import Loading from '../Component/Common/Loading'
import EmptyOrder from '../Component/InforAccount/Purchase/EmptyOrder'
import FetchListMyOrderError from '../Component/InforAccount/Purchase/FetchListMyOrderError'
import ItemOrder from '../Component/InforAccount/Purchase/ItemOrder'
import TabStatus from '../Component/InforAccount/Purchase/TabStatus'

const PurchaseScreen = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const { userInfor } = user

  const listMyOrder = useSelector(state => state.listMyOrder)
  const { loading, listOrder, totalPage, error } = listMyOrder

  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10
  })

  const [searchOrder, setSearchOrder] = useState('')

  const [statusOrder, setStatusOrder] = useState("-1")

  const handleChangeStatusOrder = (newStatus) => {
    setStatusOrder(parseInt(newStatus))
    // dispatch({
    //   type: ORDER_UPDATE_RESET,
    // })
  }


  const handleChangePage = (event, value) => {
    setPageState(old => ({ ...old, page: value }))
  }

  const listsOrderFunction = () => {
    dispatch(listMyOrders(userInfor, pageState.page, pageState.pageSize, searchOrder, statusOrder))
  }

  // useEffect(() => {
  //   dispatch({
  //     type: ORDER_UPDATE_RESET,
  //   })
  // }, [])

  useEffect(() => {
    if (pageState.page == 1) {
      listsOrderFunction()
    } else {
      setPageState(old => ({ ...old, page: 1 }))
    }
  }, [searchOrder, statusOrder])

  useEffect(() => {
    listsOrderFunction()
  }, [pageState.page])

  return (
    <>
      <TabStatus statusOrder={statusOrder} handleChangeStatusOrder={handleChangeStatusOrder} />

      <Box>
        {
          loading ? (
            <Loading />
          ) : error ? (
            <FetchListMyOrderError statusError={error} />
          ) : (

            (listOrder && listOrder.length > 0) ? (
              <>
                {
                  listOrder.map((order, index) => (
                    <ItemOrder key={index} order={order} />
                  ))
                }

                <Box
                  sx={{
                    paddingTop: '30px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Pagination
                    count={totalPage}
                    page={pageState.page}
                    onChange={handleChangePage}
                    color="primary"
                    size="large"
                  />
                </Box>
              </>
            ) : (
              <EmptyOrder />
            )
          )
        }
      </Box>

    </>
  )
}

export default PurchaseScreen