<template>
  <div style="margin-top: 80px; padding: 20px; height: 100%">
    <Row align="middle" type="flex" justify="center" style="height: 20%">
    <h1 class="ad-title">欢迎使用CMIS动产抵押管理信息系统</h1>
    </Row>
    <Row align="middle" type="flex" justify="center" style="margin-bottom: 20px; margin-top: 20px;">
      <Col span="12"><div class="md-wrapper">
        <router-link to="/admin/book">
        <Card class="ad-card">
          存单管理<br>
          <Icon type="md-pricetags" size="130"/>
        </Card>
        </router-link>
      </div></Col>
      <Col span="12"><div class="md-wrapper">
        <router-link to="/admin/user">
        <Card class="ad-card">查看警报<br>
          <el-badge :value=this.alarmCount>
          <!--<el-badge value='2'>-->
            <Icon type="md-alert" size="130" />
          </el-badge>
        </Card>
        </router-link>
      </div></Col>
    </Row>
    <Row align="middle" type="flex" justify="center" style="margin-bottom: 20px; margin-top: 20px;">
      <Col span="12"><div class="md-wrapper">
        <router-link to="/admin/order">
        <Card class="ad-card">
          赎回管理<br>
          <Icon type="md-reorder" size="130" />
        </Card>
        </router-link>
      </div></Col>
      <Col span="12"><div class="md-wrapper">
        <router-link to="/admin/data">
        <Card class="ad-card">状态监控<br>
          <Icon type="ios-cube" size="130" />
        </Card>
        </router-link>
      </div></Col>
    </Row>
  </div>
</template>
<script>export default {
  name: 'warning_table',
  data () {
    return {
      data_in: [],
      alarmCount: 0
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
        // console.log(this.data_in.lenth())
        // for (var i = 0; i < this.data_in.lenth(); i++) {
        //   console.log('in')
        //   if (this.data_in[i].alarmState === 'UNREAD') {
        //     console.log('f')
        //     this.alarmCount++
        //   }
        // }
        for (var value of this.data_in) {
          if (value.alarmState === 'UNREAD') {
            // console.log('f')
            this.alarmCount++
          }
        }
        console.log(this.alarmCount)
      }).catch(function (err) {
        console.log(err)
        // alert(err)
      })
    }
  }
}
</script>
<style scoped>
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
</style>
