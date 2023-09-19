import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import messageApi from '../api/messageApi';
import {
IconButton,
SimpleGrid,
useDisclosure,
useToast,
} from '@chakra-ui/react';
import { setFeedback } from '../store/feedBackSlice';
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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import Navbar from './Navbar';
import FocusLock from 'react-focus-lock';
import {
FormControl,
FormLabel,
Input,
Box,
Stack,
ButtonGroup,
Button,
Popover,
PopoverTrigger,
PopoverContent,
PopoverHeader,
PopoverBody,
PopoverFooter,
PopoverArrow,
PopoverCloseButton,
PopoverAnchor,
} from '@chakra-ui/react';
const FeedBackList = () => {
const { onOpen, onClose, isOpen } = useDisclosure();
const firstFieldRef = React.useRef(null);
const handleEditClick = () => {
    onOpen();
};
// 1. Create a text input component
const TextInput = React.forwardRef((props, ref) => {
    return (
    <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
    </FormControl>
    );
});

// 2. Create the form
const Form = ({ firstFieldRef, onCancel }) => {
    return (
    <Stack spacing={4}>
        <TextInput
        label="First name"
        id="first-name"
        ref={firstFieldRef}
        defaultValue="John"
        />
        <TextInput label="Last name" id="last-name" defaultValue="Smith" />
        <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
            Cancel
        </Button>
        <Button isDisabled colorScheme="teal">
            Save
        </Button>
        </ButtonGroup>
    </Stack>
    );
};

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
const PopoverForm = () => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstFieldRef = React.useRef(null);

    return (
    <>
        <Box display="inline-block" mr={3}>
        John Smith
        </Box>
        <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
        >
        <PopoverTrigger>
            <IconButton size="sm" icon={<EditIcon />} />
        </PopoverTrigger>
        <PopoverContent p={5}>
            <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
            </FocusLock>
        </PopoverContent>
        </Popover>
    </>
    );
};

const dispatch = useDispatch();
const feedbacks = useSelector(state => state.feedback);
const toast = useToast();

const getFeedbacks = async () => {
    try {
    const data = await messageApi.fetchmsgs();
    dispatch(setFeedback(data));
    } catch (error) {
    console.error('Error fetching feedbacks:', error);
    }
};

useEffect(() => {
    getFeedbacks();
}, []);

return (
    <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, 1fr)">
    <Navbar />

    <TableContainer maxWidth="100%" overflow="auto">
        <Table size="sm">
        <Thead>
            <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Message</Th>
            <Th>Delete</Th>
            <Th>update</Th>
            </Tr>
        </Thead>
        {feedbacks &&
            feedbacks.map(feedback => (
            <Tbody key={feedback.id}>
                <Tr>
                <Td>{feedback.name}</Td>
                <Td>{feedback.email} </Td>
                <Td>{feedback.phone}</Td>
                <Td>{feedback.message}</Td>
                <Td>
                    <DeleteIcon
                    onClick={async () => {
                        await messageApi.deletemsg(feedback._id);
                        getFeedbacks();
                        toast({ title: 'Feedback deleted', isClosable: true });
                    }}
                    ></DeleteIcon>
                </Td>
                <Td>
                    <EditIcon onClick={handleEditClick} />
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

export default FeedBackList;
