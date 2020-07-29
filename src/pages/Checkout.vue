<template>
  <div
    class="q-pa-md"
    :class="$q.screen.lt.sm? '': 'absolute-center'"
  >
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      vertical
      transition-next="slide-left"
      transition-prev="slide-right"
    >
      <q-step
        :name="1"
        title="Confirm your order"
        icon="shopping_cart"
        :done="step > 1"
        :style="minWidth"
      >
        An ad group contains one or more ads which target a shared set of keywords.
      </q-step>

      <q-step
        :name="2"
        title="Deliver Info"
        icon="navigation"
        :done="step > 2"
        :style="minWidth"
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
            lazy-rules
            outlined
            placeholder='王小明'
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
        :style="minWidth"
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
            lazy-rules
            outlined
            hide-bottom-space
            placeholder="王小明"
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
        <q-stepper-navigation>
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

          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>

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
      percentage: 0,
      minWidth: 'min-width:75vw;'
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
    }
  },

  methods: {
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
          this.percentage += Math.floor(Math.random() * 10) + 10;
          if (this.percentage >= 100) {
            clearInterval(this.interval);
            this.loading = false;
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

<style lang="scss">

</style>
