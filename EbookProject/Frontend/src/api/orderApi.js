import axios from 'axios';

export const fetchOrders = async () => {
  try {
    const { data } = await axios.get('http://localhost:5001/api/ord/orders');
    console.log('Fetched orders:', data);
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const PostOrder = async (values) => {
  try {
    const addingOrder = await axios.post('http://localhost:5001/api/ord/addorders', { ...values });
    console.log('Added order:', addingOrder);
    return addingOrder;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

export const updateOrder = async (id, values) => {
  try {
    const updated = await axios.put(`http://localhost:5001/api/ord/updateorder/${id}`, values);
    console.log('Updated order:', updated);
    return updated;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const deletedOrder = await axios.delete(`http://localhost:5001/api/ord/deleteorder/${id}`);
    console.log('Deleted order:', deletedOrder);
    return deletedOrder;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

export const getUniqueOrder = async (id, values) => {
  try {
    const { data } = await axios.get(`http://localhost:5001/api/ord/getorder/${id}`, values);
    console.log('Fetched unique order details:', data);
    return data;
  } catch (error) {
    console.error('Error fetching unique order details:', error);
    throw error;
  }
};
export const patchOrder = async (id, status) => {
  try {
    const response = await axios.patch(`http://localhost:5001/api/ord/patchorder/${id}`, status);
    console.log('Updated order:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};
