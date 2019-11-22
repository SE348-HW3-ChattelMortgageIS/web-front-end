<template>
  <div style="margin-top: 80px">
    <Row align="middle" type="flex" justify="center" style="height: 20%">
      <h1 class="ad-title">欢迎使用CMIS动产抵押管理信息系统</h1>
    </Row>
    <Row align="middle" type="flex" justify="center" style="margin-bottom: 20px; margin-top: 20px;">
      <Col span="12"><div class="md-wrapper">
        <router-link to="/collections">
          <Card class="ad-card">
            申请抵押<br>
            <Icon type="ios-log-out" size="130"/>
          </Card>
        </router-link>
      </div></Col>
      <Col span="12"><div class="md-wrapper">
        <router-link to="/market">
          <Card class="ad-card">申请赎回<br>
            <Icon type="ios-cash-outline" size="130"/>
          </Card>
        </router-link>
      </div></Col>
    </Row>
  </div>
</template>
<script>
import slider from './pic_slider'
import grid from './book_grid'
export default {
  components: {
    slider,
    grid
  },
  methods: {
    search: function () {
      this.$router.push({
        name: 'search_for',
        params: {
          keyword: this.keyword
        }
      })
    }
  },
  mounted () {
  },
  data () {
    return {
      keyword: null,
      books_rec: null
    }
  }
}
</script>
<style scoped>
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
  .home-row{
    max-width: 1200px;
    margin: 0 auto;
  }
  .layout-nav{
    width: 520px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .ad-card{
    font-size: 50px;
    width: 100%;
    color: #fff;
    height: 250px;
    border: 0px;
  }
  .ad-card:hover{
    transform: scale(1.05);
  }
  .ad-title{
    font-size: 50px;
    margin-top: auto;
    margin-bottom: auto;
  }
  .md-wrapper{
    overflow: hidden;
    width: 100%;
    padding: 0px 10px;
  }
  .body{
    min-height: 100%;
  }
</style>
