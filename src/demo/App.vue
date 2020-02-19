<template>
  <div id="app">
    <figure style="background-color: #404a59;">
      <chart
        :options="map"
        :init-options="initOptions"
        ref="map"
        autoresize
      />
    </figure>
  </div>
</template>

<script>
import ECharts from '../components/ECharts.vue'
import 'echarts/lib/chart/map'
import map from './data/map'

// built-in theme
import 'echarts/theme/dark'

// custom theme
import theme from './theme.json'

// Map of China
import chinaMap from './china.json'

// registering map data
ECharts.registerMap('china', chinaMap)

// registering custom theme
ECharts.registerTheme('ovilia-green', theme)

export default {
  name: 'App',
  components: {
    chart: ECharts
  },
  data () {
    return {
      map,
      initOptions: {
        renderer: 'canvas'
      },
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
