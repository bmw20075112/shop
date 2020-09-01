<template>
  <q-toggle
    :icon="$q.dark.isActive? 'nights_stay' : 'wb_sunny'"
    :label="$t('dark')"
    v-model="dark"
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
        this.$q.cookies.set('isDark', true, { expires: 30, sameSite: 'Lax' });
      } else {
        this.$q.dark.set(false);
        this.$q.cookies.remove('isDark');
      }
    }
  }
}
</script>
