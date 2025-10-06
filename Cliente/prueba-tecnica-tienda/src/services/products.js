import api from '../services/api';

export const getItems = async (searchTerm) => {
  const response = await api.get(`/items?search=${searchTerm}`);
// const response = await api.get(`/items`);
  return response.data;
};


export const getItemById = async (id) => {
//   const response = await api.get(`/items/${id}`);
    const response = await api.get(`/items/id`);
  return response.data;
};