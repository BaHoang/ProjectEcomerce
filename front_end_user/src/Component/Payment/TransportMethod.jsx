import { Box, Radio, styled } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { transportMethodAction } from '../../Actions/paymentInforAction'

const WrapBox = styled(Box)(({ theme }) => ({
    padding: '12px',
    marginBottom: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.1)'
}))

const TitleBox = styled(Box)(({ theme }) => ({
    fontSize: '20px',
    marginBottom: '8px'
}))

const ItemBox = styled(Box)(({ theme }) => ({

    display: "flex",
    alignItems: 'center',
    cursor: 'pointer',

    [theme.breakpoints.down('700')]: {
        width: '100%',
        marginBottom: '8px',
    },

    [theme.breakpoints.up('700')]: {
        marginRight: '16px',
    },

}))

const TransportMethod = () => {

    const listTransportMethod = ["Giao hàng tiêu chuẩn", "Giao hàng tiết kiệm", "Giao hàng nhanh"]

    const dispatch = useDispatch()

    const paymentInfor = useSelector(state => state.paymentInfor)
    var { transportMethod } = paymentInfor

    const handleChangeTransportMethod = (index) => {
        dispatch(transportMethodAction(index))
    }

    return (
        <WrapBox>
            <TitleBox>
                Hình thức giao hàng
            </TitleBox>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    fontSize: '16px',
                }}
            >
                {
                    listTransportMethod.map((transportMethodText, index) => (
                        <ItemBox
                            onClick={() => handleChangeTransportMethod(index)}
                            key={index}
                        >
                            <Box sx={{ paddingRight: '8px' }}>
                                <Radio
                                    checked={transportMethod === index}
                                    onChange={() => handleChangeTransportMethod(index)}
                                    value={index}
                                    name="radio-buttons"
                                    sx={{
                                        padding: '0px',
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 20,
                                        },
                                    }}
                                />
                            </Box>

                            <Box>
                                {transportMethodText}
                            </Box>
                        </ItemBox>
                    ))
                }

            </Box>
        </WrapBox>
    )
}

export default TransportMethod