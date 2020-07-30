<template>
  <q-page class="flex flex-center q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      :vertical='$q.screen.lt.md?true:false'
      transition-next="slide-left"
      transition-prev="slide-right"
    >
      <q-step
        :name="1"
        title="Warning"
        icon="shopping_cart"
        :done="step > 1"
        :style="formLayout"
      >
        <div class="text-negative column items-center">
          <h6>This website is only for Practicing.</h6>
          <div class="text-body1">
            Please do not key in any real world personal information.
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Deliver Info"
        icon="navigation"
        :done="step > 2"
        :style="formLayout"
      >
        <!-- <div class="text-body1 text-bold q-pb-xs">
          收件者資料
        </div> -->
        <q-form
          class="q-gutter-sm"
          ref="deliver"
        >
          <q-input
            v-model="name"
            ref="name"
            type="text"
            label="Name*"
            placeholder='王小明'
            lazy-rules
            outlined
            maxlength="30"
            :rules="[ val => val && val.length > 0 || 'Please type your name']"
          />

          <q-input
            v-model="phone"
            ref="phone"
            type="tel"
            label="Phone*"
            maxlength="12"
            mask="####-###-###"
            lazy-rules
            outlined
            placeholder="0912-345-678"
            :rules="[val=>/^09\d{2}-\d{3}-\d{3}/.test(`${val}`) || 'Start with 09']"
          />

          <q-input
            v-model="address"
            ref="address"
            type="text"
            label="Address*"
            outlined
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your address']"
          />

          <q-input
            v-model="email"
            type="email"
            label="Email"
            outlined
          />
        </q-form>
      </q-step>

      <q-step
        :name="3"
        title="Payment"
        icon="credit_card"
        :done="step > 3"
        :style="formLayout"
      >
        <div class="row justify-end items-center q-pb-md">
          <div class="row q-gutter-x-md no-padding no-margin">
            <q-img
              src="~assets/visa.png"
              spinner-color="primary"
              spinner-size="32px"
              :width="iconWidth"
            />

            <q-img
              src="~assets/mastercard.png"
              spinner-color="primary"
              spinner-size="32px"
              :width="iconWidth"
            />

            <q-img
              src="~assets/jcb.png"
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
            label="Card Number*"
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
            label="Name on card*"
            placeholder="王小明"
            lazy-rules
            outlined
            hide-bottom-space
            maxlength="30"
            :rules="[val => val && val.length > 0]"
          />

          <div class="row q-pb-sm q-col-gutter-x-sm q-col-gutter-y-lg q-py-md">
            <q-select
              label="Expiry Month*"
              ref="expiryMonth"
              class="col-12 col-md-4 col-sm-6"
              v-model="monthSelect"
              :options="months"
              :rules="[val => val.length > 0]"
              outlined
              hide-bottom-space
            />

            <q-select
              label="Expiry Year*"
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
              label="CCV*"
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
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="float-right">
          <q-btn

            flat
            color="primary"
            @click="back"
            label="Back"
            class="q-ml-sm"
          />

          <q-btn
            @click="next"
            color="primary"
            :loading="loading"
            :percentage="percentage"
            :label="step === 3 ? 'Pay' : 'Continue'"
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
import Store from '../store/index'
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
        return 'min-height:20vh; min-width:60vw';
      } else {
        return 'min-width:75vw';
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
          this.percentage += Math.floor(Math.random() * 20) + 10;
          if (this.percentage >= 100) {
            clearInterval(this.interval);
            this.loading = false;
            this.$store.dispatch('cartAction', { type: 'remove', value: this.selected });
            this.$store.dispatch('selectedAction', []);
            this.$q.dialog({
              title: 'Thanks for purchasing',
              message: 'Your order have been submitted.'
            }).onOk(() => {
              // clearTimeout(timer);
              this.$router.push('/');
            }).onDismiss(() => {
              // clearTimeout(timer);
              this.$router.push('/');
            })
            // const timer = setTimeout(() => {
            //   dialog.hide()
            // }, 3000)
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

  beforeRouteEnter (to, from, next) {
    if (Store().getters.selected.length > 0) {
      next();
    } else {
      next({ name: 'Menu' });
    }
  },

  beforeDestroy () {
    clearInterval(this.interval);
  }
}
</script>

<style lang="scss">

</style>
