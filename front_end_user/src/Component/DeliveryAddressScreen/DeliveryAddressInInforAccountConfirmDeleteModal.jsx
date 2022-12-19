import { Box, Button, Modal } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deliveryAddressDeleteAction, listDeliveryAddressAction } from "../../Actions/deliveryAddressAction"
import { DELIVERY_ADDRESS_DELETE_RESET } from "../../Constants/deliveryAddressConstant"
import Loading from "../Common/Loading"
import DeliveryAddressDeleteError from "./DeliveryAddressDeleteError"
import DeliveryAddressDeleteSuccess from "./DeliveryAddressDeleteSuccess"

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

const DeliveryAddressInInforAccountConfirmDeleteModal = (props) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    var { userInfor } = user

    const deliveryAddressDelete = useSelector(state => state.deliveryAddressDelete)

    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = deliveryAddressDelete

    const {
        openDeliveryAddressConfirmDeleteModal,
        handleCloseDeliveryAddressConfirmDeleteModal,
        indexDeliveryAddressDelete
    } = props

    const handleGoBack = () => {
        dispatch({
            type: DELIVERY_ADDRESS_DELETE_RESET,
        })

        handleCloseDeliveryAddressConfirmDeleteModal()
    }

    const handleDeleteDeliveryAddress = () => {
        dispatch(deliveryAddressDeleteAction(userInfor, indexDeliveryAddressDelete))
    }

    useEffect(() => {
        if (successDelete) {
            if (userInfor && Object.keys(userInfor).length !== 0) {
                dispatch(listDeliveryAddressAction(userInfor))
            }
        }
    }, [successDelete])
    return (
        <Modal
            open={openDeliveryAddressConfirmDeleteModal}
            onClose={handleCloseDeliveryAddressConfirmDeleteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <Box sx={{ mt: '20px' }}>

                    {
                        errorDelete && <DeliveryAddressDeleteError statusError={errorDelete} />
                    }

                    {
                        successDelete && <DeliveryAddressDeleteSuccess />
                    }

                    {
                        loadingDelete && <Loading />
                    }
                </Box>

                <Box sx={{ height: '50px', display: "flex", alignItems: 'center' }}>
                    Bạn có muốn xóa địa chỉ này không ?
                </Box>

                <Box sx={styleFooter}>
                    <Button
                        variant='outlined'
                        onClick={handleGoBack}
                        sx={{
                            fontSize: { xs: '10px', md: '14px' },
                            textTransform: 'capitalize',
                            width: '120px',
                            marginRight: '16px'
                        }}
                    >
                        Trở lại
                    </Button>

                    <Button
                        variant='contained'
                        onClick={handleDeleteDeliveryAddress}
                        disabled={successDelete}
                        sx={{
                            fontSize: { xs: '10px', md: '14px' },
                            textTransform: 'capitalize',
                            width: '120px'
                        }}

                    >
                        Xóa
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default DeliveryAddressInInforAccountConfirmDeleteModal