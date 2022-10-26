
import { Box, IconButton, InputBase, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { getNumberProductSuccessMonth } from '../../Actions/statisticAction'
import SearchIcon from '@mui/icons-material/Search'

const StatisticNumberProductMonth = () => {

    // ok
    const dispatch = useDispatch()

    // ok
    const user = useSelector(state => state.user)
    const { userInfor } = user

    // chua roi
    const numberProductSuccessMonth = useSelector(state => state.numberProductSuccessMonth)
    const { numProdSuccessMonth, loading, error } = numberProductSuccessMonth

    // ok
    var d = new Date()
    // ok
    var currentYear = d.getFullYear()
    // ok
    const [year, setYear] = useState(currentYear)
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

    // ok
    const handleChange = (event) => {
        setYear(event.target.value)
    }

    // chua roi
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getNumberProductSuccessMonth(Number(year), userInfor))
    }

    // chua roi
    useEffect(() => {
        dispatch(getNumberProductSuccessMonth(Number(year), userInfor))
    }, [])


    // chua roi
    useEffect(() => {

        var dataNumProdSuccessMonth = []
        var categories = []

        if (numProdSuccessMonth) {
            for (var key of Object.keys(numProdSuccessMonth)) {
                dataNumProdSuccessMonth.push(numProdSuccessMonth[key])
                categories.push(key)
            }

            setSeries([{
                name: 'Số sản phẩm bán thành công theo tháng',
                data: dataNumProdSuccessMonth
            }])

            setOptions({
                chart: {
                    id: "simple-bar-num_prod_success-month"
                },
                xaxis: {
                    categories: categories
                },
            })
        }

    }, [dispatch, numberProductSuccessMonth.numProdSuccessMonth])

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
                Số sản phẩm bán thành công theo tháng
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

export default StatisticNumberProductMonth