import axios from 'axios';

const apiKey = '89f88a68f6bc6651c8e1f2f80791c084';
export default {
  state: {
    loading: true,
    data: undefined,
  },
  getWeatherData: (lat, lon) => axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`),
};
