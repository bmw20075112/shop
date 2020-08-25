<template>
  <q-card>
    <q-tabs
      v-model="mode"
      :active-color="$q.dark.isActive? 'white': 'primary'"
      :active-bg-color="$q.dark.isActive? 'bg-blue-grey-9': 'white'"
      :class="$q.dark.isActive? 'bg-blue-grey-9': 'bg-white'"
      :indicator-color="$q.dark.isActive? 'white': 'primary'"
    >
      <q-tab
        name="login"
        icon="login"
        :label="$t('login')"
      />
      <q-tab
        name="signUp"
        icon="account_circle"
        :label="$t('signUp')"
      />
    </q-tabs>

    <q-tab-panels
      v-model="mode"
      animated
      infinite
      swipeable
    >
      <q-tab-panel name="login">
        <div class="text-h6">
          Login
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel
        name="signUp"
        :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
      >
        <q-form
          class="q-gutter-sm"
        >
          <q-input
            autocomplete="username"
            autofocus
            filled
            lazy-rules
            placeholder="Jack"
            v-model="userID"
            :color="$q.dark.isActive? 'orange': 'primary'"
            :label="$t('userID')"
            :rules="[ val => val && val.length > 0 || $t('userNo')]"
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon
                  class="cursor-pointer"
                  name="close"
                  size="sm"
                  @click="userID=''"
                />
              </q-avatar>
            </template>
          </q-input>

          <q-input
            autocomplete="email"
            filled
            lazy-rules
            placeholder="a@gmail.com"
            type="email"
            v-model="emailSignUp"
            :color="$q.dark.isActive? 'orange': 'primary'"
            :label="$t('email')"
            :rules="[ val => val && val.length > 0 || $t('emailNo'),
                      val => /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(val) || $t('emailAlert')
            ]"
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon
                  class="cursor-pointer"
                  name="close"
                  size="sm"
                  @click="emailSignUp=''"
                />
              </q-avatar>
            </template>
          </q-input>

          <q-input
            filled
            lazy-rules
            :color="$q.dark.isActive? 'orange': 'primary'"
            :label="$t('password')"
            :rules="[
              val => val.length>=8 && val.length<=30 || $t('passwordLength'),
              val => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/.test(val) || $t('passwordMix'),
            ]"
            :type="visible?'text':'password'"
            v-model="password"
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon
                  class="cursor-pointer"
                  size="sm"
                  :name="visible?'visibility':'visibility_off'"
                  @click="visible=!visible"
                />
              </q-avatar>
            </template>
          </q-input>

          <q-input
            filled
            lazy-rules
            :color="$q.dark.isActive? 'orange': 'primary'"
            :type="visible?'text':'password'"
            :label="$t('passwordRe')"
            :rules="[
              val=> val===password || $t('password2Alert')
            ]"
            v-model="passwordRe"
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon
                  class="cursor-pointer"
                  size="sm"
                  :name="visible?'visibility':'visibility_off'"
                  @click="visible=!visible"
                />
              </q-avatar>
            </template>
          </q-input>

          <q-checkbox
            color="orange"
            class="no-margin"
            label="I understand all product is fake."
            v-model="agree"
          />
        </q-form>
      </q-tab-panel>
    </q-tab-panels>
    <!-- <q-btn-toggle
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
    /> -->

    <!-- <q-card-section
      class="row items-center"
      :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
    >

    </q-card-section> -->

    <q-card-actions
      align="right"
      :class="$q.dark.isActive? 'bg-blue-grey-9': 'bg-white'"
    >
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
      agree: false,
      mode: 'login',
      emailSignUp: '',
      password: '',
      passwordRe: '',
      userID: '',
      visible: false
    }
  }
}
</script>

<style lang='scss'>

</style>
