<template>
  <q-page class="flex flex-center">
    <login-component />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

import LoginComponent from '../components/LoginComponent.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginComponent,
  },
});
</script>
