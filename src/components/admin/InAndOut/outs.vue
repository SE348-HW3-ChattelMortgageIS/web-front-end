<template>
<div>
  <div style="margin-top: 80px">
    <p class="search-title">存单管理</p>
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
          label="orderID"
        ></el-table-column>
        <el-table-column
          prop="depositReceipt.receiptId"
          label="存单ID"
        ></el-table-column>
        <el-table-column
          prop="depositReceipt.steelRoll.steelRollId"
          label="钢卷ID"
        ></el-table-column>
        <el-table-column
          prop="payed"
          label="支付状态"
        ></el-table-column>
        <el-table-column
          prop="depositReceipt.receiptState"
          label="存单状态"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleRead(scope.$index,scope.row)" type="danger" size="small" v-show="scope.row.state===read">确认</el-button>
            <el-button @click="handleSolve(scope.$index,scope.row)" type="danger" size="small" :v-show=scope.row.payed>结束</el-button>
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
      this.$axios.get('/alarm/get').then(response => {
        this.data_in = response.data.entity
        console.log(this.data_in)
      }).catch(function (err) {
        console.log(err)
        // alert(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
