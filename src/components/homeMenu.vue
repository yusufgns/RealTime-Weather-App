<template>

  <div class="absolute right-0 w-[640px] text-white">
    <div class="h-screen w-full flex flex-col">
      <div class="menu-color absolute h-screen w-full z-[9998]"></div>
      <div class="absolute menu-blur h-screen w-full z-[9998]"></div>
      <span class="pl-[10%] pr-[10%] z-[9999] mt-[100px]">
        <div class="flex w-full items-center">
          <input
            class="menuInput h-[50px] z-[99999] w-full px-[20px] bg-transparent"
            placeholder="Latitude and longitude or city name..."
            type="text"
            v-model="searchQuery"
            @keyup.enter="fetchData"
          />
          
          <img class="absolute right-[13%]" src="../public/image/search-icon.svg">
        </div>
      </span>

      <span class="listMenu z-[9999] overflow-auto" v-if="latandlon.lon !== null">
        <div class="pl-[10%] pr-[10%] z-[9999]">
        <h1 class="h1Header font-bold text-[26px] py-[33px] text-white text-opacity-70">
          4 Days of 96 Data
        </h1>

        <div v-if="states" v-for="(state, index) in states" :key="index" :class="[index % 2 === 0 ? 'even' : 'odd']">
            <div class="flex text-white text-opacity-70 justify-between h-[60px] items-center text-[22px] px-[28px] font-bold">
              <p class="flex items-center">{{ Math.floor(state.main.temp -272.15)}}° <p>{{ state.weather[0].main}}</p></p>
              <p>{{ (state.dt_txt).slice(0, 16) }}</p>
            </div>
        </div>
      </div>
      </span>
      <div v-if="latandlon.lon !== null" class="flex z-[9999] items-center justify-center pb-[50px]">
        <button class="mt-[15px] text-[14px] font-bold bg-gray-400 bg-opacity-50 px-[30px]
        py-2 rounded-xl" >Scroll Fown For More</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.even {
  background-color: rgba(67, 67, 67, 35%);
}

.listMenu {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.listMenu::-webkit-scrollbar {
  display: none;
}
.odd {
  background-color: transparent;
}

.menuInput {
  border-bottom: 2px solid #a0a0a0;
  outline: none;
}
.menu-color {
  background: rgba(255, 255, 255, 0.1);
  mix-blend-mode: luminosity;
  opacity: 0.8;
  backdrop-filter: blur(50px);
}
.menu-blur {
  background: #14284f;
  filter: blur(400px);
}
</style>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

const searchQuery = ref("");
/*const state = reactive({
  CountryName: null,
  Country: null,
  bigFetchData: null,
  humudity: null,
  wind: null,
  temp: null,
  temp_big: null,
  main: null,
  dt: null,
  error: null,
  icon: null,
});*/

const states = ref({});

const latandlon = reactive({
  lat: null,
  lon: null,
});

async function fetchData(e) {
  const response1 = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${
      searchQuery.value
    }&limit=5&appid=${import.meta.env.VITE_API}`
  );
  latandlon.lat = response1.data[0]?.lat;
  latandlon.lon = response1.data[0]?.lon;

  const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latandlon.lat}&lon=${latandlon.lon}&appid=b1b15e88fa797225412429c1c50c122a1`;
  console.log(url);
  try {
    const bigData = await axios.get(url);
    states.value = bigData.data.list
    
  } catch (error) {
    console.error(error);
  }
  searchQuery.value = "";
}
</script>
