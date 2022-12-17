<template>
  <q-card class="header-card">
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
  },
  data() {
    return {
      balanceFormatted: applyCurrency(this.balance),
    };
  },
});
</script>
