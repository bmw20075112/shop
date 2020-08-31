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
          icon="account_box"
          :label="$q.screen.lt.md? '' : $t('user') "
          class="q-py-sm"
        >
          <q-menu v-model="menuOpen">
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
import Menu from '../components/layouts/Menu.vue';
import MenuLayoutDrawer from '../components/layouts/MenuLayoutDrawer.vue';
export default {
  components: {
    Footer,
    Menu,
    MenuLayoutDrawer
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

    menuOpen: {
      get () {
        return this.$store.state.menuOpen;
      },

      set (val) {
        this.$store.commit('menuOpenMutate', val);
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

  watch: {
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
