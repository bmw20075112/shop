<template>
  <q-card>
    <!-- <q-card-section class="text-center text-h6 text-bold">
      {{ $t('identityVerify') }}
    </q-card-section> -->

    <q-btn-toggle
      push
      spread
      stretch
      size="lg"
      class="my-custom-toggle"
      text-color="primary"
      toggle-color="primary"

      v-model="loginMode"

      :options="[
        {label: $t('login'), value: true},
        {label: $t('signUp'), value: false}
      ]"
    />
    <q-card-section class="row items-center">
      <q-form
        class="q-gutter-sm"
      >
        <q-input
          filled
          lazy-rules
          type="email"
          v-model="email"
          :label="$t('email')"
          :rules="[ val => val && val.length > 0 || $t('emailNo'),
                    val=> /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(val) || $t('emailAlert')
          ]"
        />

        <q-input
          filled
          lazy-rules
          type="password"
          v-model="password"
          :label="$t('password')"
          :rules="[
            val=> /^(?=.*\d)(?=.*[a-zA-Z]).{8,30}$/.test(val) || $t('passwordAlert')
          ]"
        />
      </q-form>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        flat
        label="Cancel"
        color="primary"
        v-close-popup
      />
      <q-btn
        flat
        label="Turn on Wifi"
        color="primary"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      loginMode: true,
      email: '',
      password: ''
    }
  }
}
</script>

<style lang='scss'>
.my-custom-toggle{
  border: 1px solid $primary;
}
</style>
