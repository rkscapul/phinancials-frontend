export default {
  url: '/api/deposits/all',
  type: 'GET',
  status: 200,
  wait: 2000,
  response: [
    {
      id: 1,
      accountId: 'SEAB-SA-20221006',
      bankAlias: 'SeaBank',
      name: 'Seabank Savings',
      group: 'Savings Account',
      balance: 50000,
    },
    {
      id: 2,
      accountId: 'CIMB-US-20191111',
      bankAlias: 'CIMB Bank',
      name: 'CIMB UpSave',
      group: 'Savings Account',
      balance: 25000,
    },
    {
      id: 3,
      accountId: 'RCBC-1A-20211224',
      bankAlias: 'RCBC',
      name: 'RCBC OneAccount',
      group: 'Emergency Fund',
      balance: 100000,
    },
  ],
};
