import { useToast,FormLabel, Button, Card, CardBody, FormControl,Input } from '@chakra-ui/react';
import { useParams,useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Postinv } from '../api/invoiceApi';


const InvoiceCard = ({ invoice }) => {
  
  const navigate = useNavigate();
  const toast = useToast();
  const {id1,id2,id3}=useParams();
  const newInvoice = uuidv4();
  const { register, handleSubmit, setValue } = useForm();

  
  const onSubmit = async (data) => {
    try {
        await Postinv(data);
        toast({ title: 'Invoice added successfully',    isClosable: true,  })     
      } catch (error) {
        console.error('Error posting invoice:', error);
    } finally {
        console.log('Submit process finished');
    }
    navigate('/orderlist');

};
  
  useEffect(() => {

    setValue('ninvoice', newInvoice );
    setValue('norder', id1);
    setValue('date', Date());
    setValue('user', id2);
    setValue('book', id3);
    setValue('price', );


  }, [setValue]);

  return (
    <Card marginBottom={4}>
      <CardBody>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
                <FormLabel>Invoive Number</FormLabel>  <Input {...register('ninvoice')} type="text" readOnly />
                <FormLabel>Order Number</FormLabel>  <Input {...register('norder')} type="text" name="authors" readOnly/>
                <FormLabel>Date</FormLabel>  <Input {...register('date')} type="text" name="Date" placeholder="Date"  readOnly/>
                <FormLabel>Customer</FormLabel>  <Input {...register('user')} type="text" name="Customer" placeholder="Customer" readOnly/>
                <FormLabel>Book</FormLabel>  <Input {...register('book')} type="text" name="Book" placeholder="Book" readOnly/>
                <FormLabel>Quantity</FormLabel>  <Input {...register('quantity')} type="number" name="quantity" placeholder="Quantity" />
                <FormLabel>Price</FormLabel>  <Input {...register('price')} type="number" name="price" placeholder="Price" />
        </FormControl>
        <Button variant="outline" mr={3}>Cancel </Button>
        <Button colorScheme="blue" type="submit">  Approve & Save   </Button>
      </form>
      </CardBody>
    </Card>
  );
};

export default InvoiceCard;
