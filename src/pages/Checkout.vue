<template>
  <q-page class="flex flex-center q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      :active-color="$q.dark.isActive? 'white': ''"
      :done-color="$q.dark.isActive? 'grey': ''"
      animated
      :vertical='$q.screen.lt.md?true:false'
      transition-next="slide-left"
      transition-prev="slide-right"
    >
      <q-step
        :name="1"
        :title="$t('warning')"
        icon="shopping_cart"
        :done="step > 1"
        :style="formLayout"
      >
        <div
          class="column items-center"
          :class="$q.dark.isActive? 'text-orange': 'text-red'"
        >
          <div class="text-h5 text-bold no-margin q-pt-xl">
            {{ $t('warningTitle') }}
          </div>

          <div class="text-body1 text-bold q-pt-md">
            {{ $t('warningSub') }}
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        :title="$t('deliverInfo')"
        icon="navigation"
        :done="step > 2"
        :style="formLayout"
      >
        <q-form
          class="q-gutter-sm"
          ref="deliver"
        >
          <q-input
            autocomplete="username"
            v-model="name"
            ref="name"
            type="text"
            :label="$t('name')"
            placeholder='王小明'
            lazy-rules
            outlined
            maxlength="30"
            :rules="[ val => val && val.length > 0 || $t('nameAlert')]"
          />

          <q-input
            autocomplete="tel"
            v-model="phone"
            ref="phone"
            type="tel"
            :label="$t('phone')"
            maxlength="12"
            mask="####-###-###"
            lazy-rules
            outlined
            placeholder="0912-345-678"
            :rules="[val=>/^09\d{2}-\d{3}-\d{3}/.test(val) || $t('phoneAlert')]"
          />

          <q-input
            autocomplete="street-address"
            v-model="address"
            ref="address"
            type="text"
            :label="$t('address')"
            outlined
            lazy-rules
            :rules="[val => val && val.length > 0 || $t('addressAlert')]"
          />

          <q-input
            autocomplete="email"
            v-model="email"
            type="email"
            :label="$t('email')"
            outlined
          />
        </q-form>
      </q-step>

      <q-step
        :name="3"
        :title="$t('payment')"
        icon="credit_card"
        :done="step > 3"
        :style="formLayout"
      >
        <div class="row justify-end items-center q-pb-md">
          <div class="row q-gutter-x-md no-padding no-margin">
            <q-img
              src="https://res.cloudinary.com/barney4760/image/upload/v1598517519/checkout/visa_zsxc0m.png"
              spinner-color="primary"
              spinner-size="32px"
              :width="iconWidth"
            />

            <q-img
              src="https://res.cloudinary.com/barney4760/image/upload/v1598517517/checkout/mastercard_wdtiys.png"
              spinner-color="primary"
              spinner-size="32px"
              :width="iconWidth"
            />

            <q-img
              src="https://res.cloudinary.com/barney4760/image/upload/v1598517515/checkout/jcb_bonqhq.png"
              spinner-color="primary"
              spinner-size="32px"
              :width="iconWidth"
            />
          </div>
        </div>

        <q-form
          ref="payment"
          class="column q-gutter-y-md"
        >
          <q-input
            v-model="cardNumber"
            autocomplete="cc-number"
            ref="ccNumber"
            :label="$t('cardNumber')"
            maxlength=20
            mask="####-####-####-####"
            lazy-rules
            outlined
            hide-bottom-space
            placeholder="0123-4567-8901-2345"
            :rules="[val=>/^\d{4}-\d{4}-\d{4}-\d{4}/.test(val)]"
          />

          <q-input
            v-model="nameOnCard"
            autocomplete="cc-name"
            type="text"
            ref="ccName"
            :label="$t('cardName')"
            placeholder="王小明"
            lazy-rules
            outlined
            hide-bottom-space
            maxlength="30"
            :rules="[val => val && val.length > 0]"
          />

          <div class="row q-pb-sm q-col-gutter-x-sm q-col-gutter-y-lg q-py-md">
            <q-select
              :label="$t('expiryMonth')"
              ref="expiryMonth"
              class="col-12 col-md-4 col-sm-6"
              v-model="monthSelect"
              :options="months"
              :rules="[val => val.length > 0]"
              outlined
              hide-bottom-space
            />

            <q-select
              :label="$t('expiryYear')"
              ref="expiryYear"
              class="col-12 col-md-4 col-sm-6"
              v-model="yearSelect"
              :options="years"
              :rules="[val => val.length > 0]"
              outlined
              hide-bottom-space
            />

            <q-input
              v-model="cvv"
              type="tel"
              ref="ccv"
              :label="$t('ccv')"
              placeholder="123"
              maxlength="3"
              class="col-12 col-md-4 col-sm-12"
              lazy-rules
              outlined
              hide-bottom-space
              :rules="[val => typeof(val)!==undefined && /\d{3}/.test(`${val}`)]"
            />
          </div>
        </q-form>
        <div class="text-subtitle1 float-right">
          {{ $t('totalCost') }}：
          <span
            class="text-bold q-pl-md"
            :class="$q.dark.isActive?'text-red': 'text-blue-9'"
          >
            $ {{ totalCost }}
          </span>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="float-right">
          <q-btn
            flat
            @click="back"
            :label="$t('back')"
            class="q-ml-sm"
            :color="$q.dark.isActive?'white':'primary'"
          />

          <q-btn
            @click="next"
            color="primary"
            :loading="loading"
            :percentage="percentage"
            :label="step === 3 ? $t('pay') : $t('continue')"
          >
            <template v-slot:loading>
              <q-spinner-gears class="on-center" />
            </template>
          </q-btn>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script>
