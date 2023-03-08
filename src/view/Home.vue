<template>
  <div class="w-max-[1920px] h-screen overflow-hidden">
    <homeHeader></homeHeader>
    <div class="absolute -z-50 h-screen bg-black overflow-hidden">
      <div class="bg-blur w-full h-screen"></div>
      <img src="../public/image/homebg.jpg" width="8000" />
    </div>
    <homeMenu></homeMenu>
    <locationData></locationData>
  </div>
</template>

<style>
.Link {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #ffff;
}
.bg-blur {
  position: absolute;
  z-index: 999;
  background: linear-gradient(
    144.95deg,
    rgba(188, 91, 1, 0.5) 0%,
    rgba(147, 79, 0, 0) 100%
  );
  filter: blur(500px);
}
</style>

<script setup>
import locationData from "../components/locationData.vue";
import homeHeader from "../components/homeHeader.vue";
import homeMenu from "../components/homeMenu.vue";
</script>
