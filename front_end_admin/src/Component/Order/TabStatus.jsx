import { Box, Tab, Tabs } from '@mui/material'
import { styled } from '@mui/system';
import React from 'react'

const CustomTab = styled(Tab)({
    '&:hover': {
        color: '#1976d2',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: '#1976d2',
    },

})

const CustomTabs = styled(Tabs)(({ theme }) => ({
    [theme.breakpoints.up('xl')]: {
        '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
        }
    },
}))

const TabStatus = (props) => {
    var { statusOrder, handleChangeStatusOrder } = props

    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: '10px',
            boxShadow: ' 0px 6px 16px 1px rgba(115, 82, 199, 0.2 )',
            mt: '36px',

        }}>
            <CustomTabs
                value={statusOrder.toString()}
                onChange={(event, newValue) => handleChangeStatusOrder(newValue)}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="order"
                sx={{
                    '& .MuiButtonBase-root ': {
                        textTransform: 'none',
                        fontSize: '18px',
                        pt: '16px',
                        pb: '16px',
                        color: 'rgb(0,0,0,0.8)'
                    },
                }}
            >
                <CustomTab label="Tất cả" value="-1" />
                <CustomTab label="Chờ xác nhận" value="0" />
                <CustomTab label="Đã xác nhận" value="1" />
                <CustomTab label="Chuẩn bị hàng" value="2" />
                <CustomTab label="Bàn giao vận chuyển" value="3" />
                <CustomTab label="Đang giao" value="4" />
                <CustomTab label="Đã giao" value="5" />
                <CustomTab label="Đã hủy" value="6" />
            </CustomTabs>
        </Box>
    )
}

export default TabStatus