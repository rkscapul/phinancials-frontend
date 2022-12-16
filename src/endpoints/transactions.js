import axios from 'axios';

export const transactions = {
  getAllDashboard: () => axios.get('http://192.168.2.38:10500/api/transactions/all')
    .then((response) => ({ data: response.data, success: true }))
    .catch(() => ({ success: false })),
};
