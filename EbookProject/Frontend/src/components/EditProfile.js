import React, { useState, useEffect } from 'react';
import {
fetchAccount,
uploadAvatar,
patchUser,
} from '../api/authApi';
import {
useToast,
Flex,
Box,
Image,
Stack,
FormControl,
FormLabel,
Input,
InputGroup,
InputRightElement,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth0 } from '@auth0/auth0-react';

const EditProfile = () => {
const { user, isAuthenticated } = useAuth0();
console.log('auth user', user);
const authData = useSelector(state => state.account);
const authuser = useSelector(state => state.users);
const toast = useToast();
const { id } = useParams();
const navigate = useNavigate();

const [show, setShow] = React.useState(false);

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [avatarFile, setAvatarFile] = useState(null);

const handleClick = () => setShow(!show);
const token = localStorage.getItem('token');

const getUniqueId = async (id) => {
    const data = await fetchAccount(id);
    setAvatarFile(data?.avatarUrl || authuser?.picture);
    setName(data?.name || authuser?.name);
    setEmail(data?.email || authuser?.email);
    setPhone(data?.phone);
    // setAvatarFile(data?.avatarUrl);
};

const handleAvatarChange = e => {
    const selectedFile = e.target.files[0];
    setAvatarFile(selectedFile);
};

const handleUpdate = async () => {
    if (password !== confirmPassword) {
    toast({
        title: 'Password confirmation error',
        status: 'error',
        isClosable: true,
    });
    return;
    }
    try {
    let avatarUrl = null;
    if (avatarFile) {
        avatarUrl = await uploadAvatar(authData._id, avatarFile);
    }
    await patchUser(authData._id, {
        name,
        email,
        phone,
        password,
        avatarUrl,
    });
    navigate('/');
    toast({
        title: 'Profile successfully updated',
        status: 'success',
        isClosable: true,
    });
    } catch (error) {
    console.error('Error updating profile:', error);
    toast({
        title: 'An error occurred while updating profile',
        status: 'error',
        isClosable: true,
    });
    }
};

const handleAdd = async () => {
    // navigate to the registration page with user information as a parameter
    navigate(
    `/register/${user.sub}/${authuser?.name}/${authuser?.email}/${authuser?.phone}`
    );
};

useEffect(() => {
    if (id) {
    getUniqueId(id);
    }
}, [id]);

return (
    <Stack>
    <Navbar />
    <Flex
        fontFamily="Poppins"
        fontWeight="semibold"
        width="1440px"
        height="600px"
        maxWidth="100%"
        background="#FFFFFF"
    >
        <Stack
        borderRadius="30px"
        width="770px"
        height="600px"
        maxWidth="100%"
        background="#F8F7FF"
        >
        {token && (
            <Box marginLeft="30px" marginTop="100" marginRight="30px">
            <FormControl>
                <FormLabel>Avatar</FormLabel>
                <Input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                />
            </FormControl>
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
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {' '}
                    {show ? 'Hide' : 'Show'}{' '}
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
            <Box height="10px" />
            <Button
                colorScheme="rgba(11, 5, 82, 0.89)"
                variant="outline"
                fontFamily="Poppins"
                fontWeight="semibold"
                fontSize="13px"
                onClick={() => handleUpdate()}
            >
                {' '}
                Save update{' '}
            </Button>
            </Box>
        )}
        {isAuthenticated && (
            <Box marginLeft="100px" marginTop="100px">
            <h3>User data</h3>
            <img src={authuser?.picture} alt={authuser?.nickname} />
            <h2>{authuser?.nickname}</h2>
            <p>{authuser?.email}</p>
            <p>{authuser?.user_id}</p>
            <Box height="10px" />

            <Button
                colorScheme="rgba(11, 5, 82, 0.89)"
                variant="outline"
                fontFamily="Poppins"
                fontWeight="semibold"
                fontSize="13px"
                onClick={() => handleAdd(user.sub)}
            >
                {' '}
                Create Account with Email{' '}
            </Button>
            </Box>
        )}
        </Stack>

        <Box width="770px" height="600px">
        <Image
            width="770px"
            height="600px"
            src="/image4.png"
            alt="BookStore"
        />
        </Box>
    </Flex>
    </Stack>
);
};

export default EditProfile;
