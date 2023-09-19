import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentApi from '../api/commentApi';
import { SimpleGrid, useToast } from '@chakra-ui/react';
import { setComment } from '../store/commentSlice';
import {
Table,
Thead,
Tbody,
Tfoot,
Tr,
Th,
Td,
TableContainer,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, RepeatIcon } from '@chakra-ui/icons';
import Navbar from './Navbar';

const CommentList = () => {
const dispatch = useDispatch();
const comments = useSelector(state => state.comment);
const toast = useToast();

const getcomments = async () => {
    try {
    const data = await commentApi.fetchcmts();
    dispatch(setComment(data));
    } catch (error) {
    console.error('Error fetching getcomments', error);
    }
};

useEffect(() => {
    getcomments();
}, []);

return (
    <SimpleGrid
    spacing={4}
    templateColumns="repeat(auto-fill, minmax(1300px, 1fr))"
    >
    <Navbar />

    <TableContainer>
        <Table size="sm">
        <Thead>
            <Tr>
            <Th>Name</Th>
            <Th>bookid</Th>
            <Th>Comment</Th>
            <Th>Delete</Th>
            <Th>Respond</Th>
            </Tr>
        </Thead>
        {comments &&
            comments.map(comment => (
            <Tbody key={comment.id}>
                <Tr>
                <Td>{comment.name}</Td>
                <Td>{comment.bookid}</Td>
                <Td>{comment.commentext} </Td>
                <Td>
                    <DeleteIcon
                    onClick={async () => {
                        await commentApi.deletecmt(comment._id);
                        getcomments();
                        toast({ title: 'Comment deleted', isClosable: true });
                    }}
                    ></DeleteIcon>
                </Td>
                <Td>
                    {' '}
                    <RepeatIcon></RepeatIcon>{' '}
                </Td>
                </Tr>
            </Tbody>
            ))}
        <Tfoot></Tfoot>
        </Table>
    </TableContainer>
    </SimpleGrid>
);
};

export default CommentList;
