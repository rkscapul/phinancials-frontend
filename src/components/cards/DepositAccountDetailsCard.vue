<template>
  <q-card class="header-card" :style="cssVars">
    <q-card-section horizontal>
      <q-card-section>
        <div>{{bankName}}</div>
        <div class="text-h6 font-noto-serif">
          {{bankAccount}}
        </div>
      </q-card-section>
      <q-card-section class="gt-xs">
        <div class="q-pl-md-xl">
          <div>Account Balance</div>
          <div class="text-h6 font-noto-serif">
            {{balanceFormatted}}
          </div>
        </div>
      </q-card-section>
    </q-card-section>

    <q-card-section horizontal class="lt-sm">
      <q-card-section class="col q-pt-none">
        <div>Account Balance</div>
      </q-card-section>
      <q-card-section class="col q-pt-none">
        <div class="font-noto-serif text-right">
          {{balanceFormatted}}
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style scoped>
  .header-card {
    background: linear-gradient(45deg, var(--bg-color));
  }
</style>

<script>
import { defineComponent } from 'vue';
import { applyCurrency } from '../../helpers/text-formatting.js';

export default defineComponent({
  name: 'DepositAccountDetailsCard',
  props: {
    balance: {
      type: Number,
    },
    bankAccount: {
      type: String,
    },
    bankName: {
      type: String,
    },
    color: {
      type: Array,
    },
  },
  computed: {
    cssVars() {
      console.log(this.color);
      return {
        '--bg-color': this.color.toString(),
      };
    },
  },
  data() {
    return {
      balanceFormatted: applyCurrency(this.balance),
    };
  },
});
</script>
