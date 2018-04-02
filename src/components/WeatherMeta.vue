<template>
  <div>
    {{weatherData.name}}
    {{isComfy ? 'Comfy' : 'Not comfy'}}
  </div>
</template>

<script>
export default {
  name: 'WeatherMeta',
  props: {
    weatherData: Object,
    isComfy: Boolean,
  },
};
</script>
