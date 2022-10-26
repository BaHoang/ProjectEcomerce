import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { getRevenueAndNumberProductBoughtBrand } from '../../Actions/statisticAction'

const StatisticNumberProductBoughtBrand = () => {

    // ok
    const dispatch = useDispatch()

    // ok
    const user = useSelector(state => state.user)
    const { userInfor } = user

    // chua roi
    const revenueAndNumberProductBoughtBrand = useSelector(state => state.revenueAndNumberProductBoughtBrand)
    const { productBoughtBrand, loading, error } = revenueAndNumberProductBoughtBrand

    // ok
    const [series, setSeries] = useState([])
    // ok
    const [options, setOptions] = useState({})
    // ok
    const [showChart, setShowChart] = useState(false)

    // ok
    const handleShowChart = () => {
        setShowChart(!showChart)
    }

    // chua roi
    useEffect(() => {
        dispatch(getRevenueAndNumberProductBoughtBrand(userInfor))
    }, [])

    // chua roi
    useEffect(() => {

        var dataProductBoughtBrand = []
        var categories = []

        if (productBoughtBrand) {
            for (var key of Object.keys(productBoughtBrand)) {
                dataProductBoughtBrand.push(productBoughtBrand[key])
                categories.push(key)
            }

            setSeries([{
                name: 'Số sản phẩm được bán theo thương hiệu',
                data: dataProductBoughtBrand
            }])

            setOptions({
                chart: {
                    id: "simple-bar-product-bought-brand"
                },
                xaxis: {
                    categories: categories
                },
            })
        }

    }, [dispatch, productBoughtBrand])

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: ' 0px 6px 16px 1px rgba(115, 82, 199, 0.2 )',
                backgroundColor: 'white',
                mb: '20px'
            }}
        >

            <Typography
                variant='h6'
                sx={{
                    paddingLeft: '20px',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    cursor: 'pointer'
                }}
                onClick={handleShowChart}
            >
                Số sản phẩm được bán theo thương hiệu
            </Typography>

            <Box sx={{ display: (showChart ? 'block' : 'none') }} >
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height={500}
                />
            </Box>

        </Box>
    )
}

export default StatisticNumberProductBoughtBrand