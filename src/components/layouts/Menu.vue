<template>
  <div>
    <div
      class="column no-wrap q-pa-md"
      style="max-width:300px"
    >
      <div class="row justify-center items-center">
        <q-avatar
          size="96px"
        >
          <img src="https://cdn.quasar.dev/img/avatar4.jpg">
        </q-avatar>

        <div class="column q-ml-md text-bold">
          <div class="text-subtitle1">
            John Doe
          </div>

          <div class="column">
            <div class=" text-primary q-pt-sm">
              {{ $t('accounts') }}
            </div>
            <div class="text-subtitle1">
              $30000
            </div>
          </div>
        </div>
      </div>

      <q-btn
        class="q-mt-sm"
        color="primary"
        :label="$t('logout')"
        push
        size="sm"
        v-close-popup
      />

      <q-separator
        class="q-my-md"
      />

      <div class="column q-pl-md">
        <div class="text-h6 q-mb-md">
          {{ $t('settings') }}
        </div>

        <Language />
        <DarkMode />
      </div>
    </div>
  </div>
</template>

<script>
import Language from './Language.vue';
import DarkMode from './DarkMode.vue';
export default {
  components: {
    Language,
    DarkMode
  }
}
</script>

<style>

</style>
