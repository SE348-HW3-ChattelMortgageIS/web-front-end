<template>
    <div>
      <div style="margin-top: 80px">
        <p class="search-title">警报通知</p>
        <el-table :data="data_in"
                  stripe
                  style="width: 100%">
          <el-table-column>
            <el-table-column
              type="index"
            >
            </el-table-column>
            <el-table-column
              prop="alarmId"
              label="警报ID"
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
              prop="alarmState"
              label="状态"
            ></el-table-column>
            <el-table-column
              prop="startAt"
              label="开始时间"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleRead(scope.$index,scope.row)" type="danger" size="small" v-show="scope.row.state===read">查看</el-button>
                <!--<el-button @click="handleSolve(scope.$index,scope.row)" type="text" size="small">处理</el-button>-->
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: 'warning_table',
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
    },
    handleRead (index, row) {
      this.$axios({
        method: 'get',
        url: '/alarm/read',
        params: {
          'id': row.alarmId
        }
      }).then(response => {
        this.oneAlarm = response.data.entity
        console.log(this.oneAlarm)
      }).catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
      this.loadData()
      this.$router.go(0)
    }
    // handleSolve (index, row) {
    //   this.$axios({
    //     method: 'get',
    //     url: '/alarm/fix',
    //     params: {
    //       'id': row.alarmId
    //     }
    //   }).then(response => {
    //     this.oneAlarm = response.data.entity
    //     console.log(this.oneAlarm)
    //   }).catch(error => {
    //     JSON.stringify(error)
    //     console.log(error)
    //   })
    //   this.loadData()
    // }

  }
}
</script>

<style scoped>

</style>
