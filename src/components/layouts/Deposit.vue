<template>
  <q-card :class="$q.dark.isActive?'bg-blue-grey-10':''">
    <!-- card header -->
    <q-card-section class="row items-center">
      <q-avatar
        color="negative"
        icon="attach_money"
        text-color="white"
      />
      <span class="q-ml-sm text-h6">{{ $t('insufficient') }}</span>
    </q-card-section>

    <q-card-section>
      {{ $t('depositAlert') }}
    </q-card-section>

    <!-- card body -->
    <q-card-section>
      <div>
        <div class="text-subtitle1">
          {{ $t('accounts') }} :

          <span class="q-pl-sm text-bold text-positive">
            $ {{ accounts }}
          </span>
        </div>

        <div class="text-subtitle1">
          {{ $t('totalCost') }} : <span
            class="q-pl-sm text-bold text-negative"
          >$ {{ totalCost }}</span>
        </div>
      </div>
    </q-card-section>

    <!-- form -->
    <q-card-actions class="float-right">
      <q-form
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-input
          v-model.number="money"
          class="q-mb-xl"
          type="number"
          ref="money"
          :label="$t('deposit')"
          :rules="[val=>Number.isInteger(val) || $t('inputInterger'),
                   val=>val>0 || $t('inputInterger'),
                   val=>val+accounts<=20000 || $t('inputLower20000')]"
        >
          <!-- Minus button -->
          <template v-slot:prepend>
            <q-btn
              flat
              round
              color="primary"
              icon="remove"
              :disable="money<1"
              @click="count(-1000)"
            />
          </template>

          <!-- Add button -->
          <template v-slot:append>
            <q-btn
              flat
              round
              color="primary"
              icon="add"
              @click="count(1000)"
            />
          </template>
        </q-input>

        <!-- Cancel button -->
        <q-btn
          flat
          v-close-popup
          class="absolute"
          style="right:75px; top:60%"
          type="button"
          :label="$t('cancel')"
        />

        <!-- Submit button -->
        <q-btn
          class="absolute"
          color="primary"
          icon="add"
          style="right:0; top:60%"
          type="submit"
          :loading="loading"
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
      loading: false,
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
    count (money) { // Decide how much money deposit
      this.money = Number(this.money) + money;
    },

    onSubmit () { // Validate form and update data in DB
      this.$refs.money.validate();
      if (this.$refs.money.hasError) {
        this.formHasError = true;
      } else {
        this.loading = true;
        db.collection('users').doc(auth.currentUser.uid).update({
          accounts: this.accounts + this.money
        })
          .then(() => {
            this.$store.commit('depositOpenMutate', false);
            this.loading = false;
            this.$q.dialog({
              title: this.$t('depositSuccess'),
              message: this.$t('depositRes', { accounts: this.accounts }),
              ok: {
                color: 'primary'
              }
            })
          })
          .catch(err => console.log(err));
      }
    }
  }
}
</script>
