<template>
  <q-card>
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
              autofocus
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

            <q-input
              filled
              lazy-rules
              debounce="500"
              autocomplete="email"
              placeholder="a@gmail.com"
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
              :type="visible?'text':'password'"
              v-model="password"
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>

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
              ref="passwordReSignUp"
              :color="$q.dark.isActive? 'orange': 'primary'"
              :type="visible?'text':'password'"
              :label="$t('passwordRe')"
              :rules="[
                val=> val===password || $t('password2Alert')
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
                    :name="visible?'visibility':'visibility_off'"
                    @click="visible=!visible"
                  />
                </q-avatar>
              </template>
            </q-input>

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
import firebase from 'firebase';
import db from '../../api/firebase/firebase';
export default {
  data () {
    return {
      agree: false,
      mode: 'login',
      emailSignUp: '',
      password: '',
      passwordRe: '',
      res: 0,
      userName: '',
      visible: false
    }
  },

  methods: {
    checkEmailUnique(val){
      return new Promise((resolve,reject)=>{
        if(val.length===0){
          resolve(true);
        }else{
          firebase.auth().fetchSignInMethodsForEmail(this.emailSignUp)
          .then(data=>{
            if(data.length===0){
              resolve(true);
            }else{
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
        this.$refs.passwordReSignUp.validate();
        if (this.$refs.userNameSignUp.hasError ||
            this.$refs.emailSignUp.hasError ||
            this.$refs.passwordSignUp.hasError ||
            this.$refs.passwordReSignUp.hasError) {
          this.formHasError = true;
        } else if (!this.agree) {
        this.$q.notify({
          color: 'negative',
          message: this.$t('agreeAlert')
        })
        this.$store.commit('identityMutate', false);
      } else {
          firebase.auth().createUserWithEmailAndPassword(this.emailSignUp, this.password)
            .then(cred => {
              this.$store.commit('identityMutate', false);
            })
            .catch(err=>{
              this.$q.notify({
                color: 'negative',
                message: err.message
              })
            })
        }
      }
    }
  }
}
</script>

<style lang='scss'>

</style>
