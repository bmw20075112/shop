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
            <div class="text-subtitle1 text-primary">
              $75
            </div>
            <div class="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-btn
      icon="check"
      label="OK"
      @click="openBuy=true"
    />
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
          <q-btn
            flat
            color="primary"
            round
            icon="remove"
            @click="number-=1"
            :disable="number<1"
          />
          <q-input
            v-model.number="number"
            type="number"
            label="Number"
            :rules="[val=>Number.isInteger(val) || 'Number must be interger',
                     val=>val>0 || 'Number must bigger than 0' ]"
          />
          <q-btn
            flat
            color="primary"
            round
            icon="add"
            @click="number+=1"
          />
          <q-btn
            v-close-popup
            flat
            color="primary"
            round
            icon="event"
          />
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
      number: 1
    }
  }
}
</script>

<style>

</style>
