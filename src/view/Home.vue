<template>
  {{ state.smalFetchData.main }}
  {{ state.smalFetchData.wind }}
  {{ state.smalFetchData.weather }}
  {{ state.Country.name }}
  {{ state.Country.country }}
  <input type="text" v-model="searchQuery" @keyup.enter="fetchData" />

  <div class="w-max-[1920px] h-screen overflow-hidden">
    <!--Background-->
    <div class="absolute -z-50 h-screen bg-black overflow-hidden">
      <div class="bg-blur w-full h-screen"></div>
      <img src="../public/image/homebg.jpg" width="8000" />
    </div>

    <div class="absolute pl-[100px] pt-[100px]">
      <RouterLink class="Link" to="/">Home</RouterLink>
      <RouterLink class="Link ml-6" to="/maps">Location Maps</RouterLink>
    </div>
    <RouterView></RouterView>

    <div class="w-max-[1920px]">
      <div
        class="leftPage text-white bottom-0 absolute ml-[178px] mb-[200px] items-center justify-center flex flex-col"
      >
        <div class="flex items-center justify-center">
          <div>
            <p class="text-[110px]">24°</p>
          </div>

          <div class="ml-[20px] ml-[29px]">
            <p class="text-[60px]">Istanbul</p>
            <div class="flex text-[25px]">
              <p>06:09 AM</p>
              <p>-</p>
              <p>Monday</p>
              <p>,</p>
              <p>9 Sep 23</p>
            </div>
          </div>

          <div class="flex flex-col items-center relative">
            <img src="../public/image/sunny-icon.svg" />
            <p class="absolute mt-[120px] text-[22px] font-bold">Sunny</p>
          </div>
        </div>

        <div class="flex mt-[15px] items-center">
          <div class="mr-[70px]">
            <p>Humidity</p>
            <div class="flex">
              <img src="../public/image/drop-icon.svg" />
              <p class="ml-[46px]">43%</p>
            </div>
          </div>

          <div class="mr-[70px]">
            <p>Pressure</p>
            <div class="flex">
              <img src="../public/image/wind-icon.svg" />
              <p class="ml-[46px]">1016 hPa</p>
            </div>
          </div>

          <div class="mr-[70px]">
            <p>Visibility</p>
            <div class="flex">
              <img src="../public/image/Show-icon.svg" />
              <p class="ml-[46px]">10km</p>
            </div>
          </div>

          <div>
            <p>Feels Like</p>
            <div class="flex">
              <img width="30" src="../public/image/Thermometer-icon.svg" />
              <span class="flex">
                <p class="ml-[46px]">18°</p>
                <p>c</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.hr {
  width: 100%;
  height: 2px;
  background-color: #a0a0a0;
  margin-top: 46px;
  margin-bottom: 46px;
}
.rightMenu2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 9999;
}
.leftİnput {
  appearance: none;
  width: 80%;
  height: 30px;
  outline: none;
  background-color: transparent;
  border-bottom: 2px solid #a0a0a0;
  color: white;
  padding: 20px 27px;
}
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

.rightMenu-bg {
  background: rgba(255, 255, 255, 0.1);
  mix-blend-mode: luminosity;
  opacity: 0.8;
  backdrop-filter: blur(50px);
}

.rightMenu-blur {
  background: #14284f;
  filter: blur(400px);
}
</style>

<script setup>
import { ref, reactive, onMounted} from "vue";
import axios from "axios";

const searchQuery = ref('');
const state = reactive({
  smalFetchData: [],
  Country: [],
  bigFetchData: [],
});
//https://api.openweathermap.org/data/2.5/weather?lat=${latData.value}&lon=${lonData.value}&appid=5576aaead41a83e37e1a4d7df061a13b
//https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=41.0091982&lon=28.9662187&appid=b1b15e88fa797225412429c1c50c122a1


async function fetchData() {
  const dataKey = "5576aaead41a83e37e1a4d7df061a13b"
  const response1 = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=5&appid=${dataKey}`);
  state.Country = response1.data[0]
  console.log(response1.data[0]);

  const lat = response1.data[0]?.lat;
  const lon = response1.data[0]?.lon;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${dataKey}`

  console.log(url)

  const smallData = await axios.get(url);
  state.smalFetchData = smallData.data
  console.log(smallData.data)

  const url2 = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=b1b15e88fa797225412429c1c50c122a1`
  console.log(url2)
  const bigData = await axios.get(url2);
  state.bigFetchData = bigData.data
  console.log(bigData.data)
}

</script>
