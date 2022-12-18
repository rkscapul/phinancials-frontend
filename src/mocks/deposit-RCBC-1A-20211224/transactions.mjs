export default {
  url: '/api/deposits/RCBC-1A-20211224/transactions',
  type: 'GET',
  status: 200,
  wait: 3000,
  response: [
    {
      id: 5,
      account: {
        name: 'RCBC OneAccount',
        bank: 'Rizal Commercial Banking Corporation',
      },
      type: 1005,
      amount: -6900.00,
      note: 'InstaPay send',
    },
    {
      id: 4,
      account: {
        name: 'RCBC OneAccount',
        bank: 'Rizal Commercial Banking Corporation',
      },
      type: 1000,
      amount: 150000.00,
      note: 'Over-the-counter deposit',
    },
    {
      id: 3,
      account: {
        name: 'RCBC OneAccount',
        bank: 'Rizal Commercial Banking Corporation',
      },
      type: 1025,
      amount: -75000.00,
      note: 'St. Lukes Medical Center payment',
    },
    {
      id: 2,
      account: {
        name: 'RCBC OneAccount',
        bank: 'Rizal Commercial Banking Corporation',
      },
      type: 1000,
      amount: 150000.00,
      note: 'Over-the-counter deposit',
    },
    {
      id: 1,
      account: {
        name: 'RCBC OneAccount',
        bank: 'Rizal Commercial Banking Corporation',
      },
      type: 1005,
      amount: -10000.00,
      note: 'ATM withdrawal',
    },
  ],
};
