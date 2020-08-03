<template>
  <q-layout :view="$q.screen.width<=768?'hHh lpR fFr':'hHh lpR ffr'">
    <q-header
      :elevated="$q.dark.isActive?false:true"
      :bordered="$q.dark.isActive?true:false"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar @click="$router.push('/')">
            <img
              src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
              class="cursor-pointer"
            >
          </q-avatar>
          <span
            class="cursor-pointer q-pl-sm"
            @click="$router.push('/')"
          >PandaEat</span>
        </q-toolbar-title>
        <q-btn
          flat
          icon="account_box"
          :label="$q.screen.lt.md? '' : $t('user') "
          class="q-py-sm"
        >
          <q-menu>
            <Menu />
          </q-menu>
        </q-btn>

        <q-btn
          flat
          icon="shopping_cart"
          @click="drawer = !drawer"
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
        :align="$q.screen.lt.lg?'center':'left'"
        class="gt-sm"
        :breakpoint="1024"
        v-model="tab"
      >
        <q-tab
          name="east"
          :label="$t('east')"
        />
        <q-tab
          name="west"
          :label="$t('west')"
        />
        <q-tab
          name="drinks"
          :label="$t('drinks')"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="drawer"
      side="right"
      :width="320"
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
              @click="drawer=false"
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
            :key="cartItem.order"
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
                  {{ $t(`${cartItem.name}`) }}
                </q-item-label>

                <q-item-label caption>
                  ${{ cartItem.price }}
                </q-item-label>

                <q-item-label
                  caption
                  class="text-bold"
                >
                  {{ $t('number') }}: <span class="text-red q-ml-sm">{{ cartItem.number }}</span>
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
          style="bottom:50px"
        >
          <div class="float-right">
            <div class="text-subtitle1">
              {{ $t('totalSelect') }}: <span class="text-red text-bold q-pl-xl float-right">{{ selected.length }}</span>
            </div>

            <div class="text-subtitle1">
              {{ $t('totalCost') }}: <span class="text-red text-bold q-pl-xl float-right">${{ totalMoney }}</span>
            </div>
          </div>

          <q-btn-group
            spread
            class="bg-primary fixed-bottom"
          >
            <q-btn
              :label="$t('delete')"
              icon="delete"
              color="primary"
              style="height:50px"
              :disable="selected.length<1"
              @click="deleteItem"
            />
            <q-btn
              :label="$t('checkout')"
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
        <div ref="top" />
        <q-scroll-observer
          v-if='$q.screen.lt.md'
          @scroll="onScroll"
          debounce="800"
        />
        <router-view />
        <transition name="fade">
          <q-btn
            class='fixed lt-md'
            style="right:5px; bottom:55px"
            color="orange"
            icon="keyboard_arrow_up"
            v-show='isShow'
            @click="scrollToElement()"
          />
        </transition>
      </div>
    </q-page-container>

    <q-footer
      elevated
    >
      <q-toolbar class="bg-grey text-white gt-sm">
        <Footer />
      </q-toolbar>

      <q-tabs
        align="center"
        class="lt-md"
        :breakpoint="1024"
        v-model="tab"
        switch-indicator
      >
        <q-tab
          name="east"
          :label="$t('east')"
        />
        <q-tab
          name="west"
          :label="$t('west')"
        />
        <q-tab
          name="drinks"
          :label="$t('drinks')"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import Menu from '../components/layouts/Menu.vue';
import Footer from '../components/layouts/Footer.vue'

export default {
  components: {
    Menu,
    Footer
  },
  data () {
    return {
      allSelect: false,
      isShow: false
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
        this.$store.dispatch('selectedAction', []);
      })
    },

    checkout () {
      this.$store.dispatch('selectedAction', this.selected);
    },

    onScroll (val) {
      if (this.openBuy === true) {
        if (val.inflexionPosition > 500) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      } else {
        if (val.position > 500) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }
    },

    scrollToElement () {
      this.$refs.top.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  },

  computed: {
    cartItems () {
      return this.$store.getters.cartItems;
    },

    drawer: {
      get () {
        return this.$store.state.drawer;
      },

      set (value) {
        this.$store.commit('drawerMutate', value);
      }
    },

    openBuy () {
      return this.$store.state.openBuy;
    },

    tab: {
      get () {
        return this.$store.state.tab;
      },

      set (value) {
        this.$store.commit('tabMutate', value)
      }
    },

    selected: {
      get () {
        return this.$store.state.selected;
      },

      set (value) {
        this.$store.dispatch('selectedAction', value);
      }
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
        if (this.selected.length === this.cartItems.length) {
          this.$store.dispatch('selectedAction', []);
        }
      } else {
        this.$store.dispatch('selectedAction', []);
        let temp = [];
        for (let i of this.cartItems) {
          temp.push(i.order);
        }
        this.$store.dispatch('selectedAction', temp);
      }
    },

    selected (val) {
      if (val.length === 0) {
        this.allSelect = false;
      } else if (val.length === this.cartItems.length) {
        this.allSelect = true;
      } else {
        this.allSelect = false;
      }
    }
  }
}
</script>

<style lang="scss">
.order-list:last-child{
  margin-bottom: 125px;
}

.fade-enter-active{
  animation: fadeInUp 1s forwards;
}

.fade-leave-active{
  animation: fadeOutUp 1s forwards;
}
</style>
