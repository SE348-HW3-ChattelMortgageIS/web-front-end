<template>
  <div>
    <div style="margin-top: 80px">
      <p class="search-title">状态监控</p>
    </div>
    <div id="myChart" :style="{ height: '140px'}"></div>
    <p class="title">伦敦金</p>
    <p class="percent1">{{percent1}}.00%</p>
    <p class="percent2">{{percent2}}.00%</p>
    <p class="time">数据更新时间：{{year}}&nbsp;{{time}}</p>
  </div>
</template>

<script>
export default {
  name: 'monitor_graph',
  data () {
    return {
      percent1: 30,
      percent2: 70,
      year: '2018-10-20',
      time: '10:05:03'
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // var i=0;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // var color = ['#19D672', '#FD517D']
      // 绘制图表
      myChart.setOption({
        color: ['#23D864', '#FF4D51'],

        // title: { text: '伦敦金' },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },

        legend: [
          {
            // orient: "vertical",
            itemWidth: 15,
            x: '2%',
            y: '20%',

            textStyle: {
              // color: '#ccc',
            },

            data: ['买跌']
          },
          {
            itemWidth: 15,

            // orient: "vertical",
            x: '80%',
            y: '20%',
            data: ['买涨']
          }
        ],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            // data: ['20%', '80%'],
            radius: ['42%', '50%'],
            center: ['50%', '35%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },

              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '0',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },

            itemStyle: {
              top: '50'

              // borderWidth: 50, //设置border的宽度有多大
            },

            data: [
              {
                value: this.percent1,
                name: '买跌',
                a: '1'
              },
              {
                value: this.percent2,
                name: '买涨',
                a: '1'
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
