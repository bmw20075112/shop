<template>
  <q-layout view="hHh lpR fff">
    <q-header
      reveal
      elevated
      class="bg-primary text-white"
      height-hint="98"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn
          icon="account_box"
        >
          <q-menu fit>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">
                  Settings
                </div>

                <Language />

                <q-toggle
                  v-model="dark"
                  :label="dark"
                  true-value="Dark"
                  false-value="Light"
                />
                <div
                  class="empty"
                  style="width:150px"
                />
              </div>

              <q-separator
                vertical
                inset
                class="q-mx-lg"
              />

              <div
                class="column items-center"
                style="width:100px"
              >
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  John Doe
                </div>

                <q-btn
                  color="primary"
                  :label="$t('logout')"
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>

        <q-btn
          class="lt-md"
          dense
          flat
          round
          icon="menu"
          @click="right = !right"
        />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab
          to="/page1"
          label="Page One"
        />
        <q-route-tab
          to="/page2"
          label="Page Two"
        />
        <q-route-tab
          to="/page3"
          label="Page Three"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="right"
      side="right"
      bordered
      :breakpoint="768"
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <p>{{ $i18n.locale }}</p>
      <p>{{ $t('success') }}</p>
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
import Language from '../components/Language.vue'
export default {
  components: {
    Language
  },
  data () {
    return {
      right: false,
      dark: 'Light'
    }
  }
}
</script>
