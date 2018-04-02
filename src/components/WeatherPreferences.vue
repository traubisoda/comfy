<template>
  <div class="weather-preferences">
    <div class="weather-preferences__item" v-for="prop in preferences" :key="prop.name">
      <label class="weather-preferences__item-label">{{prop.name}}</label>
      <input class="weather-preferences__item-input" type="number" v-model="prop.value">
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherPreferences',
  props: {
    preferences: Object,
  },
};
</script>

<style lang="scss" scoped>
  .weather-preferences {
    position: relative;
    display: flex;
    flex-direction: column;
    float: left;
    max-height: 20vh;
    z-index: 0;
    padding: 1em 0;
    background: #4e4e4e;
    color: #fff;
    margin-top: -12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    @media (max-width: 768px) {
      position: absolute;
      max-height: 50vh;
      overflow-y: scroll;
      bottom: -16px;
      left: 0;
      width: 100vw;
      border-radius: 0;
      z-index: 2;
    }
    &__item {
      margin-bottom: 6px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 10px 12px;
      @media (max-width: 768px) {
        flex-direction: column;
        padding: 0;
      }
      &-label {
        font-weight: 500;
        margin-bottom: 3px;
        flex: 1;
      }
      &-input {
        text-align: center;
        max-width: 80px;
        border-radius: 5px;
        outline: 0;
        border: 1px solid #fff;
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
            opacity: 1;
        }
      }
    }
  }
</style>
