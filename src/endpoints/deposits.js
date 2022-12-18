import axios from 'axios';

export const deposits = {
  getDepositsSummary: async () => axios.get('http://192.168.2.38:10500/api/deposits/all')
    .then((response) => ({ data: response.data, success: true }))
    .catch(() => ({ success: false })),
  getAccountDetails: async (accountId) => axios.get(`http://192.168.2.38:10500/api/deposits/${accountId}`)
    .then((response) => ({ data: response.data, success: true }))
    .catch(() => ({ success: false })),
  getTransactions: async (accountId) => axios.get(`http://192.168.2.38:10500/api/deposits/${accountId}/transactions`)
    .then((response) => ({ data: response.data, success: true }))
    .catch(() => ({ success: false })),
};
