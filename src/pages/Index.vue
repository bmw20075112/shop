<template>
  <div class="q-pa-md flex">
    <div
      class="row"
      v-for="item in menu"
      :key="item.id"
    >
      <q-card class="my-card">
        <q-img
          src="https://cdn.quasar.dev/img/mountains.jpg"
          :ratio="16/9"
          spinner-color="primary"
          spinner-size="82px"
        />
        <q-card-section>
          <div class="text-h6">
            Our Changing Planet
          </div>
          <div class="text-subtitle2">
            by John Doe
          </div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
    </div>
    <!-- <q-carousel
        arrows
        animated
        v-model="slide"
        height="300px"
      >
        <q-carousel-slide
          name="first"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">
              First stop
            </div>
            <div class="text-subtitle1">
              Mountains
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="second"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">
              Second stop
            </div>
            <div class="text-subtitle1">
              Famous City
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="third"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">
              Third stop
            </div>
            <div class="text-subtitle1">
              Famous Bridge
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 'first',
      menu: [
        { id: 'east', url: '', title: '' },
        { id: 'west', url: '', title: '' },
        { id: 'drinks', url: '', title: '' }
      ]
    }
  }
}
</script>

<style lang="scss">
.test-enter-active{
  animation: fadeInDown 1s forwards;
}

.custom-caption{
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}
</style>
