<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { auth } from './api/firebase/firebase.js'
export default {
  name: 'App',
  computed: {
    cartItems () {
      return this.$store.state.cartItems;
    }
  },

  created () {
    this.$q.screen.setSizes({ sm: 481, md: 769, lg: 1025, xl: 1921 });

    if (this.$q.cookies.has('isTranslate')) {
      this.$i18n.locale = 'en-us';
    } else {
      if (navigator.language === 'zh-TW') {
        this.$i18n.locale = 'zh-tw';
      } else {
        this.$i18n.locale = 'en-us';
        this.$q.cookies.set('isTranslate', true, { expires: 30, sameSite: 'Lax' });
      }
    }

    if (this.$q.cookies.has('isDark')) {
      this.$q.dark.set(true);
    } else {
      this.$q.dark.set(false);
    }

    if (!this.$q.localStorage.isEmpty()) {
      const cartCache = this.$q.localStorage.getAll();
      for (let i of cartCache.cache) {
        this.$store.commit('cartMutate', { type: 'add', value: i });
      }
    }

    auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('userGet');
        this.$store.commit('isLoginMutate', true);
      } else {
        this.$store.commit('isLoginMutate', false);
      }
    });
  },

  watch: {
    cartItems (val) {
      this.$q.localStorage.clear();
      this.$q.localStorage.set('cache', val);
    }
  }
}
</script>
