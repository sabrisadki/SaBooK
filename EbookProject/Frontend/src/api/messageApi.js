import axios from 'axios';

const messageApi = {
fetchmsgs: async () => {
    const { data } = await axios.get('http://localhost:5001/api/fb/fbs');
    console.log('Fetched msgs:', data);
    return data;
},

Postmsg: async (values) => {
    const addingmsg = await axios.post('http://localhost:5001/api/fb/addfb', { ...values });
    console.log('Added msg:', addingmsg);
    return addingmsg;
},

updatemsg: async (id, values) => {
    const updated = await axios.put(`http://localhost:5001/api/fb/upfb/${id}`, values);
    console.log('Updated msg:', updated);
    return updated;
},

deletemsg: async (id) => {
    const deletedmsg = await axios.delete(`http://localhost:5001/api/fb/delfb/${id}`);
    console.log('Deleted msg:', deletedmsg);
    return deletedmsg;
},

getUniquemsg: async (id, values) => {
    const { data } = await axios.get(`http://localhost:5001/api/fb/getfeedback/${id}`, values);
    console.log('Fetched unique msg details:', data);
    return data;
}
};

export default messageApi;