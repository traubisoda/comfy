<template>
  <div id="app">
    <WeatherProgress v-if="weatherStatus !== 'loaded'" v-bind:progress="weatherStatus"/>
    <div v-else class="weather-wrapper">
      <!-- <WeatherMeta v-bind:weatherData="weatherData" v-bind:isComfy="isComfy" /> -->
      <WeatherCard  v-bind:weatherData="weatherData"
                    v-bind:isComfy="isComfy"
                    v-bind:showPreferences="showPreferences"
                    v-on:togglePreferences="togglePreferences"/>
      <transition name="slide">
        <WeatherPreferences v-show="showPreferences"
                            v-bind:preferences="preferences"/>
      </transition>
    </div>
  </div>
</template>

<script>
import WeatherProgress from 'comfy/components/WeatherProgress';
import WeatherStore from 'comfy/utils/WeatherStore';
import WeatherCard from 'comfy/components/WeatherCard';
import WeatherMeta from 'comfy/components/WeatherMeta';
import WeatherPreferences from 'comfy/components/WeatherPreferences';
import Vue from 'vue';

const store = new Vue({
  data: WeatherStore,
});

export default {
  name: 'App',
  components: {
    WeatherProgress, WeatherCard, WeatherMeta, WeatherPreferences,
  },
  data() {
    return {
      showPreferences: false,
      lat: undefined,
      lon: undefined,
      weatherData: undefined,
      weatherStatus: 'waiting',
      preferences: {
        temperatureMin: {
          name: 'Minimum tempreature',
          value: 0,
        },
        temperatureMax: {
          name: 'Maximum temperature',
          value: 0,
        },
        humidityMin: {
          name: 'Minimum humidity',
          value: 0,
        },
        humidityMax: {
          name: 'Maximum humidity',
          value: 0,
        },
        pressureMin: {
          name: 'Minimum pressure',
          value: 0,
        },
        pressureMax: {
          name: 'Maximum pressure',
          value: 0,
        },
      },
    };
  },
  computed: {
    isComfy() {
      const { temp, humidity, pressure } = this.weatherData.main;
      const {
        temperatureMin, temperatureMax, humidityMin, humidityMax, pressureMin, pressureMax,
      } = this.preferences;

      return temp >= temperatureMin.value
        && temp <= temperatureMax.value
        && humidity >= humidityMin.value
        && humidity <= humidityMax.value
        && pressure >= pressureMin.value
        && pressure <= pressureMax.value;
    },
  },
  methods: {
    getLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
        this.weatherStatus = 'locating';
      });
    },
    fetchWeather() {
      this.getLocation()
        .then((position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.weatherStatus = 'fetching';
          return store.getWeatherData(this.lat, this.lon);
        })
        .then((response) => {
          this.weatherData = response.data;
          this.weatherStatus = 'loaded';
        });
    },
    togglePreferences() {
      this.showPreferences = !this.showPreferences;
    },
  },
  mounted() {
    this.fetchWeather();
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weather-wrapper {
  display: flex;
  flex-direction: column;
}
.slide-enter-active,
.slide-leave-active {
    transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  @media (max-width: 768px) {
    transform: translateY(50vh);
  }
  transform: translateY(-20vh);
}
</style>
