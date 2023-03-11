import { Button, styled, Table, TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { formatDate } from '../../Utils/FormatDate'

const CustomTableCellHeader = styled(TableCell)({
    paddingLeft: '0px',
    color: 'rgba(0, 0, 0)',
    width: '40%',
})

const CustomTableCellContent = styled(TableCell)({
    color: 'rgba(0, 0, 0, 0.6)'
})

const TableUser = (props) => {
    let userDetail = props.inforUser
    let name = userDetail.name ? userDetail.name : ''
    let email = userDetail.email ? userDetail.email : ''
    let gender = ''
    if (userDetail.gender !== undefined) {
        gender = userDetail.gender ? 'Nam' : 'Nữ'
    }
    let address = userDetail.address ? userDetail.address : ''
    let role = userDetail.isAdmin ? 'Admin' : 'User'
    let phoneNumber = userDetail.phoneNumber ? userDetail.phoneNumber : ''
    let dayInSys = userDetail.createdAt ? formatDate(userDetail.createdAt) : ''
    return (
        <Table>

            <TableBody>

                <TableRow>
                    <CustomTableCellHeader component="th" scope="row">
                        Tên
                    </CustomTableCellHeader>
                    <CustomTableCellContent align='left'>
                        {name}
                    </CustomTableCellContent>
                </TableRow>

                <TableRow>
                    <CustomTableCellHeader component="th" scope="row">
                        Email
                    </CustomTableCellHeader>
                    <CustomTableCellContent align='left'>
                        {email}
                    </CustomTableCellContent>
                </TableRow>

                <TableRow>
                    <CustomTableCellHeader component="th" scope="row">
                        Giới tính
                    </CustomTableCellHeader>
                    <CustomTableCellContent align='left'>
                        {gender}
                    </CustomTableCellContent>
                </TableRow>

                <TableRow>
                    <CustomTableCellHeader component="th" scope="row">
                        Địa chỉ
                    </CustomTableCellHeader>
                    <CustomTableCellContent align='left'>
                        {address}
                    </CustomTableCellContent>
                </TableRow>

                <TableRow>
                    <CustomTableCellHeader component="th" scope="row">
                        Quyền
                    </CustomTableCellHeader>
                    <CustomTableCellContent align='left'>
                        {role}
                    </CustomTableCellContent>
                </TableRow>

                <TableRow>
                    <CustomTableCellHeader component="th" scope="row">
                        Số điện thoại
                    </CustomTableCellHeader>
                    <CustomTableCellContent align='left'>
                        {phoneNumber}
                    </CustomTableCellContent>
                </TableRow>

                <TableRow>
                    <CustomTableCellHeader component="th" scope="row">
                        Ngày tham gia hệ thống
                    </CustomTableCellHeader>
                    <CustomTableCellContent align='left'>
                        {dayInSys}
                    </CustomTableCellContent>
                </TableRow>

                {/* <TableRow>
                    <CustomTableCellHeader component="th" scope="row" sx={{borderBottom: 'none'}}>

                    </CustomTableCellHeader>
                    <CustomTableCellContent align='left' sx={{borderBottom: 'none'}}>
                        <Button
                            variant='contained'
                            sx={{
                                textTransform: 'capitalize',
                                backgroundColor: '#1876d2'
                            }}
                        >
                            Cập nhật hồ sơ
                        </Button>
                    </CustomTableCellContent>
                </TableRow> */}

            </TableBody>
        </Table>
    )
}

export default TableUser