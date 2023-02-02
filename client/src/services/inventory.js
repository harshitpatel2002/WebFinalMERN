// All the api call functions
import axios from 'axios';

const url = 'http://localhost:5000/home/manage/inventory';

export const getItems = async () => {
  try {
    let response = await axios.get(`${url}`, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const getCategories = async () => {
  try {
    let response = await axios.get(`${url}/category`, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const addItem = async item => {
  try {
    if (!item || item === undefined) {
      return;
    }
    let response = await axios.post(`${url}`, item, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    return err;
  }
};
