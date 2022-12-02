import { Box, IconButton, styled } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import React from 'react'
import { NavLink } from 'react-router-dom'


const CustomIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: 'white',
    marginRight: '8px',
    color: '#1c93fc',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        color: 'rgba(28,147,252,0.6)'
    },
}))

const NamePageBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
    paddingRight: '8px',
    borderRadius: '18px'
}))

const NamePageBody = (props) => {
    let namePage = props.namePage ? props.namePage : ''
    return (
        <Box sx={{ display: 'flex', paddingBottom: '36px' }}>

            <NavLink to={`/`}>
                <CustomIconButton aria-label="home">
                    <HomeOutlinedIcon />
                </CustomIconButton>
            </NavLink>

            <Box sx={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
                {'>'}
            </Box>

            <NamePageBox>
                {namePage}
            </NamePageBox>

        </Box>
    )
}

export default NamePageBody