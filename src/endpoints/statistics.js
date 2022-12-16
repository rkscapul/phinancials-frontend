import axios from 'axios';

export const statistics = {
  getDashboardStatistics: () => axios.get('http://192.168.2.38:10500/api/statistics/for-dashboard')
    .then((response) => ({ data: response.data, success: true }))
    .catch(() => ({ success: false })),
};
