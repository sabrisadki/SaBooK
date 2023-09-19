import axios from 'axios';

export const fetchAccount = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5001/api/auth/account', {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching account data:', error);
    return null;
  }
};

export const postRegister = async values => {
  await axios.post('http://localhost:5001/api/auth/register', { ...values });
};

export const postLogin = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const fetchAllAccounts = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5001/api/auth/allaccounts',
      {}
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching all accounts data:', error);
    return null;
  }
};

export const deleteAccount = async id => {
  try {
    const deletedAccount = await axios.delete(
      `http://localhost:5001/api/auth/deleteaccount/${id}`
    );
    console.log('Deleted user', deletedAccount);
    return deletedAccount;
  } catch (error) {
    console.error('Error deleting Account:', error);
    throw error;
  }
};

export const patchUser = async (selectedUserId, values) => {
  try {
    const response = await axios.patch(
      `http://localhost:5001/api/auth/patchuser/${selectedUserId}`,
      values
    );
    console.log('Updated User:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating User:', error);
    throw error;
  }
};

export const updateUser = async (id, values) => {
  try {
    const updated = await axios.put(
      `http://localhost:5001/api/auth/updateuser/${id}`,
      values
    );
    console.log('Updated User:', updated);
    return updated;
  } catch (error) {
    console.error('Error updating User:', error);
    throw error;
  }
};

export const uploadAvatar = async (userId, avatarFile) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    const response = await axios.post(
      `http://localhost:5001/api/auth/upload-avatar/${userId}`,
      formData,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.avatarUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};
