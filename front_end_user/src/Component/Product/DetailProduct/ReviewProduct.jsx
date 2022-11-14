import { Box, IconButton, LinearProgress, linearProgressClasses, List, ListItem, Rating, styled } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { formatDate } from '../../../Utils/FormatDate'

const ReviewBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  marginTop: '30px',
  borderRadius: '4px',
  padding: '16px'
}))

const TitleBox = styled(Box)(({ theme }) => ({
  paddingBottom: '16px',
  fontSize: '20px',
  fontWeight: '600',
}))

const OverallRatingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '124px',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: 'dashed 1px #ddd',
  boxSizing: 'border-box',
  paddingRight: '16px',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    paddingRight: '0px',
    paddingBottom: '16px',
    borderRight: 'none'
  },
}))

const DetailRatingBox = styled(Box)(({ theme }) => ({
  width: '324px',
  paddingLeft: '16px',
  paddingRight: '16px',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    paddingLeft: '0px',
    paddingRight: '0px',
  },

}))

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}))

const ReviewProduct = (props) => {
  const { product } = props
  const { rate, rating, reviews, numReviews } = product

  var sumTotalRate = rate.reduce((a, b) => a + b, 0)
  const newRate = rate.map((num) => {
    if (sumTotalRate === 0) {
      return 0
    } else {
      return Math.round(num / sumTotalRate * 100)
    }

  })

  console.log(rating)
  return (
    <ReviewBox>

      <TitleBox>
        Đánh giá sản phẩm
      </TitleBox>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '16px', borderBottom: 'dashed 1px #ddd', }}>

        <OverallRatingBox>

          <Box
            sx={{
              fontSize: '32px',
              fontWeight: '500'
            }}
          >
            {rating}
          </Box>

          <Box
            sx={{
              lineHeight: 1,
            }}
          >
            <Rating name="rating" value={rating} precision={0.5} readOnly size="small" sx={{ color: '#fadb14' }} />
          </Box>

          <Box
            sx={{
              color: '#888'
            }}
          >
            {numReviews} nhận xét
          </Box>

        </OverallRatingBox>

        <DetailRatingBox>
          {
            rate.map((item, index) => {

              return (
                <Box sx={{ display: 'flex', justifyContent: 'center ', alignItems: 'center' }}>
                  <Box
                    sx={{
                      lineHeight: 1,
                    }}
                  >
                    <Rating name="rating" value={index + 1} readOnly size="small" sx={{ color: '#fadb14' }} />
                  </Box>

                  <Box sx={{ width: '172px', marginLeft: '16px' }}>
                    <BorderLinearProgress variant="determinate" value={newRate[index]} />
                  </Box>

                  <Box sx={{ marginLeft: '16px', color: '#888' }}>
                    {item}
                  </Box>
                </Box>
              )
            })
          }
        </DetailRatingBox>

      </Box>

      <Box>
        <List sx={{ width: '100%', bgcolor: 'background.paper', padding: '0px' }}>

          {
            reviews.map((review, index) => (
              <ListItem sx={{ width: '100%', padding: '0px', paddingTop: '24px' }}>

                <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>

                  <Box
                    sx={{
                      width: '48px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'start',
                      // backgroundRepeat: 'no-repeat',
                      // backgroundSize: 'contain',
                      // backgroundPosition: 'center',
                      // backgroundImage: "url('https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1600')",
                    }}
                  >
                    <IconButton sx={{padding: '0px'}}>
                      <AccountCircleIcon sx={{fontSize: '36px'}}/>
                    </IconButton>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                      <Box sx={{ fontWeight: 'bolder', color: 'rgba(0, 0, 0, 0.45)', marginRight: '8px' }} component='span'>
                        {review.name}
                      </Box>

                      <Box sx={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '12px' }} component='span'>
                        {formatDate(review.createdAt)}
                      </Box>

                    </Box>

                    <Box sx={{ lineHeight: 1 }}>
                      <Rating name="rating" value={review.rating} readOnly size="small" sx={{ color: '#fadb14' }} />
                    </Box>

                    <Box>
                      {review.comment}
                    </Box>
                  </Box>

                </Box>
              </ListItem>
            ))
          }

        </List>
      </Box>

    </ReviewBox>
  )
}

export default ReviewProduct