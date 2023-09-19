import React, { useState } from 'react';
import { PostBook, uploadPdf, uploadPhoto } from '../api/bookApi';
import {
  useToast,
  Stack,
  FormLabel,
  Flex,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Addbook = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [pdfFile, setPdfFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [title, setTitle] = useState();
  const [authors, setAuthors] = useState();
  const [publisher, setPublisher] = useState();
  const [description, setDescription] = useState();
  const [pageCount, setPageCount] = useState();
  const [categories, setCategories] = useState();
  const [maturityRating, setMaturityRating] = useState();
  const [language, setLanguage] = useState();
  const [contentVersion, setContentVersion] = useState();
  const [publishedDate, setPublishedDate] = useState();

  const handleAdd = async () => {
    try {
      const pdfUrl = await uploadPdf(pdfFile);
      const imageLinks = await uploadPhoto(photoFile);
      await PostBook({
        title,
        authors,
        publisher,
        publishedDate,
        description,
        pageCount,
        categories,
        maturityRating,
        contentVersion,
        language,
        pdfUrl,
        imageLinks,
      });
      toast({ title: 'Book added successfully', isClosable: true });
      navigate('/booklist');
    } catch (error) {
      toast({ title: 'Error adding Book ', isClosable: true ,status:"error"});
      console.error(error);
    }
  };

  return (
    <Stack
      borderRadius="30px"
      width="1440px"
      height="650px"
      maxWidth="100%"
      background="#F8F7FF"
      fontFamily="Poppins"
      fontWeight="semibold"
      fontSize="18px"
    >
      <Navbar />
      <form>
        <Flex justify="space-between">
          <Box
            width="750px"
            marginLeft="10px"
            marginRight="10px"
            marginTop="10px"
          >
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <FormLabel>Author</FormLabel>
            <Input
              type="text"
              name="authors"
              placeholder="Author"
              value={authors}
              onChange={e => setAuthors(e.target.value)}
            />
            <FormLabel>Descreption</FormLabel>
            <Input
              type="text"
              name="description"
              placeholder="Descreption"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <FormLabel>Categories</FormLabel>
            <Input
              type="text"
              name="categories"
              placeholder="Categories"
              value={categories}
              onChange={e => setCategories(e.target.value)}
            />
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={event => {
                setPhotoFile(event.target.files[0]);
              }}
            />
            <FormLabel>Document</FormLabel>
            <Input
              type="file"
              name="pdfUrl"
              accept="application/pdf"
              onChange={event => {
                setPdfFile(event.target.files[0]);
              }}
            />
          </Box>

          <Box
            width="750px"
            marginLeft="10px"
            marginRight="10px"
            marginTop="10px"
          >
            <FormLabel>publisher</FormLabel>
            <Input
              type="text"
              name="publisher"
              placeholder="publisher"
              value={publisher}
              onChange={e => setPublisher(e.target.value)}
            />
            <FormLabel>published Date</FormLabel>
            <Input
              type="text"
              name="publishedDate"
              placeholder="published Date"
              value={publishedDate}
              onChange={e => setPublishedDate(e.target.value)}
            />
            <FormLabel>page Count</FormLabel>
            <Input
              type="text"
              name="pageCount"
              placeholder="page Count"
              value={pageCount}
              onChange={e => setPageCount(e.target.value)}
            />
            <FormLabel>maturity Rating</FormLabel>
            <Input
              type="text"
              name="maturityRating"
              placeholder="maturityRating"
              value={maturityRating}
              onChange={e => setMaturityRating(e.target.value)}
            />
            <FormLabel>Content Version</FormLabel>
            <Input
              type="text"
              name="contentVersion"
              placeholder="Content Version"
              value={contentVersion}
              onChange={e => setContentVersion(e.target.value)}
            />
          </Box>
        </Flex>

        <Button
          type="button"
          colorScheme="rgba(11, 5, 82, 0.89)"
          variant="outline"
          height="30px"
          width="200px"
          marginTop="20px"
          fontFamily="Poppins"
          fontWeight="semibold"
          fontSize="13px"
          onClick={handleAdd}
        >
          Add Book
        </Button>
      </form>
    </Stack>
  );
};

export default Addbook;
