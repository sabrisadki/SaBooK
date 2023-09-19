import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAccounts } from '../api/authApi';
import { SimpleGrid,Table, Thead,Tbody, Tfoot, Tr,Th, Td,TableContainer,Stack,useToast, useDisclosure, Button, Slide, Box,FormControl, 
FormLabel, Input, Divider } from '@chakra-ui/react';
import { setUser } from '../store/userSlice';
import {setSelectedUserId} from '../store/selectedUserIdSlice'
import { deleteAccount, patchUser } from '../api/authApi';
import { DeleteIcon, EditIcon,  } from '@chakra-ui/icons'
import Navbar from './Navbar';

const UserList = () => {

  const accounts = useSelector(state => state.user); 
  const dispatch = useDispatch();
  const positions = ['top'];
  const toast = useToast();
  const { isOpen, onToggle,onClose } = useDisclosure();

  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const getAccounts = async () => {
    const data = await fetchAllAccounts();
    dispatch(setUser(data));
  };

  const selectedUserId = useSelector((state) => state.selectedUserId.selectedUserId);
  console.log('id eli bech patchih', selectedUserId);

  const handlepatch = async () => {
    try {
      const values = { password, role };
      await patchUser(selectedUserId, values);
      toast({ title: 'Account updated', isClosable: true });
      onClose();
      getAccounts();
    } catch (error) {
      console.error('Error updating account:', error);
      toast({
        title: 'Error updating account',
        status: 'error',
        position: positions[0],
        isClosable: true,
      });
    }
  };
  

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <Stack fontFamily="Poppins" borderRadius="30px"  width="1440px"  height="650px"  maxWidth="100%"  background="#F8F7FF"  >
    <Navbar/>
        <TableContainer >
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>User ID</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>role</Th>
                        <Th>Delete</Th>
                        <Th>update</Th>
                    </Tr>
                </Thead>
    {accounts.map((el) => (
                    <Tbody key={el._id}>
                      <Tr>
                        <Td>{el._id}</Td>
                        <Td>{el.name}</Td>
                        <Td>{el.email} </Td>
                        <Td >{el.phone}</Td>
                        <Td >{el.role}</Td>
                        <Td><DeleteIcon   onClick={async()=> { await  deleteAccount(el._id); getAccounts();toast({  position: positions[0],title: 'account deleted',    isClosable: true,  }) }} ></DeleteIcon></Td>
                        <Td><EditIcon onClick={() => {    dispatch(setSelectedUserId(el._id));     onToggle(el._id);   }} />
                            <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
                              <Box p='40px' mt='4'  bg='gray.100' rounded='md' >
                                    <FormControl>
                                    <FormLabel>password</FormLabel>
                                    <Input   type="password"   placeholder="Password"   value={password}   onChange={(e) => setPassword(e.target.value)}/>
                                    <Divider />
                                    <FormLabel>Role</FormLabel>
                                    <Input   type="role" placeholder="role"   value={role}   onChange={(e) => setRole(e.target.value)}/>
                                    </FormControl>
                                    <Divider />
                                    <SimpleGrid columns={2} spacing={10}>
                                    <Button onClick={() => handlepatch()}
                                      >Save</Button>
                                      <Button onClick={onClose}>Cancel</Button>
                                    </SimpleGrid> 
                              </Box>
                            </Slide>
                        </Td>
                      </Tr>
                    </Tbody>
                        ))}
                <Tfoot>
                </Tfoot>
            </Table>
        </TableContainer>
    </Stack> 
  );
};

export default UserList;



// import React from 'react';
// import { Text, Flex, Box, Avatar, Badge, useToast, Button, Wrap, WrapItem,useDisclosure,FormControl,FormLabel,Input,Slide } from '@chakra-ui/react';
// import { deleteAccount, updateUser } from '../api/authApi';
// import { useState } from 'react';

// const UserCard = ({ account, getAccounts }) => {
//         const toast = useToast();
//         const positions = ['top'];
//         const { isOpen, onToggle } = useDisclosure()
//         const [email, setEmail] = useState('');
//         const [phone, setPhone] = useState('');
//         const [password, setPassword] = useState('');
//         const [role, setRole] = useState('');
//         const [name, setName] = useState('');


// 
//   const handleUpdate = async () => {
//     try {
//       const upUser={name,email,phone,password,role}
//       await updateUser(account._id,upUser);
//       getAccounts();
//       toast({  title: 'Update saved',  position: positions[0],  isClosable: true,  });
//     } catch (error) {
//       console.error('Error updating user:', error);
//       toast({  title: 'Error update user',  status: 'error',  position: positions[0],  isClosable: true,  });
//     }
//   };

//   return (
//     <Flex>
//       <Box ml='3'
//       <Wrap>
//       <Button onClick={onToggle}>Update</Button>
//       <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
//         <Box p='40px' color='white' mt='4'  bg='teal.500' rounded='md' shadow='md'  >
//               <FormControl>
//               <FormLabel>password</FormLabel>
//               <Input   type="password"   name="password"   placeholder="Password"   value={password}   onChange={(e) => setPassword(e.target.value)}/>
//               </FormControl>     
//               <FormControl>
//               <FormLabel>Role</FormLabel>
//               <Input   type="role"   name="role"   placeholder="role"   value={role}   onChange={(e) => setRole(e.target.value)}/>
//               </FormControl>
//               <FormControl><Button onClick={handleUpdate}>Save</Button></FormControl> 
//         </Box>
//       </Slide>
//       </Wrap>
//       </Box>
//     </Flex>
//   );
// };

// export default UserCard;

