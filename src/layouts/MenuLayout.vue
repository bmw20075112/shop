<template>
  <q-layout :view="$q.screen.width<=768?'hHh lpR fFr':'hHh lpR ffr'">
    <q-header
      :reveal='$q.screen.lt.sm'
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

      <q-select
        v-model="menuFilter"
        :options="filterOptions"
        :label="$t('filter')"
        bg-color="primary"
        label-color="amber"
        class="lt-sm customTextColor"
        color="primary"
        filled
        dense
      >
        <template v-slot:prepend>
          <q-icon
            name="filter_alt"
            color="white"
          />
        </template>

        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop="menuFilter = ''"
            class="cursor-pointer"
            color="white"
          />
        </template>
      </q-select>
    </q-header>

    <q-drawer
      v-model="drawer"
      side="right"
      :width="drawerWidth"
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
            class="col-10 q-pl-md"
            style="font-size:18px"
          >
            {{ $t('orders') }}
          </div>

          <div class="absolute-right">
            <q-btn
              color="primary"
              flat
              :icon="allSelect?'check_box':'check_box_outline_blank'"
              :disable="cartItems.length===0"
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
              {{ $t('totalSelect') }}: <span
                class="text-bold q-pl-xl float-right"
                :class="$q.dark.isActive?'text-red': 'text-blue-9'"
              >{{ selected.length }}</span>
            </div>

            <div class="text-subtitle1">
              {{ $t('totalCost') }}: <span
                class="text-bold q-pl-xl float-right"
                :class="$q.dark.isActive?'text-red': 'text-blue-9'"
              >${{ totalMoney }}</span>
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
        <router-view />
      </div>
    </q-page-container>

    <q-footer
      elevated
      :reveal='$q.screen.lt.sm'
      class="bg-grey"
    >
      <q-toolbar class="gt-sm">
        <Footer />
      </q-toolbar>

      <q-tabs
        align="center"
        class="lt-md bg-primary"
        :breakpoint="1024"
        v-model="tab"
        switch-indicator
        @click="$store.commit('menuFilterMutate', '')"
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
        this.$store.dispatch('selectedAction', []);
      })
    },

    checkout () {
      this.$store.commit('drawerMutate', false);
      this.$store.dispatch('selectedAction', this.selected);
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

    drawerWidth () {
      if (this.$q.screen.width < 481) {
        return this.$q.screen.width;
      } else {
        return 320;
      }
    },

    filterOptions () {
      if (this.tab === 'east') {
        return this.options[0];
      } else if (this.tab === 'west') {
        return this.options[1];
      } else {
        return this.options[2];
      }
    },

    menuFilter: {
      get () {
        return this.$t(this.$store.state.menuFilter.value);
      },

      set (val) {
        this.$store.commit('menuFilterMutate', val);
      }
    },

    options () {
      return [
        [
          { label: this.$t('japan'), value: 'japan' },
          { label: this.$t('taiwan'), value: 'taiwan' },
          { label: this.$t('southEastAsia'), value: 'southEastAsia' }
        ],

        [
          { label: this.$t('mainDish'), value: 'mainDish' },
          { label: this.$t('fastFood'), value: 'fastFood' },
          { label: this.$t('dessert'), value: 'dessert' },
          { label: this.$t('others'), value: 'others' }
        ],

        [
          { label: this.$t('tea'), value: 'tea' },
          { label: this.$t('juice'), value: 'juice' },
          { label: this.$t('alcohol'), value: 'alcohol' },
          { label: this.$t('others'), value: 'others' }
        ]
      ]
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
    },

    windowWith () {
      return this.$q.screen.lt.sm;
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
    },

    windowWith (val) {
      if (!val) {
        this.$store.commit('menuFilterMutate', '');
      }
    }
  }
}
</script>

<style lang="scss">
.customTextColor{
  .q-field__native{
    color: white;
  }
}
.order-list:last-child{
  margin-bottom: 125px;
}
</style>
