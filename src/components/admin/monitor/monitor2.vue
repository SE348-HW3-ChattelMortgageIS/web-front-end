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
      temperature: [],
      humidity: []
      // option: {
      //   title: {
      //     text: '过去七日温湿度'
      //   },
      //   tooltip: {
      //     trigger: 'axis'
      //   },
      //   legend: {
      //     data: ['温度', '湿度']
      //   },
      //   toolbox: {
      //     show: true,
      //     feature: {
      //       mark: {show: true},
      //       dataView: {show: true},
      //       magicType: {show: true, type: ['line', 'bar']},
      //       restore: {show: true},
      //       saveAsImage: {show: true}
      //     }
      //   },
      //   xAxis: [
      //     {
      //       type: 'category',
      //       position: 'bottom',
      //       boundaryGap: true,
      //       axisLine: { // 轴线
      //         show: true,
      //         lineStyle: {
      //           color: 'green',
      //           type: 'solid',
      //           width: 2
      //         }
      //       },
      //       axisTick: { // 轴标记
      //         show: true,
      //         length: 10,
      //         lineStyle: {
      //           color: 'red',
      //           type: 'solid',
      //           width: 2
      //         }
      //       },
      //       axisLabel: {
      //         show: true,
      //         interval: 'auto', // {number}
      //         //              rotate: 45,
      //         margin: 8,
      //         // formatter: '{value}',
      //         textStyle: {
      //           color: 'blue',
      //           fontFamily: 'sans-serif',
      //           fontSize: 15,
      //           fontStyle: 'italic',
      //           fontWeight: 'bold'
      //         }
      //       },
      //       splitLine: {
      //         show: true,
      //         lineStyle: {
      //           color: '#483d8b',
      //           type: 'dashed',
      //           width: 1
      //         }
      //       },
      //       splitArea: {
      //         show: true,
      //         areaStyle: {
      //           color: ['rgba(144,238,144,0.3)', 'rgba(135,200,250,0.3)']
      //         }
      //       }
      //       // data: [
      //       //   '1', '二', '三', '四', '五', '六', '日'
      //       // ]
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: 'value',
      //       position: 'left',
      //       // min: 0,
      //       // max: 300,
      //       splitNumber: 5,
      //       boundaryGap: [0, 0],
      //       axisLine: { // 轴线
      //         show: true,
      //         lineStyle: {
      //           color: 'red',
      //           type: 'dashed',
      //           width: 1
      //         }
      //       },
      //       axisTick: { // 轴标记
      //         show: true,
      //         length: 20,
      //         lineStyle: {
      //           color: 'green',
      //           type: 'solid',
      //           width: 1
      //         }
      //       },
      //       axisLabel: {
      //         show: true,
      //         interval: 'auto', // {number}
      //         //              rotate: -45,
      //         margin: 18,
      //         formatter: '{value}℃', // Template formatter!
      //         textStyle: {
      //           color: '#1e90ff',
      //           fontFamily: 'verdana',
      //           fontSize: 10,
      //           fontStyle: 'normal',
      //           fontWeight: 'bold'
      //         }
      //       }
      //       // splitLine: {
      //       //   show: true,
      //       //   lineStyle: {
      //       //     color: '#483d8b',
      //       //     type: 'dotted',
      //       //     width: 2
      //       //   }
      //       // },
      //       // splitArea: {
      //       //   show: true,
      //       //   areaStyle: {
      //       //     color: ['rgba(205,92,92,0.3)', 'rgba(255,215,0,0.3)']
      //       //   }
      //       // }
      //     },
      //     {
      //       type: 'value',
      //       splitNumber: 10,
      //       axisLabel: {
      //         formatter: function (value) {
      //           // Function formatter
      //           return value + '%'
      //         }
      //       },
      //       splitLine: {
      //         show: false
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: '温度',
      //       type: 'bar',
      //       itemStyle: {
      //         normal: {
      //           color: '#1eb2b5'
      //         }
      //       },
      //       data: this.temperature
      //     },
      //     {
      //       name: '湿度',
      //       type: 'line',
      //       yAxisIndex: 1,
      //       itemStyle: {
      //         normal: {
      //           color: '#9F79EE'
      //         }
      //       },
      //       data: this.humidity
      //     }
      //   ]
      // }
    }
  },
  methods: {
    loadData () {
      this.$axios.get('/temp').then(response => {
        this.data_in = response.data.entity
        this.temperature = []
        this.humidity = []
        for (var value of this.data_in) {
          // console.log('value.Temperature')
          this.temperature.push(value.Temperature)
          this.humidity.push(value.humidity)
        }
        console.log(this.temperature)
        var option = {
          title: {
            text: '过去七日温湿度'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['温度', '湿度']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          xAxis: [
            {
              type: 'category',
              position: 'bottom',
              boundaryGap: true,
              axisLine: { // 轴线
                show: true,
                lineStyle: {
                  color: 'green',
                  type: 'solid',
                  width: 2
                }
              },
              axisTick: { // 轴标记
                show: true,
                length: 10,
                lineStyle: {
                  color: 'red',
                  type: 'solid',
                  width: 2
                }
              },
              axisLabel: {
                show: true,
                interval: 'auto', // {number}
                //              rotate: 45,
                margin: 8,
                // formatter: '{value}',
                textStyle: {
                  color: 'blue',
                  fontFamily: 'sans-serif',
                  fontSize: 15,
                  fontStyle: 'italic',
                  fontWeight: 'bold'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#483d8b',
                  type: 'dashed',
                  width: 1
                }
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(144,238,144,0.3)', 'rgba(135,200,250,0.3)']
                }
              }
              // data: [
              //   '1', '二', '三', '四', '五', '六', '日'
              // ]
            }
          ],
          yAxis: [
            {
              type: 'value',
              position: 'left',
              // min: 0,
              // max: 300,
              splitNumber: 5,
              boundaryGap: [0, 0],
              axisLine: { // 轴线
                show: true,
                lineStyle: {
                  color: 'red',
                  type: 'dashed',
                  width: 1
                }
              },
              axisTick: { // 轴标记
                show: true,
                length: 20,
                lineStyle: {
                  color: 'green',
                  type: 'solid',
                  width: 1
                }
              },
              axisLabel: {
                show: true,
                interval: 'auto', // {number}
                //              rotate: -45,
                margin: 18,
                formatter: '{value}℃', // Template formatter!
                textStyle: {
                  color: '#1e90ff',
                  fontFamily: 'verdana',
                  fontSize: 10,
                  fontStyle: 'normal',
                  fontWeight: 'bold'
                }
              }
              // splitLine: {
              //   show: true,
              //   lineStyle: {
              //     color: '#483d8b',
              //     type: 'dotted',
              //     width: 2
              //   }
              // },
              // splitArea: {
              //   show: true,
              //   areaStyle: {
              //     color: ['rgba(205,92,92,0.3)', 'rgba(255,215,0,0.3)']
              //   }
              // }
            },
            {
              type: 'value',
              splitNumber: 10,
              axisLabel: {
                formatter: function (value) {
                  // Function formatter
                  return value + '%'
                }
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '温度',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#1eb2b5'
                }
              },
              data: this.temperature
            },
            {
              name: '湿度',
              type: 'line',
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: '#9F79EE'
                }
              },
              data: this.humidity
            }
          ]
        }
        this.draw_tem(option)
        // 写入option里
        // this.option.series.push()
      }).catch(function (err) {
        console.log(err)
        // alert(err)
      })
    },
    draw_tem (opt) {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption(opt)
    }
  },
  mounted: function () {
    this.loadData()
    // draw
  }
}
</script>

<style scoped>

</style>
