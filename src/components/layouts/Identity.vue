<template>
  <q-card>
    <!-- card header -->
    <q-tabs
      v-model="mode"
      :active-color="$q.dark.isActive? 'white': 'primary'"
      :active-bg-color="$q.dark.isActive? 'blue-grey-9': 'grey-3'"
      :class="$q.dark.isActive? 'bg-blue-grey-9': 'bg-grey-3'"
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

    <!-- card body -->
    <q-card-section
      style="max-height:50vh"
      class="scroll"
      :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
    >
      <q-tab-panels
        v-model="mode"
        animated
        infinite
        swipeable
      >
        <!-- login panel -->
        <q-tab-panel
          name="login"
          :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
        >
          <q-form class="q-gutter-md">
            <!-- login email input -->
            <q-input
              autocomplete="email"
              filled
              lazy-rules
              ref="emailLogin"
              type="email"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :label="$t('email')"
              :rules="[val => val && val.length>0]"
              v-model="emailLogin"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>

              <template v-slot:append>
                <q-avatar>
                  <q-icon
                    class="cursor-pointer"
                    name="close"
                    size="sm"
                    @click="emailLogin=''"
                  />
                </q-avatar>
              </template>
            </q-input>

            <!-- login password input -->
            <q-input
              filled
              lazy-rules
              ref="passwordLogin"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :label="$t('password')"
              :rules="[
                val => val && val.length>0
              ]"
              :type="visibleLogin?'text':'password'"
              v-model="passwordLogin"
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>

              <template v-slot:append>
                <q-avatar>
                  <q-icon
                    class="cursor-pointer"
                    size="sm"
                    :name="visibleSignUp?'visibility':'visibility_off'"
                    @click="visibleSignUp=!visibleSignUp"
                  />
                </q-avatar>
              </template>
            </q-input>
          </q-form>
        </q-tab-panel>

        <!-- signUp panel -->
        <q-tab-panel
          name="signUp"
          :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
        >
          <q-form class="q-gutter-sm">
            <!-- username input -->
            <q-input
              filled
              lazy-rules
              autocomplete="username"
              placeholder="Jack"
              ref="userNameSignUp"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :label="$t('userName')"
              :rules="[
                val => val && val.length > 0 || $t('userNo'),
                val => val.length<=12 || $t('userLength')
              ]"
              v-model="userName"
            >
              <template v-slot:prepend>
                <q-icon name="account_box" />
              </template>

              <template v-slot:append>
                <q-avatar>
                  <q-icon
                    class="cursor-pointer"
                    name="close"
                    size="sm"
                    @click="userName=''"
                  />
                </q-avatar>
              </template>
            </q-input>

            <!-- signup email input -->
            <q-input
              filled
              lazy-rules
              debounce="500"
              autocomplete="email"
              ref="emailSignUp"
              type="email"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :label="$t('email')"
              :rules="[
                val => val && val.length > 0 || $t('emailNo'),
                val => /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(val) || $t('emailAlert'),
                checkEmailUnique
              ]"
              v-model="emailSignUp"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>

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

            <!-- signup password input -->
            <q-input
              filled
              lazy-rules
              ref="passwordSignUp"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :label="$t('password')"
              :rules="[
                val => val.length>=8 && val.length<=30 || $t('passwordLength'),
                val => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/.test(val) || $t('passwordMix'),
              ]"
              :type="visibleLogin?'text':'password'"
              v-model="passwordSignUp"
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>

              <template v-slot:append>
                <q-avatar>
                  <q-icon
                    class="cursor-pointer"
                    size="sm"
                    :name="visibleLogin?'visibility':'visibility_off'"
                    @click="visibleLogin=!visibleLogin"
                  />
                </q-avatar>
              </template>
            </q-input>

            <!-- passwordRepeat input -->
            <q-input
              filled
              lazy-rules
              ref="passwordRe"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :type="visibleLogin?'text':'password'"
              :label="$t('passwordRe')"
              :rules="[
                val=> val===passwordSignUp || $t('password2Alert')
              ]"
              v-model="passwordRe"
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>

              <template v-slot:append>
                <q-avatar>
                  <q-icon
                    class="cursor-pointer"
                    size="sm"
                    :name="visibleLogin?'visibility':'visibility_off'"
                    @click="visibleLogin=!visibleLogin"
                  />
                </q-avatar>
              </template>
            </q-input>

            <!-- checkbox -->
            <q-checkbox
              class="no-margin"
              :label="$t('license')"
              ref="agreeLicense"
              :color="$q.dark.isActive? 'orange': 'primary'"
              v-model="agree"
            />
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>

    <!-- card footer -->
    <q-card-actions
      align="right"
      :class="$q.dark.isActive? 'bg-blue-grey-9': 'bg-grey-3'"
    >
      <q-btn
        flat
        :color="$q.dark.isActive?'white':'primary'"
        :label="$t('cancel')"
        v-close-popup
      />
      <q-btn
        :color="$q.dark.isActive?'orange':'primary'"
        :label="mode==='login'?$t('login'):$t('signUp')"
        @click="submit()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import firebase from 'firebase/app';
import db from '../../api/firebase/firebase';
export default {
  data () {
    return {
      agree: false,
      mode: 'login',
      emailLogin: '',
      emailSignUp: '',
      loading: false,
      passwordSignUp: '',
      passwordLogin: '',
      passwordRe: '',
      res: 0,
      userName: '',
      visibleLogin: false,
      visibleSignUp: false
    }
  },

  computed: {
    moneyLeft () {
      return this.$store.state.moneyLeft;
    }
  },

  methods: {
    checkEmailUnique (val) {
      return new Promise((resolve, reject) => {
        if (val.length === 0) {
          resolve(true);
        } else {
          firebase.auth().fetchSignInMethodsForEmail(this.emailSignUp)
            .then(data => {
              if (data.length === 0) {
                resolve(true);
              } else {
                resolve(this.$t('emailDuplicate'));
              }
            });
        }
      })
    },

    submit () {
      if (this.mode === 'signUp') {
        this.$refs.userNameSignUp.validate();
        this.$refs.emailSignUp.validate();
        this.$refs.passwordSignUp.validate();
        this.$refs.passwordRe.validate();
        if (this.$refs.userNameSignUp.hasError ||
            this.$refs.emailSignUp.hasError ||
            this.$refs.passwordSignUp.hasError ||
            this.$refs.passwordRe.hasError) {
          this.formHasError = true;
        } else if (!this.agree) {
          this.$q.notify({
            color: 'negative',
            message: this.$t('agreeAlert')
          })
        } else {
          firebase.auth().createUserWithEmailAndPassword(this.emailSignUp, this.passwordRe)
            .then(cred => {
              db.collection('users').doc(cred.user.uid).set({
                name: this.userName,
                account: this.moneyLeft,
                history: []
              })
                .then(() => this.$store.commit('identityMutate', false))
            })
            .catch(err => {
              this.$q.notify({
                color: 'negative',
                message: err.message
              })
            })
        }
      } else if (this.mode === 'login') {
        this.$refs.emailLogin.validate();
        this.$refs.passwordLogin.validate();
        if (this.$refs.emailLogin.hasError || this.$refs.passwordLogin.hasError) {
          this.formHasError = true;
        } else {
          firebase.auth().signInWithEmailAndPassword(this.emailLogin, this.passwordLogin)
            .then(cred => {
              this.$store.commit('identityMutate', false);
            })
            .catch(err => {
              this.$q.notify({
                color: 'negative',
                message: err.message
              })
            })
        }
      }
    }
  },

  beforeDestroy () {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  }
}
</script>

<style lang='scss'>

</style>
