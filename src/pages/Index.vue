<template>
  <q-page>
    <picture>
      <source
        type="image/webp"
        srcset="https://res.cloudinary.com/barney4760/image/upload/v1595177504/Home/home-1-small_zuuwl2.webp 640w,
                https://res.cloudinary.com/barney4760/image/upload/v1595177504/Home/home-1-medium_ynzvd7.webp 1280w,
                https://res.cloudinary.com/barney4760/image/upload/v1595177504/Home/home-1-large_zpe5dx.webp 1920w"
      >

      <source
        srcset="https://res.cloudinary.com/barney4760/image/upload/v1595177151/Home/home-1-small_iwzy88.jpg 640w,
                https://res.cloudinary.com/barney4760/image/upload/v1595177151/Home/home-1-medium_k8wtlh.jpg 1280w,
                https://res.cloudinary.com/barney4760/image/upload/v1595177151/Home/home-1-large_sto7gj.jpg 1920w"
      >

      <img
        src="https://res.cloudinary.com/barney4760/image/upload/v1595177151/Home/home-1-small_iwzy88.jpg"
        alt=""
      >
    </picture>
    <!-- <q-img
      src="~assets/home-1-medium.jpg"
      :ratio="16/9"
      spinner-color="primary"
      spinner-size="82px"
      height="40vh"
      position="0% 30%"
    /> -->
  </q-page>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.test-enter-active{
  animation: fadeInDown 1s forwards;
}
</style>
