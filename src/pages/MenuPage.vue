<template>
  <q-page>
    <q-tab-panels
      v-model="tab"
      animated
      transition-prev='fade'
      transition-next='fade'
    >
      <q-tab-panel name="east">
        <TabPanelPage />
      </q-tab-panel>
      <q-tab-panel name="west">
        <TabPanelPage />
      </q-tab-panel>
      <q-tab-panel name="drinks">
        <TabPanelPage />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import TabPanelPage from '../components/pages/TabPanelPage.vue'
export default {
  components: {
    TabPanelPage
  },

  computed: {
    tab: {
      get () {
        return this.$store.state.tab;
      },

      set (value) {
        this.$store.commit('tabMutate', value)
      }
    }
  }
}
</script>

<style>

</style>
