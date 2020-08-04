<template>
  <q-page>
    <div ref="top" />
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

    <q-page-scroller
      position="bottom-right"
      :scroll-offset="200"
      :offset="[15, 15]"
    >
      <q-btn
        fab
        glossy
        icon="keyboard_arrow_up"
        color="orange"
        @click="scrollTop()"
      />
    </q-page-scroller>
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
  },

  methods: {
    scrollTop () {
      this.$refs.top.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
}
</script>

<style>

</style>
