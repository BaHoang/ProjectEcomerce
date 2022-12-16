import { Box, Button, Modal, Rating, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { reviewProductAction } from "../../../../Actions/productAction"
import { PRODUCT_REVIEW_RESET } from "../../../../Constants/productConstant"
import Loading from '../../../Common/Loading'
import ReviewProductError from "./ReviewProductError"
import ReviewProductSuccess from "./ReviewProductSuccess"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    overflowY: 'auto',
    width: { lg: '28%', md: '50%', xs: '90%', sm: '70%' },
    maxHeight: '60vh',
    padding: '0px 24px',
    boxSizing: 'border-box'
}

const styleHeader = {
    position: 'sticky',
    top: '0',
    paddingTop: '16px',
    paddingBottom: '12px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 100
}

const styleFooter = {
    position: 'sticky',
    bottom: '0px',
    paddingTop: '12px',
    paddingBottom: '16px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'end',
    zIndex: 100,
}

const ReviewModal = (props) => {

    const dispatch = useDispatch()

    const { openReviewModal, handleCloseReviewModal, idProduct } = props

    const user = useSelector(state => state.user)
    const { userInfor } = user

    const reviewProduct = useSelector(state => state.reviewProduct)
    const {
        loading: loadingReviewProduct,
        error: errorReviewProduct,
        success: successReviewProduct,
    } = reviewProduct

    const [valueRating, setValueRating] = useState(5)
    const [valueComment, setValueComment] = useState('')
    const [errorCommentText, setErrorCommentText] = useState('')
    const [errorCommentBool, setErrorCommentBool] = useState(false)

    const handleChangeValueRating = (event, newValue) => {
        setValueRating(newValue)
    }

    const handleChangeValueComment = (event) => {
        setValueComment(event.target.value)
        if (event.target.value) {
            setErrorCommentText("")
            setErrorCommentBool(false)
        } else {
            setErrorCommentText("Đánh giá chi tiết không được bỏ trống")
            setErrorCommentBool(true)
        }
    }

    const handleGoBack = () => {
        handleCloseReviewModal()
        setValueComment("")
        dispatch({
            type: PRODUCT_REVIEW_RESET,
        })
    }

    const handleSubmitReview = () => {
        if (valueComment === "") {
            setErrorCommentText("Đánh giá chi tiết không được bỏ trống")
            setErrorCommentBool(true)
        } else {
            dispatch(reviewProductAction(idProduct, userInfor, valueComment, valueRating))
        }
    }

    return (

        <Modal
            open={openReviewModal}
            onClose={handleCloseReviewModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={styleHeader}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
                        Nhận xét sản phẩm
                    </Typography>
                </Box>

                <Box>

                    {
                        errorReviewProduct && <ReviewProductError statusError={errorReviewProduct} />
                    }

                    {
                        successReviewProduct && <ReviewProductSuccess />
                    }

                    {
                        loadingReviewProduct && <Loading />
                    }

                    <Box sx={{ marginBottom: '16px' }}>
                        <Box sx={{ mb: '8px' }}>
                            <Rating
                                name="rating"
                                value={valueRating}
                                onChange={handleChangeValueRating}
                                sx={{ color: '#fadb14' }}
                            />
                        </Box>

                        <Box>
                            <TextField
                                id="comment"
                                multiline
                                fullWidth
                                rows={4}
                                value={valueComment}
                                onChange={handleChangeValueComment}
                                placeholder="Đánh giá chi tiết"

                                error={errorCommentBool}
                                helperText={errorCommentText}
                            />
                        </Box>
                    </Box>


                    <Box sx={styleFooter}>

                        <Button
                            variant='outlined'
                            sx={{ fontSize: { xs: '10px', md: '14px' }, textTransform: 'capitalize', width: '120px', marginRight: '16px' }}
                            onClick={handleGoBack}
                        >
                            Trở lại
                        </Button>

                        <Button
                            type="submit"
                            variant='contained'
                            sx={{ fontSize: { xs: '10px', md: '14px' }, textTransform: 'capitalize', width: '120px' }}
                            onClick={handleSubmitReview}
                        >

                            Hoàn thành
                        </Button>

                    </Box>

                </Box>
            </Box>
        </Modal>

    )
}

export default ReviewModal