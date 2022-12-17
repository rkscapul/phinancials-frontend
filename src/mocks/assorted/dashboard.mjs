export default {
  url: '/api/statistics/for-dashboard',
  type: 'GET',
  status: 200,
  wait: 1000,
  response: [
    {
      id: 1,
      caption: 'Total deposits',
      icon: 'fa-solid fa-piggy-bank',
      value: 720000,
    },
    {
      id: 2,
      caption: 'Total emergency fund',
      icon: 'fa-solid fa-kit-medical',
      value: 500000,
    },
    {
      id: 3,
      caption: 'Total credit limit',
      icon: 'fa-solid fa-building-columns',
      value: 2000000,
    },
    {
      id: 4,
      caption: 'Total balance used this month',
      icon: 'fa-regular fa-credit-card',
      value: 50000,
    },
  ],
};
