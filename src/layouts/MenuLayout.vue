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
          color="primary"
          icon="add"
          @click="addFake()"
        />

        <q-btn
          flat
          icon="shopping_cart"
          @click="drawer = !drawer"
        >
          <q-badge
            color="orange"
            text-color="black"
            :label="cartItems.length"
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
        :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
        style="height:100%"
      >
        <div
          style="height:50px"
          :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
        />

        <div
          class="row items-center fixed-top z-top"
        >
          <div class="col-2">
            <q-btn
              :color="$q.dark.isActive?'white':'primary'"
              icon="close"
              style="height:50px"
              flat
              @click="drawer=false"
            />
          </div>

          <div
            class="col-10 q-pl-md"
            style="font-size:18px"
          >
            {{ drawerTitle }}
          </div>

          <div class="absolute-right">
            <q-btn-group
              style="height:50px"
              flat
            >
              <q-btn
                :icon="history?'shopping_cart':'history'"
                :color="$q.dark.isActive?'bg-blue-grey-10':'white'"
                :text-color="$q.dark.isActive?'white':'primary'"
                :disable="orderSuccess.length===0"
                @click="history=!history"
              >
                <q-badge
                  floating
                  color="primary"
                  text-color="white"
                  class="q-mt-xs"
                >
                  <span v-show="!history">{{ orderSuccess.length }}</span>
                  <span v-show="history">{{ cartItems.length }}</span>
                </q-badge>
              </q-btn>

              <q-btn
                :color="$q.dark.isActive?'bg-blue-grey-10':'white'"
                :text-color="$q.dark.isActive?'white':'primary'"
                :disable="orderSuccess.length<1"
                icon="sort"
                v-show="history"
              >
                <q-menu
                  :content-class="$q.dark.isActive?'bg-blue-grey-14':'bg-white'"
                  transition-show="jump-down"
                  transition-hide="jump-up"
                >
                  <q-list
                    style="min-width: 200px"
                    v-for="item in drawerSort"
                    :key="item.id"
                  >
                    <q-item
                      clickable
                      v-close-popup
                    >
                      <q-item-section>
                        <q-item-label>{{ item.labelMain }}</q-item-label>
                        <q-item-label
                          caption
                          class="text-orange text-bold"
                        >
                          {{ item.labelSub }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon
                          :name="item.icon"
                          size="sm"
                        />
                      </q-item-section>
                    </q-item>

                    <q-separator />
                  </q-list>
                </q-menu>
              </q-btn>

              <q-btn
                :color="$q.dark.isActive?'bg-blue-grey-10':'white'"
                :text-color="$q.dark.isActive?'white':'primary'"
                :icon="allSelect?'check_box':'check_box_outline_blank'"
                :disable="cartItems.length<1"
                @click="allSelect = !allSelect"
                v-show="!history"
              />
            </q-btn-group>
          </div>
        </div>

        <!-- drawer scorll area -->

        <q-scroll-area
          class="col"
          visible
        >
          <div
            class="top"
            ref="top"
          />
          <HistoryDrawer v-show="history" />
          <div
            class="cartList"
            v-show="!history"
          >
            <h6
              v-if="cartItems.length===0"
              class="flex flex-center"
            >
              No order
            </h6>

            <div v-else>
              <q-list
                bordered
                class="q-pl-sm order-list"
                :class="$q.dark.isActive? 'bg-blue-grey-9': 'bg-white'"
                v-for="cartItem in cartItems"
                :key="cartItem.itemID"
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
                      {{ $t('number') }}:
                      <span class="text-orange text-bold q-ml-sm">{{ cartItem.number }}</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-checkbox
                      :val="cartItem.itemID"
                      dense
                      :color="$q.dark.isActive?'black':''"
                      v-model="selected"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-scroll-area>

        <!-- drawer bottom-->

        <div
          class="z-top fixed-bottom flex-center flex q-pa-sm text-white drawer-bottom"
          :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
          :style="$q.dark.isActive? 'border-top: 1px solid grey;': 'border-top: 1px solid lightgrey;'"
          v-show="history"
        >
          <q-pagination
            :color="$q.dark.isActive? 'orange': 'primary'"
            :boundary-numbers="false"
            :input="true"
            :max="paginationMax"
            :max-pages="6"
            v-model="currentPagination"
          />
        </div>

        <div
          class="z-top fixed-bottom q-pa-sm text-white"
          :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-grey-6'"
          style="bottom:50px"
          v-show="!history"
        >
          <div class="float-right">
            <div class="text-subtitle1">
              {{ $t('totalSelect') }}:

              <span
                class="text-bold q-pl-xl float-right"
                :class="$q.dark.isActive?'text-orange': 'text-blue-9'"
              >
                {{ selected.length }}
              </span>
            </div>

            <div class="text-subtitle1">
              {{ $t('totalCost') }}: <span
                class="text-bold q-pl-xl float-right"
                :class="$q.dark.isActive?'text-orange': 'text-blue-9'"
              >$ {{ totalCost }}</span>
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
              @click="checkout"
            />
          </q-btn-group>
        </div>
      </div>
    </q-drawer>

    <!-- Add Money System-->

    <q-dialog v-model="addMoney">
      <q-card :class="$q.dark.isActive?'bg-blue-grey-10':''">
        <q-card-section class="row items-center">
          <q-avatar
            icon="attach_money"
            color="negative"
            text-color="white"
          />
          <span class="q-ml-sm text-h6">{{ $t('insufficient') }}</span>
        </q-card-section>

        <q-card-section>
          Deposit or delete some orders
        </q-card-section>

        <q-card-section>
          <div>
            <div class="text-subtitle1">
              {{ $t('accounts') }} :

              <span class="text-positive text-bold q-pl-sm">
                $ {{ moneyLeft }}
              </span>
            </div>

            <div class="text-subtitle1">
              {{ $t('totalCost') }} : <span
                class="text-negative text-bold q-pl-sm"
              >$ {{ totalCost }}</span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="float-right">
          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
          >
            <q-input
              v-model.number="money"
              type="number"
              ref="money"
              class="q-mb-xl"
              :label="$t('deposit')"
              :rules="[val=>Number.isInteger(val) || 'Input must be positive interger',
                       val=>val>0 || 'Input must be positive interger',
                       val=>val+moneyLeft<=20000 || 'Accounts should not larger than 20000']"
            >
              <template v-slot:prepend>
                <q-btn
                  flat
                  color="primary"
                  round
                  icon="remove"
                  @click="count(-1000)"
                  :disable="money<1"
                />
              </template>
              <template v-slot:append>
                <q-btn
                  flat
                  color="primary"
                  round
                  icon="add"
                  @click="count(1000)"
                />
              </template>
            </q-input>

            <q-btn
              type="button"
              :label="$t('cancel')"
              class="absolute"
              style="right:75px; top:60%"
              flat
              v-close-popup
            />

            <q-btn
              icon="add"
              type="submit"
              color="primary"
              class="absolute"
              style="right:0; top:60%"
            />
          </q-form>
        </q-card-actions>
      </q-card>
    </q-dialog>

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
import Footer from '../components/layouts/Footer.vue';
import HistoryDrawer from '../components/layouts/HistoryDrawer.vue'
export default {
  components: {
    Footer,
    HistoryDrawer,
    Menu
  },

  data () {
    return {
      addMoney: false,
      history: false,
      money: 1000
    }
  },

  methods: {
    addFake () {
      let timeStamp = Date.now();
      this.$store.commit('orderSuccessSend', {
        products: [{ id: 'w1', name: 'spaghetti', price: 115, type: 'mainDish', url: 'https://res.cloudinary.com/barney4760/image/upload/v1595819324/west/spaghetti_nsdxqw.jpg', totalNumber: 2 }],
        totalCost: 230,
        timeStamp
      })
    },

    deleteItem () {
      this.$q.dialog({
        title: 'Delete Order',
        message: 'Would you like to delete?',
        ok: {
          color: 'red'
        },
        cancel: {
          color: 'grey',
          flat: true
        }
      }).onOk(() => {
        this.$store.dispatch('cartAction', { type: 'remove', value: this.selected });
        this.$store.dispatch('selectedAction', []);
      })
    },

    checkout () {
      if (this.moneyLeft < this.totalCost) {
        this.money = 1000;
        this.addMoney = true;
      } else {
        this.$store.dispatch('selectedAction', this.selected);
        this.$router.push({ name: 'Checkout' });
      }
    },

    count (money) {
      this.money = Number(this.money) + money;
    },

    onSubmit () {
      this.$refs.money.validate();
      if (this.$refs.money.hasError) {
        this.formHasError = true;
      } else {
        this.$store.commit('moneyLeftMutate', this.money);
        this.addMoney = false;
        this.$q.dialog({
          title: 'Deposit Success',
          message: `$${this.moneyLeft} in your accounts now`,
          ok: {
            color: 'primary'
          }
        })
      }
    }
  },

  computed: {
    allSelect: {
      get () {
        return this.$store.state.allSelect;
      },

      set (val) {
        this.$store.commit('allSelectMutate', val)
      }
    },

    cartItems () {
      return this.$store.state.cartItems;
    },

    currentPagination: {
      get () {
        return this.$store.state.currentPagination;
      },

      set (val) {
        this.$store.commit('paginationNext', val);
      }
    },

    drawer: {
      get () {
        return this.$store.state.drawer;
      },

      set (value) {
        this.$store.commit('drawerMutate', value);
      }
    },

    drawerTitle () {
      if (!this.history) {
        return this.$t('orders');
      } else {
        return this.$t('orderRecord');
      }
    },

    drawerSort () {
      return [
        { id: 1, labelMain: this.$t('sortByCost'), labelSub: this.$t('ascendentCost'), icon: 'attach_money' },
        { id: 2, labelMain: this.$t('sortByCost'), labelSub: this.$t('descendentCost'), icon: 'attach_money' },
        { id: 3, labelMain: this.$t('sortByTime'), labelSub: this.$t('ascendentTime'), icon: 'access_time' },
        { id: 4, labelMain: this.$t('sortByTime'), labelSub: this.$t('descendentTime'), icon: 'access_time' }
      ]
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

    moneyLeft () {
      return this.$store.state.moneyLeft;
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

    orderSuccess () {
      return this.$store.state.orderSuccess;
    },

    paginationMax () {
      return Math.ceil(this.orderSuccess.length / 5);
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

    totalCost () {
      return this.$store.getters.totalCost;
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
          temp.push(i.itemID);
        }
        this.$store.dispatch('selectedAction', temp);
      }
    },

    currentPagination (val) {
      this.$refs.top.scrollIntoView({ block: 'end' });
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

    cartItems (val) {
      if (val.length === 0) {
        this.allSelect = false;
      } else if (val.length === this.selected.length) {
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
