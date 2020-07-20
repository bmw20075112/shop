<template>
  <q-toggle
    v-model="lang"
    :label="langLabel"
    icon="translate"
    true-value="en-us"
    false-value="zh-tw"
  />
</template>

<script>
export default {
  data () {
    return {
      lang: this.$i18n.locale
    }
  },

  computed: {
    langLabel () {
      if (this.lang === 'zh-tw') {
        this.$q.cookies.remove('isTranslate');
        return '中文';
      } else if (this.lang === 'en-us') {
        this.$q.cookies.set('isTranslate', true);
        return 'English';
      }
      return null;
    }
  },

  watch: {
    lang (lang) {
      this.$i18n.locale = lang;
    }
  }
}
</script>
