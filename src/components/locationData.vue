  <template>
    <div class="w-max-[1920px] h-screen overflow-hidden">    
      
      <div class="flex items-center justify-center bottom-0 absolute left-[20%]" v-if="state.error !== null">
        <div class="bg-[#FFE1BA] px-[100px] py-[15px] rounded-[25px] z-[9999]">
          {{ state.error }}
        </div>
      </div>
  
      <div class="w-max-[1920px]" v-if="latandlon.lon !== null">
        <div
          class="leftPage text-white bottom-0 absolute ml-[178px] mb-[200px] items-center justify-center flex flex-col"
        >
          <div class="flex items-center justify-center">
            <div>
              <p class="text-[110px]">{{ Math.floor(state.temp_big) }}°</p>
            </div>

            <div class="ml-[50px]">
              <p class="text-[60px]">
                {{ state.Country }} {{ state.CountryName }}
              </p>
              <div class="flex text-[25px]">
                <p>{{ state.dt }}</p>
              </div>
            </div>
  
            <div class="flex flex-col items-center relative ml-[50px]">
              <img :src="state.icon" />
              <p class="absolute mt-[100px] text-[22px] font-bold w-[300px] items-center justify-center flex flex-col">
                {{ state.main_name }}
                <p class="text-[16px]">
                    {{ state.main_des }}
                </p>   
              </p>
            </div>
          </div>
  
          <div class="mr-[30px] flex mt-[40px] items-center">
            <div class="mr-[70px]">
              <p class="mb-[10px]">Humidity</p>
              <div class="flex">
                <img src="../public/image/drop-icon.svg" />
                <p class="ml-[46px]">{{ Math.floor(state.humudity) }} %</p>
              </div>
            </div>
  
            <div class="mr-[70px]">
              <p class="mb-[10px]">Pressure</p>
              <div class="flex">
                <img src="../public/image/wind-icon.svg" />
                <p class="ml-[46px]">{{ Math.floor(state.wind) }} km/h</p>
              </div>
            </div>
  
            <div>
              <p class="mb-[10px]">Feels Like</p>
              <div class="flex">
                <img width="30" src="../public/image/Thermometer-icon.svg" />
                <span class="flex">
                  <p class="ml-[46px]">{{ Math.floor(state.temp) }}°</p>
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
import {  reactive, onMounted } from "vue";
import axios from "axios";

const state = reactive({
  CountryName: null,
  Country: null,
  bigFetchData: null,
  humudity: null,
  wind: null,
  temp: null,
  temp_big: null,
  main_name: null,
  main_des: null,
  dt: null,
  error: null,
  icon: null,
});

const latandlon = reactive({
  lat: null,
  lon: null,
});

async function getUserLocation() {
  if (navigator.geolocation) {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    latandlon.lat = position.coords.latitude;
    latandlon.lon = position.coords.longitude;
  } else {
    
  }

  const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latandlon.lat}&lon=${latandlon.lon}&appid=b1b15e88fa797225412429c1c50c122a1`;
  console.log(url)
  try {
    const bigData = await axios.get(url);
    state.bigFetchData = bigData.data;
    (state.wind = bigData.data.list[0].wind.speed * 3), 6;
    state.temp = bigData.data.list[0].main.feels_like + -272.15;
    state.humudity = bigData.data.list[0].main.humidity;
    state.temp_big = bigData.data.list[0].main.temp + -272.15;
    state.main_name = bigData.data.list[0].weather[0].main;
    const dataDes = bigData.data.list[0].weather[0].description;
    state.main_des = dataDes.charAt(0).toUpperCase() + dataDes.slice(1);

    console.log(dataDes)

    state.dt = bigData.data.list[0].dt_txt.slice(0, 16);
    const iconURL = "https://openweathermap.org/img/wn/" + bigData.data.list[0].weather[0].icon + "@2x.png";
    state.icon = iconURL
  } catch (error) {
    console.error(error);
  }

  const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${
    latandlon.lat
  }&lon=${latandlon.lon}&appid=${import.meta.env.VITE_API}`;
  try {
    const countryData = await axios.get(url2);
    state.Country = countryData.data.sys.country;
    state.CountryName = countryData.data.name;
  } catch {
    console.log(error);
  }
}

function errorCallback(error) {
  state.error = `If you provide a location, you can automatically see the weather for your location.`
  console.log(error)
}


navigator.geolocation.getCurrentPosition(getUserLocation, errorCallback);
</script>