export const transactionType = {
  1000: 'Deposit',
  1005: 'Withdrawal',
  1010: 'Deposit Interest',
  1015: 'Tax Deduction',
  1020: 'Reimbursement',
  1025: 'Payment',
};

export const transactionTableColumns = [
  {
    name: 'description',
    label: 'Transaction',
    align: 'left',
    field: 'description',
  },
  {
    name: 'name',
    label: 'Account',
    align: 'left',
    field: (row) => row.account.name,
  },
  {
    name: 'amount',
    label: 'Amount',
    align: 'right',
    field: 'amount',
  },
];

export const transactionTableColumnSmall = [
  'expand', 'description', 'amount',
];

export const transactionTableColumnLarge = [
  'expand', 'description', 'name', 'amount',
];
