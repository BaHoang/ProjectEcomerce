import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { getNumberTypeAndCountInStockProductBrand } from '../../Actions/statisticAction'


const StatisticNumberTypeProductBrand = () => {

    // ok
    const dispatch = useDispatch()

    // ok
    const user = useSelector(state => state.user)
    const { userInfor } = user

    // chua roi
    const numberTypeAndCountInStockProductBrand = useSelector(state => state.numberTypeAndCountInStockProductBrand)
    const { productBrand, loading, error } = numberTypeAndCountInStockProductBrand

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
        dispatch(getNumberTypeAndCountInStockProductBrand(userInfor))
    }, [])

    // chua roi
    useEffect(() => {

        var dataProductBrand = []
        var categories = []

        if (productBrand) {
            for (var key of Object.keys(productBrand)) {
                dataProductBrand.push(productBrand[key])
                categories.push(key)
            }

            setSeries([{
                name: 'Số mặt hàng theo thương hiệu',
                data: dataProductBrand
            }])

            setOptions({
                chart: {
                    id: "simple-bar-num-type-product-brand"
                },
                xaxis: {
                    categories: categories
                },
            })
        }

    }, [dispatch, productBrand])

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
                Số mặt hàng theo thương hiệu
            </Typography>

            <Box
                sx={{ display: (showChart ? 'block' : 'none') }}
            >

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

export default StatisticNumberTypeProductBrand