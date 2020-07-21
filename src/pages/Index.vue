<template>
  <q-page>
    <div
      class="relative-position"
    >
      <q-img
        srcset="
        https://res.cloudinary.com/barney4760/image/upload/v1595177151/Home/home-1-medium_k8wtlh.jpg 1280w,
        https://res.cloudinary.com/barney4760/image/upload/v1595177151/Home/home-1-large_sto7gj.jpg 1920w"
        src="https://res.cloudinary.com/barney4760/image/upload/v1595177151/Home/home-1-medium_k8wtlh.jpg"
        spinner-color="primary"
        spinner-size="82px"
        position="50% 40%"
        style="height:100vh"
      />
      <div class="home-text">
        Eat At Home
      </div>
    </div>
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

.home-text{
  color: white;
  text-shadow: 3px 3px 10px black;
  font-size: 5vw;
  padding: 16px;
  line-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

</style>
