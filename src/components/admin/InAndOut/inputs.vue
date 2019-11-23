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
          prop="receiptId"
          label="存单ID"
        ></el-table-column>
        <el-table-column
          prop="steelRoll.steelRollId"
          label="钢卷ID"
        ></el-table-column>
        <el-table-column
          prop="inEffect"
          label="生效状态"
          :formatter="formatBoolean"
        ></el-table-column>
        <el-table-column
          prop="receiptState"
          label="存单状态"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="确认操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleRead(scope.$index,scope.row)" type="danger" size="small" v-show="scope.row.inEffect===false">确认生效</el-button>
            <!--<el-button @click="handleSolve(scope.$index,scope.row)" type="danger" size="small" :v-show=scope.row.payed>结束</el-button>-->
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'ins',
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
      this.$axios.get('/depositmessage').then(response => {
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
    },
    handleRead: function (index, row) {
      // alert('1')
      this.$axios({
        method: 'post',
        url: '/depositeffect',
        params: {
          'receiptid': row.receiptId
        },
        withCredentials: true
      }).then(response => {
        console.log(response.data)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
