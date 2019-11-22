<template>
  <div style="margin-top: 80px">
    <Divider orientation="left" class="prop">申请抵押</Divider>
    <Row style="max-width: 1200px; margin: 0 auto;">
      <h1>现有钢卷</h1>
      <rool-table :data_in="this.books_rec"></rool-table>
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
      method: 'post',
      url: '/api/find_book_with_page',
      data: {
        'offset': 0,
        'limit': 8
      },
      withCredentials: true
    }).then(response => {
      console.log('API response\n', response)
      this.books_rec = response.data
    })
  },
  data () {
    return {
      books_rec: [
        {
          name: null,
          isbn: 1
        }
      ]
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
