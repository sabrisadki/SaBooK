import React from 'react';
import { ChakraProvider, theme,} from '@chakra-ui/react';
import Addbook from './components/AddBook';
import {Routes,Route} from 'react-router-dom'
import AddUser from './components/Register';
import Login from './components/Login';
import BookCard from './components/BookCard';
import BookList from './components/BookList';
import OrderList from './components/OrderList';
import Navbar  from './components/Navbar';
import UserList from './components/UserList';
import ContactUs from './components/ContactUs';
import SearchBar from './components/SearchBar';
import AddOrder from './components/AddOrder';
import UpdateBook from './components/UpdateBook';
import CommentList from './components/CommentList';
import FeedBackList from './components/FeedBackList';
import EditProfile from './components/EditProfile';
import InvoiceCard from './components/InvoiceCard';
import InvoiceList from './components/InvoiceList';
import HomePage from './components/HomePage';


function App() {

  return (
    <ChakraProvider toastOptions={{ defaultOptions: { position: 'bottom' } }}>
      <Routes>
        <Route path='/login' element={  <Login/>}/>
        <Route path='/search/:keyword' element={  <SearchBar/>}/>
        <Route path='/register/:id1/:id2/:id3/:id4' element={  <AddUser/>}/>
        <Route path='/register' element={  <AddUser/>}/>
        <Route path='/addbook' element={  <Addbook/>}/>
        <Route path="/bookcard/:id" element={<BookCard />} />
        <Route path='/booklist/' element={  <BookList/>}/>
        <Route path='/userslist' element={  <UserList/>}/>
        <Route path='/contactus' element={  <ContactUs/>}/>
        <Route path='/addorder/:id1/:id2' element={  <AddOrder/>}/>
        <Route path='/orderlist' element={  <OrderList/>}/>
        <Route path='/feedbacklist' element={  <FeedBackList/>}/>
        <Route path='/commentlist' element={  <CommentList/>}/>
        <Route path='/updatebook/:id' element={  <UpdateBook/>}/>
        <Route path='/editprofile/:id' element={  <EditProfile/>}/>
        <Route path='/invoice/:id1/:id2/:id3' element={<InvoiceCard/>}/>
        <Route path='/invoices' element={<InvoiceList/>}/>
        <Route path='/' element={<HomePage/>}/>



      </Routes>
    </ChakraProvider>
  );
}

export default App;
