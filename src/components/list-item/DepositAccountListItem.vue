<template>
  <q-item clickable v-ripple>
    <q-item-section>
      <q-item-label caption>{{data.bankAlias}}</q-item-label>
      <q-item-label>{{data.name}}</q-item-label>
    </q-item-section>
    <q-item-section side v-if="!this.hideBalance">
      <q-badge>
        {{data.balance}}
      </q-badge>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DepositAccountComponent',
  props: {
    data: {
      type: Object,
    },

    hideBalance: {
      type: Boolean,
    },
  },
});
</script>
