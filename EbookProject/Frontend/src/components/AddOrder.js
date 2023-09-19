import {
useToast,
FormLabel,
FormControl,
Input,
Button,
Stack,
} from '@chakra-ui/react';
import { PostOrder } from '../api/orderApi';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Navbar from './Navbar';

export default function AddOrder({ books, getBook }) {
const { id1, id2 } = useParams();
const toast = useToast();
const [norder, setNorder] = useState('');
const [userid, setUserid] = useState('');
const [bookid, setBookid] = useState('');
const [quantity, setQuantity] = useState('');
const [status, setStatus] = useState('');

useEffect(() => {
    const newNorder = uuidv4();
    setNorder(newNorder);
    setUserid(id2);
    setBookid(id1);
    setStatus('Closed');
}, [id1, id2]);

const handleBuyNow = async () => {
    const orderData = { norder, bookid, userid, quantity, status };
    await PostOrder(orderData);
    toast({ title: 'Order submitted', isClosable: true });
    // getBook();
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
    <FormControl>
        <FormLabel>Order Number:</FormLabel> <Input value={norder} readOnly />
        <FormLabel htmlFor="name">User</FormLabel>{' '}
        <Input value={userid} readOnly />
        <FormLabel htmlFor="name">Book</FormLabel>{' '}
        <Input value={bookid} readOnly />
        <FormLabel htmlFor="name">Quantity</FormLabel>{' '}
        <Input
        value={quantity}
        type="number"
        name="quantity"
        placeholder="Quantity"
        onChange={e => setQuantity(e.target.value)}
        />
    </FormControl>
    <FormControl>
        <Button
        colorScheme="rgba(11, 5, 82, 0.89)"
        variant="outline"
        height="30px"
        width="100px"
        fontFamily="Poppins"
        fontWeight="semibold"
        fontSize="13px"
        onClick={handleBuyNow}
        type="submit"
        >
        {' '}
        Submit{' '}
        </Button>
    </FormControl>
    </Stack>
);
}
