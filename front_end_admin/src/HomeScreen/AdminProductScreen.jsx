import { Box, Typography, Button } from '@mui/material'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TitleScreen from '../Component/Common/TitleScreen'
import { columns } from '../ColumnTable/productColumn.js'
import { listProducts, productComparePriceListAction, productDetailAction } from '../Actions/productAction'
import ProductDetailModal from '../Component/Product/ProductDetailModal'
import ToolbarSearch from '../Component/Common/ToolbarSearch'
import ProductAddToolbar from '../Component/Product/ProductAddToolbar'
import Loading from '../Component/Common/Loading'
import ProductUpdateModal from '../Component/Product/ProductUpdateModal'
import { PRODUCT_UPDATE_RESET } from '../Constants/productConstant'
import ProductCompareModal from '../Component/Product/ProductCompareModal'

export const AdminProductScreen = () => {

  const productList = useSelector(state => state.productList)
  const { products, totalRow, loading } = productList

  const productDetail = useSelector(state => state.productDetail)
  const productComparePriceList = useSelector(state => state.productComparePriceList)

  const dispatch = useDispatch()

  const [pageState, setPageState] = useState({
    isLoading: false,
    rows: [],
    rowCountState: 0,
    page: 1,
    pageSize: 10
  })

  const [searchProduct, setSearchProduct] = useState('')
  const [idProductClicked, setIdProductClicked] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openCompareModal, setOpenCompareModal] = useState(false)

  const handleOpenModal = (params) => {
    setOpenModal(true)
    let idProductInList = params.row.id - (pageState.page - 1) * pageState.pageSize - 1
    let productClicked = products[idProductInList]
    setIdProductClicked(productClicked._id)
    dispatch(productDetailAction(productClicked._id))
    dispatch(productComparePriceListAction(productClicked._id))
  }

  const handleCloseModal = () => setOpenModal(false)

  const handleOpenUpdateModal = (params) => {
    setOpenUpdateModal(true)
  }

  const handleCloseUpdateModal = () => {
    dispatch({
      type: PRODUCT_UPDATE_RESET,
    })
    setOpenUpdateModal(false)
    setOpenModal(true)
    dispatch(productDetailAction(idProductClicked))
  }

  const handleOpenCompareModal = (params) => {
    setOpenCompareModal(true)
  }


  const handleCloseCompareModal = () => {
    // dispatch({
    //   type: PRODUCT_UPDATE_RESET,
    // })
    setOpenCompareModal(false)
    setOpenModal(true)
    dispatch(productDetailAction(idProductClicked))
  }

  const childToParent = (searchProduct) => {
    setSearchProduct(searchProduct)
  }

  const listsProductFunction = () => {
    setPageState(old => ({ ...old, isLoading: true }))
    dispatch(listProducts(pageState.page, pageState.pageSize, searchProduct))
    setPageState(old => ({ ...old, isLoading: false }))
  }

  useEffect(() => {
    if (pageState.page == 1) {
      listsProductFunction()
    } else {
      setPageState(old => ({ ...old, page: 1 }))
    }
  }, [searchProduct])

  useEffect(() => {
    listsProductFunction()
  }, [pageState.page, pageState.pageSize])

  useEffect(() => {
    let tempRows = []
    if (products) {
      products.map((product, index) => {
        tempRows.push({
          id: ((pageState.page - 1) * pageState.pageSize + index + 1),
          name: product.name,
          brand: product.brand,
          countInStock: product.countInStock,
          price: product.price,
          priceDiscount: product.priceDiscount
        })
      })
      setPageState(old => ({ ...old, rows: tempRows, rowCountState: totalRow }))
    }

  }, [dispatch, productList.products, productList.totalRow])

  const ProductToolbar = () => {
    return (
      <GridToolbarContainer sx={{ paddingTop: '16px' }}>
        <ToolbarSearch searchText={searchProduct} childToParent={childToParent} />
        <ProductAddToolbar listsProductFunction={listsProductFunction} />
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

      <TitleScreen title="Danh sách sản phẩm" />

      <Box sx={{ paddingBottom: '30px', marginTop: '30px', }}>
        {
          loading
            ? <Loading />
            : (
              <Box
                sx={{
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
                  onRowClick={handleOpenModal}
                  rowHeight={70}

                  components={{
                    Toolbar: ProductToolbar,
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

      <ProductDetailModal
        open={openModal}
        onClose={handleCloseModal}
        handleOpenUpdateModal={handleOpenUpdateModal}
        handleOpenCompareModal={handleOpenCompareModal}
        productInfor={productDetail.product}
        loading={productDetail.loading}
      />

      <ProductUpdateModal
        openUpdateModal={openUpdateModal}
        productInfor={productDetail.product}
        handleCloseUpdateModal={handleCloseUpdateModal}
        loading={productDetail.loading}
        listsProductFunction={listsProductFunction}
      />

      <ProductCompareModal
        openCompareModal={openCompareModal}
        productInfor={productDetail.product}
        handleCloseCompareModal={handleCloseCompareModal}
        loading={productComparePriceList.loading}
        products={productComparePriceList.products}
        //listsProductFunction={listsProductFunction}
      />

    </Box>
  )
}

