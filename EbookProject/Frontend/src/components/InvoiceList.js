import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoice } from '../store/invoiceSlice';
import invoiceApi, { fetchInvoices } from '../api/invoiceApi';
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableContainer,Grid,useToast,IconButton} from '@chakra-ui/react';
import { DeleteIcon, EditIcon,Icon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { RiArrowLeftRightLine, } from 'react-icons/ri';

const InvoiceList = () => {

const invoices = useSelector(state => state.invoice);
const dispatch = useDispatch();
const toast = useToast();
const navigate = useNavigate();

const [resizing, setResizing] = useState(false);
const [columnWidths, setColumnWidths] = useState({
col1: '10px',col2: '100px',col3: '100px',col4: '100px',col5: '100px',col6: '100px',col7: '100px',col8: '100px'});

const handleMouseDown = (e, column) => {
setResizing(true);
const initialX = e.clientX;
const initialWidth = parseInt(columnWidths[column]);

const handleMouseMove = (e) => {
    const newWidth = initialWidth + (e.clientX - initialX) + 'px';
    setColumnWidths((prevWidths) => ({
    ...prevWidths,
    [column]: newWidth,
    }));
};

const handleMouseUp = () => {
    setResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
};

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
};

const getInvoices = async () => {
    const invos = await fetchInvoices();
    dispatch(setInvoice(invos));
};

const navupinv = el => {
    navigate(`/invoice/${el.norder}/${el.userid}/${el.bookid}`);
};

useEffect(() => {
    getInvoices();
}, []);
const ResizeIndicator = () => {
    return (
    <IconButton    size="xs"    icon={<Icon as={RiArrowLeftRightLine} />}    position="absolute"    right="-4px"    top="0"    bottom="0"    m="auto"    zIndex="1" cursor="col-resize"/>
    );
};

return (
    <Grid >
    <Navbar />
    <TableContainer fontFamily='Poppins' fontSize='11px'>
        <Table>
        <Thead>
            <Tr>
            <Th style={{ width: columnWidths.col1 }} position="relative" onMouseDown={(e) => handleMouseDown(e, 'col1')}>N° Invoice {resizing && <ResizeIndicator />}  </Th>
            <Th style={{ width: columnWidths.col2 }} position="relative" onMouseDown={(e) => handleMouseDown(e, 'col2')}>N° Order {resizing && <ResizeIndicator />}  </Th>
            <Th style={{ width: columnWidths.col3 }} position="relative" onMouseDown={(e) => handleMouseDown(e, 'col3')}>N° Book {resizing && <ResizeIndicator />}  </Th>
            <Th style={{ width: columnWidths.col4 }} position="relative" onMouseDown={(e) => handleMouseDown(e, 'col4')}>N° User {resizing && <ResizeIndicator />}  </Th>
            <Th style={{ width: columnWidths.col5 }} position="relative" onMouseDown={(e) => handleMouseDown(e, 'col5')}>Quantity {resizing && <ResizeIndicator />}  </Th>
            <Th style={{ width: columnWidths.col6 }} position="relative" onMouseDown={(e) => handleMouseDown(e, 'col6')}>Price {resizing && <ResizeIndicator />}  </Th>
            <Th style={{ width: columnWidths.col7 }} position="relative" onMouseDown={(e) => handleMouseDown(e, 'col7')}>Delete {resizing && <ResizeIndicator />}  </Th>
            <Th style={{ width: columnWidths.col8 }} position="relative" onMouseDown={(e) => handleMouseDown(e, 'col8')}>Update {resizing && <ResizeIndicator />}  </Th>
            </Tr>
        </Thead>
        <Tbody>
            {invoices.map(el => (
            <Tr key={el.id}>
                <Td >{el.ninvoice}</Td>
                <Td >{el.norder}</Td>
                <Td >{el.book}</Td>
                <Td >{el.user}</Td>
                <Td >{el.quantity}</Td>
                <Td >{el.price}</Td>
                <Td><DeleteIcon onClick={async () => {await invoiceApi.deleteInvoice(el._id);getInvoices();toast({title: 'Invoice deleted',isClosable: true,});}}/></Td>
                <Td><EditIcon    type='submit'    onClick={() => navupinv(el)}    /></Td>
            </Tr>
            ))}
        </Tbody>
        <Tfoot></Tfoot>
        </Table>
    </TableContainer>
    </Grid>
);
};

export default InvoiceList;
