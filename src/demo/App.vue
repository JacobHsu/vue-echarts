<template>
  <div id="app">
    <!-- <figure style="background-color: #404a59;">
      <chart
        :options="map"
        :init-options="initOptions"
        ref="map"
        autoresize
      />
    </figure> -->

    <h2 id="flight">
      <a href="#flight">Manual updates</a>
      <button
        :class="{
          round: true,
          expand: expand.flight
        }"
        @click="expand.flight = !expand.flight"
        aria-label="toggle"
      ></button>
    </h2>
    <section v-if="expand.flight">
      <p>
        <small
          >You may use <code>manual-update</code> prop for performance critical
          use cases.</small
        >
      </p>
      <p><button :disabled="flightLoaded" @click="loadFlights">Load</button></p>
      <figure>
        <chart
          ref="worldMap"
          :init-options="initOptions"
          :options="worldMapOptions"
          autoresize
        />
      </figure>
      <br>
      <figure style="background-color: #003;">
        <chart
          ref="flight"
          :init-options="initOptions"
          :options="flightOptions"
          autoresize
        />
      </figure>
    </section>

  </div>
</template>

<script>
import buildMapConfig from './data/config_map'
import ECharts from '../components/ECharts.vue'
import 'echarts/lib/chart/map'
import 'echarts/map/js/world'
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
      expand: {
        flight: true
      },
      flightLoaded: false,
      flightOptions: null,
      worldMapOptions: null
    }
  },
  mounted () {
    const { worldMap } = this.$refs
    worldMap.hideLoading()

    this.worldMapOptions = {
      title: {
        text: 'World Map',
        left: 'center',
        textStyle: {
          color: '#eee'
        }
      },
      backgroundColor: 'LightBlue',
      geo: {
        map: 'world',
        left: 0,
        right: 0,
        silent: true,
        // label: {
        //   normal: {
        //     show: true, // 是否顯示對應地名
        //     textStyle: {
        //       color: 'rgba(0,0,0,0.4)'
        //     }
        //   }
        // },
        itemStyle: {
          normal: {
            borderColor: 'Gray',
            color: 'Cornsilk'
          }
        }
      },
      tooltip: {}, // 鼠標移到圖裡面的浮動提示框
      series: [
        {
          type: 'lines',
          coordinateSystem: 'geo',
          data: '',
          large: true,
          largeThreshold: 100,
          lineStyle: {
            normal: {
              opacity: 0.05,
              width: 0.5,
              curveness: 0.3
            }
          },
          // 设置混合模式为叠加
          blendMode: 'lighter'
        },
        buildMapConfig() 
      ]
    }

  },
  methods: {
    loadFlights () {
      this.flightLoaded = true

      const { flight } = this.$refs
      flight.showLoading({
        text: '',
        color: '#c23531',
        textColor: 'rgba(255, 255, 255, 0.5)',
        maskColor: '#003',
        zlevel: 0
      })
      import('./data/flight.json').then(({ default: data }) => {
        flight.hideLoading()

        function getAirportCoord (idx) {
          return [data.airports[idx][3], data.airports[idx][4]]
        }
        const routes = data.routes.map(function (airline) {
          return [getAirportCoord(airline[1]), getAirportCoord(airline[2])]
        })

        this.flightOptions = {
          title: {
            text: 'World Flights',
            left: 'center',
            textStyle: {
              color: '#eee'
            }
          },
          backgroundColor: '#003',
          tooltip: {
            formatter (param) {
              const route = data.routes[param.dataIndex]
              return (
                data.airports[route[1]][1] + ' > ' + data.airports[route[2]][1]
              )
            }
          },
          geo: {
            map: 'world',
            left: 0,
            right: 0,
            silent: true,
            itemStyle: {
              normal: {
                borderColor: '#003',
                color: '#005'
              }
            }
          },
          series: [
            {
              type: 'lines',
              coordinateSystem: 'geo',
              data: routes,
              large: true,
              largeThreshold: 100,
              lineStyle: {
                normal: {
                  opacity: 0.05,
                  width: 0.5,
                  curveness: 0.3
                }
              },
              // 设置混合模式为叠加
              blendMode: 'lighter'
            }
          ]
        }
      })
    }
  }
}
</script>

<style lang="stylus">
*,
*::before,
*::after
  box-sizing border-box

html
  scroll-behavior smooth

body
  margin 0
  padding 3em 0 0
  font-family "Source Sans Pro", "Helvetica Neue", Arial, sans-serif
  color #666
  text-align center

a
  color inherit
  text-decoration none

  a
    display inline-block
    margin 0 5px
    padding 3px 0 6px
    color #7f8c8d
    font-size 2em
    text-decoration none

  a:hover
    padding-bottom 3px
    border-bottom 3px solid #42b983
    
button
  border 1px solid #4fc08d
  border-radius 2em
  background-color #fff
  color #42b983
  cursor pointer
  font inherit
  transition opacity .3s

  &:focus
    outline none
    box-shadow 0 0 1px #4fc08d

  &:active
    background rgba(79, 192, 141, .2)

  &[disabled]
    opacity .5
    cursor not-allowed

  &.round
    width 1.6em
    height 1.6em
    position relative

    &::before,
    &::after
      content ""
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 9px
      height 1px
      background-color #42b983

    &::after
      width 1px
      height 9px

    &.expand::after
      display none

button,
label
  font-size .75em

figure
  display inline-block
  position relative
  margin 2em auto
  border 1px solid rgba(0, 0, 0, .1)
  border-radius 8px
  box-shadow 0 0 45px rgba(0, 0, 0, .2)
  padding 1.5em 2em
  min-width: calc(40vw + 4em)

  .echarts
    // width 40vw
    width 100%
    min-width 400px
    height 300px
</style>
