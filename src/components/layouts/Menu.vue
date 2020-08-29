<template>
  <div>
    <div
      class="column no-wrap q-pa-md"
      style="max-width:300px"
      :class="$q.dark.isActive? 'bg-blue-grey-9': 'bg-white'"
    >
      <div
        class="row justify-center items-center no-wrap"
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
          <img src="https://cdn.quasar.dev/img/avatar4.jpg">
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
import Identity from './Identity.vue';
import DarkMode from './DarkMode.vue';
import Language from './Language.vue';
export default {
  components: {
    DarkMode,
    Identity,
    Language
  },

  data () {
    return {
      currentUser: auth.currentUser
    }
  },

  computed: {
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

    isLogin () {
      return this.$store.state.isLogin;
    },

    isLoginName () {
      if (this.isLogin) {
        return this.userInfo.name;
      } else {
        return this.$t('fakeName')
      }
    },

    userInfo () {
      return this.$store.state.userInfo;
    }
  },

  methods: {
    identityChange () {
      if (this.isLogin) {
        auth.signOut();
        this.$router.go();
      } else {
        this.identityDialog = true;
      }
    },

    login () {
      this.identityDialog = true;
    },

    logout () {
      this.$store.commit('menuOpenMutate', false);
      auth.signOut();
      setTimeout(() => {
        this.$store.commit('menuOpenMutate', true);
      }, 1000)
    }
  }
}
</script>

<style>

</style>
