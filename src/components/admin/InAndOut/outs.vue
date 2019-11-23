<template>
<div>
  <div style="margin-top: 80px">
    <p class="search-title">赎回系统</p>
    <el-table :data="data_in"
              stripe
              style="width: 100%">
      <el-table-column>
        <el-table-column
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="orderId"
          label="存单ID"
        ></el-table-column>
        <el-table-column
          prop="redeemPrice"
          label="价格"
        ></el-table-column>
        <el-table-column
          prop="paymentDeadline"
          label="付款截至"
        ></el-table-column>
        <el-table-column
          prop="payed"
          label="付款状态"
          :formatter="formatBoolean"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleAdd(scope.$index,scope.row)" type="danger" size="small" v-show="scope.row.state===read">补充信息</el-button>
            <el-button @click="handleEnd(scope.$index,scope.row)" type="danger" size="small" v-show="scope.row.payed===true">结束赎回</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'outs',
  data () {
    return {
      data_in: [],
      oneAlarm: []
    }
  },
  mounted: function () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.$axios.get('/order/all').then(response => {
        this.data_in = response.data.entity
        console.log(this.data_in)
      }).catch(function (err) {
        console.log(err)
        // alert(err)
      })
    },
    handleAdd: function () {
      // 弹窗

      this.$axios.get('/order/all').then(response => {
        this.data_in = response.data.entity
        console.log(this.data_in)
      }).catch(function (err) {
        console.log(err)
        // alert(err)
      })
    },
    handleEnd: function () {
      this.$axios.get('/order/all').then(response => {
        this.data_in = response.data.entity
        console.log(this.data_in)
      }).catch(function (err) {
        console.log(err)
        // alert(err)
      })
    },
    formatBoolean: function (row, column, cellValue) {
      var ret = '' // 你想在页面展示的值
      if (cellValue) {
        ret = '是' // 根据自己的需求设定
      } else {
        ret = '否'
      }
      return ret
    }
  }
}
</script>

<style scoped>

</style>
