
import { Box, IconButton, InputBase, styled, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { getRevenueMonth } from '../../Actions/statisticAction'
import SearchIcon from '@mui/icons-material/Search'

const StatisticRevenueMonth = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const { userInfor } = user

    const revenueMonth = useSelector(state => state.revenueMonth)
    const { revenue, loading, error } = revenueMonth

    var d = new Date()
    var currentYear = d.getFullYear()

    const [year, setYear] = useState(currentYear)
    const [series, setSeries] = useState([])
    const [options, setOptions] = useState({})
    const [showChart, setShowChart] = useState(false)

    const handleShowChart = () => {
        setShowChart(!showChart)
    }

    const handleChange = (event) => {
        setYear(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getRevenueMonth(Number(year), userInfor))
    }

    useEffect(() => {
        dispatch(getRevenueMonth(Number(year), userInfor))
    }, [])

    useEffect(() => {

        var dataRevenue = []
        var categories = []

        if (revenue) {
            for (var key of Object.keys(revenue)) {
                dataRevenue.push(revenue[key])
                categories.push(key)
            }

            setSeries([{
                name: 'Doanh thu theo tháng',
                data: dataRevenue
            }])

            setOptions({
                chart: {
                    id: "simple-bar"
                },
                xaxis: {
                    categories: categories
                },
            })
        }

    }, [dispatch, revenueMonth.revenue])

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: ' 0px 6px 16px 1px rgba(115, 82, 199, 0.2 )',
                backgroundColor: 'white'
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
                Doanh thu theo tháng
            </Typography>

            <Box
                sx={{ display: (showChart ? 'block' : 'none') }}
            >
                <Box
                    sx={{
                        p: '0px 4px',
                        width: '100px',
                        backgroundColor: 'rgb(245, 245, 245)',
                        borderRadius: '50px',
                        marginRight: '12px',
                        marginLeft: 'auto'
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <InputBase
                                sx={{ ml: 2 }}
                                placeholder="Year"
                                onChange={handleChange}
                                value={year}
                            />

                            <IconButton sx={{ p: '8px' }} aria-label="menu" type='submit'>
                                <SearchIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </Box>
                    </form>
                </Box>

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

export default StatisticRevenueMonth