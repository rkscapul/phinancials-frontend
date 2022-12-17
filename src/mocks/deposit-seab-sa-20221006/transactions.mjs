export default {
  url: '/api/deposits/SEAB-SA-20221006/transactions',
  type: 'GET',
  status: 200,
  wait: 2500,
  response: [
    {
      id: 5,
      account: {
        name: 'SeaBank Savings Account',
        bank: 'SeaBank Philippines, Inc. (A Rural Bank)',
      },
      type: 1005,
      amount: -6900.00,
      note: 'InstaPay Send',
    },
  ],
};
