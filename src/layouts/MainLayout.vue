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
              alt="logo"
            >
          </q-avatar>
          <span
            class="cursor-pointer q-pl-sm"
            @click="$router.go()"
          >PandaEat</span>
        </q-toolbar-title>

        <q-btn
          flat
          icon="warning"
          @click="identity=true"
        />

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
      <q-dialog v-model="identity">
        <Identity />
      </q-dialog>
    </q-page-container>

    <q-footer>
      <Footer />
    </q-footer>
  </q-layout>
</template>

<script>
import Footer from '../components/layouts/Footer.vue';
import Identity from '../components/layouts/Identity.vue';
import Menu from '../components/layouts/Menu.vue';
export default {
  components: {
    Footer,
    Identity,
    Menu
  },
  data () {
    return {
      identity: false,
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
