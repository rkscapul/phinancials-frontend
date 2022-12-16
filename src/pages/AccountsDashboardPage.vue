<template>
  <div class="q-ma-lg">
    <div class="row">
      <template v-if="statistics.loading">
        <div class="col text-center q-pa-xs">
          <q-card>
            <q-card-section>
              <q-spinner-pie color="accent" size="2em" />
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template v-if="!statistics.loading && !statistics.success">
        <div class="col text-center">
          <q-card>
            <q-card-section>
              Dashboard statistics failed to load.
              <q-card-actions align="center" class="q-pb-none">
                <q-btn
                  label="Retry"
                  color="accent"
                  @click="fetchStatistics" />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template v-if="!statistics.loading && statistics.success">
        <div
          class="col-12 col-lg-3 q-pa-xs"
          v-for="statistic in statistics.data"
          :key="statistic.id"
        >
          <dashboard-data-card
            dark color="secondary"
            :caption="statistic.caption"
            :icon="statistic.icon"
            :value="statistic.value" />
        </div>
      </template>
    </div>
    <div class="row">
      <div class="col-12 col-lg-3 q-pa-xs order-lg-last credit-due">
        <q-card>
          <q-card-section>
            <div class="text-h6 font-noto-serif">Credit accounts due</div>
          </q-card-section>

          <q-linear-progress indeterminate color="accent" v-if="transactions.length === 0" />

          <q-card-section v-if="transactions.length === 0">
            <div>Loading...</div>
          </q-card-section>

          <q-list bordered separator>
          </q-list>
        </q-card>
      </div>

      <div class="col-12 col-lg-9 q-pa-xs transactions">
        <q-card>
          <q-card-section>
            <div class="text-h6 font-noto-serif">This month's transactions</div>
            Old records are sorted in the accounts used in the transaction.
          </q-card-section>

          <template v-if="transactions.loading && !transactions.success">
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
                  class="full-width"
                  @click="fetchTransactions" />
              </q-card-actions>
            </q-card-section>
          </template>

          <q-table
            v-if="!transactions.loading && transactions.success"
            :rows="transactions.data"
            :columns="transactionTableColumns"
            :visible-columns="$q.screen.lt.md
              ? transactionTableColumnSmall
              : transactionTableColumnLarge"
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
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import {
  transactionType,
  transactionTableColumns,
  transactionTableColumnLarge,
  transactionTableColumnSmall,
} from 'src/helpers/transaction-type.js';

import DashboardDataCard from '../components/cards/DashboardDataCard.vue';

import { transactions } from '../endpoints/transactions.js';
import { statistics } from '../endpoints/statistics.js';

export default defineComponent({
  name: 'DashboardLayout',
  components: {
    DashboardDataCard,
  },
  data() {
    return {
      statistics: {
        data: [],
        loading: false,
        success: false,
      },
      transactions: {
        data: [],
        loading: false,
        success: false,
      },
      transactionTableColumns,
      transactionTableColumnLarge,
      transactionTableColumnSmall,
    };
  },
  created() {
    this.fetchStatistics();
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      this.transactions.loading = true;

      const response = await transactions.getAllDashboard();

      this.transactions.data = response.success ? response.data.map((_transaction) => {
        const { amount: _amount, type: code } = _transaction;

        const isWithdrawal = _amount < 0;
        const description = transactionType[code];
        const amount = _amount.toLocaleString('en-PH', {
          style: 'currency',
          currency: 'PHP',
          currencySign: 'accounting',
        });

        return {
          ..._transaction,
          description,
          amount,
          isWithdrawal,
        };
      }) : [];

      this.transactions.success = response.success;
      this.transactions.loading = false;
    },
    async fetchStatistics() {
      this.statistics.loading = true;

      const response = await statistics.getDashboardStatistics();

      this.statistics.data = response.success ? response.data.map((statistic) => {
        const value = statistic.value.toLocaleString('en-PH', {
          style: 'currency',
          currency: 'PHP',
          currencySign: 'accounting',
        });

        return {
          ...statistic,
          value,
        };
      }) : [];

      this.statistics.success = response.success;
      this.statistics.loading = false;

      console.log(this.statistics);
    },
  },
});

</script>
