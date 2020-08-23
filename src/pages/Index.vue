<template>
  <q-page class="justify-center">
    <div ref="top">
      <transition
        name='test'
        appear
      >
        <div
          style="flex-basis:100%"
          class="text-center"
        >
          <q-skeleton
            type="rect"
            width="1024px"
            height="70vh"
            v-show="!isLoad"
            style="display:inline-block"
          />

          <q-img
            src="https://res.cloudinary.com/barney4760/image/upload/v1596681194/Home/deliver_md_ro6c2n.jpg"
            srcset="https://res.cloudinary.com/barney4760/image/upload/v1596681194/Home/deliver_sm_qv63pi.jpg 640w,
              https://res.cloudinary.com/barney4760/image/upload/v1596681194/Home/deliver_md_ro6c2n.jpg 1280w,
              https://res.cloudinary.com/barney4760/image/upload/v1596681195/Home/deliver_lg_gphtcb.jpg 1920w"
            spinner-color="primary"
            spinner-size="82px"
            :style="coverWidth"
            :height="coverHeight"
            :position="coverPosition"
            class="relative"
            v-show="isLoad"
            @load="isLoad = true"
          >
            <transition
              name="caption"
              appear
            >
              <span
                class="cover-caption caption1"
                v-show="isLoad"
              >
                你想吃的
              </span>
            </transition>

            <transition
              name="caption2"
              appear
            >
              <span
                class="cover-caption caption2"
                v-show="caption2Animate"
              >
                我們都有
              </span>
            </transition>
          </q-img>
        </div>
      </transition>

      <div class="flex justify-center q-pa-sm">
        <div
          class="row q-py-sm q-col-gutter-lg"
          style="width:100%; max-width:1048px"
        >
          <div
            class="col-md-4 col-sm-4 col-xs-12"
            v-for="item in menu"
            :key="item.id"
          >
            <q-card
              class="card cursor-pointer"
              @click="toMenu(item.id)"
            >
              <q-img
                :src="item.url"
                :ratio="16/9"
              >
                <div class="absolute-full text-h5 text-bold flex flex-center hover-info">
                  {{ item.title }}
                </div>
              </q-img>
            </q-card>
          </div>
        </div>
      </div>

      <!-- <q-carousel
        animated
        arrows
        infinite
        swipeable
        style="max-width:1024px; margin: 0 auto;"
        transition-prev="slide-right"
        transition-next="slide-left"
        :autoplay="autoplay"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
        v-model="slide"
      >
        <q-carousel-slide
          :name="1"
          img-src="https://res.cloudinary.com/barney4760/image/upload/v1598067329/Home/taiwan_at94c1.jpg"
        >
          <div
            class="custom-caption"
            :class="$q.screen.lt.md?'absolute-top':'absolute-bottom'"
          >
            <div class="text-h2 text-bold">
              {{ $t('setA') }}
            </div>
            <div class="text-subtitle1 q-mt-xs">
              {{ $t('xiaoLongBao') }}+{{ $t('baboTea') }}
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          :name="2"
          img-src="https://res.cloudinary.com/barney4760/image/upload/v1598069187/Home/sushi_ofrp14.jpg"
          style="background-position: 40% 100%"
        >
          <div
            class="custom-caption"
            :class="$q.screen.lt.md?'absolute-top':'absolute-bottom'"
          >
            <div class="text-h2 text-bold">
              {{ $t('setB') }}
            </div>
            <div class="text-subtitle1 q-mt-xs">
              {{ $t('sushi') }}+{{ $t('matcha') }}
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          :name="3"
          img-src="https://res.cloudinary.com/barney4760/image/upload/v1598067905/Home/fast-food_gsdxrz.jpg"
          style="background-position: 10% 100%"
        >
          <div
            class="custom-caption"
            :class="$q.screen.lt.md?'absolute-top':'absolute-bottom'"
          >
            <div class="text-h2 text-bold">
              {{ $t('setC') }}
            </div>
            <div class="text-subtitle1 q-mt-xs">
              {{ $t('hamburger') }}+{{ $t('frenchFries') }}+{{ $t('coke') }}
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel> -->

      <!-- <div
        style="flex-basis:100%"
        class="text-center"
        v-show="!carouselLoad"
      >
        <q-skeleton
          type="rect"
          width="1024px"
          height="350px"
          style="display:inline-block"
        />
      </div> -->

      <!-- <div class="flex justify-center q-px-lg q-pb-lg q-mt-md">
        <div
          class="text-h5 text-bold q-mt-none q-pb-sm text-center"
          style="flex-basis:100%"
        >
          {{ $t('shopAddress') }}
        </div>

        <iframe
          width="100%"
          height="450"
          frameborder="0"
          :src="mapLink"
          allowfullscreen
          style="max-width:1024px; border:0"
        />
      </div> -->

      <q-page-scroller
        position="bottom-right"
        :scroll-offset="200"
        :offset="[15, 15]"
      >
        <q-btn
          fab
          glossy
          icon="keyboard_arrow_up"
          color="primary"
          @click="scrollTop()"
        />
      </q-page-scroller>
    </div>
  </q-page>
