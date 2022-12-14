
import { Button, Popover, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { formatDate } from '../../Utils/FormatDate'
import { getNameButtonUpdate } from '../../Utils/GetNameButtonUpdate'
import { getNamePaymentMethod } from '../../Utils/GetNamePaymentMethod'
import { getNameTransportMethod } from '../../Utils/GetNameTransportMethod'
import ErrorFetchData from '../Common/ErrorFetchData'
import Loading from '../Common/Loading'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { useDispatch, useSelector } from 'react-redux'
import { orderUpdateStatusAction } from '../../Actions/orderAction'

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
  boxSizing: 'border-box',
  marginTop: '8px',
  borderRadius: '5px'
}))

const OrderInfor = (props) => {

  var { orderInfor, loading, onCloseModalDetailOrder, handleChangeStatusOrder } = props

  const user = useSelector(state => state.user)
  const { userInfor } = user
  
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)

  const openPopConfirm = Boolean(anchorEl)
  const id = openPopConfirm ? 'simple-popover' : undefined

  const handleClosePopConfirm = () => {
    setAnchorEl(null)
  }

  const handlePopConfirm = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleChangeStatus = (status, id) => {
    if (status < 5) {
      // dispatch la bat dong bo
      dispatch(orderUpdateStatusAction(userInfor, id, status))
      handleChangeStatusOrder(status + 1)
    }
    setAnchorEl(null)
    onCloseModalDetailOrder()
  }

  if (loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <Box sx={{ padding: '16px 32px 8px 32px' }}>
        {
          (orderInfor && Object.keys(orderInfor).length !== 0) ? (
            <>
              <Box sx={{ textAlign: { xs: 'left', md: 'right' }, fontWeight: 600 }}>
                Ng??y ?????t h??ng  {formatDate(orderInfor.createdAt)}
              </Box>

              <BoxAddressPayment >

                <Box sx={{ width: { xs: '100%', md: '49%' }, mt: '16px', mb: '12px' }}>
                  <Typography variant="h6" sx={{ textAlign: { xs: 'left', md: 'center' } }}>?????a ch??? ng?????i nh???n</Typography>

                  <CustomBox >
                    <Typography variant="h6" sx={{ mb: '16px', fontWeight: '600' }}>{orderInfor.deliveryAdd.name}</Typography>
                    <Box sx={{ mb: '12px' }}>?????a ch???:
                      {orderInfor.deliveryAdd.address.details},
                      {orderInfor.deliveryAdd.address.wards},
                      {orderInfor.deliveryAdd.address.district},
                      {orderInfor.deliveryAdd.address.province}
                    </Box>
                    <Box sx={{ mb: '12px' }}>
                      S??? ??i???n tho???i: {orderInfor.deliveryAdd.phone}
                    </Box>
                    <Box sx={{ mb: '8px' }}>
                      H??nh th???c giao h??ng: {getNameTransportMethod(orderInfor.transportMethod)}
                    </Box>
                  </CustomBox>

                </Box>

                <Box sx={{ width: { xs: '100%', md: '49%' }, mt: '16px', mb: '12px' }}>
                  <Typography variant="h6" sx={{ textAlign: { xs: 'left', md: 'center' } }}>Ghi ch?? khi giao h??ng</Typography>

                  <CustomBox>
                    {orderInfor.note}
                  </CustomBox>
                </Box>

              </BoxAddressPayment>

              <Box >
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ paddingLeft: '0px' }}>S???n ph???m</TableCell>
                      <TableCell align="left">Gi??</TableCell>
                      <TableCell align="left">S??? l?????ng</TableCell>
                      <TableCell align="left">Gi???m gi??</TableCell>
                      <TableCell align="left">T???m t??nh</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>

                    <TableRow>
                      <TableCell align="left" sx={{ color: '#1976d2', paddingLeft: '0px' }}>{orderInfor.orderProd.name}</TableCell>
                      <TableCell align="left">{orderInfor.orderProd.price} ??</TableCell>
                      <TableCell align="left">{orderInfor.numOfProd}</TableCell>
                      <TableCell align="left">{orderInfor.orderProd.discount} %</TableCell>
                      <TableCell align="left">{orderInfor.orderProd.priceDiscount * orderInfor.numOfProd} ??</TableCell>

                    </TableRow>

                  </TableBody>
                </Table>
              </Box>

              <Box sx={{ width: { xs: '100%', sm: '70%', md: '60%', lg: '40%' }, mt: '20px', marginLeft: 'auto' }}>
                <Table>
                  <TableBody>
                    <TableRow >
                      <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                        T???m t??nh
                      </CustomTableCell>
                      <CustomTableCell sx={{ paddingRight: '0px', color: 'black' }}>
                        {orderInfor.orderProd.priceDiscount * orderInfor.numOfProd} ??
                      </CustomTableCell>
                    </TableRow>

                    <TableRow>
                      <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                        Ph?? v???n chuy???n
                      </CustomTableCell>
                      <CustomTableCell sx={{ paddingRight: '0px', color: 'black', }}>
                        {orderInfor.transportFee} ??
                      </CustomTableCell>
                    </TableRow>

                    <TableRow>
                      <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                        T???ng c???ng
                      </CustomTableCell>
                      <CustomTableCell sx={{ color: 'red', paddingRight: '0px', fontSize: '24px' }}>
                        {orderInfor.orderProd.priceDiscount * orderInfor.numOfProd + orderInfor.transportFee} ??
                      </CustomTableCell>
                    </TableRow>

                    <TableRow>
                      <CustomTableCell component="th" scope="row" sx={{ paddingLeft: '0px' }}>
                        H??nh th???c thanh to??n
                      </CustomTableCell>
                      <CustomTableCell sx={{ color: 'black', paddingRight: '0px', fontWeight: '500' }}>
                        {getNamePaymentMethod(orderInfor.paymentMethod)}
                      </CustomTableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </Box>

              {
                (orderInfor.orderStatus < 5) && (
                  <>
                    <Button
                      variant='contained'
                      aria-describedby={id}
                      onClick={handlePopConfirm}

                      sx={{ margin: '20px auto 12px', display: 'block', width: { xs: '100%', sm: '70%', md: '50%', lg: '30%' }, fontSize: { xs: '10px', md: '14px' }, marginTop: '16px' }}
                    >
                      {getNameButtonUpdate(orderInfor.orderStatus)}
                    </Button>

                    <Popover
                      id={id}
                      open={openPopConfirm}
                      anchorEl={anchorEl}
                      onClose={handleClosePopConfirm}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      PaperProps={{
                        style: {
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          width: '100%',
                        }
                      }}
                      sx={{ top: '-90px' }}
                    >
                      <Box sx={{
                        backgroundColor: 'white',
                        position: "relative",
                        borderRadius: '5px',
                        width: '200px',
                        margin: '2px auto 12px',
                        boxShadow: '1px 1px 3px 2px rgba(0,0,0, 0.3)',
                        "&::before": {
                          backgroundColor: "white",
                          content: '""',
                          display: "block",
                          position: "absolute",
                          width: 12,
                          height: 12,
                          bottom: -6,
                          transform: "rotate(225deg)",
                          left: "calc(50% - 6px)",
                          boxShadow: '-2px -2px 4px -1px rgba(0,0,0,0.5)',
                        }
                      }}>
                        <Typography component='div' sx={{ padding: '4px 4px 0px 18px', display: 'flex', alignItems: 'center', color: 'red' }}>
                          <PriorityHighIcon sx={{ bgcolor: 'rgb(255, 204, 0)', color: 'white', fontSize: '12px', padding: '2px 2px', borderRadius: '12px', marginRight: '8px' }} />
                          Are you sure ?
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', paddingBottom: '10px' }}>
                          <Button variant="contained" sx={{ fontSize: '10px' }} onClick={handleClosePopConfirm}>Cancel</Button>
                          <Button variant="contained" sx={{ fontSize: '10px' }} onClick={() => handleChangeStatus(orderInfor.orderStatus, orderInfor._id)}>Yes</Button>
                        </Box>
                      </Box>

                    </Popover>
                  </>

                )
              }

            </>
          ) : (
            <ErrorFetchData message='Not Found Order Detail' />
          )
        }
      </Box>
    )
  }
}

export default OrderInfor