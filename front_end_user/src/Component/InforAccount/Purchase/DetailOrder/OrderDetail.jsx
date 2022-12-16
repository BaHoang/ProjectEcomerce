import { Box, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../../../Utils/FormatDate'
import { getNameTransportMethod } from '../../../../Utils/GetNameTransportMethod'
import { getNamePaymentMethod } from '../../../../Utils/GetNamePaymentMethod'
import { getNameStatus } from '../../../../Utils/GetNameStatus'
import { formatPrice } from '../../../../Utils/FormatPrice'

const HeaderBox = styled(Box)(({ theme }) => ({
    borderBottom: '1px dotted rgba(0,0,0,0.09)',
    paddingBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}))

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    color: 'rgba(0, 0, 0, 0.6)',
    borderBottom: 'none',
    [theme.breakpoints.up('sm')]: {
        textAlign: 'right',
    },
    [theme.breakpoints.up('md')]: {
        textAlign: 'right',
    },
    paddingTop: '8px',
    paddingBottom: '8px'
}))

const BoxAddressPayment = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
}))

const CustomBox = styled(Box)(({ theme }) => ({
    padding: '16px 16px 4px 16px',
    backgroundColor: '#f5f4f4',
    minHeight: '150px',
    marginTop: '8px',
    borderRadius: '5px'
}))

const OrderDetail = (props) => {

    const navigate = useNavigate()
    const { order } = props

    console.log("order", order)
    return (
        <Box sx={{ pt: '16px', pb: '8px', pl: { xs: '8px', sm: '16px', md: '32px' }, pr: { xs: '8px', sm: '16px', md: '32px' } }}>

            <HeaderBox>
                <Box>
                    <Button startIcon={<ArrowBackIosIcon />} onClick={() => navigate(-1)}>
                        Trở lại
                    </Button>
                </Box>

                <Box>
                    <Box component='span' >
                        MÃ ĐƠN HÀNG: {order._id}
                    </Box>

                    <Box component='span' sx={{ ml: '16px', mr: '16px' }}>
                        |
                    </Box>

                    <Box component='span' sx={{ textTransform: 'uppercase', color: 'rgb(28,147,252)' }}>
                        {getNameStatus(order.orderStatus)}
                    </Box>
                </Box>
            </HeaderBox>

            <Box sx={{ textAlign: { xs: 'left', md: 'right' }, fontWeight: 600 }}>
                Ngày đặt hàng  {formatDate(order.createdAt)}
            </Box>

            <BoxAddressPayment >
                <Box sx={{ width: { xs: '100%', md: '49%' }, mt: '16px', mb: '12px' }}>
                    <Typography variant="h6" sx={{ textAlign: { xs: 'left', md: 'center' } }}>Địa chỉ người nhận</Typography>

                    <CustomBox >
                        <Typography variant="h6" sx={{ mb: '16px', fontWeight: '600' }}>{order.deliveryAdd.name}</Typography>
                        <Box sx={{ mb: '12px' }}>Địa chỉ:
                            {order.deliveryAdd.address.details},
                            {order.deliveryAdd.address.wards},
                            {order.deliveryAdd.address.district},
                            {order.deliveryAdd.address.province}
                        </Box>
                        <Box sx={{ mb: '12px' }}>
                            Số điện thoại: {order.deliveryAdd.phone}
                        </Box>
                        <Box sx={{ mb: '8px' }}>
                            Hình thức giao hàng: {getNameTransportMethod(order.transportMethod)}
                        </Box>
                    </CustomBox>
                </Box>

                <Box sx={{ width: { xs: '100%', md: '49%' }, mt: '16px', mb: '12px' }}>
                    <Typography variant="h6" sx={{ textAlign: { xs: 'left', md: 'center' } }}>Ghi chú khi giao hàng</Typography>

                    <CustomBox>
                        {order.note}
                    </CustomBox>
                </Box>
            </BoxAddressPayment>

            <Box >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ paddingLeft: '0px' }}>Sản phẩm</TableCell>
                            <TableCell align="left">Giá</TableCell>
                            <TableCell align="left">Số lượng</TableCell>
                            <TableCell align="left">Giảm giá</TableCell>
                            <TableCell align="left">Tạm tính</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell align="left" sx={{ color: '#1976d2', paddingLeft: '0px' }}>{order.orderProd.name}</TableCell>
                            <TableCell align="left">{formatPrice(order.orderProd.price)} đ</TableCell>
                            <TableCell align="left">{order.numOfProd}</TableCell>
                            <TableCell align="left">{order.orderProd.discount} %</TableCell>
                            <TableCell align="left">{formatPrice(order.orderProd.priceDiscount * order.numOfProd)} đ</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>

            <Box sx={{ width: { xs: '100%', sm: '70%', md: '60%', lg: '40%' }, mt: '20px', marginLeft: 'auto' }}>
                <Table>
                    <TableBody>
                        <TableRow >
                            <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                                Tạm tính
                            </CustomTableCell>
                            <CustomTableCell sx={{ paddingRight: '0px', color: 'black' }}>
                                {formatPrice(order.orderProd.priceDiscount * order.numOfProd)} đ
                            </CustomTableCell>
                        </TableRow>

                        <TableRow>
                            <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                                Phí vận chuyển
                            </CustomTableCell>
                            <CustomTableCell sx={{ paddingRight: '0px', color: 'black', }}>
                                {formatPrice(order.transportFee)} đ
                            </CustomTableCell>
                        </TableRow>

                        <TableRow>
                            <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                                Tổng cộng
                            </CustomTableCell>
                            <CustomTableCell sx={{ color: 'red', paddingRight: '0px', fontSize: '24px' }}>
                                {formatPrice(order.orderProd.priceDiscount * order.numOfProd + order.transportFee)} đ
                            </CustomTableCell>
                        </TableRow>

                        <TableRow>
                            <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                                Hình thức thanh toán
                            </CustomTableCell>
                            <CustomTableCell sx={{ color: 'black', paddingRight: '0px', fontWeight: '500' }}>
                                {getNamePaymentMethod(order.paymentMethod)}
                            </CustomTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}

export default OrderDetail