<template>
  <div
    class="q-pa-md"
  >
    <div class="row q-col-gutter-md">
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
        v-for="(food, index) in eastMenu"
        :key="food.id"
      >
        <q-card
          class="my-card"
          @click="openCard(index)"
        >
          <q-img
            :src="food.url"
            :ratio="16/9"
            spinner-color="primary"
            spinner-size="32px"
          />
          <q-card-section>
            <div class="text-h6">
              {{ $t(`${food.name}`) }}
            </div>

            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>

            <div class="text-subtitle2 text-red">
              ${{ food.price }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog
      v-model="openBuy"
    >
      <q-card class="my-card">
        <img
          :src="selectedPic.url"
          alt=""
        >

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
              {{ $t(`${selectedPic.name}`) }}
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
          <div class="text-subtitle1 text-red">
            ${{ selectedPic.price }}
          </div>
          <div class="text-caption text-grey">
            East Food with delicious taste
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
      selectedPic: { name: 'fake', price: 0 },
      eastMenu: [
        { id: 'a1', name: 'ramen', price: 150, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600815/east/ramen_auy470.jpg' },
        { id: 'a2', name: 'sushi', price: 100, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600818/east/sushi_wuhbof.jpg' },
        { id: 'a3', name: 'luRouFan', price: 30, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600822/east/luRolRice_zpqscj.jpg' },
        { id: 'a4', name: 'xiaoLongBao', price: 120, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600818/east/xiaoLongBao_mcuqfp.jpg' },
        { id: 'a5', name: 'friedRice', price: 80, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600817/east/friedRice_elp7ti.jpg' },
        { id: 'a6', name: 'dumplings', price: 70, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600814/east/dumplings_almtvj.jpg' },
        { id: 'a7', name: 'zongZi', price: 40, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600825/east/zongZi_uzoa7f.jpg' },
        { id: 'a8', name: 'satay', price: 80, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600819/east/Satay_omrhw9.jpg' },
        { id: 'a9', name: 'curry', price: 90, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600815/east/curry_d1itna.jpg' },
        { id: 'a10', name: 'oysterOmelet', price: 50, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600815/east/OysterOmelet_l9b9dx.jpg' },
        { id: 'a11', name: 'baWan', price: 40, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600816/east/bawan_vnxyir.jpg' },
        { id: 'a12', name: 'lakSa', price: 75, url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600820/east/Laksa_b3hgw9.jpg' }
      ]
    }
  },

  methods: {
    count (num) {
      this.number = Number(this.number) + num;
    },

    onSubmit (id) {
      this.$refs.number.validate();
      if (this.$refs.number.hasError) {
        this.formHasError = true;
      } else {
        this.$store.dispatch('cartAction', {
          type: 'add',
          value: {
            ...this.selectedPic,
            number: this.number
          }
        });
        this.openBuy = false;
        this.number = 1;
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Add to Cart'
        })
      }
    },

    openCard (index) {
      this.openBuy = true;
      this.number = 1;
      this.selectedPic = this.eastMenu[index];
    }
  }
}
</script>

<style>

</style>
