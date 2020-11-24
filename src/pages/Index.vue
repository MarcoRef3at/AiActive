<template>
  <q-page class="flex flex-center" style="background: #343E59;">
   <div class="row q-col-gutter-md q-px-md q-py-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-column></apex-column>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-donut></apex-donut>
      </div>
      <!-- <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-line></apex-line>
      </div> -->
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-multiple-radial-bars></apex-multiple-radial-bars>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-heatmap></apex-heatmap>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-radial-bar></apex-radial-bar>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-bubble></apex-bubble>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-radar></apex-radar>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-polar-map></apex-polar-map>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-candle-stick></apex-candle-stick>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-treemap></apex-treemap>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-line-column></apex-line-column>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-line-scatter></apex-line-scatter>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <apex-area></apex-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import ApexColumn from 'components/Charts/ApexColumn'
import ApexArea from 'components/Charts/ApexArea'
import ApexDonut from 'components/Charts/ApexDonut'
// import ApexLine from 'components/Charts/ApexLine'
import ApexHeatmap from 'components/Charts/ApexHeatmap'
import ApexMultipleRadialBars from 'components/Charts/ApexMultipleRadialBars'
import ApexRadialBar from 'components/Charts/ApexRadialBar'
import ApexBubble from 'components/Charts/ApexBubble'
import ApexRadar from 'components/Charts/ApexRadar'
import ApexCandleStick from 'components/Charts/ApexCandleStick'
// import ApexLineSmall from 'components/Charts/ApexLineSmall'
import ApexPolarMap from 'components/Charts/ApexPolarMap'
import ApexLineColumn from 'components/Charts/ApexLineColumn'
import ApexTreemap from 'components/Charts/ApexTreemap'
import ApexLineScatter from 'components/Charts/ApexLineScatter'
export default {
  name: 'PageIndex',
components: {
  ApexColumn,
    ApexArea,
    ApexDonut,
    // ApexLine,
    ApexMultipleRadialBars,
    ApexHeatmap,
    ApexRadialBar,
    ApexBubble,
    ApexRadar,
    // ApexLineSmall,
    ApexPolarMap,
    ApexCandleStick,
    ApexLineColumn,
    ApexTreemap,
    ApexLineScatter
  },
  data: function() {
    return {
    }
  },
}
</script>
