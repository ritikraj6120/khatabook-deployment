import axios from 'axios';

const composeToken = (token) => token ? { Authorization: `Bearer ${token}` } : {};

const apiCall = (url, method, body = {}, token = '') => axios({
  method,
  url: `http://localhost:5000/api/users${url}`,
  data: body,
  headers: {
    ...composeToken(token)
  }
});	

export default apiCall;
