<template>
  <q-card
    :dark="dark"
    :class="`${color ? `bg-${color}` : ''} my-card`">
    <q-card-section horizontal>
      <q-card-section class="col-8 q-pb-md-none">
        <div>
          <div class="font-noto-serif">
            <q-icon v-if="icon" :name="icon" /> {{ caption }}
          </div>
        </div>
      </q-card-section>
      <q-card-section class="col-4 q-pb-md-none lt-sm">
        <div class="text-right text-weight-bold">{{ value }}</div>
      </q-card-section>
    </q-card-section>

    <q-card-section class="q-pt-none gt-xs">
      <div class="text-h3">
        {{ value }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardDataCard',
  props: {
    color: {
      type: String,
      default: 'white',
    },

    customColor: {
      type: String,
    },

    dark: {
      type: Boolean,
      default: false,
    },

    value: {
      type: String,
    },

    caption: {
      type: String,
    },

    icon: {
      type: String,
    },
  },
});
</script>
