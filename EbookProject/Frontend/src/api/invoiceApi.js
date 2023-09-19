import axios from 'axios';

export const Postinv = async (values) => {
    try {
    const addinginv = await axios.post('http://localhost:5001/api/invo/postinvo', { ...values });
    console.log('Added invoic:', addinginv);
    return addinginv;
    } catch (error) {
    console.error('Error adding invoice:', error);
    throw error;
    }
};
export const fetchInvoices = async () => {
    const { data } = await axios.get('http://localhost:5001/api/invo/invoices');
    console.log('Fetched invoives:', data);
    return data;
};

const invoiceApi = {

updateInvoice: async (id, values) => {
    const updated = await axios.put(`http://localhost:5001/api/invoice/updateinvoice/${id}`, values);
    console.log('Updated Invoives:', updated);
    return updated;
},

deleteInvoice: async (id) => {
    const deletedmsg = await axios.delete(`http://localhost:5001/api/invo/deleteinvoice/${id}`);
    console.log('DeletedInvoives:', deletedmsg);
    return deletedmsg;
},

getUniqueInvoice: async (id, values) => {
    const { data } = await axios.get(`http://localhost:5001/api/invoice/invoice/${id}`, values);
    console.log('Fetched unique Invoives details:', data);
    return data;
}
};

export default invoiceApi;
