<template>
  <q-layout view="hHh lpR ffr">
    <q-header
      :elevated="$q.dark.isActive?false:true"
      :bordered="$q.dark.isActive?true:false"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar class="cursor-pointer">
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
        <q-btn
          flat
          icon="account_box"
          :label="$q.screen.gt.sm? $t('user') : '' "
          class="q-py-sm"
        >
          <q-menu>
            <Menu />
          </q-menu>
        </q-btn>

        <q-btn
          flat
          icon="shopping_cart"
          @click="right = !right"
        >
          <q-badge
            color="orange"
            text-color="black"
            :label="$store.getters.cartItems.length"
            floating
          />
        </q-btn>
      </q-toolbar>

      <q-tabs
        align="center"
        :breakpoint="1024"
      >
        <q-route-tab
          :to="{name: 'East'}"
          label="East"
        />
        <q-route-tab
          :to="{name: 'West'}"
          label="West"
        />
        <q-route-tab
          :to="{name: 'Drinks'}"
          label="Drinks"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="right"
      side="right"
      :breakpoint="768"
      :width="320"
      bordered
      elevated
    >
      <div
        class="column"
        style="height:100%"
      >
        <div
          style="height:37px"
          :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-grey-6'"
        />
        <div
          class="row items-center fixed-top z-top"
        >
          <div class="col-2">
            <q-btn
              color="primary"
              icon="close"
              unelevated
              @click="right=false"
            />
          </div>

          <div
            class="col-7 q-pl-md"
            style="font-size:18px"
          >
            訂單
          </div>

          <div class="col-3">
            <q-btn
              color="primary"
              flat
              :icon="allSelect?'check_box':'check_box_outline_blank'"
              :disable="cartItems.length===0"
              class="q-ml-lg"
              @click="allSelect = !allSelect"
            />
          </div>
        </div>

        <q-scroll-area
          class="col"
          visible
        >
          <q-list
            bordered
            class="q-pl-sm order-list"
            v-for="cartItem in cartItems"
            :key="cartItem.id"
          >
            <q-item
              tag="label"
              v-ripple
            >
              <q-item-section thumbnail>
                <img
                  :src="cartItem.url"
                  alt="order_thumbnail"
                >
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  {{ cartItem.name }}
                </q-item-label>

                <q-item-label caption>
                  ${{ cartItem.price }}
                </q-item-label>

                <q-item-label
                  caption
                  class="text-red"
                >
                  {{ cartItem.number }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-checkbox
                  :val="cartItem.order"
                  dense
                  v-model="selected"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <div
          class="z-top fixed-bottom q-pa-sm text-white"
          :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-grey-6'"
          style="bottom:35px"
        >
          <div
            class="text-subtitle2"
          >
            Total Count: {{ selected.length }}
            <br>
            Total Money: ${{ totalMoney }}
          </div>

          <q-btn-group
            spread
            class="bg-primary fixed-bottom"
          >
            <q-btn
              label="delete"
              icon="delete"
              color="primary"
              :disable="selected.length<1"
              @click="deleteItem"
            />
            <q-btn
              label="Checkout"
              icon="shopping_cart"
              color="primary"
              :disable="selected.length<1"
              :to="{name:'Checkout'}"
              @click="checkout"
            />
          </q-btn-group>
        </div>
      </div>

      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <div class="row justify-center">
        <router-view />
      </div>
    </q-page-container>

    <q-footer
      class="bg-grey-8 text-white"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import Menu from '../components/layouts/Menu.vue';
export default {
  components: {
    Menu
  },
  data () {
    return {
      right: false,
      selected: [],
      allSelect: false
    }
  },

  methods: {
    deleteItem () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete?',
        ok: {
          color: 'red'
        },
        cancel: {
          color: 'grey'
        }
      }).onOk(() => {
        this.$store.dispatch('cartAction', { type: 'remove', value: this.selected });
        this.selected = [];
      })
    },

    checkout () {
      console.log('go');
    }
  },

  computed: {
    cartItems () {
      return this.$store.getters.cartItems;
    },

    totalMoney () {
      if (this.selected.length === 0) {
        return 0;
      } else {
        let res = 0;
        let index;
        for (let i of this.selected) {
          index = this.cartItems.findIndex(cartItem => cartItem.order === i);
          res += this.cartItems[index].price * this.cartItems[index].number;
        }
        return res;
      }
    }
  },

  created () {
    if (this.$q.cookies.has('isDark')) {
      this.$q.dark.set(true);
    } else {
      this.$q.dark.set(false);
    }

    if (this.$q.cookies.has('isTranslate')) {
      this.$i18n.locale = 'en-us';
    } else {
      this.$i18n.locale = 'zh-tw';
    }
  },

  watch: {
    allSelect (val) {
      if (!val) {
        this.selected = [];
      } else {
        for (let i of this.cartItems) {
          this.selected.push(i.order);
        }
      }
    }
  }
}
</script>

<style lang="scss">
.order-list:last-child{
  margin-bottom: 96px;
}
</style>
