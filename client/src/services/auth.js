// All the api call functions
import axios from 'axios';

const url = 'http://localhost:5000';

export const userLogin = async userLoginCred => {
  try {
    let response = await axios.post(`${url}/login`, userLoginCred, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const registerUser = async registerCred => {
  try {
    let response = await axios.post(`${url}/register`, registerCred);
    return response;
  } catch (err) {
    console.log('Error in sending the user data to backend');
  }
};

export const updateUser = async updateCred => {
  try {
    let response = await axios.post(`${url}/home/manage`, updateCred);
    return response;
  } catch (err) {
    console.log('Error in updating the user data to backend');
  }
};

export const authUsingToken = async endPoint => {
  try {
    const response = await axios.get(`${url}/${endPoint}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return null;
  }
};
