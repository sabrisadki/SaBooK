import React, { useState } from 'react';
import {
useToast,
Flex,
Button,
Stack,
FormControl,
FormLabel,
Input,
Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {
updateBook,
getUniqueBook,
uploadPdf,
uploadPhoto,
} from '../api/bookApi';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import Navbar from './Navbar';

const UpdateBook = ({ onClose }) => {
const toast = useToast();
const navigate = useNavigate();
const { id } = useParams();
const { register, handleSubmit, setValue } = useForm();
const [pdfFile, setPdfFile] = useState(null);
const [photoFile, setPhotoFile] = useState(null);

const handleUpdateBook = async data => {
    const pdfUrl = await uploadPdf(pdfFile);
    const imageLinks = await uploadPhoto(photoFile);
    await updateBook(id, { ...data, pdfUrl, imageLinks });
    toast({ title: 'Book successfully updated', isClosable: true });
    navigate('/booklist');
};

useEffect(() => {
    if (id) {
    getUniqueBook(id)
        .then(data => {
        const uniqueBook = data;
        Object.keys(uniqueBook).forEach(key => {
            setValue(key, uniqueBook[key]);
        });
        })
        .catch(error => {
        console.error('Error fetching unique book:', error);
        });
    }
}, [id, setValue]);

return (
    <Stack
    fontSize="7px"
    background="#F8F7FF"
    fontFamily="Poppins"
    width="1440px"
    height="650px"
    maxWidth="100%"
    >
    <Navbar />
    <form onSubmit={handleSubmit(handleUpdateBook)}>
        <FormControl>
        <Flex justify="space-between">
            <Box
            width="750px"
            marginLeft="20px"
            marginRight="20px"
            marginTop="25px"
            >
            <FormLabel fontSize="xs">Title</FormLabel>{' '}
            <Input
                variant="unstyled"
                size="xs"
                {...register('title')}
                type="text"
                placeholder="Title"
            />
            <FormLabel fontSize="xs">Authors</FormLabel>{' '}
            <Input
                variant="unstyled"
                size="xs"
                {...register('author')}
                type="text"
                name="authors"
                placeholder="Authors"
            />
            <FormLabel fontSize="xs">Publisher</FormLabel>{' '}
            <Input
                variant="unstyled"
                size="xs"
                {...register('publisher')}
                type="text"
                name="publisher"
                placeholder="Publisher"
            />
            <FormLabel fontSize="xs">Published Date</FormLabel>{' '}
            <Input
                variant="unstyled"
                size="xs"
                {...register('publishedDate')}
                type="date"
                name="publishedDate"
                placeholder="publishedDate"
            />
            <FormLabel fontSize="xs">Description</FormLabel>{' '}
            <Input
                variant="unstyled"
                size="xs"
                {...register('description')}
                type="text"
                name="description"
                placeholder="Description"
            />
            <FormLabel fontSize="xs">Page Count</FormLabel>{' '}
            <Input
                variant="unstyled"
                size="xs"
                {...register('pageCount')}
                type="number"
                name="pageCount"
                placeholder="Page Count"
            />
            <FormLabel fontSize="xs">Categories</FormLabel>{' '}
            <Input
                variant="unstyled"
                size="xs"
                {...register('categories')}
                type="text"
                name="categories"
                placeholder="Categories"
            />
            <FormLabel fontSize="xs">Maturity Rating</FormLabel>{' '}
            <Input
                variant="unstyled"
                size="xs"
                {...register('maturityRating')}
                type="text"
                name="maturityRating"
                placeholder="Maturity Rating"
            />
            <FormLabel fontSize="xs">Content Version</FormLabel>{' '}
            <Input
                variant="unstyled"
                size="xs"
                {...register('contentVersion')}
                type="text"
                name="contentVersion"
                placeholder="Content Version"
            />
            <FormLabel fontSize="xs">Language</FormLabel>{' '}
            <Input
                variant="unstyled"
                size="xs"
                {...register('language')}
                type="text"
                name="language"
                placeholder="Language"
            />
            </Box>
            <Box
            width="750px"
            marginLeft="20px"
            marginRight="20px"
            marginTop="25px"
            >
            <FormLabel fontSize="xs">Image</FormLabel>
            <Input
                type="file"
                name="imageLinks"
                accept="image/*"
                {...register('imageLinks')}
                onChange={event => {
                setPhotoFile(event.target.files[0]);
                }}
            />
            <FormLabel fontSize="xs">Document</FormLabel>
            <Input
                type="file"
                name="pdfUrl"
                accept="application/pdf"
                {...register('pdfUrl')}
                onChange={event => {
                setPdfFile(event.target.files[0]);
                }}
            />
            </Box>
        </Flex>
        </FormControl>

        <Button
        colorScheme="rgba(11, 5, 82, 0.89)"
        variant="outline"
        height="30px"
        width="100px"
        marginTop="25px"
        marginLeft="20px"
        fontFamily="Poppins"
        fontWeight="semibold"
        fontSize="13px"
        onClick={onClose}
        >
        Cancel{' '}
        </Button>

        <Button
        marginTop="25px"
        type="submit"
        colorScheme="rgba(11, 5, 82, 0.89)"
        variant="outline"
        height="30px"
        width="200px"
        marginLeft="20px"
        fontFamily="Poppins"
        fontWeight="semibold"
        fontSize="13px"
        >
        {' '}
        Save{' '}
        </Button>
    </form>
    </Stack>
);
};

export default UpdateBook;
