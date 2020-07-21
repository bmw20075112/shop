<template>
  <q-layout
    view="hHh lpR fff"
    container
    style="height:100vh"
  >
    <q-header
      reveal
      class="bg-brown-5"
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
          :icon="menuIcon"
          :label="$q.screen.gt.sm? $t('user') : '' "
          class="q-py-sm"
          @click="right = !right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="right"
      side="right"
      bordered
      :breakpoint="768"
      overlay
    >
      <Menu />
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
      right: false
    }
  },

  computed: {
    menuIcon () {
      if (this.$q.screen.gt.sm) {
        return 'account_box';
      } else {
        return 'menu';
      }
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
