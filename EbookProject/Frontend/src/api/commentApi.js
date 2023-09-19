import axios from 'axios';

const commentApi = {
fetchcmts: async () => {
    const { data } = await axios.get('http://localhost:5001/api/comment/comments');
    console.log('Fetched cmts:', data);
    return data;
},

Postcmt: async (values) => {
    const addingcmt = await axios.post('http://localhost:5001/api/comment/addcomment', { ...values });
    console.log('Added cmt:', addingcmt);
    return addingcmt;
},

updatecmt: async (id, values) => {
    const updated = await axios.put(`http://localhost:5001/api/comment/updatecmt/${id}`, values);
    console.log('Updated cmt:', updated);
    return updated;
},

deletecmt: async (id) => {
    const deletedcmt = await axios.delete(`http://localhost:5001/api/comment/deletecomment/${id}`);
    console.log('Deleted cmt:', deletedcmt);
    return deletedcmt;
},

getUniquecmt: async (id, values) => {
    const { data } = await axios.get(`http://localhost:5001/api/comment/getcomment/${id}`, values);
    console.log('Fetched unique cmt details:', data);
    return data;
},
searchCommentByBookid : async (bookid) => {
    try {
    const { data } = await axios.get(`http://localhost:5001/api/comment/search/${bookid}`);
    console.log('Searched comment by bookid:', data);
    return data;
    } catch (error) {
    console.error('Error searching comment by bookid:', error);
    throw error;
    }
}
};

export default commentApi;