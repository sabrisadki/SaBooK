import {
  Stack,
  Text,
  Box,
  Button,
  Image,
  Flex,
  HStack,
  InputGroup,
  InputRightAddon,
  Input,
} from '@chakra-ui/react';
import { EmailIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const authuser = useSelector(state => state.users);

  const [keyword, setKeyword] = useState('');

  const { isAuthenticated, user } = useAuth0();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleAdd = async () => {
    // navigate to the registration page with user information as a parameter
    navigate(
      `/register/${user.sub}/${authuser?.name}/${authuser?.email}/${authuser?.phone}`
    );
  };

  return (
    <Stack
      borderRadius="30px"
      width="1440px"
      height="650px"
      maxWidth="100%"
      background="#F8F7FF"
    >
      <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>
        {isAuthenticated && (
          <Box width="1440px">
            <Navbar />
          </Box>
        )}
        {token && (
          <Box width="1440px">
            <Navbar />
          </Box>
        )}
      </Flex>

      <Flex marginLeft="120px">
        <Image height="470px" width="670px" src="/image.png" alt="BookStore" />
        <Box margin="-80px" display="block">
          <Box
            marginTop="90px"
            borderRadius="10px"
            width="100px"
            height="145px"
            maxWidth="100%"
            background="#F8F7FF"
          />
          <Text
            fontFamily="Poppins"
            fontWeight="semibold"
            width="470px"
            fontSize="40px"
            color="#000000"
          >
            {' '}
            Scroll. Pick. Share{' '}
          </Text>
          <Text
            marginLeft="130px"
            fontFamily="Poppins"
            fontWeight="semibold"
            fontSize="13px"
            color="rgba(0, 0, 0, 0.8)"
            width="477px"
            maxWidth="100%"
          >
            {' '}
            Feed your imagination{' '}
          </Text>
          <Box
            width="70px"
            height="20px"
            maxWidth="100%"
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.05)"
          />
          <Box
            marginLeft="10px"
            borderRadius="5px"
            width="365px"
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.1)"
          >
            <InputGroup display="block">
              <InputRightAddon>
                <Input
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="15px"
                  color="#525151"
                  placeholder="Find your new favorite book"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                />
                <Button
                  background="rgba(11, 5, 82, 0.89)"
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="14px"
                  color="#F0F0F5"
                  height="30px"
                  width="100px"
                  onClick={() => navigate(`/search/${keyword}`)}
                >
                  Search
                </Button>
              </InputRightAddon>
            </InputGroup>
          </Box>
          <Box
            marginTop="90px"
            borderRadius="10px"
            width="100px"
            height="15px"
            maxWidth="100%"
            background="#FFFCFC"
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.02)"
          />
          <HStack marginLeft="-150px">
            {token ? null : (
              <>
                {isAuthenticated ? (
                  <Button
                    colorScheme="rgba(11, 5, 82, 0.89)"
                    variant="outline"
                    height="30px"
                    width="200px"
                    fontFamily="Poppins"
                    fontWeight="semibold"
                    fontSize="13px"
                    onClick={() => handleAdd(user.sub)}
                  >
                    {' '}
                    Register with Email
                  </Button>
                ) : (
                  <>
                    <Button
                      colorScheme="rgba(11, 5, 82, 0.89)"
                      variant="outline"
                      height="30px"
                      width="100px"
                      fontFamily="Poppins"
                      fontWeight="semibold"
                      fontSize="13px"
                      as={Link}
                      to="/register"
                    >
                      {' '}
                      Register{' '}
                    </Button>
                    <Button
                      colorScheme="rgba(11, 5, 82, 0.89)"
                      variant="outline"
                      height="30px"
                      width="100px"
                      fontFamily="Poppins"
                      fontWeight="semibold"
                      fontSize="13px"
                      as={Link}
                      to="/login"
                    >
                      {' '}
                      Login{' '}
                    </Button>
                  </>
                )}
              </>
            )}

            <Button
              leftIcon={<EmailIcon />}
              colorScheme="rgba(11, 5, 82, 0.89)"
              variant="outline"
              height="30px"
              width="100px"
              fontFamily="Poppins"
              fontWeight="semibold"
              fontSize="13px"
              as={Link}
              to="/contactus"
            >
              {' '}
              Email{' '}
            </Button>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="rgba(11, 5, 82, 0.89)"
              variant="outline"
              height="30px"
              width="200px"
              fontFamily="Poppins"
              fontWeight="semibold"
              fontSize="13px"
              as={Link}
              to="/booklist"
            >
              {' '}
              Discover Our Books{' '}
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Stack>
  );
};
export default HomePage;

{
  /* <Text  fontFamily="Poppins"  fontWeight="semibold"  fontSize="18px"  color="#F0F0F5"  >  Search{' '}  </Text>
<Text  fontFamily="Poppins"  fontWeight="semibold"  fontSize="15px"  color="rgba(0, 0, 0, 0.68)"  >  Title or Author  </Text>
<Box  borderRadius="5px"  width="125px"  height="48px" background="rgba(11, 5, 82, 0.89)"  boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.1)"  />
<Box>
  <span className="unsupported" />
<Circle  size="6px"  borderColor="#525151"  borderStartWidth="2px"   borderEndWidth="2px"  borderTopWidth="2px"  borderBottomWidth="2px" />
</Box>
<Text  fontFamily="Poppins"  fontWeight="semibold"  fontSize="15px"  color="#525151"  >  Genre  </Text>
<Box  width="70px"  height="70px"  maxWidth="100%"  boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.05)"  />
<Circle size="37px" /> */
}
