import { Box, Button, IconButton, Modal, Paper, Popover, styled, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailUserByAdmin, listUserByAdmin, acceptAdminAction } from '../Actions/userAction'
import { formatDate } from '../Utils/FormatDate'
import CloseIcon from '@mui/icons-material/Close'
import TitleScreen from '../Component/TitleScreen';
import { columns } from '../ColumnTable/userColumn.js'
import TableUser from '../Component/TableUser';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg:'30%', md: '40%', xs: '80%', sm: '60%'},
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  padding: '8px 32px 8px 32px',
}





export const AdminUserScreen = () => {

  const listUser = useSelector(state => state.listUser)
  const { loading, error, listAllUser, totalRow } = listUser

  const user = useSelector(state => state.user)
  const { userInfor } = user

  const detailUser = useSelector(state => state.detailUser)
  const { userDetail } = detailUser

  const dispatch = useDispatch()

  const [pageState, setPageState] = useState({
    isLoading: false,
    rows: [],
    rowCountState: 0,
    page: 1,
    pageSize: 10
  })

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleCloseModal = () => setOpen(false)

  const handleOpenModal = (params) => {
    setOpen(true)
    const idRealUser = params.row.id - (pageState.page - 1) * pageState.pageSize - 1
    const userClicked = listAllUser[idRealUser]
    dispatch(detailUserByAdmin(userClicked._id, userInfor))
  }

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const handleAcceptAdmin = (id) => {
    dispatch(acceptAdminAction(id, userInfor))
    setAnchorEl(null)
  }

  const openPopover = Boolean(anchorEl)
  const id = openPopover ? 'simple-popover' : undefined

  useEffect(() => {
    setPageState(old => ({ ...old, isLoading: true }))
    dispatch(listUserByAdmin(userInfor, pageState.page, pageState.pageSize))
    setPageState(old => ({ ...old, isLoading: false }))
  }, [pageState.page, pageState.pageSize])

  useEffect(() => {
    let tempRows = []
    if (listAllUser) {
      listAllUser.map((user, index) => {
        tempRows.push({
          id: ((pageState.page - 1) * pageState.pageSize + index + 1),
          name: user.name,
          email: user.email,
          quyen: (user.isAdmin ? 'Admin' : 'User'),
          diaChi: user.address
        })
      })

      setPageState(old => ({ ...old, rows: tempRows, rowCountState: totalRow }))
    }

  }, [dispatch, listUser.listAllUser, listUser.totalRow, listUser])

  return (

    <Box sx={{ margin: 'auto', width: { xs: '92%', sm: '94%', md: '90%' }, minHeight: 'calc(100vh - 80px)' }}>

      <TitleScreen title="Danh sach user va admin" />

      <Box sx={{ paddingBottom: '30px' }}>
        <Paper elevation="1" sx={{ width: '100%', marginTop: '30px', borderRadius: '10px' }}>
          <DataGrid
            autoHeight
            rows={pageState.rows}
            rowCount={pageState.rowCountState}
            loading={pageState.isLoading}
            rowsPerPageOptions={[5, 10, 15]}
            pagination
            page={pageState.page - 1}
            pageSize={pageState.pageSize}
            paginationMode="server"
            onPageChange={(newPage) => {
              setPageState(old => ({ ...old, page: newPage + 1 }))
            }}
            onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
            columns={columns}
            onRowClick={handleOpenModal}
            sx={{
              '& .MuiDataGrid-row': {
                cursor: 'pointer'
              },
            }}
          />
        </Paper>
      </Box>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ marginTop: '12px', fontWeight: '600' }}>
              Detail User
            </Typography>

            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 12,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

          </Box>

          <TableUser inforUser={userDetail} />

          <Button
            variant="contained"
            aria-describedby={id}
            onClick={handleClickPopover}
            disabled={userDetail.isAdmin}
            sx={{ margin: '20px auto 12px', display: 'block', width: {xs: '100%', sm: '70%'} }}
          >
            Accept Admin
          </Button>

          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
                width: '100%',
                                
              }
            }}

          >
            <Box sx={{

              backgroundColor: 'white',
              position: "relative",
              
              borderRadius: '5px',
              width: {lg: '10%',md: '20%', sm:'30%', xs: '50%'},
              margin: '12px auto 0px',
              boxShadow: '-1px -1px 4px 3px rgba(0,0,0,0.2)',
              "&::before": {
                backgroundColor: "white",
                content: '""',
                display: "block",
                position: "absolute",
                width: 12,
                height: 12,
                top: -6,
                transform: "rotate(225deg)",
                left: "calc(50% - 6px)",
                boxShadow: '1px 1px 4px -1px rgba(0,0,0,0.5)',
                
              }
            }}>
              <Typography sx={{ padding: '4px 4px 0px 4px' }}>Are you sure?</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', paddingBottom: '10px' }}>
                <Button variant="contained" sx={{ fontSize: '10px' }} onClick={handleClosePopover}>Cancel</Button>
                <Button variant="contained" sx={{ fontSize: '10px' }} onClick={() => handleAcceptAdmin(userDetail._id)}>Yes</Button>
              </Box>
            </Box>

          </Popover>
        </Box>
      </Modal>

    </Box>
  )
}
