<template>
  <q-page class="justify-center">
    <transition
      name='test'
      appear
    >
      <div
        style="flex-basis:100%"
        class="text-center"
      >
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
          @load="isLoad = true"
        >
          <!-- <transition
            name="caption"
          > -->
          <span
            class="cover-caption caption1"
            v-show="isLoad"
          >
            你想吃的
          </span>
          <!-- </transition> -->

          <span class="cover-caption caption2">
            我們都有
          </span>
        </q-img>
      </div>
    </transition>

    <div class="flex justify-center q-pa-sm">
      <div
        class="row q-py-sm q-col-gutter-lg"
        style="width:100%; max-width:1040px"
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
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      isLoad: false
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
