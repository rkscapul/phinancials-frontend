<template>
  <q-page class="q-pa-lg"
    :class="{
      'flex': !accountId || !details.success || details.loading,
      'flex-center': !accountId || !details.success || details.loading
    }"
  >
    <template v-if="!accountId">
      <q-card>
        <q-card-section>
          Select an account from the left sidebar.
        </q-card-section>
      </q-card>
    </template>

    <template v-else>
      <template v-if="details.loading">
        <q-card class="q-pa-sm text-center">
          <q-card-section class="text-h6">
            <q-spinner-pie color="accent" size="md" class="q-mr-md" />
            Loading...
          </q-card-section>
        </q-card>
      </template>

      <template v-if="!details.success && !details.loading">
        <q-card class="q-pa-sm text-center">
          <q-card-section class="text-h6">
            <q-icon name="error" color="negative" size="md"  />
            Failed to load account details
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-btn color="primary" label="Retry" @click="fetchAccountDetails(accountId)" />
          </q-card-section>
        </q-card>
      </template>

      <template v-if="details.success && !details.loading">
        <div class="row q-pa-xs">
          <div class="col">
            <deposit-account-details-card-vue
              :bankAccount="details.data.name"
              :bankName="details.data.bank.name"
              :balance="details.data.balance"
              :color="details.data.bank.colors"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-9 q-pa-xs">
            <q-card>
              <q-card-section>
                <div class="text-h6 font-noto-serif">This month's transactions</div>
                Old records are sorted in the accounts used in the transaction.
              </q-card-section>

              <template v-if="transactions.loading">
                <q-linear-progress indeterminate color="accent" />
                <q-card-section>
                  <div>Loading...</div>
                </q-card-section>
              </template>

              <template v-if="!transactions.loading && !transactions.success">
                <q-separator />
                <q-card-section horizontal>
                  <q-card-section class="col-9 col-sm-11">
                    <div>Loading failed.</div>
                  </q-card-section>
                  <q-card-actions class="col-3 col-sm-1">
                    <q-btn
                      label="Retry"
                      color="primary"
                      class="full-width" />
                  </q-card-actions>
                </q-card-section>
              </template>

              <q-table
                v-if="!transactions.loading && transactions.success"
                :rows="transactions.data"
                :columns="transactionTables.columns"
                :visible-columns="$q.screen.lt.md
                  ? transactionTables.screen.small
                  : transactionTables.screen.large"
                row-key="id"
              >
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th auto-width />
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      {{ col.label }}
                    </q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td auto-width>
                      <q-btn
                        round dense
                        size="sm"
                        color="accent"
                        @click="props.expand = !props.expand"
                        :icon="props.expand ? 'remove' : 'add'"
                      />
                    </q-td>
                    <q-td
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                      :class="{
                        'text-negative': col.name === 'amount' && props.row.isWithdrawal,
                        'text-positive': col.name === 'amount' && !props.row.isWithdrawal,
                      }"
                    >
                      {{ col.value }}
                    </q-td>
                  </q-tr>
                  <q-tr v-show="props.expand" :props="props">
                    <q-td></q-td>
                    <q-td colspan="80%">
                      <div>
                        <div>
                          <span class="text-weight-bold">
                            Bank:</span> {{props.row.account.bank}}</div>
                        <div>
                          <span class="text-weight-bold">
                            Transaction Code:</span> {{props.row.type}}</div>
                        <div v-if="props.row.note">
                          <span class="text-weight-bold">
                            Note:</span> {{props.row.note}}</div>
                      </div>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-card>
          </div>

          <div class="col-12 col-lg-3 q-pa-xs">
            <q-card>
              <q-card-section>
                <div class="text-h6 font-noto-serif">Account Fees</div>
              </q-card-section>

              <q-linear-progress indeterminate color="accent" v-if="transactions.length === 0" />

              <q-card-section v-if="transactions.length === 0">
                <div>Loading...</div>
              </q-card-section>

              <q-list bordered separator>
                <q-item>
                  <q-item-section>Maintaining Balance</q-item-section>
                  <q-item-section side class="font-noto-serif">3000</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>InstaPay Bank Transfer</q-item-section>
                  <q-item-section side class="font-noto-serif">25</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>PESONet Bank Transfer</q-item-section>
                  <q-item-section side class="font-noto-serif">30</q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </div>
      </template>
    </template>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue';
import {
  transactionType,
  transactionTables,
} from 'src/helpers/transaction-type.js';

import { accountsStore } from 'src/stores/accounts.js';
import { applyCurrency } from '../helpers/text-formatting.js';

import DepositAccountDetailsCardVue from '../components/cards/DepositAccountDetailsCard.vue';

import { deposits } from '../endpoints/deposits.js';

export default defineComponent({
  name: 'DashboardLayout',
  components: {
    DepositAccountDetailsCardVue,
  },
  data() {
    return {
      details: {
        data: {},
        loading: false,
        success: false,
      },
      transactions: {
        data: [],
        loading: false,
        success: false,
      },
      transactionTables,
    };
  },
  setup() {
    const accountsState = accountsStore();
    const accountId = computed(() => accountsState.accountId);

    return { accountId };
  },
  watch: {
    accountId(newValue) {
      this.fetchAccountDetails(newValue);
    },
    // eslint-disable-next-line func-names
    'details.loading': function (newValue) {
      if (!newValue && this.details.success) {
        this.fetchAccountTransactions();
      }
    },
  },
  methods: {
    async fetchAccountDetails(value) {
      this.details.loading = true;

      const details = await deposits.getAccountDetails(value);

      this.details.data = details.success ? details.data : [];
      this.details.success = details.success;
      this.details.loading = false;
    },
    async fetchAccountTransactions() {
      const { accountId } = this;

      if (!accountId) return;

      this.transactions.loading = true;

      const transacions = await deposits.getTransactions(accountId);

      this.transactions.data = transacions.success ? transacions.data.map((record) => {
        const isWithdrawal = record.amount < 0;
        const description = transactionType[record.type];
        const amount = applyCurrency(record.amount);

        return {
          ...record,
          amount,
          isWithdrawal,
          description,
        };
      }) : [];

      this.transactions.success = transacions.success;
      this.transactions.loading = false;
    },
  },
});
</script>
