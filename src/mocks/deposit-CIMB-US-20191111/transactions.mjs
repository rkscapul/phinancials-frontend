export default {
  url: '/api/deposits/CIMB-US-20191111/transactions',
  type: 'GET',
  status: 200,
  wait: 2500,
  response: [
    {
      id: 5,
      account: {
        name: 'CIMB UpSave Account',
        bank: 'CIMB Bank Philippines Inc.',
      },
      type: 1000,
      amount: 6900.00,
      note: 'InstaPay Received',
    },
  ],
};
