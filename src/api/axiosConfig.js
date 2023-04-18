import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const getPlayers = () => {
  return axios.get(`${baseUrl}/stats`);
};

export const getPlayer = (name) => {
    return axios.get(`${baseUrl}/stats/${name}`);
  };

export const newDeck = () => {
    return axios.post(`${baseUrl}/deck/new`);
  };

export const clearCards = () => {
  return axios.post(`${baseUrl}/stats/clear`)
};

export const getDeck = (tableNumber) => {
    return axios.get(`${baseUrl}/deck/${tableNumber}`);
  };

export const dealCard = (tableNumber) => {
    return axios.get(`${baseUrl}/deck/${tableNumber}/deal`);
};

export const updatePlayerCard = (name, card) => {
  return axios.post(`${baseUrl}/stats/${name}/update`, card);
};

export const getCurrentCards = () => {
  return axios.get(`${baseUrl}/stats/current`);
};

export const postUserName = (name) => {
  return axios.post(`${baseUrl}/stats/newName`, name);
};
