import { Box, styled, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { noteAction } from '../../Actions/paymentInforAction'

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

const Message = () => {

    const dispatch = useDispatch()
    const [note, setNote] = useState('')

    const handleChangeNote = (event) => {
        setNote(event.target.value)
    }

    const handleBlurNote = (event) => {
        dispatch(noteAction(note))
    }

    return (
        <WrapBox>
            <TitleBox>
                Ghi chú cho đơn hàng
            </TitleBox>

            <Box>

                <TextField
                    id="outlined-note"
                    multiline
                    rows={2}

                    placeholder="Lưu ý cho Người bán"
                    onChange={handleChangeNote}
                    value={note}
                    name="note"
                    fullWidth

                    onBlur={handleBlurNote}


                />
            </Box>
        </WrapBox>
    )
}

export default Message