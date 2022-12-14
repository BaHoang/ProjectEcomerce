import { Box, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listMyOrders } from '../Actions/orderAction'
import Loading from '../Component/Common/Loading'
import EmptyOrder from '../Component/InforAccount/Purchase/EmptyOrder'
import FetchListMyOrderError from '../Component/InforAccount/Purchase/FetchListMyOrderError'
import ItemOrder from '../Component/InforAccount/Purchase/ItemOrder'
import TabStatus from '../Component/InforAccount/Purchase/TabStatus'
import { useSearchParams } from 'react-router-dom'

const PurchaseScreen = () => {

  const dispatch = useDispatch()

  let [searchParams, setSearchParams] = useSearchParams()

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
    setSearchParams({ statusOrder: parseInt(newStatus) })
  }

  const handleChangePage = (event, value) => {
    setPageState(old => ({ ...old, page: value }))
    setSearchParams({ statusOrder: parseInt(statusOrder), page: value })
  }

  const listsOrderFunction = (page, pageSize, searchOrder, statusOrder) => {
    dispatch(listMyOrders(userInfor, page, pageSize, searchOrder, statusOrder))
  }

  useEffect(() => {
    let page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
    let searchOrder = searchParams.get("searchOrder") ? searchParams.get("searchOrder") : ''
    let statusOrder = (searchParams.get("statusOrder") != null) ? parseInt(searchParams.get("statusOrder")) : -1
    setPageState(old => ({ ...old, page: page }))
    setSearchOrder(searchOrder)
    setStatusOrder(parseInt(statusOrder))

    listsOrderFunction(page, page.pageSize, searchOrder, statusOrder)
  
  }, [searchParams])

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