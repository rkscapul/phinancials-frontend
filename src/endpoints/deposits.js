import axios from 'axios';

export const deposits = {
  getDepositsSummary: async () => axios.get('http://192.168.2.38:10500/api/deposits/all')
    .then((response) => ({ data: response.data, success: true }))
    .then({ success: false }),
};
