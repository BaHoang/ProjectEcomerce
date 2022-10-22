import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { myProfile } from '../../Actions/userAction'
import TableUser from './TableUser'
import Loading from '../Common/Loading'
import ErrorFetchDetailModal from './ErrorFetchDetailModal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { lg: '30%', md: '40%', xs: '80%', sm: '60%' },
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  padding: '8px 32px 10px 32px',
  overflowY: 'auto',
  maxHeight: '90vh'
}
const styleHeader = {
  position: 'sticky',
  top: '0',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-between'
}

const MyProfileDetailModal = (props) => {

  const { open, onCloseModalDetailMyProfile } = props

  const user = useSelector(state => state.user)
  const { userInfor } = user

  const profileUser = useSelector(state => state.profileUser)
  const { loading, userProfile, error } = profileUser


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(myProfile(userInfor))
  }, [])

  return (

    <Modal
      open={open}
      onClose={onCloseModalDetailMyProfile}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={styleHeader}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ marginTop: '12px', fontWeight: '600' }}>
            Hồ sơ của tôi
          </Typography>

          <IconButton
            aria-label="close"
            onClick={onCloseModalDetailMyProfile}
            sx={{
              color: 'black',
              position: 'absolute',
              right: -10,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {
          loading ? (
            <Loading />
          ) : error ? (
            <ErrorFetchDetailModal statusError={error} />
          ) : (
            <TableUser inforUser={userProfile} />
          )
        }



      </Box>
    </Modal>

  )
}

export default MyProfileDetailModal