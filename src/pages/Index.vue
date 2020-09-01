<template>
  <q-page class="justify-center">
    <div ref="top" />
    <transition
      name='fade'
      appear
    >
      <div
        style="flex-basis:100%"
        class="text-center"
      >
        <q-skeleton
          height="70vh"
          style="margin:0 auto"
          type="rect"
          width="1024px"
          v-show="skeletonShow"
        />

        <q-img
          class="relative"
          src="https://res.cloudinary.com/barney4760/image/upload/v1596681194/Home/deliver_md_ro6c2n.jpg"
          srcset="https://res.cloudinary.com/barney4760/image/upload/v1596681194/Home/deliver_sm_qv63pi.jpg 640w,
              https://res.cloudinary.com/barney4760/image/upload/v1596681194/Home/deliver_md_ro6c2n.jpg 1280w,
              https://res.cloudinary.com/barney4760/image/upload/v1596681195/Home/deliver_lg_gphtcb.jpg 1920w"
          spinner-color="primary"
          spinner-size="82px"
          :height="coverHeight"
          :position="coverPosition"
          :style="coverWidth"
          v-show="isLoad"
          @load="isLoad = true; skeletonShow=false"
        >
          <!-- text animation 1 -->
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

          <!-- text animation 2 -->
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

    <!-- Menu card -->
    <div class="flex justify-center q-pa-sm">
      <div
        class="row q-py-sm q-col-gutter-lg"
        style="width:100%; max-width:1048px"
      >
        <div
          class="col-md-4 col-sm-12 col-xs-12"
          :key="item.id"
          v-for="(item, index) in menu"
          @mouseover="$set(hover,index,true)"
          @mouseleave="$set(hover,index,false)"
        >
          <q-card
            class="card cursor-pointer"
            @click="toMenu(item.id)"
          >
            <q-img
              :ratio="16/9"
              :src="item.url"
            >
              <div
                class="absolute-full text-bold flex flex-center hover-info"
                :class="hover[index]?'text-h4':'text-h5'"
              >
                {{ item.title }}
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Page scroller -->
    <q-page-scroller
      position="bottom-right"
      :offset="[15, 15]"
      :scroll-offset="200"
    >
      <q-btn
        glossy
        fab
        color="primary"
        icon="keyboard_arrow_up"
        @click="scrollTop()"
      />
    </q-page-scroller>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      autoplay: true,
      caption2Animate: false,
      hover: [false, false, false],
      isLoad: false,
      skeletonShow: true,
      slide: 1
    }
  },

  computed: {
    coverHeight () {
      if (this.$q.screen.lt.lg) {
        return '75vh';
      } else {
        return '70vh';
      }
    },

    coverPosition () {
      if (this.$q.screen.lt.lg) {
        return '60% 0%';
      } else {
        return '50% 0%';
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
    scrollTop (smooth = true) {
      if (smooth) {
        this.$refs.top.scrollIntoView({ behavior: 'smooth', block: 'end' })
      } else {
        this.$refs.top.scrollIntoView({ block: 'end' })
      }
    },

    toMenu (id) {
      this.$store.commit('tabMutate', id);
      this.$router.push({ name: 'Menu' });
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
.fade-enter-active{
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

.hover-info{
  transition: 0.5s ease;
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
