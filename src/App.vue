<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$q.screen.setSizes({ sm: 480, md: 768, lg: 1024, xl: 1920 });
  }
}
</script>
