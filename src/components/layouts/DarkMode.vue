<template>
  <q-toggle
    v-model="dark"
    :label="$t('dark')"
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

  watch: {
    dark (val) {
      if (val) {
        this.$q.dark.set(true);
        this.$q.cookies.set('isDark', true, { expires: 7, sameSite: 'Lax' });
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
