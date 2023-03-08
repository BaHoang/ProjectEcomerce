import { Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../Actions/userAction'
import Loading from '../Component/Common/Loading'
import DetailProfile from '../Component/InforAccount/Profile/DetailProfile/DetailProfile'

const WrapAccountBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: '1px 1px 0 rgba(0, 0, 0, 0.05)',
  padding: '12px 30px 0px 30px',
  minHeight: '166px',
}))

const ErrorBox = styled(Box)(({ theme }) => ({
  color: 'red',
  height: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const AccountScreen = () => {

  const dispatch = useDispatch()

  // lay duoc token
  const user = useSelector(state => state.user)
  var { userInfor } = user

  const userProfile = useSelector(state => state.userProfile)
  var { loading, error, profile } = userProfile

  // router.get('/profile', checkLogin, profileUser): goi api nay va truyen token vao header de lay profile

  useEffect(() => {
    if (userInfor && Object.keys(userInfor).length !== 0) {
      dispatch(getProfileAction(userInfor))
    }
  }, [])

  return (
    <WrapAccountBox>
      {

        loading ? (
          <Loading />
        ) : error ? (
          <ErrorBox>
            Hiện đang bị lỗi, bạn hãy tải lại.
          </ErrorBox>
        ) : (
          (profile && Object.keys(profile).length !== 0) ? (
            <DetailProfile profile={profile} />
          ) : (
            <ErrorBox>
              Không có địa chỉ nào. Bạn hãy thêm một địa chỉ mới.
            </ErrorBox>
          )
        )

      }
    </WrapAccountBox>
  )
}

export default AccountScreen