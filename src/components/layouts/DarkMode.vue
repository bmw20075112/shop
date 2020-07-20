<template>
  <q-toggle
    v-model="dark"
    :label="darkLabel"
    :icon="$q.dark.isActive? 'nights_stay' : 'wb_sunny'"
  />
</template>

<script>
export default {
  data () {
    return {
      dark: this.$q.dark.isActive
    }
  },
  computed: {
    darkLabel () {
      if (this.$q.dark.isActive) {
        return this.$t('dark');
      } else {
        return this.$t('light');
      }
    }
  },

  watch: {
    dark (val) {
      if (val) {
        this.$q.dark.set(true);
        this.$q.cookies.set('isDark', true);
      } else {
        this.$q.dark.set(false);
        this.$q.cookies.remove('isDark');
      }
    }
  }
}
</script>

<style>

</style>
