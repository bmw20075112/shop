<template>
  <div>
    <q-list
      v-for="(order, index) in orderSuccess"
      :key="order.timeStamp"
    >
      <q-item-label header>
        {{ orderTimeTranslate[index] }}
      </q-item-label>

      <q-item
        v-for="product in order.products"
        :key="product.id"
      >
        <q-item-section avatar>
          <q-avatar rounded>
            <img
              :src="product.url"
              alt="avatar"
            >
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ $t(`${product.name}`) }}</q-item-label>
          <q-item-label caption>
            price
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
          center
        >
          <q-item-label
            class="text-bold"
          >
            <span class="text-orange text-bold q-ml-sm">{{ product.number }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar />
        <q-item-section class="text-bold text-red">
          {{ $t('totalCost') }} :
        </q-item-section>

        <q-item-section
          side
          center
        >
          <q-item-label
            class="text-bold text-red text-bold q-ml-sm"
          >
            ${{ order.totalCost }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>
  </div>
</template>

<script>
import { date } from 'quasar';
// const { formatDate } = date;
// console.log(formatDate);
export default {
  computed: {
    orderTimeTranslate () {
      return this.orderSuccess.map(el => date.formatDate(el.timeStamp, 'YYYY/MM/DD HH:mm:ss'));
    },

    orderSuccess () {
      return this.$store.state.orderSuccess;
    }
  }
}
</script>

<style>

</style>
