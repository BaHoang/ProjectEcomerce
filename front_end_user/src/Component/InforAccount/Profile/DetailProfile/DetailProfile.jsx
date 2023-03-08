
import { Box, styled, Table, TableBody, TableCell, TableRow, Typography, tableCellClasses, Button } from '@mui/material'
import React from 'react'

const HeaderBox = styled(Box)(({ theme }) => ({
    borderBottom: '1px solid #efefef',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    paddingTop: '10px',
    paddingBottom: '20px'
}))

const CustomTableCellHeader = styled(TableCell)({
    paddingLeft: '0px',
    color: 'rgba(0, 0, 0)',
    width: '20%',
})

const CustomTableCellContent = styled(TableCell)({
    color: 'rgba(0, 0, 0, 0.6)'
})

const DetailProfile = (props) => {
    let profile = props.profile

    let name = profile.name ? profile.name : ''
    let email = profile.email ? profile.email : ''
    let gender = ''
    if (profile.gender !== undefined) {
        gender = profile.gender ? 'Nam' : 'Nữ'
    } else {
        gender = 'Đang thiếu thông tin'
    }
    let address = profile.address ? profile.address : 'Đang thiếu thông tin'
    let role = profile.isAdmin ? 'Admin' : 'User'
    let phoneNumber = profile.phoneNumber ? profile.phoneNumber : 'Đang thiếu thông tin'
    //let dayInSys = userDetail.createdAt ? formatDate(userDetail.createdAt) : ''
    return (
        <Box>

            <HeaderBox>
                <Box sx={{ fontSize: '20px', fontWeight: '600' }}>
                    Hồ sơ của tôi
                </Box>
            </HeaderBox>

            <Table
                sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none"
                    }
                }}
            >
                <TableBody>

                    <TableRow>
                        <CustomTableCellHeader component="th" scope="row" align='right'>
                            Tên
                        </CustomTableCellHeader>
                        <CustomTableCellContent align='left'>
                            {name}
                        </CustomTableCellContent>
                    </TableRow>

                    <TableRow>
                        <CustomTableCellHeader component="th" scope="row" align='right'>
                            Email
                        </CustomTableCellHeader>
                        <CustomTableCellContent align='left'>
                            {email}
                        </CustomTableCellContent>
                    </TableRow>

                    <TableRow>
                        <CustomTableCellHeader component="th" scope="row" align='right'>
                            Giới tính
                        </CustomTableCellHeader>
                        <CustomTableCellContent align='left'>
                            {gender}
                        </CustomTableCellContent>
                    </TableRow>

                    <TableRow>
                        <CustomTableCellHeader component="th" scope="row" align='right'>
                            Địa chỉ
                        </CustomTableCellHeader>
                        <CustomTableCellContent align='left'>
                            {address}
                        </CustomTableCellContent>
                    </TableRow>

                    <TableRow>
                        <CustomTableCellHeader component="th" scope="row" align='right'>
                            Quyền
                        </CustomTableCellHeader>
                        <CustomTableCellContent align='left'>
                            {role}
                        </CustomTableCellContent>
                    </TableRow>

                    <TableRow>
                        <CustomTableCellHeader component="th" scope="row" align='right'>
                            Số điện thoại
                        </CustomTableCellHeader>
                        <CustomTableCellContent align='left'>
                            {phoneNumber}
                        </CustomTableCellContent>
                    </TableRow>

                    <TableRow>
                        <CustomTableCellHeader component="th" scope="row">

                        </CustomTableCellHeader>
                        <CustomTableCellContent align='left'>
                            <Button
                                variant='contained'
                                sx={{
                                    textTransform: 'capitalize',
                                    backgroundColor: '#1c93fc'
                                }}
                            >
                                Cập nhật hồ sơ
                            </Button>
                        </CustomTableCellContent>
                    </TableRow>

                </TableBody>
            </Table>
        </Box>
    )
}

export default DetailProfile