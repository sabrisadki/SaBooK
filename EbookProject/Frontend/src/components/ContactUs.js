import {
useToast,
Input,
Stack,
InputLeftAddon,
InputGroup,
Textarea,
Button,
Text,
Flex,
HStack,
Image,
useDisclosure,
Slide,
Box,
} from '@chakra-ui/react';
import { useState } from 'react';
import messageApi from '../api/messageApi';
import Navbar from './Navbar';
import { useNavigate } from 'react-router';
import { ArrowLeftIcon } from '@chakra-ui/icons';

const ContactUs = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [message, setMessage] = useState('');
const token = localStorage.getItem('token');
const navigate = useNavigate();

const [show, setShow] = useState(false);
const { isOpen, onToggle } = useDisclosure();

const handleToggle = () => setShow(!show);
const toast = useToast();

const handleSend = async values => {
    await messageApi.Postmsg(values);
    toast({
    title: 'Your message has been sended',
    status: 'success',
    isClosable: true,
    });
    navigate('/');
};

return (
    <Stack background="#F8F7FF" fontFamily="Poppins" fontWeight="semibold">
    {token ? <Navbar /> : null}
    <Flex>
        <Stack
        borderRadius="30px"
        width="770px"
        height="610px"
        background="#F8F7FF"
        >
        <Box marginLeft="20px" marginRight="20px" marginTop="250px">
            <Text fontFamily="Poppins" fontWeight="semibold">
            Contact us
            </Text>
            <InputGroup size="sm">
            <Input
                variant="outline"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <Input
                variant="outline"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <InputLeftAddon children="+216" />
            <Input
                type="tel"
                placeholder="phone number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />
            </InputGroup>
            <Textarea
            placeholder="Message"
            size="sm"
            value={message}
            onChange={e => setMessage(e.target.value)}
            />
            <Button
            colorScheme="rgba(11, 5, 82, 0.89)"
            variant="outline"
            height="30px"
            width="100px"
            fontFamily="Poppins"
            fontWeight="semibold"
            fontSize="13px"
            onClick={() => handleSend({ name, email, phone, message })}
            >
            Send
            </Button>
            <Button
            marginLeft="20px"
            colorScheme="rgba(11, 5, 82, 0.89)"
            variant="outline"
            height="30px"
            width="300px"
            fontFamily="Poppins"
            fontWeight="semibold"
            fontSize="13px"
            onClick={() => navigate('/')}
            >
            <ArrowLeftIcon /> <Box width="50px" />
            Back to Home Page
            </Button>{' '}
        </Box>
        </Stack>

        <Image
        src="/image3.png"
        width="770px"
        height="410px"
        marginLeft="20px"
        marginRight="20px"
        marginTop="130px"
        />
    </Flex>{' '}
    </Stack>
);
};

export default ContactUs;