import firebase from 'firebase/app';
import { auth, db } from '../api/firebase/firebase.js';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      step: 1,
      name: '',
      phone: '',
      address: '',
      email: '',
      deliverPass: false,
      cardNumber: null,
      nameOnCard: '',
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      monthSelect: '',
      years: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'],
      yearSelect: '',
      cvv: null,
      loading: false,
      percentage: 0
    }
  },

  computed: {
    ...mapGetters([
      'accounts',
      'selectedContents',
      'totalCost'
    ]),

    selected () {
      return this.$store.state.selected;
    },

    iconWidth () {
      if (this.$q.screen.lt.md) {
        return '32px';
      } else {
        return '48px';
      }
    },

    formLayout () {
      if (this.$q.screen.gt.sm) {
        return 'min-height:40vh; min-width:65vw';
      } else {
        return 'min-width:90vw';
      }
    },

    orderSuccess () {
      return this.$store.state.orderSuccess;
    }
  },

  methods: {
    back () {
      if (this.step === 1) {
        this.$router.go(-1);
      } else {
        this.$refs.stepper.previous()
      }
    },

    deliverSubmit () {
      if (this.$refs.name.hasError || this.$refs.phone.hasError || this.$refs.address.hasError) {
        this.formHasError = true;
      } else {
        this.$refs.stepper.next();
      }
    },

    paymentSubmit () {
      if (this.$refs.ccName.hasError || this.$refs.ccNumber.hasError || this.$refs.expiryMonth.hasError ||
          this.$refs.expiryYear.hasError || this.$refs.ccv.hasError) {
        this.formHasError = true;
      } else {
        this.loading = true;
        this.percentage = 0;
        this.interval = setInterval(() => {
          let timeStamp = Date.now();
          const orderSuccess = {
            packageID: this.selectedContents[0].id + timeStamp,
            products: this.selectedContents,
            totalCost: this.totalCost,
            timeStamp
          }
          this.percentage += Math.floor(Math.random() * 20) + 10;
          if (this.percentage >= 100) {
            clearInterval(this.interval);
            this.loading = false;
            db.collection('users').doc(auth.currentUser.uid).update({
              accounts: this.accounts - this.totalCost,
              history: firebase.firestore.FieldValue.arrayUnion(orderSuccess)
            });
            this.$store.commit('cartMutate', { type: 'remove', value: this.selected });
            this.$store.commit('drawerMutate', false);
            this.$store.commit('seletedMutate', []);
            this.$store.commit('allSelectMutate', false);
            this.$q.dialog({
              title: this.$t('successTitle'),
              message: this.$t('successMessage')
            }).onOk(() => {
              this.$router.push({ name: 'Menu' });
            })
          }
        }, 500)
      }
    },

    next () {
      if (this.step === 2) {
        this.$refs.deliver.validate();
        this.deliverSubmit();
      } else if (this.step === 3) {
        this.$refs.payment.validate();
        this.paymentSubmit();
      } else {
        this.$refs.stepper.next();
      }
    }
  },

  beforeDestroy () {
    clearInterval(this.interval);
  }
}
</script>
