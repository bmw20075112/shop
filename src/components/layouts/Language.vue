<template>
  <q-toggle
    v-model="lang"
    label="English"
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
