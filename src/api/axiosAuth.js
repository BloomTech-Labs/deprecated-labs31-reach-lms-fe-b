import axios from 'axios';

export const axiosAuth = () => {
  const tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
  let tok = tokenObj.accessToken.accessToken;
  return axios.create({
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    baseURL: 'https://reach-team-b-be.herokuapp.com',
  });
};
