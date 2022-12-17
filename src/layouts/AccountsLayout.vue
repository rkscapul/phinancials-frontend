<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <span class="title gt-sm">Deposit Accounts</span>
        </q-toolbar-title>

        <q-btn
          flat no-caps rounded
          :icon-right="hideBalance ? 'visibility_off' : 'visibility'"
          :label="hideBalance ? 'Amounts hidden' : 'Amounts visible'"
          @click="hideBalance = !hideBalance" />
        <q-btn
          flat rounded
          icon="settings" />
        <q-btn
          flat rounded
          icon="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      class="main-drawer"
      v-model="leftDrawerOpen"
      show-if-above
    >
      <q-scroll-area
        style="height: 100%"
      >
        <q-list>
          <q-item
            clickable v-ripple
            class="bg-accent"
            to="/dashboard">
            <q-item-section avatar>
              <q-icon name="arrow_back" color="white" />
            </q-item-section>
            <q-item-section
              class="text-weight-bold text-uppercase"
            >Back to dashboard</q-item-section>
          </q-item>

          <template v-if="deposits.loading">
            <q-item>
              <q-item-section avatar>
                <q-spinner-pie color="accent" size="2em" />
              </q-item-section>
              <q-item-section class="text-uppercase text-weight-bold">
                Loading deposits
              </q-item-section>
            </q-item>
          </template>

          <template v-if="!deposits.success && !deposits.loading">
            <q-item>
              <q-item-section avatar>
                <q-icon name="error" color="negative" />
              </q-item-section>
              <q-item-section class="text-uppercase text-weight-bold">
                Failed to load accounts
              </q-item-section>
              <q-item-section side>
                <q-btn round flat icon="refresh" @click="getAllDeposits()" />
              </q-item-section>
            </q-item>
          </template>

          <template v-if="deposits.success && !deposits.loading">
            <template
              v-for="group in deposits.data"
              :key="group.key">
              <q-expansion-item
                group="deposit-accounts"
                :label="group.group"
              >
                <deposit-account-component
                  v-for="account in group.accounts"
                  :key="account.id"
                  :data="account"
                  @clicked="accountsState.setAccountId(account.accountId)" />
              </q-expansion-item>
            </template>
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
  .drawer-header {
    background: linear-gradient(60deg, #0d47a1, #0051a9, #0065af,
      #007898, #00856d, #008c49, #388e3c);
  }
</style>

<script>
import { defineComponent, ref } from 'vue';

import { deposits } from '../endpoints/deposits.js';

import { toCamelCase, applyCurrency } from '../helpers/text-formatting.js';

import { accountsStore } from '../stores/accounts.js';

import DepositAccountComponent from '../components/list-item/DepositAccountListItem.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    DepositAccountComponent,
  },
  data() {
    return {
      deposits: {
        data: [],
        loading: false,
        success: false,
      },
    };
  },
  setup() {
    const accountsState = accountsStore();
    const leftDrawerOpen = ref(false);
    const hideBalance = ref(false);

    return {
      accountsState,
      leftDrawerOpen,
      hideBalance,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  created() {
    this.getAllDeposits();
  },
  methods: {
    async getAllDeposits() {
      const tempGroup = {};
      const tempGroupName = {};

      this.deposits.loading = true;

      const response = await deposits.getDepositsSummary();

      if (response.success) {
        response.data.forEach((account) => {
          const {
            accountId,
            balance,
            bankAlias,
            group,
            id,
            name,
          } = account;
          const groupName = toCamelCase(group);
          const data = {
            accountId,
            id,
            balance: applyCurrency(balance),
            bankAlias,
            name,
          };

          if (!tempGroup[groupName]) {
            tempGroup[groupName] = [];
            tempGroupName[groupName] = group;
          }

          tempGroup[groupName].push(data);
        });

        this.deposits.data = Object.keys(tempGroup).map((key) => ({
          key,
          group: tempGroupName[key],
          accounts: tempGroup[key],
        }));
      }

      this.deposits.success = response.success;
      this.deposits.loading = false;
    },
  },
});
</script>
