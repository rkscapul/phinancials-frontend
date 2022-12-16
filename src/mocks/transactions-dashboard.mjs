export default {
  url: '/api/transactions/all',
  type: 'GET',
  status: 200,
  wait: 2500,
  response: [
    {
      id: 5,
      account: {
        name: 'RCBC One Account',
        bank: 'Rizal Commercial Banking Corporation',
      },
      type: 1005,
      amount: -6900.00,
      note: 'OTC Withdrawal',
    },
    {
      id: 4,
      account: {
        name: 'RCBC One Account',
        bank: 'Rizal Commercial Banking Corporation',
      },
      type: 1000,
      amount: 10000.00,
      note: 'InstaPay received',
    },
    {
      id: 3,
      account: {
        name: 'SeaBank Savings Account',
        bank: 'SeaBank Philippines, Inc. (A Rural Bank)',
      },
      type: 1025,
      amount: -3000.00,
      note: 'BDO World Elite Mastercard Payment',
    },
    {
      id: 2,
      account: {
        name: 'CIMB UpSave',
        bank: 'CIMB Bank Philippines, Inc.',
      },
      type: 1010,
      amount: 100.00,
      note: '',
    },
    {
      id: 1,
      account: {
        name: 'CIMB UpSave',
        bank: 'CIMB Bank Philippines, Inc.',
      },
      type: 1015,
      amount: -20,
      note: '',
    },
  ],
};
