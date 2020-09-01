<template>
  <q-layout view="hHh lpr fff">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar @click="routeCheckout?$router.push('/'):$router.go()">
            <img
              alt="logo"
              class="cursor-pointer"
              src="~assets/logo.svg"
            >
          </q-avatar>

          <span
            class="cursor-pointer text-bold q-pl-sm"
            @click="routeCheckout?$router.push('/'):$router.go()"
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
import UserSetting from '../components/layouts/UserSetting.vue';
export default {
  components: {
    Footer,
    UserSetting
  },
  data () {
    return {
      right: false
    }
  },

  computed: {
    userSetting: {
      get () {
        return this.$store.state.userSetting;
      },

      set (val) {
        this.$store.commit('userSettingMutate', val);
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
