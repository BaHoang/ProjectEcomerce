import { Box } from '@mui/material'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TitleScreen from '../Component/Common/TitleScreen'
import { listOrders, orderDetailAction } from '../Actions/orderAction'
import ToolbarSearch from '../Component/Common/ToolbarSearch'
import Loading from '../Component/Common/Loading'
// chua ok
import { columns } from '../ColumnTable/orderColumn.js'
import TabStatus from '../Component/Order/TabStatus'
import { getNameStatus } from '../Utils/GetNameStatus'
import { getNamePaymentMethod } from '../Utils/GetNamePaymentMethod'
import { getNameTransportMethod } from '../Utils/GetNameTransportMethod'
import { getNamePaid } from '../Utils/GetNamePaid'
import OrderDetailModal from '../Component/Order/OrderDetailModal'
import OrderUpdateError from '../Component/Order/OrderUpdateError'
import OrderUpdateSuccess from '../Component/Order/OrderUpdateSuccess'
import OrderUpdateLoading from '../Component/Order/OrderUpdateLoading'
import { ORDER_UPDATE_RESET } from '../Constants/orderConstant'

export const AdminOrderScreen = () => {

  const orderList = useSelector(state => state.orderList)
  const { orders, totalRow, loading, error } = orderList

  const orderDetail = useSelector(state => state.orderDetail)

  const orderUpdate = useSelector(state => state.orderUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
    order: orderNew,
  } = orderUpdate

  const user = useSelector(state => state.user)
  const { userInfor } = user

  const dispatch = useDispatch()

  const [pageState, setPageState] = useState({
    isLoading: false,
    rows: [],
    rowCountState: 0,
    page: 1,
    pageSize: 10
  })

  const [searchOrder, setSearchOrder] = useState('')

  const [statusOrder, setStatusOrder] = useState("-1")

  const [openModalDetailOrder, setOpenModalDetailOrder] = useState(false)

  const handleOpenModalDetailOrder = (params) => {
    setOpenModalDetailOrder(true)
    let idOrderInList = params.row.id - (pageState.page - 1) * pageState.pageSize - 1
    let orderClicked = orders[idOrderInList]
    dispatch(orderDetailAction(userInfor, orderClicked._id))
  }

  const handleCloseModalDetailOrder = () => setOpenModalDetailOrder(false)

  const handleChangeStatusOrder = (newStatus) => {
    setStatusOrder(parseInt(newStatus))
    dispatch({
      type: ORDER_UPDATE_RESET,
    })
  }

  const childToParent = (searchOrder) => {
    setSearchOrder(searchOrder)
  }

  const listsOrderFunction = () => {
    setPageState(old => ({ ...old, isLoading: true }))
    dispatch(listOrders(userInfor, pageState.page, pageState.pageSize, searchOrder, statusOrder))
    setPageState(old => ({ ...old, isLoading: false }))
  }

  useEffect(() => {
    dispatch({
      type: ORDER_UPDATE_RESET,
    })
  }, [])

  useEffect(() => {
    if (pageState.page == 1) {
      listsOrderFunction()
    } else {
      setPageState(old => ({ ...old, page: 1 }))
    }
  }, [searchOrder, statusOrder])


  useEffect(() => {
    listsOrderFunction()
  }, [pageState.page, pageState.pageSize])

  // ok dang thieu truong du lieu
  useEffect(() => {
    let tempRows = []
    if (orders) {
      orders.map((order, index) => {
        tempRows.push({
          id: ((pageState.page - 1) * pageState.pageSize + index + 1),
          name: order.orderProd.name,
          transportMethod: getNameTransportMethod(order.transportMethod),
          paymentMethod: getNamePaymentMethod(order.paymentMethod),
          priceDiscount: order.orderProd.priceDiscount,
          orderStatus: getNameStatus(order.orderStatus),
          isPaid: getNamePaid(order.isPaid),
        })
      })
      setPageState(old => ({ ...old, rows: tempRows, rowCountState: totalRow }))
    }

  }, [dispatch, orderList.orders, orderList.totalRow])

  const OrderToolbar = () => {
    return (
      <GridToolbarContainer sx={{ paddingTop: '16px' }}>
        <ToolbarSearch searchText={searchOrder} childToParent={childToParent} />
      </GridToolbarContainer>
    )
  }

  return (

    <Box
      sx={{
        margin: 'auto',
        width: { xs: '92%', sm: '94%', md: '90%' },
        minHeight: 'calc(100vh - 80px)'
      }}
    >
      <TitleScreen title="Danh sách đơn hàng" />

      {
        errorUpdate && <OrderUpdateError statusError={errorUpdate} orderId={orderDetail.order._id} />
      }

      {
        successUpdate && <OrderUpdateSuccess orderId={orderDetail.order._id} />
      }

      {
        loadingUpdate && <OrderUpdateLoading orderId={orderDetail.order._id} />

      }

      <TabStatus statusOrder={statusOrder} handleChangeStatusOrder={handleChangeStatusOrder} />

      <Box sx={{ paddingBottom: '30px', marginTop: '12px', }}>
        {
          loading
            ? <Loading />
            : (
              <Box sx={{
                width: '100%',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: ' 0px 6px 16px 1px rgba(115, 82, 199, 0.2 )',
                backgroundColor: 'white'
              }}
              >
                <DataGrid
                  autoHeight
                  rows={pageState.rows}
                  rowCount={pageState.rowCountState}
                  loading={pageState.isLoading}
                  rowsPerPageOptions={[5, 10, 15]}
                  pagination
                  page={pageState.page - 1}
                  pageSize={pageState.pageSize}
                  paginationMode="server"
                  onPageChange={(newPage) => {
                    setPageState(old => ({ ...old, page: newPage + 1 }))
                  }}
                  onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                  columns={columns}
                  onRowClick={handleOpenModalDetailOrder}
                  rowHeight={70}
                  components={{
                    Toolbar: OrderToolbar,
                  }}
                  sx={{
                    '& .MuiDataGrid-row': {
                      cursor: 'pointer'
                    },
                    '& .MuiDataGrid-columnSeparator': {
                      display: 'none',
                    },
                    '& .MuiDataGrid-columnHeaderTitleContainerContent': {
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: '18px'
                    }
                  }}
                />

              </Box>
            )
        }
      </Box>

      <OrderDetailModal
        open={openModalDetailOrder}
        onCloseModalDetailOrder={handleCloseModalDetailOrder}
        orderInfor={orderDetail.order}
        loading={orderDetail.loading}
        handleChangeStatusOrder={handleChangeStatusOrder}
      />
    </Box>
  )
}

