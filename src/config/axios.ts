import axios from 'axios';
import config from '@/config/env';

//create axios client and set base api URL
const client = axios.create({
  baseURL: config.API_URL,
});

export default client;
