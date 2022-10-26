import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { getRevenueAndNumberProductBoughtBrand } from '../../Actions/statisticAction'

const StatisticRevenueBrand = () => {

    // ok
    const dispatch = useDispatch()

    // ok
    const user = useSelector(state => state.user)
    const { userInfor } = user

    // chua roi
    const revenueAndNumberProductBoughtBrand = useSelector(state => state.revenueAndNumberProductBoughtBrand)
    const { revenueBrand, loading, error } = revenueAndNumberProductBoughtBrand

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

        var dataRevenueBrand = []
        var categories = []

        if (revenueBrand) {
            for (var key of Object.keys(revenueBrand)) {
                dataRevenueBrand.push(revenueBrand[key])
                categories.push(key)
            }

            setSeries([{
                name: 'Doanh thu theo thương hiệu',
                data: dataRevenueBrand
            }])

            setOptions({
                chart: {
                    id: "simple-bar-revenue-brand"
                },
                xaxis: {
                    categories: categories
                },
            })
        }

    }, [dispatch, revenueBrand])

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
                Doanh thu theo thương hiệu
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

export default StatisticRevenueBrand