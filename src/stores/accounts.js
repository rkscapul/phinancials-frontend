import { defineStore } from 'pinia';

export const accountsStore = defineStore('accountsStore', {
  state: () => ({
    accountId: '',
  }),

  getters: {
    getAccountId(state) {
      return state.accountId;
    },
  },

  actions: {
    setAccountId(value) {
      this.accountId = value;
    },
  },
});
