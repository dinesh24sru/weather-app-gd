
import axios from 'axios';
import axiosRetry from 'axios-retry';

const client = axios.create({
  timeout: 5000,
  headers: { 'User-Agent': process.env.USER_AGENT || 'weather-app-server/1.0' }
});
axiosRetry(client, { retries: 2, retryDelay: axiosRetry.exponentialDelay });

export default client;
