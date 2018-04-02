<template>
  <div class="weather-card">
    <div class="weather-card__head">
      <div class="weather-card__meta">
        <SettingsButton v-bind:onClick="togglePreferences" class="weather-card__settings"/>
        <i :class="[iconClass, 'weather-card__main-icon']"></i>
        <span class="weather-card__weather-type">{{weatherData.weather[0].main}}</span>
        <div>{{weatherData.name}}</div>
      </div>
      <div :class="[
        'weather-card__comfy',
        isComfy ? 'weather-card__comfy--green' : 'weather-card__comfy--red'
      ]">
        {{isComfy ? 'Comfy' : 'Not comfy'}}
      </div>
    </div>
    <div class="weather-card__body">
      <div class="weather-card__weather-detail">
        <i class="wi wi-thermometer weather-card__weather-detail-icon"></i>
        {{weatherData.main.temp}} °C
      </div>
      <div class="weather-card__weather-detail">
        <i class="wi wi-humidity weather-card__weather-detail-icon"></i>
        {{weatherData.main.humidity}} %
      </div>
      <div class="weather-card__weather-detail">
        <i class="wi wi-barometer weather-card__weather-detail-icon"></i>
        {{weatherData.main.pressure}} hPa
      </div>
    </div>
  </div>
</template>

<script>
import WeatherIconFactory from 'comfy/utils/WeatherIconFactory';
import SettingsButton from 'comfy/components/SettingsButton';
import 'comfy/assets/css/weather-icons.min.css';

export default {
  name: 'WeatherCard',
  components: {
    SettingsButton,
  },
  props: {
    weatherData: Object,
    isComfy: Boolean,
  },
  computed: {
    iconClass() {
      const icon = WeatherIconFactory(this.weatherData.weather[0].id);
      return `wi wi-fw wi-${icon}`;
    },
  },
  methods: {
    togglePreferences() {
      this.$emit('togglePreferences');
    },
  },
};
</script>

<style lang="scss" scoped>
  .weather-card {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 1;
    @media (min-width: 769px) {
      height: 40vh;
      width: 50vw;
      border: 1px solid #dedede;
      border-radius: 12px;
      background: #fefefe;
      padding: 12px;
      -webkit-box-shadow: 0px 10px 34px -8px rgba(0, 0, 0, 0.28),
        0px 2px 12px -2px rgba(0, 0, 0, 0.14);
      -moz-box-shadow: 0px 10px 34px -8px rgba(0, 0, 0, 0.28),
        0px 2px 12px -2px rgba(0, 0, 0, 0.14);
      box-shadow: 0px 10px 34px -8px rgba(0, 0, 0, 0.28),
        0px 2px 12px -2px rgba(0, 0, 0, 0.14);
    }
  }
  .weather-card__main-icon {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    &:before {
      font-size: 3em;
    }
  }
  .weather-card__weather-type {
    font-size: 3em;
  }
  .weather-card__head {
    flex: 2;
    display: flex;
    flex-direction: column;
  }
  .weather-card__body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  .weather-card__weather-detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 30%;
    &:not(:first-child) {
      border-left: 1px solid #dedede;
    }
    &-icon {
      height: 30px;
      &::before {
      font-size: 1.5em;
    }
    }
  }
  .weather-card__meta {
    flex: 1;
  }
  .weather-card__comfy {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4em;
    &--green {
      color: #bada55;
    }
    &--red {
      color: #cc3300;
    }
  }
  .weather-card__settings {
    position: absolute;
    right: 0;
    background: transparent;
    border: 0;
    outline: 0;
  }
</style>
