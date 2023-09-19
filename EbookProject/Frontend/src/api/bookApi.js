import axios from 'axios';

export const fetchBooks = async () => {
  try {
    const { data } = await axios.get('http://localhost:5001/api/book/books');
    return data;
  } catch (error) {
    console.error('Error fetching Books:', error);
    throw error;
  }
};

export const getUniqueBook = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5001/api/book/onebook/${id}`);
    const data = response.data; // Access data from the response
    console.log('datatatatatatat', data);
    return data;
  } catch (error) {
    console.error('Error fetching unique Book details:', error);
    throw error;
  }
};


export const PostBook = async (values) => {
  try {
    const addingBook = await axios.post('http://localhost:5001/api/book/addBook',values );
    return addingBook;
  } catch (error) {
    console.error('Error adding Book:', error);
    throw error;
  }
};

export const updateBook = async (id, values) => {
  try {
    const updated = await axios.put(`http://localhost:5001/api/book/updateBook/${id}`, { ...values });
    return updated;
  } catch (error) {
    console.error('Error updating Book:', error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const deletedBook = await axios.delete(`http://localhost:5001/api/Book/deleteBook/${id}`);
    return deletedBook;
  } catch (error) {
    console.error('Error deleting Book:', error);
    throw error;
  }
};


export const searchBooksByTitle = async (title) => {
  try {
    const { data } = await axios.get(`http://localhost:5001/api/book/search?title=${title}`);
    return data;
  } catch (error) {
    console.error('Error searching Books by Title:', error);
    throw error;
  }
};

export const searchBooksByAuthor = async (author) => {
  try {
    const { data } = await axios.get(`http://localhost:5001/api/book/search?author=${author}`);
    return data;
  } catch (error) {
    console.error('Error searching Books by Author:', error);
    throw error;
  }
};

export const searchBooksByKeyword = async (keyword, searchBy = 'keyword') => {
  try {
    const { data } = await axios.get(`http://localhost:5001/api/book/search/${keyword}?searchBy=${searchBy}`);
    return data;
  } catch (error) {
    console.error('Error searching Books by Keyword:', error);
    throw error;
  }
};

export const uploadPdf = async (pdfFile) => {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile); // Change the field name to 'pdf'
    const response = await axios.post(`http://localhost:5001/api/book/pdfFile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    });

    console.log('Uploaded PDF:', response);
    return response.data.pdfUrl;
  } catch (error) {
    console.error('Error uploading pdf:', error);
    throw error;
  }
};

export const uploadPhoto = async (photoFile) => {
  try {
    const formData = new FormData();
    formData.append('photo', photoFile); 
    const response = await axios.post(`http://localhost:5001/api/book/photoFile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Uploaded Photo:', response); 
    return response.data.photoUrl;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};
