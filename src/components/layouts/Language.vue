<template>
  <q-toggle
    icon="translate"
    false-value="zh-tw"
    label="English"
    true-value="en-us"
    v-model="lang"
  />
</template>

<script>
export default {
  data () {
    return {
      lang: this.$i18n.locale
    }
  },

  watch: {
    lang (lang) {
      this.$i18n.locale = lang;
      if (lang === 'zh-tw') {
        this.$i18n.locale = 'zh-tw';
        this.$q.cookies.remove('isTranslate');
      } else if (lang === 'en-us') {
        this.$i18n.locale = 'en-us';
        this.$q.cookies.set('isTranslate', true, { expires: 30, sameSite: 'Lax' });
      }
    }
  }
}
</script>
