<template>
  <q-page>
    <div ref="top" />
    <q-tab-panels
      animated
      transition-prev='fade'
      transition-next='fade'
      v-model="tab"
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
      :offset="[15, 15]"
      :scroll-offset="200"
    >
      <q-btn
        fab
        glossy
        color="orange"
        icon="keyboard_arrow_up"
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
    menuFilter () {
      return this.$store.state.menuFilter;
    },

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
    scrollTop (smooth = true) {
      if (smooth) {
        this.$refs.top.scrollIntoView({ behavior: 'smooth', block: 'end' })
      } else {
        this.$refs.top.scrollIntoView({ block: 'end' })
      }
    }
  },

  watch: {
    menuFilter (val) {
      this.scrollTop(false);
    },

    tab (val) {
      setTimeout(() => {
        this.scrollTop(false);
      }, 150)
    }
  }
}
</script>
