<template>
  <div style="margin-top: 80px">
    <Divider orientation="left" class="prop">申请抵押</Divider>
    <Row style="max-width: 1200px; margin: 0 auto;">
      <h1 style="font-size:30px">现有钢卷</h1>
      <rool-table :data_in="rolls"></rool-table>
    </Row>
    <!--<Page :total="100" style="margin-top: 10px"/>-->
  </div>
</template>
<script>
import roolTable from './steelroll_table'
export default {
  components: {
    roolTable
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: '/findAllSteelRoll',
      withCredentials: true
    }).then(response => {
      console.log('API response\n', response.data)
      this.rolls = response.data
    })
  },
  data () {
    return {
      rolls: []
    }
  }
}
</script>
<style>
  .ivu-divider-inner-text{
    font-weight: normal;
    font-size: 30px;
  }
  .ivu-input-group .ivu-input{
    height: 50px;
    font-size: 30px;
  }
  .ivu-card-bordered{
  }
</style>
