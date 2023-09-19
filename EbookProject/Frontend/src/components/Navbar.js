import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Icon,
  Flex,
  Button,
  Tooltip,
  useColorModeValue,
  Image,
  Avatar,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { setAccount } from '../store/accountSlice';
import { fetchAccount } from '../api/authApi';
import { setUser } from '../store/auth0Slice';
import { SettingsIcon ,ChevronDownIcon} from '@chakra-ui/icons'

const Navbar = () => {
  const { isAuthenticated, user, getAccessTokenSilently, logout } = useAuth0();
  const authData = useSelector(state => state.account);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [userMetadata, setUserMetadata] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const isAct = location.pathname === '/';
  const isAct1 = location.pathname === '/orderlist';
  const isAct10 = location.pathname === '/invoices';
  const isAct2 = location.pathname === '/feedbacklist';
  const isAct3 = location.pathname === '/commentlist';
  const isAct4 = location.pathname === '/booklist';
  const isAct5 = location.pathname === '/userslist';
  const isAct6 = location.pathname === '/addbook';
  const isAct8 = location.pathname === '/aboutus';
  const isAct9 = location.pathname === `/editprofile/${authData._id}`;

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

  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  // if (loading) {  return <CircularProgress isIndeterminate color='green.300' />  }
  // if (error) {  <Alert status='error'><AlertIcon />  There was an error processing your request : {error}</Alert> }
  useEffect(() => {
    if (token) {
      getAccount();
    }
  }, [authData]);

  useEffect(() => {
    getUserMetadata();
  }, [getAccessTokenSilently, user]);

  return (
    <Box backgroundColor="F8F7FF" px={4}>
      <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>
        <Link to={'/'}>
          <Flex alignItems={'center'}>
            <Image
              borderRadius="full"
              boxSize="37px"
              src="/tinywow_31543725_BQq8LeqrO67jho9h.png"
              alt="BookStore"
            />
            <Box width="10px" />
            <Text
              fontFamily="Poppins"
              fontWeight="semibold"
              fontSize="25px"
              color="#2F2E2D"
            >
              SabooK
            </Text>
          </Flex>
        </Link>
        <Box>
          {isAuthenticated && (
            <Flex>
              <Button
                fontFamily="Poppins"
                fontWeight="semibold"
                fontSize="13px"
                variant="ghost"
                as={Link}
                to="/"
                color={isAct ? 'blue' : null}
              >
                {' '}
                Home{' '}
              </Button>
              <Button
                fontFamily="Poppins"
                fontWeight="semibold"
                fontSize="13px"
                variant="ghost"
                as={Link}
                to="/booklist"
                color={isAct4 ? 'blue' : null}
              >
                {' '}
                Books{' '}
              </Button>
              <Button
                fontFamily="Poppins"
                fontWeight="semibold"
                fontSize="13px"
                variant="ghost"
                as={Link}
                to="/addbook"
                color={isAct6 ? 'blue' : null}
              >
                {' '}
                Add Book{' '}
              </Button>
              <Button
                fontFamily="Poppins"
                fontWeight="semibold"
                fontSize="13px"
                variant="ghost"
                as={Link}
                to={`/editprofile/${user.sub}`}
              >
                {userMetadata?.email}
                <Box width="10px" />
                <Avatar boxSize="37px" src={userMetadata?.picture} />
              </Button>
              <Tooltip
                label="Logout"
                placement="bottom"
                openDelay={500}
                fontSize="md"
              >
                <IconButton
                    size='xs'
                    icon={<SettingsIcon />} 
                    marginTop="12px"
                    marginLeft="10px"
                    onClick={logout}
                  />
              </Tooltip>
            </Flex>
          )}
          {token &&
            (authData.role === 'admin' ? (
              <Flex>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/"
                  color={isAct ? 'blue' : null}
                >
                  {' '}
                  Home{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/orderlist"
                  color={isAct1 ? 'blue' : null}
                >
                  {' '}
                  Orders{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/invoices"
                  color={isAct10 ? 'blue' : null}
                >
                  {' '}
                  Invoices{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/feedbacklist"
                  color={isAct2 ? 'blue' : null}
                >
                  {' '}
                  Feedbacks{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/booklist"
                  color={isAct4 ? 'blue' : null}
                >
                  {' '}
                  Books{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/commentlist"
                  color={isAct3 ? 'blue' : null}
                >
                  {' '}
                  Comments{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/userslist"
                  color={isAct5 ? 'blue' : null}
                >
                  {' '}
                  Users{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/addbook"
                  color={isAct6 ? 'blue' : null}
                >
                  {' '}
                  Add Book{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to={`/editprofile/${authData._id}`}
                >
                  {authData.name}
                  <Box width="10px" />
                  <Avatar boxSize="37px" src={authData.avatarUrl} />
                </Button>
                <Tooltip
                  label="Logout"
                  placement="bottom"
                  openDelay={500}
                  fontSize="md"
                >
                  <IconButton
                    size='xs'
                    icon={<SettingsIcon />} 
                    marginTop="12px"
                    marginLeft="10px"
                    onClick={handleLogout}
                  />
                </Tooltip>
              </Flex>
            ) : (
              <Flex>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/"
                  color={isAct ? 'blue' : null}
                >
                  {' '}
                  Home{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/booklist"
                  color={isAct4 ? 'blue' : null}
                >
                  {' '}
                  Books{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to="/addbook"
                  color={isAct6 ? 'blue' : null}
                >
                  {' '}
                  Add Book{' '}
                </Button>
                <Button
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="13px"
                  variant="ghost"
                  as={Link}
                  to={`/editprofile/${authData._id}`}
                >
                  {authData.name}
                  <Box width="10px" />
                  <Avatar boxSize="37px" src={authData.avatarUrl} />
                </Button>
                <Tooltip
                  label="Logout"
                  placement="bottom"
                  openDelay={500}
                  fontSize="md"
                >
                 <IconButton
                    size='xs'
                    icon={<SettingsIcon />} 
                    marginTop="12px"
                    marginLeft="10px"
                    onClick={handleLogout}
                  />
                </Tooltip>
              </Flex>
            ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