</template>

<script>
import key from '../api/googleKey';
export default {
  data () {
    return {
      caption2Animate: false,
      isLoad: false,
      key,
      mapLink: `https://www.google.com/maps/embed/v1/place?key=${key}&q=place_id:ChIJraeA2rarQjQRPBBjyR3RxKw`,
      slide: 1,
      autoplay: true
    }
  },
  computed: {
    coverPosition () {
      if (this.$q.screen.lt.lg) {
        return '60% 0%';
      } else {
        return '';
      }
    },

    coverHeight () {
      if (this.$q.screen.lt.lg) {
        return '75vh';
      } else {
        return '';
      }
    },

    coverWidth () {
      if (this.$q.screen.lt.lg) {
        return '';
      } else {
        return 'max-width:1024px';
      }
    },

    menu () {
      return [
        {
          id: 'east',
          url: 'https://res.cloudinary.com/barney4760/image/upload/v1595600818/east/xiaoLongBao_mcuqfp.jpg',
          title: this.$t('eastHome')
        },
        {
          id: 'west',
          url: 'https://res.cloudinary.com/barney4760/image/upload/v1595819323/west/hamburger_cqdwct.jpg',
          title: this.$t('westHome')
        },
        {
          id: 'drinks',
          url: 'https://res.cloudinary.com/barney4760/image/upload/v1595840072/drinks/babo-tea_rtrntr.jpg',
          title: this.$t('drinksHome')
        }
      ]
    }
  },

  methods: {
    toMenu (id) {
      this.$store.commit('tabMutate', id);
      this.$router.push({ name: 'Menu' });
    },

    scrollTop (smooth = true) {
      if (smooth) {
        this.$refs.top.scrollIntoView({ behavior: 'smooth', block: 'end' })
      } else {
        this.$refs.top.scrollIntoView({ block: 'end' })
      }
    }
  },

  watch: {
    isLoad (val) {
      if (val) {
        setTimeout(() => {
          this.caption2Animate = true;
        }, 1000);
      }
    }
  }
}
</script>

<style lang="scss">
.test-enter-active{
  animation: fadeIn 1.5s forwards;
}

.caption-enter-active{
  animation: fadeInDown 1.5s forwards;
}

.caption2-enter-active{
  animation: fadeInDown 1.5s forwards;
}

.custom-caption{
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}

.card:hover{
  .hover-info{
    visibility: hidden;
  }
}

.cover-caption{
  position: absolute;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  writing-mode: vertical-rl;
  text-shadow: 1px 1px 5px black;
}

.caption1{
  top: 50px;
  right: 100px;
}

.caption2{
  top: 195px;
  right: 200px;
}

@media screen and (max-width:480px) {
  .cover-caption{
    font-size: 2rem;
  }

  .caption1{
    top: 50px;
    right: 25px;
  }

  .caption2{
    top: 115px;
    right: 75px;
  }
}
</style>
