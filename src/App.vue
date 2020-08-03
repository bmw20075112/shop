<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$q.screen.setSizes({ sm: 481, md: 769, lg: 1025, xl: 1921 });
  }
}
</script>
