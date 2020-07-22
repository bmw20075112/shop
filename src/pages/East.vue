<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
        v-for="n in 12"
        :key="`none-${n}`"
      >
        <q-card
          class="my-card"
          @click="openBuy=true"
        >
          <img src="https://res.cloudinary.com/barney4760/image/upload/v1595177151/Home/home-1-small_iwzy88.jpg">
          <q-card-section>
            <div class="text-h6">
              Product Name
            </div>
            <div class="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>

            <div class="text-subtitle2 text-red">
              $75
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="openBuy">
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Cafe Basilico
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating
            v-model="stars"
            :max="5"
            size="32px"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            $・Italian, Cafe
          </div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
          >
            <q-input
              v-model.number="number"
              type="number"
              label="Number"
              ref="number"
              class="q-mb-xl"
              :rules="[val=>Number.isInteger(val) || 'Input must be positive interger',
                       val=>val>0 || 'Input must be positive interger' ]"
            >
              <template v-slot:prepend>
                <q-btn
                  flat
                  color="primary"
                  round
                  icon="remove"
                  @click="count(-1)"
                  :disable="number<1"
                />
              </template>
              <template v-slot:append>
                <q-btn
                  flat
                  color="primary"
                  round
                  icon="add"
                  @click="count(1)"
                />
              </template>
            </q-input>
            <q-btn
              icon="shopping_cart"
              type="submit"
              color="primary"
              class="absolute"
              style="right:0; top:60%"
            />
            <q-btn
              type="button"
              :label="$t('cancel')"
              color="primary"
              class="absolute"
              style="right:75px; top:60%"
              v-close-popup
            />
          </q-form>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openBuy: false,
      stars: 4,
      number: 1,
      eastMenu: [

      ]
    }
  },
  methods: {
    count (num) {
      this.number = Number(this.number) + num;
    },

    onSubmit () {
      this.$refs.number.validate();
      if (this.$refs.number.hasError) {
        this.formHasError = true;
      } else {
        const random = Math.floor(Math.random() * 10 + 1);
        const randomName = 'dog' + random;
        this.$store.dispatch('cartAction', { type: 'add', value: { name: randomName, number: this.number } });
        this.openBuy = false;
        this.number = 1;
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Add to Cart'
        })
      }
    }
  }
}
</script>

<style>

</style>
