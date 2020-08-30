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
        class="absolute q-ml-sm q-mt-sm"
        color="orange"
        :text-color="$q.dark.isActive?'black':'white'"
      />

      <q-item-label
        header
        class="text-subtitle2 q-pt-sm q-ml-xs"
        :style="badgeAlign"
      >
        {{ orderTimeTranslate[index] }}
      </q-item-label>

      <q-item
        v-for="product in order.products"
        :key="product.order"
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
            class="text-bold text-h6"
          >
            X {{ product.totalNumber }}
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
            class="text-subtitle1 text-bold text-orange text-bold q-mt-md"
          >
            {{ $t('totalCost') }}&ensp;
            ${{ order.totalCost }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { date } from 'quasar';
import { mapState } from 'vuex'
// const { formatDate } = date;
export default {
  data () {
    return {
      badgeAlign: 'padding-left:32px'
    }
  },
  computed: {
    ...mapState([
      'currentPagination',
      'orderSuccess',
      'sortWay'
    ]),

    orderTimeTranslate () {
      return this.sortOrder.map(el => date.formatDate(el.timeStamp, 'YYYY/MM/DD HH:mm:ss'));
    },

    currentList () {
      return this.sortOrder.slice(this.currentPagination * 5 - 5, this.currentPagination * 5);
    },

    sortOrder () {
      if (this.sortWay === 'sortTimeDesc') {
        this.$store.commit('paginationNext', 1);
        return [...this.orderSuccess].sort((a, b) => b.timeStamp - a.timeStamp);
      } else if (this.sortWay === 'sortTimeAsc') {
        this.$store.commit('paginationNext', 1);
        return [...this.orderSuccess].sort((a, b) => a.timeStamp - b.timeStamp);
      } else if (this.sortWay === 'sortCostDesc') {
        this.$store.commit('paginationNext', 1);
        return [...this.orderSuccess].sort((a, b) => b.totalCost - a.totalCost);
      } else if (this.sortWay === 'sortCostAsc') {
        this.$store.commit('paginationNext', 1);
        return [...this.orderSuccess].sort((a, b) => a.totalCost - b.totalCost);
      }
      return this.orderSuccess;
    }
  }
}
</script>

<style>
.historyList:last-child{
  margin-bottom: 55px;
}
</style>
