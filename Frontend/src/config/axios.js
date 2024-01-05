import axios from 'axios';

// import config
import config from './index';

// import lib
import getAuthToken from '../lib/localStorage';

axios.defaults.baseURL = config.SERVER_URL;
axios.defaults.headers.common['Authorization'] = getAuthToken();

export const setAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = token;
}

export const removeAuthorization = (token) => {
    delete axios.defaults.headers.common['Authorization'];
}

export default axios;