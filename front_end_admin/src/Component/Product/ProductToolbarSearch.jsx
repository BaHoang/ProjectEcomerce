import { Box, Button, IconButton, InputAdornment, InputBase, Paper, styled, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUserByAdmin } from '../../Actions/userAction'
import { useEffect } from 'react'
import { listProducts } from '../../Actions/productAction'

const ProductToolbarSearch = (props) => {
    const page = props.page ? props.page : 1
    const pageSize = props.pageSize ? props.pageSize : 10
    const searchProduct = props.searchProduct ? props.searchProduct : ''
    const childToParent = props.childToParent

    const [tempText, setTempText] = useState('')

    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        setTempText(event.target.value)
    }

    const handleSubmit = () => {
        dispatch(listProducts(props.page, props.pageSize, tempText))
        childToParent(tempText)
    }

    useEffect(() => {
        setTempText(searchProduct)
    }, [])

    return (
        <Box>
            <Box
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 200,
                    backgroundColor: 'rgb(245, 245, 245)',
                    borderRadius: '50px',
                    marginTop: '20px',
                    marginLeft: '20px'
                }}
            >
                <form onSubmit={handleSubmit}>

                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        onChange={handleChange}
                        value={tempText}
                    />

                    <IconButton sx={{ p: '10px' }} aria-label="menu" type='submit'>
                        <SearchIcon sx={{ color: 'black' }} />
                    </IconButton>

                </form>

            </Box>
        </Box>
    )
}

export default ProductToolbarSearch