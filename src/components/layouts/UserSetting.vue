<template>
  <div>
    <div
      class="column no-wrap q-pa-md"
      style="max-width:300px"
      :class="$q.dark.isActive? 'bg-blue-grey-9': 'bg-white'"
    >
      <div
        class="row items-center justify-center no-wrap"
      >
        <q-icon
          color="grey"
          name="account_circle"
          size="96px"
          v-if="!isLogin"
        />
        <q-avatar
          v-else
          size="96px"
        >
          <img src="https://res.cloudinary.com/barney4760/image/upload/v1598855232/Home/avatar_v9hmip.jpg">
        </q-avatar>

        <div
          class="column q-ml-md text-bold"
          v-if="isLogin"
        >
          <div class="no-wrap text-subtitle2">
            {{ isLoginName }}
          </div>

          <div class="column">
            <div class="text-primary q-pt-sm">
              {{ $t('accounts') }}
            </div>

            <div>${{ accounts }}</div>
          </div>
        </div>
      </div>

      <q-btn
        class="q-mt-sm"
        color="primary"
        icon="login"
        :label="$t('login')"
        v-if="!isLogin"
        @click="login()"
      />

      <q-btn
        class="q-mt-sm"
        color="primary"
        icon="logout"
        :label="$t('logout')"
        v-if="isLogin"
        @click="logout()"
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

    <q-dialog v-model="identityDialog">
      <Identity />
    </q-dialog>
  </div>
</template>

<script>
import { auth } from '../../api/firebase/firebase.js';
import { mapState } from 'vuex';
import Identity from './Identity.vue';
import DarkMode from './DarkMode.vue';
import Language from './Language.vue';
export default {
  components: {
    DarkMode,
    Identity,
    Language
  },

  computed: {
    ...mapState([
      'isLogin',
      'userInfo'
    ]),

    accounts () {
      return this.$store.getters.accounts;
    },

    identityDialog: {
      get () {
        return this.$store.state.identityDialog;
      },

      set (val) {
        this.$store.commit('identityMutate', val);
      }
    },

    isLoginName () { // 沒登入時放假資料
      if (this.isLogin) {
        return this.userInfo.name;
      } else {
        return this.$t('fakeName')
      }
    }
  },

  methods: {
    login () {
      this.identityDialog = true;
    },

    logout () {
      this.$store.commit('userSettingMutate', false);
      this.$store.commit('orderSuccessGet', []);
      this.$store.commit('historyMutate', false);
      this.$store.commit('unsubscribe');
      auth.signOut();
      this.$store.commit('userGet', {});
      if (this.$route.name === 'Checkout') {
        this.$router.push({ name: 'Menu' });
      } else {
        setTimeout(() => {
          this.$store.commit('userSettingMutate', true);
        }, 1000)
      }
    }
  }
}
</script>

<style>

</style>
