<template>
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
                  v-for="item in historySort"
                  :key="item.id"
                >
                  <q-item
                    clickable
                    v-close-popup
                    @click="sortIn(item.id)"
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
            {{ $t('noOrder') }}
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

      <!-- pagination -->
      <div
        class="z-top fixed-bottom flex-center flex text-white"
        :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
        :style="$q.dark.isActive? 'border-top: 1px solid grey;': 'border-top: 1px solid lightgrey;'"
        v-show="history"
      >
        <q-pagination
          style="height:50px"
          :color="$q.dark.isActive? 'orange': 'primary'"
          :boundary-numbers="false"
          :input="true"
          :max="paginationMax"
          :max-pages="6"
          v-model="currentPagination"
        />
      </div>

      <!-- cart footer -->

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

    <!-- Identity Dialog -->

    <q-dialog v-model="identityDialog">
      <Identity />
    </q-dialog>

    <!-- Deposit System-->

    <q-dialog v-model="depositOpen">
      <Deposit />
    </q-dialog>
  </q-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import Deposit from './Deposit.vue'
import HistoryDrawer from './HistoryDrawer.vue';
import Identity from './Identity.vue';
export default {
  components: {
    Deposit,
    HistoryDrawer,
    Identity
  },

  methods: {
    ...mapMutations([
      'allSelectMutate',
      'cartMutate',
      'depositOpenMutate',
      'drawerMutate',
      'historyMutate',
      'identityMutate',
      'paginationNext',
      'seletedMutate',
      'sortWayMutate'
    ]),

    deleteItem () {
      this.$q.dialog({
        title: this.$t('deleteOrder'),
        message: this.$t('deleteQuestion'),
        ok: {
          label: this.$t('delete'),
          color: 'red'
        },
        cancel: {
          label: this.$t('cancel'),
          color: 'grey',
          flat: true
        }
      }).onOk(() => {
        this.cartMutate({ type: 'remove', value: this.selected });
        this.seletedMutate([]);
      })
    },

    checkout () {
      if (this.isLogin) {
        if (this.accounts < this.totalCost) {
          this.money = 1000;
          this.depositOpen = true;
        } else {
          this.seletedMutate(this.selected);
          this.$router.push({ name: 'Checkout' });
        }
      } else {
        this.identityDialog = true;
      }
    },

    sortIn (way) {
      this.sortWayMutate(way);
    }
  },

  computed: {
    ...mapGetters([
      'accounts',
      'totalCost'
    ]),

    ...mapState([
      'cartItems',
      'isLogin',
      'orderSuccess'
    ]),

    allSelect: {
      get () {
        return this.$store.state.allSelect;
      },

      set (val) {
        this.allSelectMutate(val);
      }
    },

    currentPagination: {
      get () {
        return this.$store.state.currentPagination;
      },

      set (val) {
        this.paginationNext(val);
      }
    },

    depositOpen: {
      get () {
        return this.$store.state.depositOpen;
      },

      set (val) {
        this.depositOpenMutate(val);
      }
    },

    drawer: {
      get () {
        return this.$store.state.drawer;
      },

      set (val) {
        this.drawerMutate(val);
      }
    },

    drawerTitle () {
      if (!this.history) {
        return this.$t('orders');
      } else {
        return this.$t('orderRecord');
      }
    },

    drawerWidth () {
      if (this.$q.screen.width < 481) {
        return this.$q.screen.width;
      } else {
        return 320;
      }
    },

    history: {
      get () {
        return this.$store.state.history;
      },

      set (val) {
        this.historyMutate(val);
      }
    },

    historySort () {
      return [
        { id: 'sortTimeDesc', labelMain: this.$t('sortByTime'), labelSub: this.$t('descendentTime'), icon: 'access_time' },
        { id: 'sortTimeAsc', labelMain: this.$t('sortByTime'), labelSub: this.$t('ascendentTime'), icon: 'access_time' },
        { id: 'sortCostDesc', labelMain: this.$t('sortByCost'), labelSub: this.$t('descendentCost'), icon: 'attach_money' },
        { id: 'sortCostAsc', labelMain: this.$t('sortByCost'), labelSub: this.$t('ascendentCost'), icon: 'attach_money' }
      ]
    },

    identityDialog: {
      get () {
        return this.$store.state.identityDialog;
      },

      set (val) {
        this.identityMutate(val);
      }
    },

    paginationMax () {
      return Math.ceil(this.orderSuccess.length / 5);
    },

    userSetting: {
      get () {
        return this.$store.state.userSetting;
      },

      set (val) {
        this.$store.commit('userSettingMutate', val);
      }
    },

    selected: {
      get () {
        return this.$store.state.selected;
      },

      set (value) {
        this.seletedMutate(value);
      }
    }
  },

  watch: {
    allSelect (val) {
      if (!val) {
        if (this.selected.length === this.cartItems.length) {
          this.seletedMutate([]);
        }
      } else {
        this.seletedMutate([]);
        let temp = [];
        for (let i of this.cartItems) {
          temp.push(i.itemID);
        }
        this.seletedMutate(temp);
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
    }
  }
}
</script>

<style lang="scss">
.order-list:last-child{
  margin-bottom: 125px;
}
</style>
