import api from '../services/api';

export const getItems = async (searchTerm) => {

  const response = await api.get(`/items?q=${searchTerm}`);
  return response.data;
};


export const getItemById = async (id) => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};