import React, { useState, useEffect } from 'react';
import { Avatar, CloseButton, Card, CardBody, CardFooter,Tbody,Tr,Td,Heading, AspectRatio, Text, Divider, Button, ButtonGroup, Stack, Box, Image, Modal, ModalOverlay, ModalContent, ModalHeader, Hide, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, InputGroup, FormControl, FormLabel, Input, Collapse, TableContainer, Table, useToast, Flex } from '@chakra-ui/react';
import commentApi from '../api/commentApi';
import { deleteBook, getUniqueBook } from '../api/bookApi';
import { useSelector, useDispatch } from 'react-redux';
import { setComment } from '../store/commentSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { setUniBook } from '../store/unibookSlice';
import Navbar from './Navbar';

const BookCard = () => {
    const token = localStorage.getItem('token');
    const { isAuthenticated, user } = useAuth0();
    const { id } = useParams();

    const getBook = async (id) => {
        try {
            const data = await getUniqueBook(id);
            dispatch(setUniBook(data));
        } catch (error) {
            console.error('Error fetching book:', error);
        }
    };

    const boook = useSelector((state) => state.unibook);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authData = useSelector(state => state.account);
    const authuser = useSelector(state => state.users);

    const toast = useToast()
    const cmtData = useSelector(state => state.comment);
    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bookid, setBookid] = useState();
    const [commentext, setCommentext] = useState('');

    const handleComment = async values => {
        await commentApi.Postcmt(values);
    };

    const getCmt = async () => {
        try {
            const cmtData = await commentApi.searchCommentByBookid(boook._id);
            dispatch(setComment(cmtData));
            setCommentext('');
        } catch (error) {
            console.log(
                error.message || 'An error occurred while fetching comments data.'
            );
        }
    };

    const navigupdate = () => {
        navigate(`/updatebook/${boook._id}`);
    };
    const navigbuynow = () => {
        navigate(`/addorder/${boook._id}/${authData._id}`);
    };
    const navigbuynow0 = () => {
        navigate(`/addorder/${boook._id}/${user.sub}`);
    };

    useEffect(() => {
        getBook(id);
        setName(authData.name || authuser.name);
        setEmail(authData.email);
        setBookid(boook._id);
        getCmt();
    }, [id, token, authData, authuser, boook._id]);

    return (
        <>
            <Stack fontFamily="Poppins" fontSize="13px">
                <Navbar/>
                <Flex>
                    <Box width='20px'/>
                <Box width='370px'>
                    <AspectRatio maxW="100px" ratio={3 / 4}>
                        <Image src={boook.imageLinks} alt="Book" borderRadius="lg" />
                    </AspectRatio>
                    {authData.role === 'admin' && (
                        <CloseButton size="sm" onClick={async () => { await deleteBook(boook._id); toast({ title: 'Deleting Book ', isClosable: true, status: "error" }); }}/>
                    )}
                    <Stack mt="6" spacing="3">
                        <Text color="blue.600" fontSize="xl">{`${boook.title}`}</Text>
                        <Text color="orange.600" size="md">{boook.authors}</Text>
                    </Stack>
                </Box>
                <Box width='570px'>  
                <Collapse   startingHeight={120} in={show}>{' '}<Text>{boook.description} </Text>{' '}</Collapse>
                <Button size="xs" onClick={handleToggle} mt="1rem">{' '}Show {show ? 'Less' : 'More'}{' '}</Button>
                </Box> 
                <Box width='620px'/>

                </Flex>

                <Divider />

                <Box>
                    <ButtonGroup spacing="2">
                        {authData.role === 'admin' && (
                            <>
                                {/* <Button colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="30px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px" onClick={() => { getCmt(bookid); }}>Comment</Button> */}
                                <Button colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="30px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px" type="submit" onClick={navigbuynow}>Buy Now</Button>
                                <Button colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="30px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px" onClick={navigupdate}>Update</Button>
                                <a href={boook.pdfUrl} target="_blank" rel="noopener noreferrer" download>
                                    <Button colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="30px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px">Download PDF</Button>
                                </a>
                            </>
                        )}
                        {authData.role === 'user' && (
                            <Box>
                                {/* <Button colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="30px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px" onClick={() => { getCmt(bookid); }}>Comment</Button> */}
                                <a href={boook.pdfUrl} target="_blank" rel="noopener noreferrer" download>
                                    <Button colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="30px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px">Download PDF</Button>
                                </a>
                                <Divider />
                                <Box>
                                    <Box >
                                        <Heading size='h3'>Create comment</Heading>
                                        <Box height="20px" />
                                        <InputGroup>
                                            <FormLabel fontSize="xs" width="200px">name</FormLabel>
                                            <Input size="xs" placeholder="name" value={name}  readOnly />
                                        </InputGroup>
                                        <InputGroup>
                                            <FormLabel fontSize="xs" width="200px">comment</FormLabel>
                                            <Input size="xs" placeholder="comment" value={commentext} onChange={e => setCommentext(e.target.value)} />
                                        </InputGroup>
                                    </Box>
                                    <Box>
                                        <Button marginLeft="180px" colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="20px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px" onClick={() => handleComment({ name, email, bookid, commentext })}>Save</Button>
                                        <Button marginLeft="20px" colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="20px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px" onClick={() => setCommentext('')}>Cancel</Button>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        {isAuthenticated && (
                            <>
                                {/* <Button colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="30px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px" onClick={() => { getCmt(bookid);  }}>Comment</Button> */}
                                <a href={boook.pdfUrl} target="_blank" rel="noopener noreferrer" download>
                                    <Button colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="30px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px">Download PDF</Button>
                                </a>
                                <Divider />
                                <Box>
                                        <Box >
                                            <Heading size='h3'>Create comment</Heading>
                                            <Box height="20px" />
                                            <InputGroup>
                                                <FormLabel fontSize="xs" width="200px">name</FormLabel>
                                                <Input size="xs" placeholder="name" value={name}  readOnly />
                                            </InputGroup>
                                            <InputGroup>
                                                <FormLabel fontSize="xs" width="200px">comment</FormLabel>
                                                <Input size="xs" placeholder="comment" value={commentext} onChange={e => setCommentext(e.target.value)} />
                                            </InputGroup>
                                        </Box>
                                        <Box>
                                            <Button marginLeft="180px" colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="20px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px" onClick={() => handleComment({ name, email, bookid, commentext })}>Save</Button>
                                            <Button marginLeft="20px" colorScheme="rgba(11, 5, 82, 0.89)" variant="outline" height="20px" width="100px" fontFamily="Poppins" fontWeight="semibold" fontSize="13px" onClick={() => setCommentext('')}>Cancel</Button>
                                        </Box>
                                </Box>
                            </>
                        )}
                    </ButtonGroup>
                </Box>
                <Divider />
                <Heading size='h3'>Comments</Heading>
                <TableContainer>
                    <Table variant='simple' colorScheme='teal'>                        
                    {cmtData.map(cmt => (
                        <Tbody key={cmt._id}>
                            <Tr>
                                <Td><Avatar name={cmt.name} src='https://bit.ly/broken-link' /></Td>
                                <Td>{cmt.name}</Td>
                                <Td > {cmt.commentext}</Td>
                            </Tr>
                        </Tbody>
                    ))}
                    </Table>
                    </TableContainer>
                <Box>
                </Box>
            </Stack>
        </>
    );
};

export default BookCard;
