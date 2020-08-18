<template>
  <div>
    <q-list
      bordered
      class="historyList"
      :class="$q.dark.isActive? 'bg-blue-grey-9': 'bg-white'"
      v-for="(order, index) in currentList"
      :key="order.timeStamp"
    >
      <q-badge
        :label="(currentPagination-1)*5+index+1"
        class="absolute"
        color="orange"
        :text-color="$q.dark.isActive?'black':'white'"
      />

      <q-item-label
        header
        class="text-subtitle2 q-pt-none"
        :style="badgeAlign"
      >
        {{ orderTimeTranslate[index] }}
      </q-item-label>

      <q-item
        v-for="product in order.products"
        :key="product.id"
        class="q-pb-xs"
      >
        <q-item-section
          thumbnail
          :style="badgeAlign"
        >
          <img
            :src="product.url"
            alt="avatar"
          >
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ $t(`${product.name}`) }}</q-item-label>
          <q-item-label caption>
            ${{ product.price }}
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
          center
        >
          <q-item-label
            class="text-bold text-h6 q-mr-xs"
          >
            X {{ product.number }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-pt-none">
        <q-item-section avatar />
        <q-item-section />

        <q-item-section
          side
          center
        >
          <q-item-label
            class="text-subtitle1 text-bold text-orange text-bold q-mr-xs q-mt-md"
          >
            {{ $t('totalCost') }} :
            ${{ order.totalCost }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { date } from 'quasar';
// const { formatDate } = date;
export default {
  data () {
    return {
      badgeAlign: 'padding-left:32px'
    }
  },
  computed: {
    orderTimeTranslate () {
      return this.currentList.map(el => date.formatDate(el.timeStamp, 'YYYY/MM/DD HH:mm:ss'));
    },

    currentList () {
      return this.orderSuccess.slice(this.currentPagination * 5 - 5, this.currentPagination * 5);
    },

    currentPagination () {
      return this.$store.state.currentPagination;
    },

    orderSuccess () {
      return this.$store.state.orderSuccess;
    }
  }
}
</script>

<style>
.historyList:last-child{
  margin-bottom: 55px;
}
</style>
