import React, { useEffect, useState } from 'react';
import {
MenuButton,
Menu,
Stack,
MenuList,
MenuItem,
IconButton, 
Box,
Image,
Input,
InputGroup,
InputRightAddon,
Button,
Collapse,
Text,
AspectRatio,
} from '@chakra-ui/react';
import { SearchIcon ,ChevronDownIcon} from '@chakra-ui/icons'
import { searchBooksByKeyword } from '../api/bookApi';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const SearchBar = () => {
const keywordParams = useParams();
const [keyword, setKeyword] = useState(keywordParams.keyword || ''); // Set the initial value from the route parameter

const [searchResults, setSearchResults] = useState([]);
const [searchBy, setSearchBy] = useState('Keyword'); 
const [show, setShow] = React.useState(false);
const handleToggle = () => setShow(!show);

const handleSubmit = async () => {
    try {
        const results = await searchBooksByKeyword(keyword, searchBy); // Pass the searchBy criteria
        setSearchResults(results);
    } catch (error) {
    console.error('Error searching for books:', error);
    }
};

useEffect(() => {
    setKeyword(keywordParams.keyword || '');
}, [keywordParams.keyword]);
handleSubmit(keyword);
return (
    <Stack
    borderRadius="30px"
    width="1440px"
    height="650px"
    maxWidth="100%"
    background="#F8F7FF"
    >
        <Navbar/>
    <InputGroup display="block">
    <InputRightAddon>
        <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Find your new favorite book"
        fontFamily="Poppins"
        fontWeight="semibold"
        fontSize="15px"
        color="#525151"
        />
        <Menu>
            <MenuButton width='300px' as={Button} rightIcon={<ChevronDownIcon />}>
                Search by {searchBy}
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => setSearchBy('Keyword')}>Keyword</MenuItem>
                <MenuItem onClick={() => setSearchBy('Title')}>Title</MenuItem>
                <MenuItem onClick={() => setSearchBy('Authors')}>Authors</MenuItem>
                <MenuItem onClick={() => setSearchBy('Categories')}>Categories</MenuItem>
                <MenuItem onClick={() => setSearchBy('Language')}>Language</MenuItem>
                <MenuItem onClick={() => setSearchBy('Date')}>Date</MenuItem>
            </MenuList>
        </Menu>
        <IconButton
        background="rgba(11, 5, 82, 0.89)"
        fontFamily="Poppins"
        fontWeight="semibold"
        fontSize="14px"
        color="#F0F0F5"
        height="30px"
        width="100px"
        onClick={handleSubmit}
        icon={<SearchIcon />} 
        >
        Search
        </IconButton>
    </InputRightAddon>
    {searchResults.length > 0 && (
        <Box>
        <Text fontSize="xl">Search Results:</Text>
        {searchResults.map(book => (
            <Box key={book.id} mt={2}>
            <Text fontWeight="bold">{book.title}</Text>
            <AspectRatio maxW="100px" ratio={3 / 4}>
                <Image src={book.imageLinks} alt="naruto" objectFit="cover" />
            </AspectRatio>
            <Text>{book.author}</Text>
            <Collapse startingHeight={70} in={show}>
                {' '}
                <Text>{book.description} </Text>{' '}
            </Collapse>
            <Button size="xs" onClick={handleToggle} mt="1rem">
                {' '}
                Show {show ? 'Less' : 'More'}{' '}
            </Button>
            </Box>
        ))}
        </Box>
    )}
    </InputGroup>
    </Stack>
);
};

export default SearchBar;

// TJR-V19-V2V
