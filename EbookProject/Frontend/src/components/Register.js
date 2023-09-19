import React, { useEffect, useState } from 'react';
import {
Box,
CloseButton,
FormControl,
FormLabel,
Input,
useDisclosure,
Stack,
InputGroup,
InputRightElement,
} from '@chakra-ui/react';
import {
Alert,
AlertIcon,
AlertDescription,
AlertTitle,
Button,
} from '@chakra-ui/react';
import { postRegister } from '../api/authApi';
import { useNavigate } from 'react-router';
import { Image, Text, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AddUser = () => {
const { isAuthenticated, user, getAccessTokenSilently, logout } = useAuth0();

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [password, setPassword] = useState('');
const [show, setShow] = React.useState(false);
const handleClick = () => setShow(!show);
const navigate = useNavigate();
const {
    isOpen: isVisible,
    onClose,
    onOpen,
} = useDisclosure({ defaultIsOpen: false });
const { id1, id2, id3, id4 } = useParams();

const handleAdd = async values => {
    await postRegister(values);
    onOpen();
};

useEffect(() => {
    setName(id2);
    setEmail(id3);
    setPhone(id4);
}, [id1]);

return (
    <Flex
    width="1440px"
    height="650px"
    maxWidth="100%"
    background="#F8F7FF"
    fontFamily="Poppins"
    fontWeight="semibold"
    >
    <Stack
        margin="50px"
        borderRadius="30px"
        width="6700px"
        height="550px"
        background="#F8F7FF"
    >
        {isAuthenticated ? (
        <>
            <Text
            fontFamily="Poppins"
            fontWeight="semibold"
            fontSize="24px"
            letterSpacing="0.1em"
            color="black.2 5"
            >
            <span>Want to use Email ,</span>
            <Box as="span" color="#444B59">
                {' '}
            </Box>
            <Box as="span" fontWeight="bold" color="blue .1 7">
                {' '}
                Sign up{' '}
            </Box>
            </Text>
            <Text
            fontFamily="Poppins"
            fontWeight="semibold"
            fontSize="36px"
            letterSpacing="0.1em"
            color="black.2 5"
            >
            {' '}
            WELCOME!
            </Text>
        </>
        ) : (
        <>
            {' '}
            <Text
            fontFamily="Poppins"
            fontWeight="semibold"
            fontSize="24px"
            letterSpacing="0.1em"
            color="black.2 5"
            >
            <span>Don’t have a account,</span>
            <Box as="span" color="#444B59">
                {' '}
            </Box>
            <Box as="span" fontWeight="bold" color="blue .1 7">
                {' '}
                Sign up{' '}
            </Box>
            </Text>
            <Text
            fontFamily="Poppins"
            fontWeight="semibold"
            fontSize="36px"
            letterSpacing="0.1em"
            color="black.2 5"
            >
            {' '}
            WELCOME!
            </Text>
        </>
        )}
        <Box width="300px" height="20px" />
        <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
        />
        </FormControl>
        <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        </FormControl>
        <FormControl>
        <FormLabel>Phone</FormLabel>
        <Input
            type="number"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
        />
        </FormControl>
        <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
            <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
                {' '}
                {show ? 'Hide' : 'Show'}{' '}
            </Button>
            </InputRightElement>
        </InputGroup>
        </FormControl>
        <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
            <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
                {' '}
                {show ? 'Hide' : 'Show'}{' '}
            </Button>
            </InputRightElement>
        </InputGroup>
        </FormControl>
        <Box width="300px" height="20px" />

        <Button
        colorScheme="rgba(11, 5, 82, 0.89)"
        height="100px"
        variant="outline"
        fontFamily="Poppins"
        // fontWeight="semibold"
        // fontSize="13px"
        onClick={() => handleAdd({ name, email, phone, password })}
        >
        {' '}
        Register{' '}
        </Button>

        {isVisible ? (
        <Alert status="success">
            <AlertIcon />
            <Box>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
                {' '}
                Your application has been received.{' '}
            </AlertDescription>
            </Box>
            <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => {
                onClose();
                navigate('/login');
            }}
            />
        </Alert>
        ) : null}
    </Stack>

    <Image
        margin="50px"
        src=" /imageregistre.png"
        width="670px"
        height="550px"
        maxWidth="100%"
    />
    </Flex>
);
};

export default AddUser;
