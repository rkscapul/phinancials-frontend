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
          <span class="title gt-sm">Dashboard</span>
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
          <q-item clickable v-ripple to="/deposit-accounts">
            <q-item-section avatar>
              <q-avatar round color="secondary" text-color="white" icon="fa-solid fa-money-bill" />
            </q-item-section>
            <q-item-section>Deposit Accounts</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar round color="secondary" text-color="white" icon="fa-solid fa-credit-card" />
            </q-item-section>
            <q-item-section>Credit Accounts</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar round color="grey-9" text-color="white" icon="fa-solid fa-sack-xmark" />
            </q-item-section>
            <q-item-section>Loans</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar round color="grey-9" text-color="white" icon="fa-solid fa-sack-xmark" />
            </q-item-section>
            <q-item-section>Investments</q-item-section>
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

export default defineComponent({
  name: 'MainLayout',
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
});
</script>
