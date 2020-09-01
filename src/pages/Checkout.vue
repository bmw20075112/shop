<template>
  <q-page class="flex flex-center q-pa-md">
    <q-stepper
      animated
      ref="stepper"
      transition-next="slide-left"
      transition-prev="slide-right"
      :active-color="$q.dark.isActive? 'white': ''"
      :done-color="$q.dark.isActive? 'grey': ''"
      :vertical='$q.screen.lt.md?true:false'
      v-model="step"
    >
      <!-- Step 1 -->
      <q-step
        icon="shopping_cart"
        :done="step > 1"
        :name="1"
        :title="$t('warning')"
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

      <!-- Step 2 -->

      <q-step
        icon="navigation"
        :done="step > 2"
        :name="2"
        :style="formLayout"
        :title="$t('deliverInfo')"
      >
        <q-form
          class="q-gutter-sm"
          ref="deliver"
        >
          <q-input
            lazy-rules
            outlined
            autocomplete="username"
            maxlength="30"
            placeholder='王小明'
            ref="name"
            type="text"
            :label="$t('name')"
            :rules="[ val => val && val.length > 0 || $t('nameAlert')]"
            v-model="name"
          />

          <q-input
            lazy-rules
            outlined
            autocomplete="tel"
            mask="####-###-###"
            maxlength="12"
            placeholder="0912-345-678"
            ref="phone"
            type="tel"
            :label="$t('phone')"
            :rules="[val=>/^09\d{2}-\d{3}-\d{3}/.test(val) || $t('phoneAlert')]"
            v-model="phone"
          />

          <q-input
            outlined
            lazy-rules
            autocomplete="street-address"
            ref="address"
            type="text"
            :label="$t('address')"
            :rules="[val => val && val.length > 0 || $t('addressAlert')]"
            v-model="address"
          />

          <q-input
            outlined
            autocomplete="email"
            type="email"
            :label="$t('email')"
            :rules="[
              val => val && val.length > 0 || $t('emailNo'),
              val => /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(val) || $t('emailAlert')
            ]"
            v-model="email"
          />
        </q-form>
      </q-step>

      <!-- Step 3 -->

      <q-step
        icon="credit_card"
        :done="step > 3"
        :name="3"
        :style="formLayout"
        :title="$t('payment')"
      >
        <div class="row justify-end items-center q-pb-md">
          <div class="row q-gutter-x-md no-padding no-margin">
            <q-img
              spinner-color="primary"
              spinner-size="32px"
              src="https://res.cloudinary.com/barney4760/image/upload/v1598517519/checkout/visa_zsxc0m.png"
              :width="iconWidth"
            />

            <q-img
              spinner-color="primary"
              spinner-size="32px"
              src="https://res.cloudinary.com/barney4760/image/upload/v1598517517/checkout/mastercard_wdtiys.png"
              :width="iconWidth"
            />

            <q-img
              spinner-color="primary"
              spinner-size="32px"
              src="https://res.cloudinary.com/barney4760/image/upload/v1598517515/checkout/jcb_bonqhq.png"
              :width="iconWidth"
            />
          </div>
        </div>

        <q-form
          class="column q-gutter-y-md"
          ref="payment"
        >
          <q-input
            hide-bottom-space
            lazy-rules
            outlined
            autocomplete="cc-number"
            maxlength=20
            mask="####-####-####-####"
            placeholder="0123-4567-8901-2345"
            ref="ccNumber"
            :label="$t('cardNumber')"
            :rules="[val=>/^\d{4}-\d{4}-\d{4}-\d{4}/.test(val)]"
            v-model="cardNumber"
          />

          <q-input
            hide-bottom-space
            lazy-rules
            outlined
            autocomplete="cc-name"
            maxlength="30"
            placeholder="王小明"
            ref="ccName"
            type="text"
            :label="$t('cardName')"
            :rules="[val => val && val.length > 0]"
            v-model="nameOnCard"
          />

          <div class="row q-pb-sm q-col-gutter-x-sm q-col-gutter-y-lg q-py-md">
            <q-select
              hide-bottom-space
              outlined
              class="col-12 col-md-4 col-sm-6"
              ref="expiryMonth"
              :label="$t('expiryMonth')"
              :options="months"
              :rules="[val => val.length > 0]"
              v-model="monthSelect"
            />

            <q-select
              hide-bottom-space
              outlined
              class="col-12 col-md-4 col-sm-6"
              ref="expiryYear"
              :label="$t('expiryYear')"
              :options="years"
              :rules="[val => val.length > 0]"
              v-model="yearSelect"
            />

            <q-input
              hide-bottom-space
              lazy-rules
              outlined
              class="col-12 col-md-4 col-sm-12"
              maxlength="3"
              placeholder="123"
              ref="ccv"
              type="tel"
              :label="$t('ccv')"
              :rules="[val => typeof(val)!==undefined && /\d{3}/.test(`${val}`)]"
              v-model="cvv"
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

      <!-- Control area -->

      <template v-slot:navigation>
        <q-stepper-navigation class="float-right">
          <q-btn
            flat
            class="q-ml-sm"
            :color="$q.dark.isActive?'white':'primary'"
            :label="$t('back')"
            @click="back"
          />

          <q-btn
            color="primary"
            :label="step === 3 ? $t('pay') : $t('continue')"
            :loading="loading"
            :percentage="percentage"
            @click="next"
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
import { auth, db } from '../api/firebase/firebase.js';
import { mapState, mapGetters } from 'vuex';
import firebase from 'firebase/app';
export default {
  data () {
    return {
      address: '',
      cardNumber: null,
      cvv: null,
      deliverPass: false,
      email: '',
      loading: false,
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      monthSelect: '',
      name: '',
      nameOnCard: '',
      percentage: 0,
      phone: '',
      step: 1,
      years: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'],
      yearSelect: ''
    }
  },

  computed: {
    ...mapState([
      'selected',
      'userInfo'
    ]),

    ...mapGetters([
      'accounts',
      'selectedContents',
      'totalCost'
    ]),

    iconWidth () { // Credit card icon width
      if (this.$q.screen.lt.md) {
        return '32px';
      } else {
        return '48px';
      }
    },

    formLayout () { // 表單長寬限制
      if (this.$q.screen.gt.sm) {
        return 'min-height:40vh; min-width:65vw';
      } else {
        return 'min-width:90vw';
      }
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

    deliverSubmit () { // Step 2 validate
      if (this.$refs.name.hasError || this.$refs.phone.hasError || this.$refs.address.hasError) {
        this.formHasError = true;
      } else {
        this.$refs.stepper.next();
      }
    },

    paymentSubmit () { // Step 3 validate
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
            this.$store.commit('seletedMutate', []);
            this.$store.commit('allSelectMutate', false);

            this.$q.dialog({
              title: this.$t('successTitle'),
              message: this.$t('successMessage')
            }).onOk(() => {
              this.$store.commit('historyMutate', true);
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

  created () {
    this.name = this.userInfo.name;
    this.email = auth.currentUser.email;
  },

  beforeDestroy () {
    clearInterval(this.interval);
  }
}
</script>
