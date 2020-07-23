<template>
  <q-layout view="hHh lpR fff">
    <q-header
      reveal
      elevated
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
      elevated
      :breakpoint="768"
      overlay
      :width="320"
    >
      <q-btn
        color="primary"
        icon="close"
        class="fixed-top-right lt-md"
        dense
        @click="right=false"
      />
      <q-list
        bordered
        class="q-pl-sm"
      >
        <q-item-label header>
          訂購紀錄
        </q-item-label>

        <q-item
          tag="label"
          v-ripple
          v-for="cartItem in cartItems"
          :key="cartItem.id"
        >
          <q-item-section thumbnail>
            <img
              src="https://cdn.quasar.dev/img/chicken-salad.jpg"
              alt=""
            >
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ cartItem.name }}
            </q-item-label>
            <q-item-label caption>
              $70
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
          <P>{{ cartItem.order }}</P>
        </q-item>
        <q-item />
        <div class="fixed-bottom">
          <q-btn-group>
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
            />
          </q-btn-group>
        </div>
      </q-list>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
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
      selected: []
    }
  },

  methods: {
    deleteItem () {
      console.log('form menu:', this.selected);
      this.$store.dispatch('cartAction', { type: 'remove', value: this.selected });
    }
  },

  computed: {
    cartItems () {
      return this.$store.getters.cartItems;
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
  }
}
</script>
