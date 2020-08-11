<template>
  <q-layout
    view="hHh lpr fff"
  >
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar @click="$router.go()">
            <img
              src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
              class="cursor-pointer"
            >
          </q-avatar>
          <span
            class="cursor-pointer q-pl-sm"
            @click="$router.go()"
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
import Menu from '../components/layouts/Menu.vue';
import Footer from '../components/layouts/Footer.vue'
export default {
  components: {
    Menu,
    Footer
  },
  data () {
    return {
      right: false
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
