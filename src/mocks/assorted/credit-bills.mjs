export default {
  url: '/api/credit/dues',
  type: 'GET',
  response: [
    {
      account: {
        name: 'BDO World Elite Mastercard',
        bank: 'BDO',
      },
      amount: 6900.00,
      overdue: true,
      pending: true,
    },
  ],
};
