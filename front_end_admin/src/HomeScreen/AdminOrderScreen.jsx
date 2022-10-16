import { Box } from '@mui/material'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TitleScreen from '../Component/Common/TitleScreen'

import { listOrders } from '../Actions/orderAction'
import ToolbarSearch from '../Component/Common/ToolbarSearch'
import Loading from '../Component/Common/Loading'
// chua ok
import { columns } from '../ColumnTable/orderColumn.js'

export const AdminOrderScreen = () => {

  const orderList = useSelector(state => state.orderList)
  const { orders, totalRow, loading, error } = orderList

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
  
  const childToParent = (searchOrder) => {
    setSearchOrder(searchOrder)
  }

  const listsOrderFunction = () => {
    setPageState(old => ({ ...old, isLoading: true }))
    dispatch(listOrders(userInfor, pageState.page, pageState.pageSize, searchOrder))
    setPageState(old => ({ ...old, isLoading: false }))
  }
 
  useEffect(() => {
    if (pageState.page == 1) {
      listsOrderFunction()
    } else {
      setPageState(old => ({ ...old, page: 1 }))
    }
  }, [searchOrder])


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
          numOfProd: order.numOfProd,
          transportMethod: order.transportMethod,
          paymentMethod: order.paymentMethod,
          priceDiscount: order.orderProd.priceDiscount
        })
      })
      setPageState(old => ({ ...old, rows: tempRows, rowCountState: totalRow }))
    }

  }, [dispatch, orderList.orders, orderList.totalRow])

  const OrderToolbar = () => {
    return (
      <GridToolbarContainer sx={{paddingTop: '16px'}}>
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
      <TitleScreen title="Danh sach don hang" />

      <Box sx={{ paddingBottom: '30px' }}>
        {
          loading
            ? <Loading />
            : (
              // o day bo sung them check co error trong luc tai du liej danh sach don hang khong (the hien thong 
              // qua bien error)

              // neu co error thi se in ra commponet hien thi error voi status tuong ung
              // neu khong thi se hien thi list order
              <Box sx={{
                width: '100%',
                marginTop: '30px',
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
                  //onRowClick={handleOpenModal}
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
    </Box>
  )
}

