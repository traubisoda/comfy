<template>
  <div class="progress">
    {{ progress }}
  </div>
</template>

<script>
export default {
  name: 'WeatherProgress',
  props: {
    progress: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
