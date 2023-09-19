import React, { useEffect, useState } from 'react';
import {
Table,
Thead,
Tbody,
Tfoot,
Tr,
Th,
Td,
TableContainer,
Stack,
RadioGroup,
Radio,
useDisclosure,
AlertDialog,
AlertDialogOverlay,
AlertDialogContent,
Button,
AlertDialogFooter,
AlertDialogBody,
AlertDialogHeader,
} from '@chakra-ui/react';
import { DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, updateOrder,patchOrder } from '../api/orderApi';
import Navbar from './Navbar';
import {
fetchOrdersAsync,
updateOrderStatusAsync,
} from '../store/orderSlice';

const OrderList = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const orders = useSelector(state => state.order);
const { isOpen, onOpen, onClose } = useDisclosure();
const cancelRef = React.useRef();

const navigConvertInv = el => {
    navigate(`/invoice/${el.norder}/${el.userid}/${el.bookid}`);
};

useEffect(() => {
    dispatch(fetchOrdersAsync());
}, [dispatch]);

const updateStatus = async (order, orderStatus) => {
    try {
        // Ensure that order._id is a valid ObjectId
        const id = order._id;
    
        // Assuming you have the correct id and status
        await patchOrder(id, { status: orderStatus });
        dispatch(fetchOrdersAsync());
    } catch (error) {
        console.error('Error updating order:', error);
    }
    };

return (
    <Stack
    fontFamily="Poppins"
    borderRadius="30px"
    width="1440px"
    height="650px"
    maxWidth="100%"
    background="#F8F7FF"
    >
    <Navbar />
    <TableContainer>
        <Table size="sm">
        <Thead>
            <Tr>
            <Th>N° Order</Th>
            <Th>User ID</Th>
            <Th>Book ID</Th>
            <Th>Quantity</Th>
            <Th>Status</Th>
            <Th>Delete</Th>
            <Th>Convert</Th>
            </Tr>
        </Thead>
        <Tbody>
            {orders.map(el => (
            <Tr key={el.id}>
                <Td>{el.norder}</Td>
                <Td>{el.userid}</Td>
                <Td>{el.bookid}</Td>
                <Td>{el.quantity}</Td>
                <Td>
                <RadioGroup
                    size="sm"
                    onChange={newStatus => updateStatus(el, newStatus)}
                    value={el.status} // Initialize with the status from the database
                >
                    <Radio value="Open">Open</Radio>
                    <Radio value="Closed">Closed</Radio>
                </RadioGroup>
                </Td>
                <Td>
                <DeleteIcon onClick={onOpen} />
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Order
                        </AlertDialogHeader>
                        <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={async () => {
                            await deleteOrder(el._id);
                            onClose();
                            dispatch(fetchOrdersAsync());
                            }}
                            ml={3}
                        >
                            Delete
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
                </Td>
                <Td>
                <RepeatIcon
                    type="submit"
                    onClick={() => navigConvertInv(el)}
                />
                </Td>
            </Tr>
            ))}
        </Tbody>
        <Tfoot></Tfoot>
        </Table>
    </TableContainer>
    </Stack>
);
};

export default OrderList;
