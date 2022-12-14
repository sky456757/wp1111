import axios from 'axios';

const instance = axios.create({
  baseURL: `https://scorecardback.vercel.app`,
});

export default instance;

// instance.get('/hi').then((data) => console.log(data));
