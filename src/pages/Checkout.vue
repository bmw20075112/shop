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
        <div class="text-body1 text-bold q-pb-xs">
          收件者資料
        </div>
        <q-form
          class="q-gutter-md"
          @submit.prevent.stop="submit"
        >
          <q-input
            v-model="name"
            ref="name"
            type="text"
            label="Name*"
            autofocus
            lazy-rules
            placeholder='王小明'
            :rules="[ val => val && val.length > 0 || 'Please type your name']"
          />

          <q-input
            v-model="phone"
            ref="phone"
            type="tel"
            label="Phone*"
            maxlength="10"
            lazy-rules
            placeholder="0912345678"
            :rules="[val=>/^[09]{2}\d{8}/.test(val) || 'Start with 09']"
          />

          <q-input
            v-model="address"
            ref="address"
            type="text"
            label="Address*"
            :rules="[val => val && val.length > 0 || 'Please type your address']"
          />
          <q-input
            v-model="email"
            type="email"
            label="Email"
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
        An ad group contains one or more ads which target a shared set of keywords.
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
            @click="$refs.stepper.next()"
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
      email: ''
    }
  },

  computed: {
    selected () {
      return this.$store.state.selected;
    }
  },

  methods: {
    submit () {
      this.$refs.name.validate();
      this.$refs.phone.validate();
      this.$refs.address.validate();
      if (this.$refs.name.hasError || this.$refs.phone.hasError || this.$refs.address.hasError) {
        this.formHasError = true;
      }
    }
  }
}
</script>
