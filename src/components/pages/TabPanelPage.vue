<template>
  <div>
    <div class="row q-col-gutter-md">
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
        v-for="(food, index) in menuNow"
        :key="food.id"
      >
        <q-card
          class="cursor-pointer"
          :class="$q.dark.isActive?'bg-blue-grey-10':''"
          @click="openCard(index)"
        >
          <q-img
            :src="food.url"
            :ratio="16/9"
            spinner-color="primary"
            spinner-size="32px"
          />
          <q-card-section>
            <div class="text-h6 text-orange q-pb-xs font-weight-black">
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

    <q-dialog
      v-model="openBuy"
    >
      <q-card
        class="my-card"
        :class="$q.dark.isActive?'bg-blue-grey-10':''"
      >
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
            {{ $t('foodCaption') }}
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
              :label="$t('number')"
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
      selectedPic: { name: 'fake', price: 0 }
    }
  },

  computed: {
    menuNow () {
      if (this.tab === 'east') {
        return this.$store.state.menu.eastMenu;
      } else if (this.tab === 'west') {
        return this.$store.state.menu.westMenu;
      } else if (this.tab === 'drinks') {
        return this.$store.state.menu.drinksMenu;
      }
      return null;
    },

    tab () {
      return this.$store.state.tab;
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
          message: `${this.$t(`${this.selectedPic.name}`)}` + ` ${this.$t('addToCart')}`,
          avatar: this.selectedPic.url,
          actions: [
            { label: this.$t('hide'), color: 'red' },
            { label: this.$t('checkout'), color: 'primary', handler: () => this.$store.commit('drawerMutate', true) }
          ]
        })
      }
    },

    openCard (index) {
      this.openBuy = true;
      this.number = 1;
      this.selectedPic = this.menuNow[index];
    }
  }
}
</script>

<style>

</style>
