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
            <el-button type="danger" size="small" @click="handleClickIn(scope.$index,scope.row)">补充信息</el-button>
            <el-button @click="handleEnd(scope.$index,scope.row)" type="danger" size="small" :style="{'backgroundColor': (scope.row.payed==true? '#67c23A':'#606266')}">结束赎回</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    title="补充信息"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>请输入</span>
    <span>
      利率
      <el-input
        placeholder="请输入利率"
        v-model="dailyInterest"
        clearable>
    </el-input>
    </span>
    <span>
      <span>请输入 价格</span>
      <el-input
        placeholder="请输入价格"
        v-model="redeemPrice"
        clearable>
    </el-input>
    </span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleAdd()">确 定</el-button>
  </span>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: 'outs',
  data () {
    return {
      data_in: [],
      oneAlarm: [],
      dialogVisible: false,
      addId: -1,
      dailyInterest: -1,
      redeemPrice: -1
    }
  },
  mounted: function () {
    this.loadData()
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleClickIn: function (index, row) {
      this.dialogVisible = true
      this.addId = row.orderId
    },
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
      this.dialogVisible = false
      this.$axios({
        method: 'post',
        url: '/order/complete',
        data: {
          'orderId': this.addId,
          'dailyInterest': this.dailyInterest,
          'redeemPrice': this.redeemPrice
        },
        withCredentials: true
      }).then(response => {
        console.log(response.data)
      }).catch(function (err) {
        console.log(err)
        // alert(err)
      })
    },
    handleEnd: function (index, row) {
      this.$axios({
        method: 'get',
        url: '/order/check',
        params: {
          'orderId': row.orderId
        },
        withCredentials: true
      }).then(response => {
        console.log(response.data)
      }).catch(function (err) {
        console.log(err)
      })
      this.$router.go(0)
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
