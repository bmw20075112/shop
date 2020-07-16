<template>
  <!-- ...... -->
  <q-toggle
    v-model="lang"
    :label="lang"
    true-value="English"
    false-value="中文"
  />
  <!-- ...... -->
</template>

<script>
export default {
  data () {
    return {
      lang: '中文'
    }
  },

  watch: {
    lang (lang) {
      if (lang === '中文') {
        this.$i18n.locale = 'zh-tw';
      } else if (lang === 'English') {
        this.$i18n.locale = 'en-us';
      }
    }
  }
}
</script>
