<template>
  <q-card>
    <!-- card header -->
    <q-tabs
      :active-color="$q.dark.isActive? 'white': 'primary'"
      :active-bg-color="$q.dark.isActive? 'blue-grey-9': 'grey-3'"
      :class="$q.dark.isActive? 'bg-blue-grey-9': 'bg-grey-3'"
      :indicator-color="$q.dark.isActive? 'white': 'primary'"
      v-model="mode"
    >
      <q-tab
        icon="login"
        name="login"
        :label="$t('login')"
      />
      <q-tab
        icon="account_circle"
        name="signUp"
        :label="$t('signUp')"
      />
    </q-tabs>

    <!-- card body -->
    <q-card-section
      class="scroll"
      :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
      :style="cardBodyHeight"
    >
      <q-tab-panels
        infinite
        swipeable
        v-model="mode"
      >
        <!-- login panel -->
        <q-tab-panel
          name="login"
          :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
        >
          <q-form :class="$q.screen.height>1024?'q-gutter-md':'q-gutter-xs'">
            <!-- login email input -->
            <span ref="emailLoginTo" />
            <q-input
              filled
              lazy-rules
              autocomplete="email"
              ref="emailLogin"
              type="email"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :label="$t('email')"
              :rules="[val => val && val.length>0]"
              v-model="emailLogin"
              @focus="mobileToTop('emailLogin')"
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
            <span ref="passwordLoginTo" />
            <q-input
              filled
              lazy-rules
              autocomplete="current-password"
              ref="passwordLogin"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :label="$t('password')"
              :rules="[
                val => val && val.length>0
              ]"
              :type="visibleLogin?'text':'password'"
              v-model="passwordLogin"
              @focus="mobileToTop('passwordLogin')"
              @keyup.enter.prevent="submit()"
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

            <!-- Remember me -->
            <q-checkbox
              class="no-margin"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :label="$t('rememberMe')"
              v-model="rememberMe"
            />
          </q-form>
        </q-tab-panel>

        <!-- signUp panel -->
        <q-tab-panel
          name="signUp"
          :class="$q.dark.isActive? 'bg-blue-grey-10': 'bg-white'"
        >
          <q-form :class="$q.screen.height>1024?'q-gutter-md':'q-gutter-xs'">
            <!-- username input -->
            <span ref="userNameSignUpTo" />
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
              @focus="mobileToTop('userNameSignUp')"
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
            <span ref="emailSignUpTo" />
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
              @focus="mobileToTop('emailSignUp')"
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
            <span ref="passwordSignUpTo" />
            <q-input
              filled
              lazy-rules
              autocomplete="new-password"
              ref="passwordSignUp"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :label="$t('password')"
              :rules="[
                val => val.length>=8 && val.length<=30 || $t('passwordLength'),
                val => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/.test(val) || $t('passwordMix'),
              ]"
              :type="visibleLogin?'text':'password'"
              v-model="passwordSignUp"
              @focus="mobileToTop('passwordSignUp')"
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
            <span ref="passwordReTo" />
            <q-input
              filled
              lazy-rules
              autocomplete="new-password"
              ref="passwordRe"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :type="visibleLogin?'text':'password'"
              :label="$t('passwordRe')"
              :rules="[
                val=> val===passwordSignUp || $t('password2Alert')
              ]"
              v-model="passwordRe"
              @focus="mobileToTop('passwordRe')"
              @keyup.enter.prevent="submit()"
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
              ref="agreeLicense"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :label="$t('license')"
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
        :color="$q.dark.isActive?'primary':'primary'"
        :label="mode==='login'?$t('login'):$t('signUp')"
        :loading="loading"
        @click="submit()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import firebase from 'firebase/app';
import { auth, db } from '../../api/firebase/firebase.js';
export default {
  data () {
    return {
      agree: false,
      emailLogin: '',
      emailSignUp: '',
      loading: false,
      mode: 'login',
      passwordSignUp: '',
      passwordLogin: '',
      passwordRe: '',
      rememberMe: false,
      userName: '',
      visibleLogin: false,
      visibleSignUp: false
    }
  },

  computed: {
    cardBodyHeight () {
      if (this.$q.screen.height > 1024) {
        return 'min-height:50vh';
      } else if (this.$q.screen.height <= 1024 && this.$q.screen.height > 812) {
        return 'min-height:60vh';
      } else {
        return 'max-height:55vh';
      }
    }
  },

  methods: {
    mobileToTop (target) {
      console.log(this.$refs[target + 'To']);
      // window.HTMLElement[target].scrollIntoView({ block: 'end' });
      this.$refs[target + 'To'].scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    catchError (err) {
      this.loading = false;
      this.$q.notify({
        color: 'negative',
        message: err.message
      })
    },

    checkEmailUnique (val) { // Check if email duplicate
      return new Promise((resolve, reject) => {
        if (val.length === 0) {
          resolve(true);
        } else {
          auth.fetchSignInMethodsForEmail(this.emailSignUp) // if length>0 means email already registered
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

    login () {
      auth.signInWithEmailAndPassword(this.emailLogin, this.passwordLogin)
        .then(cred => {
          this.$store.commit('userSettingMutate', false);
          this.$store.commit('identityMutate', false);
          this.loading = false;
          setTimeout(() => { // Open userSetting again to refresh container's width
            this.$store.commit('userSettingMutate', true);
          }, 800)
        })
        .catch(err => { // Other error message comes from Auth (No i18n)
          this.loading = false;
          this.$q.notify({
            color: 'negative',
            message: err.message
          })
        })
    },

    submit () { // Validate login and signUp input
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
        } else if (!this.agree) { // Forget agree
          this.$q.notify({
            color: 'negative',
            message: this.$t('agreeAlert')
          })
        } else {
          this.loading = true;
          this.$store.commit('userSettingMutate', false);
          auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
              return auth.createUserWithEmailAndPassword(this.emailSignUp, this.passwordRe)
                .then(cred => {
                  db.collection('users').doc(cred.user.uid).set({
                    name: this.userName,
                    accounts: 2000,
                    history: []
                  })
                    .then(() => {
                      this.$store.commit('userGet', { // Pass user info to vuex
                        name: this.userName,
                        accounts: 2000,
                        history: []
                      });
                      this.$store.commit('identityMutate', false);
                      this.loading = false;
                      setTimeout(() => { // Open userSetting again to refresh container's width
                        this.$store.commit('userSettingMutate', true);
                      }, 800)
                    })
                })
                .catch(err => { // Other error message comes from Auth (No i18n)
                  this.loading = false;
                  this.catchError(err);
                })
            })
        }
      } else if (this.mode === 'login') {
        this.$refs.emailLogin.validate();
        this.$refs.passwordLogin.validate();
        if (this.$refs.emailLogin.hasError || this.$refs.passwordLogin.hasError) {
          this.formHasError = true;
        } else {
          this.loading = true;
          if (!this.rememberMe) {
            auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
              .then(() => this.login())
              .catch(err => this.catchError(err));
          } else {
            auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
              .then(() => this.login())
              .catch(err => this.catchError(err));
          }
        }
      }
    }
  }
}
</script>
