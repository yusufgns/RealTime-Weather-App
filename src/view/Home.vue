<template>
  <input
    class="bg-red-200"
    type="text"
    v-model="searchQuery"
    @keyup.enter="fetchData"
  />


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
            <p class="text-[110px]">
              {{ Math.floor(state.temp_big + -272.15) }}°
            </p>
          </div>

          <div class="ml-[20px] ml-[29px]">
            <p class="text-[60px]">
              {{ state.Country }} {{ searchQuery }}
            </p>
            <div class="flex text-[25px]">
              <p>{{ state.dt }}</p>
            </div>
          </div>

          <div class="flex flex-col items-center relative">
            <img src="../public/image/sunny-icon.svg" />
            <p class="absolute mt-[120px] text-[22px] font-bold">
              {{ state.main }}
            </p>
          </div>
        </div>

        <div class="mr-[30px] flex mt-[15px] items-center">
          <div class="mr-[70px]">
            <p class="mb-[10px]">Humidity</p>
            <div class="flex">
              <img src="../public/image/drop-icon.svg" />
              <p class="ml-[46px]">{{ state.humudity * 1 }} %</p>
            </div>
          </div>

          <div class="mr-[70px]">
            <p class="mb-[10px]">Pressure</p>
            <div class="flex">
              <img src="../public/image/wind-icon.svg" />
              <p class="ml-[46px]">{{ state.wind * 3.6 }} km/h</p>
            </div>
          </div>

          <div>
            <p class="mb-[10px]">Feels Like</p>
            <div class="flex">
              <img width="30" src="../public/image/Thermometer-icon.svg" />
              <span class="flex">
                <p class="ml-[46px]">{{ Math.floor(state.temp + -272.15) }}°</p>
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
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";

const searchQuery = ref("");
const state = reactive({
  Country: [],
  bigFetchData: [],
  humudity: [],
  wind: [],
  temp: null,
  temp_big: null,
  main: null,
  dt: null,
});

const date = () => {
  const time = state.dt;
  const time_date = charAt(time.lenght - 4);
};
//https://api.openweathermap.org/data/2.5/weather?lat=${latData.value}&lon=${lonData.value}&appid=5576aaead41a83e37e1a4d7df061a13b
//https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=41.0091982&lon=28.9662187&appid=b1b15e88fa797225412429c1c50c122a1

const latandlon = reactive({
  lat: null,
  lon: null,
});

async function getUserLocation(){
  if (navigator.geolocation) {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    latandlon.lat = position.coords.latitude;
    latandlon.lon = position.coords.longitude;
  } else {
    console.error("Geolocation is not supported by this browser.");
  }

  const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latandlon.lat}&lon=${latandlon.lon}&appid=b1b15e88fa797225412429c1c50c122a1`;
  try {
    const bigData = await axios.get(url);
    state.bigFetchData = bigData.data;
    state.wind = bigData.data.list[0].wind.speed;
    state.temp = bigData.data.list[0].main.feels_like;
    state.humudity = bigData.data.list[0].main.humidity;
    state.temp_big = bigData.data.list[0].main.temp;
    state.main = bigData.data.list[0].weather[0].main;
    state.dt = bigData.data.list[0].dt_txt.slice(0, 16);
    console.log(bigData.data.list[0])
  } catch (error) {
    console.error(error);
  }

  const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latandlon.lat}&lon=${latandlon.lon}&appid=${import.meta.env.VITE_API}`
  try {
    const countryData = await axios.get(url2)
    state.Country = countryData.data.sys.country
    console.log(state.Country)
  } catch {

  }
};

async function fetchData() {
  const response1 = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${
      searchQuery.value
    }&limit=5&appid=${import.meta.env.VITE_API}`
  );
  state.Country = response1.data[0].country;
  console.log(response1.data[0])
  latandlon.lat = response1.data[0]?.lat;
  latandlon.lon = response1.data[0]?.lon;

  const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latandlon.lat}&lon=${latandlon.lon}&appid=b1b15e88fa797225412429c1c50c122a1`;
  try {
    const bigData = await axios.get(url);
    state.bigFetchData = bigData.data;
    state.wind = bigData.data.list[0].wind.speed;
    state.temp = bigData.data.list[0].main.feels_like;
    state.humudity = bigData.data.list[0].main.humidity;
    state.temp_big = bigData.data.list[0].main.temp;
    state.main = bigData.data.list[0].weather[0].main;
    state.dt = bigData.data.list[0].dt_txt.slice(0, 16);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getUserLocation();
});

</script>
