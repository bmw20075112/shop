<template>
  <q-layout
    view="hHh lpr fff"
  >
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar @click="routeCheckout?$router.push('/'):$router.go()">
            <img
              src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
              class="cursor-pointer"
              alt="logo"
            >
          </q-avatar>
          <span
            class="cursor-pointer text-bold q-pl-sm"
            @click="routeCheckout?$router.push('/'):$router.go()"
          >PandaEat</span>
        </q-toolbar-title>

        <q-btn
          flat
          icon="account_box"
          :label="$q.screen.lt.md? '' : $t('user') "
          class="q-py-sm"
        >
          <q-menu v-model="menu">
            <Menu />
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <Footer />
    </q-footer>
  </q-layout>
</template>

<script>
import Footer from '../components/layouts/Footer.vue';
import Menu from '../components/layouts/Menu.vue';
export default {
  components: {
    Footer,
    Menu
  },
  data () {
    return {
      right: false
    }
  },

  computed: {
    menu: {
      get () {
        return this.$store.state.menuOpen;
      },

      set (val) {
        this.$store.commit('menuOpenMutate', val);
      }
    },

    routeCheckout () {
      if (this.$route.name === 'Checkout') {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>
