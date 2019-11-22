<template>
  <div id="chartLineBox" style="width: 90%;height: 70vh;"> </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'monitor2',
  method: {
    draw_tem () {
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>
