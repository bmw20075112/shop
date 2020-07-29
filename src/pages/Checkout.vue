<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      :contracted='$q.screen.lt.md'
      animated
      style="max-width:960px;"
    >
      <q-step
        :name="1"
        title="Create an ad group"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 1"
      >
        An ad group contains one or more ads which target a shared set of keywords.
      </q-step>

      <q-step
        :name="2"
        title="Deliver Info"
        icon="navigation"
        :done="step > 2"
      >
        <!-- <div class="text-body1 text-bold q-pb-xs">
          收件者資料
        </div> -->
        <q-form
          class="q-gutter-sm"
          ref="form"
        >
          <q-input
            v-model="name"
            ref="name"
            type="text"
            label="Name*"
            autofocus
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
            :rules="[val=>/^[09]{2}\d{2}-\d{3}-\d{3}/.test(val) || 'Start with 09']"
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
        title="Create an ad group"
        caption="Optional"
        icon="credit_card"
        :done="step > 3"
      >
        <div class="row justify-between items-center q-pb-md">
          <div class="text-h5 text-bold">
            Payment
          </div>
          <div
            class="row no-padding no-margin"
            :class="$q.screen.lt.sm?'q-gutter-x-xs':'q-gutter-x-md'"
          >
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
          ref="card"
          class="column q-gutter-y-sm"
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
            autofocus
            placeholder="0123-4567-8901-2345"
            :rules="[val=>/^\d{4}-\d{4}-\d{4}-\d{4}/.test(val) || 'Type in correct form']"
          />

          <q-input
            v-model="nameOnCard"
            autocomplete="cc-name"
            type="text"
            ref="ccName"
            label="Name on card*"
            lazy-rules
            outlined
            placeholder="王小明"
            :rules="[val => val && val.length > 0 || 'Please type your name']"
          />
          <div class="row q-pb-sm q-col-gutter-sm">
            <q-select
              class="col-2"
              v-model="monthSelect"
              :options="months"
              label="Expiry Month"
              outlined
            />

            <q-select
              class="col-2"
              v-model="yearSelect"
              :options="years"
              label="Expiry Year"
              outlined
            />
            <!-- <q-input
              v-model="expiryDate"
              autocomplete="cc-exp"
              type="month"
              stack-label
              ref="expiryDate"
              lazy-rules
              outlined
              label="Expiry Date"
              class="col-6"
              mask="##/##"
              placeholder="05/23"
              :rules="[val => val && val.length === 5 || 'Please type Expiry Date']"
            /> -->

            <!-- <q-input
              v-model="cvv"
              ref="cvv"
              type="tel"
              label="Security Code"
              lazy-rules
              outlined
              class="col-5"
              placeholder="123"
              maxlength="3"
              :rules="[val => val && val.length === 3 || 'Please type CCV code']"
            />
          </div> -->
          </div>
        </q-form>
      </q-step>

      <q-step
        :name="4"
        title="Create an ad"
        icon="add_comment"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="next"
            color="primary"
            :label="step === 4 ? 'Finish' : 'Continue'"
          />
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
      expiryDate: '',
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      monthSelect: '',
      years: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'],
      yearSelect: '',
      cvv: null
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
    submit () {
      if (this.$refs.name.hasError || this.$refs.phone.hasError || this.$refs.address.hasError) {
        this.formHasError = true;
      } else {
        this.$refs.stepper.next();
      }
    },

    next () {
      if (this.step === 2) {
        this.$refs.form.validate();
        this.submit();
      } else {
        this.$refs.stepper.next();
      }
    }
  }
}
</script>

<style lang="scss">

</style>
