<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="login-header">
      <div class="font-noto-serif">
        Project PHinancial
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {},
});
</script>
