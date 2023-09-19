// BookList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../api/bookApi';
import { setBook } from '../store/bookSlice';
import {
AspectRatio,
Image,
Flex,
Link, // Import Link from react-router-dom
WrapItem,
Center,
Box,
Wrap,
Stack,
Text,
Button,
} from '@chakra-ui/react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
const books = useSelector((state) => state.book);
const navigate = useNavigate();
const dispatch = useDispatch();

const getBook = async () => {
    try {
    const data = await fetchBooks();
    dispatch(setBook(data));
    } catch (error) {
    console.error('Error fetching books:', error);
    }
};

useEffect(() => {
    getBook();
}, [dispatch]);

return (
    <Stack fontFamily="Poppins" borderRadius="30px" width="100%" background="#F8F7FF">
    <Navbar />
    <Wrap spacing="30px">
        {books.map((book) => (
        <WrapItem key={book.id}>
            <Center w="180px" h="280px">
            <Box>
                <Link onClick={()=>navigate(`/bookcard/${book._id}`)}>
                <AspectRatio maxW="100px" ratio={3 / 4}>
                    <Image src={book.imageLinks} alt="Book" borderRadius="lg" />
                </AspectRatio>
                <Text>{book.title}</Text>
                </Link>
            </Box>
            </Center>
        </WrapItem>
        ))}
    </Wrap>
    </Stack>
);
};

export default BookList;
