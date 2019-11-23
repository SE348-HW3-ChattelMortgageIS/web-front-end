<template>
  <div>
    <div style="margin-top: 80px">
      <p class="search-title">状态监控</p>
    </div>
  <div id="myChart" style="width: 90%;height: 70vh;"> </div>
  </div>
</template>

<script>
export default {
  name: 'monitor2',
  data () {
    return {
      data_in: [],
      option: {
        tooltip: { // 设置悬浮出来的数据及结构
          trigger: 'axis',
          show: true,
          formatter: function (val) { // val.data  是 data这个数组  里面当前悬浮的数字作为下标 对应到data 的一个对象
            return val[0].data.date + '</br>' + val[0].data.value + '%' // return 是鼠标悬浮着显示的数据及结构
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['2018-12-09', '2018-12-10'], // 横坐标的值
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            },
            splitLine: {
              show: false
            }
          }
        ],
        grid: {
          left: '60'
        },
        series: [
          {
            name: '入驻率',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  color: '#D9EFFC'
                },
                lineStyle: {
                  color: '#88CEFE'
                }
              }
            },
            data: [
              {
                value: 20,
                date: '2018-12-09'
              },
              {
                value: 30,
                date: '2018-12-10'
              }
            ]
          }
        ]
      }
    }
  },
  mounted: function () {
    // this.loadData()
    // draw
    this.draw_tem()
  },
  method: {
    loadData: function () {
      this.$axios.get('/').then(response => {
        this.data_in = response.data
        // 写入option里
        // this.option =
        console.log(this.data_in)
      }).catch(function (err) {
        console.log(err)
        // alert(err)
      })
    },
    draw_tem () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>
