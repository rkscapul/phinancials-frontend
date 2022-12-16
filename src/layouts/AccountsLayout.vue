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
      <q-img class="absolute-top drawer-header" style="height: 75px">
        <div class="bg-transparent">
          <div class="font-noto-serif">Project PHinancials</div>
          <div>rkscapul.com/project-phinancials</div>
        </div>
      </q-img>
      <q-scroll-area
        style="height: calc(100% - 75px); margin-top: 75px;"
      >
        <q-list>
          <q-item
            clickable v-ripple
            class="bg-accent"
            href="/dashboard">
            <q-item-section avatar>
              <q-icon name="arrow_back" color="white" />
            </q-item-section>
            <q-item-section
              class="text-weight-bold text-uppercase"
            >Back to dashboard</q-item-section>
          </q-item>

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

import { toCamelCase } from '../helpers/text-formatting.js';

// import DepositAccountComponent from '../components/list-item/DepositAccountListItem.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    // DepositAccountComponent,
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
    const leftDrawerOpen = ref(false);
    const hideBalance = ref(false);

    return {
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
            balance,
            bankAlias,
            group,
            id,
            name,
          } = account;
          const groupName = toCamelCase(group);
          const data = {
            id, balance, bankAlias, name,
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

      console.log(this.deposits);
    },
  },
});
</script>
