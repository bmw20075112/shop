<template>
  <q-layout
    view="hHh lpR fff"
  >
    <q-header
      reveal
      elevated
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          PandaEat
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
