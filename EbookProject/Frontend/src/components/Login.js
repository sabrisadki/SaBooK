import React, { useEffect, useState } from 'react';
import {
Box,
Flex,
Text,
FormControl,
FormLabel,
Input,
Button,
Stack,
Image,
InputGroup,
InputRightElement,
useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../api/authApi';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/auth0Slice';
import { setAccount } from '../store/accountSlice';
import { fetchAccount } from '../api/authApi';

const Login = () => {
const {
    loginWithRedirect,
    isLoading,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
} = useAuth0();

const [userMetadata, setUserMetadata] = useState(null);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const toast = useToast();
const navigate = useNavigate();
const dispatch = useDispatch();

const handleLoginSubmit = async () => {
    try {
    const loginData = await postLogin(email, password);
    localStorage.setItem('token', loginData.token);
    navigate('/');
    toast({
        title: 'You successfully Logged In',
        status: 'success',
        isClosable: true,
    });
    } catch (error) {
    console.error('Error logging in:', error);
    }
};
const token = localStorage.getItem('token');
console.log('tokeeeen', token);

const getAccount = async () => {
    try {
    const accountData = await fetchAccount();
    console.log('tokeeeen', accountData);
    dispatch(setAccount(accountData));
    } catch (error) {
    setError(
        error.message || 'An error occurred while fetching account data.'
    );
    } finally {
    setLoading(false);
    }
};

const getUserMetadata = async () => {
    try {
    const accessToken = await getAccessTokenSilently({
        authorizationParams: {
        audience: `https://dev-8pyv56fkzf3d3abb.eu.auth0.com/api/v2/`,
        scope: 'read:current_user',
        },
    });
    const userDetailsByIdUrl = `https://dev-8pyv56fkzf3d3abb.eu.auth0.com/api/v2/users/${user.sub}`;
    const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user_metadata = await metadataResponse.json();
    console.log('metadata', user_metadata);
    setUserMetadata(user_metadata);
    dispatch(setUser(user_metadata));
    } catch (e) {
    console.log(e.message);
    }
};

useEffect(() => {
    getUserMetadata();
}, [getAccessTokenSilently, user]);

useEffect(() => {
    if (token) {
    getAccount();
    }
}, [token]);

return (
    <Flex
    fontFamily="Poppins"
    fontWeight="semibold"
    width="1440px"
    height="650px"
    maxWidth="100%"
    background="#FFFFFF"
    >
    <Stack
        borderRadius="30px"
        width="770px"
        height="650px"
        maxWidth="100%"
        background="#F8F7FF"
    >
        <Box width="300px" height="150px" />
        <Text
        fontFamily="Poppins"
        fontWeight="semibold"
        fontSize="18px"
        color="rgba(0, 0, 0, 0.8)"
        marginLeft="10px"
        >
        Welcome back! Please login to your account.
        </Text>
        <Box width="300px" height="50px" />
        <Flex>
        <Box width="10px" height="50px" />
        <Box width="500px">
            <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            </FormControl>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                pr="4.5rem"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 'Hide' : 'Show'}
                </Button>
                </InputRightElement>
            </InputGroup>
            </FormControl>
            <Button
            type="button"
            onClick={handleLoginSubmit}
            marginTop="20px"
            colorScheme="rgba(11, 5, 82, 0.89)"
            variant="outline"
            fontFamily="Poppins"
            fontWeight="semibold"
            fontSize="13px"
            >
            Login
            </Button>
            <Box width="10px" height="20px" />
            <Button
            type="button"
            onClick={loginWithRedirect}
            marginTop="20px"
            colorScheme="rgba(11, 5, 82, 0.89)"
            variant="outline"
            fontFamily="Poppins"
            fontWeight="semibold"
            fontSize="13px"
            >
            Login with Google account or Github account
            </Button>
        </Box>
        <Box width="10px" height="50px" />
        </Flex>
    </Stack>
    <Box width="770px" height="650px" maxWidth="100%">
        <Image src="/Login Page (Community).png" alt="BookStore" />
    </Box>
    </Flex>
);
};

export default Login;
