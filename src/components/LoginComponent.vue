<template>
  <q-card bordered flat class="login-card">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h4 header">Welcome</div>
          <q-input
            dense
            type="password"
            v-model="password"
            label="Please enter password"
            @keyup.enter="hello"
            :error="!password"
          />
          <q-btn color="primary" @click="hello" class="full-width">Login</q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  el: '#login',
  name: 'LoginComponent',
  data() {
    return {
      password: '',
    };
  },
  methods: {
    hello() {
      // if (!this.password) return;
    },
  },
});
</script>
