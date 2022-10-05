import { Box } from '@mui/material'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TitleScreen from '../Component/Common/TitleScreen'
import { columns } from '../ColumnTable/productColumn.js'
import { listProducts, productDetailAction } from '../Actions/productAction'
import ProductDetailModal from '../Component/Product/ProductDetailModal'
import ProductToolbarSearch from '../Component/Product/ProductToolbarSearch'

export const AdminProductScreen = () => {

  const productList = useSelector(state => state.productList)
  const { products, totalRow, loading } = productList

  const productDetail = useSelector(state => state.productDetail)

  const dispatch = useDispatch()

  const [pageState, setPageState] = useState({
    isLoading: false,
    rows: [],
    rowCountState: 0,
    page: 1,
    pageSize: 10
  })

  const [searchProduct, setSearchProduct] = useState('')

  const [openModal, setOpenModal] = useState(false)

  const childToParent = (searchProduct) => {
    setSearchProduct(searchProduct)
  }

  const handleOpenModal = (params) => {
    setOpenModal(true)
    let idProductInList = params.row.id - (pageState.page - 1) * pageState.pageSize - 1
    let productClicked = products[idProductInList]
    dispatch(productDetailAction(productClicked._id))
  }

  const handleCloseModal = () => setOpenModal(false)

  const listsProductFunction = () => {
    setPageState(old => ({ ...old, isLoading: true }))
    // ham dispatch la bat dong bo tuc la ham phia duoi se thuc hien ke ham dispatch co thuc hien xong hay khong
    dispatch(listProducts(pageState.page, pageState.pageSize, searchProduct))
    setPageState(old => ({ ...old, isLoading: false }))
  }

  // tim kiem theo ten san pham
  // cum tu tim kiem thay doi thi se load lai du lieu. Ta se mac dinh cho trang load lai len la trang so 1
  // neu la trang 1 roi thi thuc hien viec lay du lieu tu server
  // neu chua la trang 1 thi se dua ve page bang 1. Cai nay se kich hoat effect lang nghe page
  useEffect(() => {
    if (pageState.page == 1) {
      listsProductFunction()
    } else {
      setPageState(old => ({ ...old, page: 1 }))
    }
  }, [searchProduct])

  // luong thuc hien:
  // effect 1 duoc thuc hien
  // effect 1 duoc thuc hien dau tien sau do den ham dispatch lay du lieu tu server la ham bat dong bo
  // nen no se tiep tuc thuc hien cau lenh phia duoi cho den khi het roi chuyen sang effect 2 sau do neu
  // ham dong bo effect 1 tra ve ket qua thi se lay ket qua cua no
  useEffect(() => {
    listsProductFunction()
  }, [pageState.page, pageState.pageSize])

  // effect 2
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
      // setOpen(false)
    }

  }, [dispatch, productList.products, productList.totalRow])

  const ProductToolbar = () => {
    return (
      <GridToolbarContainer>
        <ProductToolbarSearch searchProduct={searchProduct} childToParent={childToParent} />
      </GridToolbarContainer>
    )
  }

  return (

    <Box sx={{ margin: 'auto', width: { xs: '92%', sm: '94%', md: '90%' }, minHeight: 'calc(100vh - 80px)' }}>

      <TitleScreen title="Danh sach san pham" />

      <Box sx={{ paddingBottom: '30px' }}>
        <Box sx={{ width: '100%', marginTop: '30px', borderRadius: '15px', overflow: 'hidden', boxShadow: ' 0px 6px 16px 1px rgba(115, 82, 199, 0.2 )', backgroundColor: 'white' }}>

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
      </Box>

      <ProductDetailModal open={openModal} onClose={handleCloseModal} productInfor={productDetail.product} loading={productDetail.loading} />

    </Box>
  )
}
