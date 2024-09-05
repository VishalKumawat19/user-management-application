import axiosInstance from '../utils/axiosConfig';
import { USER_ROUTES } from '../utils/constants';

// Creates a new user using the provided data
export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post(USER_ROUTES.CREATE, userData);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Retrieves all users from the API
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(USER_ROUTES.GET_ALL_USERS_DATA);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Fetches details of a specific user by their ID
export const getUserDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`${USER_ROUTES.GET_USER_DETAILS}/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Updates user information based on ID and new data
export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`${USER_ROUTES.UPDATE}/${id}`, userData);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Removes a user based on their ID
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`${USER_ROUTES.DELETE}/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
