<template>
  <div>
    <div class="row q-col-gutter-md">
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
        :key="food.id"
        v-for="(food, index) in menuNow"
      >
        <q-card
          class="cursor-pointer"
          :class="$q.dark.isActive?'bg-blue-grey-10':''"
          @click="openCard(index)"
        >
          <q-img
            spinner-color="primary"
            spinner-size="32px"
            :alt="food.name"
            :src="food.url"
            :ratio="16/9"
          />

          <q-card-section>
            <div class="text-h6 text-orange q-pb-xs text-bold">
              {{ $t(`${food.name}`) }}
            </div>

            <div class="q-pb-sm">
              {{ $t('lorem') }}
            </div>

            <div class="text-subtitle2 text-orange">
              ${{ food.price }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="openBuy">
      <q-card
        :class="$q.dark.isActive?'bg-blue-grey-10':''"
      >
        <!-- card header -->
        <img
          :src="selectedPic.url"
          alt="product image"
        >

        <q-card-section>
          <q-btn
            fab
            color="primary"
            class="absolute"
            icon="rate_review"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col ellipsis text-h6">
              {{ $t(`${selectedPic.name}`) }}
            </div>

            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <!-- <q-icon name="place" /> -->
              5 reviews
            </div>
          </div>

          <q-rating
            size="32px"
            :max="5"
            v-model="stars"
          />
        </q-card-section>

        <!-- card body -->
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 text-red text-bold">
            ${{ selectedPic.price }}
          </div>

          <div class="text-caption text-grey">
            {{ $t('foodCaption') }}
          </div>
        </q-card-section>

        <q-separator />

        <!-- card footer -->
        <q-card-actions align="right">
          <q-form
            class="q-gutter-md"
            @submit="onSubmit"
          >
            <span ref="numberTo" />
            <q-input
              class="q-mb-xl"
              ref="number"
              type="number"
              :label="$t('number')"
              :rules="[val=>Number.isInteger(val) || $t('inputInterger'),
                       val=>val>0 || $t('inputInterger'),
                       val=>val<=100 || $t('inputLower100')
              ]"
              v-model.number="number"
              @focus="mobileToTop('number')"
            >
              <template v-slot:prepend>
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="remove"
                  :disable="number<1"
                  @click="count(-1)"
                />
              </template>

              <template v-slot:append>
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="add"
                  @click="count(1)"
                />
              </template>
            </q-input>

            <q-btn
              class="absolute"
              color="primary"
              icon="shopping_cart"
              style="right:0; top:60%"
              type="submit"
            />

            <q-btn
              flat
              v-close-popup
              class="absolute"
              style="right:75px; top:60%"
              type="button"
              :color="$q.dark.isActive?'white':'primary'"
              :label="$t('cancel')"
            />
          </q-form>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
      number: 1,
      openBuy: false,
      selectedPic: { name: 'fake', price: 0 },
      stars: 4
    }
  },

  computed: {
    ...mapState([
      'drawer',
      'tab'
    ]),

    menuNow () { // 判斷目前是三個菜單中的哪一個
      return this.$store.getters.menuNow;
    }
  },

  methods: {
    count (num) { // 計算購買數量
      this.number = Number(this.number) + num;
    },

    mobileToTop (target) {
      this.$refs[target + 'To'].scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    onSubmit (id) {
      this.$refs.number.validate();
      if (this.$refs.number.hasError) {
        this.formHasError = true;
      } else {
        this.$store.commit('historyMutate', false);
        this.$store.commit('cartMutate', {
          type: 'add',
          value: {
            ...this.selectedPic,
            number: this.number,
            itemID: this.selectedPic.id + Date.now()
          }
        });

        this.openBuy = false;
        this.number = 1;
        if (!this.drawer) {
          this.$q.notify({
            avatar: this.selectedPic.url,
            color: 'primary',
            message: `${this.$t(`${this.selectedPic.name}`)}` + ` ${this.$t('addToCart')}`,
            timeout: 2000,
            actions: [
              { label: this.$t('hide'), color: 'grey-13' },
              { label: this.$t('checkout'), color: 'white', handler: () => this.$store.commit('drawerMutate', true) }
            ]
          })
        }
      }
    },

    openCard (index) { // 打開商品Card
      this.openBuy = true;
      this.number = 1;
      this.selectedPic = this.menuNow[index];
    }
  }
}
</script>

<style>

</style>
