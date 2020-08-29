<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { auth } from './api/firebase/firebase.js'
export default {
  name: 'App',
  created () {
    this.$q.screen.setSizes({ sm: 481, md: 769, lg: 1025, xl: 1921 });
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('userGet');
        this.$store.commit('isLoginMutate', true);
      } else {
        this.$store.commit('isLoginMutate', false);
      }
    })
  }
}
</script>
