<template>
  <div style="margin-top: 80px">
    <Divider orientation="left" class="prop">申请赎回</Divider>
    <Row style="max-width: 1200px; margin: 0 auto;">
      <h1 style="font-size: 30px">现有存单</h1>
      <rp-table :data_in="this.receipts"></rp-table>
    </Row>
    <!--<Page :total="100" style="margin-top: 10px"/>-->
  </div>
</template>
<script>
import rpTable from './receipt_table'
export default {
  components: {
    rpTable
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: '/depositmessage',
      withCredentials: true
    }).then(response => {
      console.log('API response\n', response)
      this.receipts = response.data.entity
    })
  },
  data () {
    return {
      receipts: []
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
