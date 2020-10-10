<template>
  <q-layout :view="$q.screen.width<=768?'hHh lpR fFr':'hHh lpR ffr'">
    <q-header
      :bordered="$q.dark.isActive?true:false"
      :elevated="$q.dark.isActive?false:true"
      :reveal='$q.screen.lt.sm'
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar @click="$router.push('/')">
            <img
              src="~assets/logo.svg"
              class="cursor-pointer"
              alt="logo"
            >
          </q-avatar>

          <span
            class="cursor-pointer text-bold q-pl-sm"
            @click="$router.push('/')"
          >PandaEat</span>
        </q-toolbar-title>

        <q-btn
          flat
          class="q-py-sm"
          icon="account_box"
          :label="$q.screen.lt.md? '' : $t('user') "
        >
          <q-menu v-model="userSetting">
            <UserSetting />
          </q-menu>
        </q-btn>

        <q-btn
          flat
          icon="shopping_cart"
          @click="drawer = !drawer"
        >
          <q-badge
            floating
            color="orange"
            text-color="black"
            :label="cartItems.length"
          />
        </q-btn>
      </q-toolbar>

      <q-tabs
        class="gt-sm"
        :align="$q.screen.lt.lg?'center':'left'"
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
        dense
        filled
        bg-color="primary"
        class="lt-sm customTextColor"
        color="primary"
        label-color="amber"
        :label="$t('filter')"
        :options="filterOptions"
        v-model="menuFilter"
      >
        <template v-slot:prepend>
          <q-icon
            color="white"
            name="filter_alt"
          />
        </template>

        <template v-slot:append>
          <q-icon
            class="cursor-pointer"
            color="white"
            name="close"
            @click.stop="menuFilter = ''"
          />
        </template>
      </q-select>
    </q-header>

    <!-- drawer -->

    <MenuLayoutDrawer />

    <!-- Page Content -->

    <q-page-container>
      <div class="row justify-center">
        <router-view />
      </div>
    </q-page-container>

    <q-footer
      elevated
      class="bg-grey"
      :reveal='$q.screen.lt.sm'
    >
      <q-toolbar class="gt-sm">
        <Footer />
      </q-toolbar>

      <q-tabs
        switch-indicator
        align="center"
        class="lt-md bg-primary"
        :breakpoint="1024"
        v-model="tab"
        @click="menuFilterMutate('')"
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
import { mapMutations } from 'vuex';
import Footer from '../components/layouts/Footer.vue';
import MenuLayoutDrawer from '../components/layouts/MenuLayoutDrawer.vue';
import UserSetting from '../components/layouts/UserSetting.vue';
export default {
  components: {
    Footer,
    MenuLayoutDrawer,
    UserSetting
  },

  methods: {
    ...mapMutations([
      'cartMutate',
      'drawerMutate',
      'identityMutate',
      'menuFilterMutate',
      'sortWayMutate',
      'tabMutate'
    ])
  },

  computed: {
    cartItems () {
      return this.$store.state.cartItems;
    },

    drawer: {
      get () {
        return this.$store.state.drawer;
      },

      set (val) {
        this.drawerMutate(val);
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

    userSetting: {
      get () {
        return this.$store.state.userSetting;
      },

      set (val) {
        this.$store.commit('userSettingMutate', val);
      }
    },

    menuFilter: {
      get () {
        return this.$t(this.$store.state.menuFilter.value);
      },

      set (val) {
        this.menuFilterMutate(val);
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

      set (val) {
        this.tabMutate(val);
      }
    },

    windowWith () {
      return this.$q.screen.lt.sm;
    }
  },

  created () {
    if (!this.$q.localStorage.isEmpty()) {
      const cartCache = this.$q.localStorage.getAll();
      for (let i of cartCache.cache) {
        this.cartMutate({ type: 'add', value: i });
      }
    }
  },

  watch: {
    cartItems (val) {
      this.$q.localStorage.clear();
      this.$q.localStorage.set('cache', val);
    },

    windowWith (val) {
      if (!val) {
        this.menuFilterMutate('');
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
</style>
