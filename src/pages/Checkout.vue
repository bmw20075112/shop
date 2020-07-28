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
          class="q-gutter-md"
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
        icon="create_new_folder"
        :done="step > 3"
      >
        <q-form
          ref="card"
          class="q-gutter-md"
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

          <q-input
            v-model="expiryDate"
            autocomplete="cc-exp"
            ref="expiryDate"
            type="datetime-local"
            lazy-rules
            outlined
            placeholder="王小明"
            :rules="[val => val && val.length > 0 || 'Please type your name']"
          />
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
      expiryDate: ''
    }
  },

  computed: {
    selected () {
      return this.$store.state.selected;
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
