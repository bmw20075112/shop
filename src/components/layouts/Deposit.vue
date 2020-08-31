<template>
  <q-card :class="$q.dark.isActive?'bg-blue-grey-10':''">
    <q-card-section class="row items-center">
      <q-avatar
        icon="attach_money"
        color="negative"
        text-color="white"
      />
      <span class="q-ml-sm text-h6">{{ $t('insufficient') }}</span>
    </q-card-section>

    <q-card-section>
      {{ $t('depositAlert') }}
    </q-card-section>

    <q-card-section>
      <div>
        <div class="text-subtitle1">
          {{ $t('accounts') }} :

          <span class="text-positive text-bold q-pl-sm">
            $ {{ accounts }}
          </span>
        </div>

        <div class="text-subtitle1">
          {{ $t('totalCost') }} : <span
            class="text-negative text-bold q-pl-sm"
          >$ {{ totalCost }}</span>
        </div>
      </div>
    </q-card-section>

    <q-card-actions class="float-right">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          v-model.number="money"
          type="number"
          ref="money"
          class="q-mb-xl"
          :label="$t('deposit')"
          :rules="[val=>Number.isInteger(val) || 'Input must be positive interger',
                   val=>val>0 || $t('inputInterger'),
                   val=>val+accounts<=20000 || $t('inputLower20000')]"
        >
          <template v-slot:prepend>
            <q-btn
              flat
              color="primary"
              round
              icon="remove"
              @click="count(-1000)"
              :disable="money<1"
            />
          </template>
          <template v-slot:append>
            <q-btn
              flat
              color="primary"
              round
              icon="add"
              @click="count(1000)"
            />
          </template>
        </q-input>

        <q-btn
          type="button"
          :label="$t('cancel')"
          class="absolute"
          style="right:75px; top:60%"
          flat
          v-close-popup
        />

        <q-btn
          icon="add"
          type="submit"
          color="primary"
          class="absolute"
          style="right:0; top:60%"
        />
      </q-form>
    </q-card-actions>
  </q-card>
</template>

<script>
import { auth, db } from '../../api/firebase/firebase.js';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      money: 1000
    }
  },

  computed: {
    ...mapGetters([
      'accounts',
      'totalCost'
    ])
  },

  methods: {
    count (money) {
      this.money = Number(this.money) + money;
    },

    onSubmit () {
      this.$refs.money.validate();
      if (this.$refs.money.hasError) {
        this.formHasError = true;
      } else {
        this.$store.commit('depositOpenMutate', false);
        db.collection('users').doc(auth.currentUser.uid).update({
          accounts: this.accounts + this.money
        })
          .then(() => {
            this.$q.dialog({
              title: this.$t('depositSuccess'),
              message: this.$t('depositRes', { accounts: this.accounts + this.money }),
              ok: {
                color: 'primary'
              }
            })
          })
      }
    }
  }
}
</script>

<style>

</style>
