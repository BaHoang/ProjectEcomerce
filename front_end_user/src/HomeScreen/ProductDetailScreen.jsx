import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { detailProductAction } from '../Actions/productAction'
import Loading from '../Component/Common/Loading'
import FetchDetailProductError from '../Component/Product/FetchDetailProductError'
import SameProduct from '../Component/Product/DetailProduct/SameProduct'
import ReviewProduct from '../Component/Product/DetailProduct/ReviewProduct'
import InforProduct from '../Component/Product/DetailProduct/InforProduct'

const ProductDetailScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const detailProduct = useSelector(state => state.detailProduct)
  const { product, loading, error } = detailProduct

  useEffect(() => {
    dispatch(detailProductAction(id))
  }, [id])

  return (

    <Box>

      {loading ? (

        <Loading />

      ) : error ? (

        <FetchDetailProductError statusError={error} />

      ) : (

        (typeof product === 'object' && Object.keys(product).length > 0) && (
          <Box
            sx={{
              paddingTop: '20px',
              paddingBottom: '50px'
            }}
          >
            <InforProduct product={product} />
            <ReviewProduct product={product} />
            <SameProduct product={product} />
          </Box>
        )

      )}

    </Box>

  )
}

export default ProductDetailScreen