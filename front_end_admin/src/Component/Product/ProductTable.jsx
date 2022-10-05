import { Box, styled, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'
import ErrorFetchData from '../Common/ErrorFetchData'
import Loading from '../Common/Loading'

const CustomTableCellHeader = styled(TableCell)({
    paddingLeft: '0px',
    color: 'rgba(0, 0, 0)',
    width: '30%',
})

const CustomTableCellContent = styled(TableCell)({
    color: 'rgba(0, 0, 0, 0.6)'
})

const ProductTable = (props) => {

    var { productInfor } = props

    if (productInfor && Object.keys(productInfor).length !== 0) {
        console.log("detail Product", productInfor)
        var name = productInfor.name ? productInfor.name : ''
        var price = productInfor.price ? productInfor.price : ''
        var priceDiscount = productInfor.priceDiscount ? productInfor.priceDiscount : ''
        var brand = productInfor.brand ? productInfor.brand : ''
        var countInStock = productInfor.countInStock ? productInfor.countInStock : ''
        var chipset = productInfor.chipset ? productInfor.chipset : ''
        var rom = productInfor.rom ? productInfor.rom : ''
        var ram = productInfor.ram ? productInfor.ram : ''
        var operating = productInfor.operating ? productInfor.operating : ''
        var color = productInfor.color ? productInfor.color : ''
        var manHinh = productInfor.manHinh ? productInfor.manHinh : ''
        var cameraSau = productInfor.cameraSau ? productInfor.cameraSau : ''
        var cameraTruoc = productInfor.cameraTruoc ? productInfor.cameraTruoc : ''
        var description = productInfor.description ? productInfor.description : ''
        var rating = productInfor.rating ? productInfor.rating : ''
        var image = productInfor.image ? productInfor.image : "../../../static/images/defaultImage.png"
        console.log(image)

    }

    if (props.loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <Box sx={{ padding: '0px 32px 8px 32px' }}>
                {
                    (productInfor && Object.keys(productInfor).length !== 0) ? (
                        <Table>

                            <TableBody>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Image
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 233,
                                                width: 'auto',
                                                maxHeight: { xs: 100, sm: 130, md: 167 },

                                            }}
                                            alt="Image"
                                            src={image}
                                        />
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Name
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {name}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Price
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {price}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Price Discount
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {priceDiscount}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Brand
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {brand}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Count In Stock
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {countInStock}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Chipset
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {chipset}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Rom
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {rom}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Ram
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {ram}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Operating
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {operating}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Color
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {color}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Man Hinh
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {manHinh}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Camera Sau
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {cameraSau}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Camera Truoc
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {cameraTruoc}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Rating
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {rating}
                                    </CustomTableCellContent>
                                </TableRow>

                                <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Description
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {description}
                                    </CustomTableCellContent>
                                </TableRow>

                                {/* <TableRow>
                                    <CustomTableCellHeader component="th" scope="row">
                                        Camera Sau
                                    </CustomTableCellHeader>
                                    <CustomTableCellContent align='left'>
                                        {cameraSau}
                                    </CustomTableCellContent>
                                </TableRow> */}

                            </TableBody>
                        </Table>
                    ) : (
                        <ErrorFetchData message='Not Found Product Detail' />
                    )
                }
            </Box>

        )
    }

}

export default ProductTable