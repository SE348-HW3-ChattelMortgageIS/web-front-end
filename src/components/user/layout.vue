<style scoped>
  .layout{
    /*border: 1px solid #d7dde4;*/
    background: #f5f7f9;
    position: relative;
    /*border-radius: 4px;*/
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
  .ebk-logo{
    background: url("../../assets/ebook-logo.png");
    background-size:55px 55px;
    height: 55px;
    width: 55px;
    float: left;
  }
  .ebk-logo:hover{
    transform: scale(1.1);
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header style="z-index: 99">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <router-link to="/">
          <div class="layout-logo" style="background: rgba(255,255,255,0); margin-top: -10px; width: 550px;">
            <img class="ebk-logo"><p style="font-size: 30px; font-weight: bolder; color: #fff">CMIS动产抵押系统 <span style="font-weight: lighter"> 借贷方页面</span></p>
          </div>
          </router-link>
          <div class="layout-nav" style="width: 450px;">
            <router-link to="/collections">
            <MenuItem name="1-2">
              <Icon type="ios-log-out" />
              <span>申请抵押</span>
            </MenuItem>
            </router-link>
            <router-link to="/market">
              <MenuItem name="1-3">
                <Icon type="ios-cash-outline" />
                <span>申请赎回</span>
              </MenuItem>
            </router-link>
            <!--<router-link  to="/collections">-->
            <!--<MenuItem name="1-5">-->
              <!--<Icon type="md-albums" />-->
              <!--<span>收藏夹</span>-->
            <!--</MenuItem>-->
            <!--</router-link>-->
            <!--<Chart></Chart>-->
            <el-switch
              style="float: right; margin-right: -55px; margin-top: 20px;"
              v-model="isDark"
              @change="changeTheme"
              active-text="夜间"
              inactive-text="日间">
            </el-switch>
            <Tooltip placement="bottom" theme="light">
              <Avatar :src="this.myAvatar" />
              <div slot="content">
                <Row><p style="text-align: center; font-size: 25px;" class="user-info">你好！</p></Row>
                <router-link to="/account"><Button style="margin-bottom: 5px; font-size: 20px;" type="primary">个人中心</Button></router-link>
                  <router-link to="/user/login">
                    <Button style="margin-bottom: 5px; font-size: 20px;" @click="logout">退出登录</Button>
                  </router-link>
              </div>
            </Tooltip>
          </div>
        </Menu>
      </Header>
      <Content>
        <router-view></router-view>
      </Content>
      <Footer class="layout-footer-center">2019 &copy; github.com/SE348-HW3-ChattelMortgageIS</Footer>
    </Layout>
  </div>
</template>
<script>
import Chart from './display/merchandise/chart'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      isDark: false,
      myName: '',
      myAvatar: ''
    }
  },
  mounted () {
    this.myAvatar = require('../../assets/avatar.jpg')
  },
  methods: {
    changeTheme () {
      console.log(this.isDark)
      let css = document.querySelector('#css-table')
      if (this.isDark) {
        css.setAttribute('href', './static/dark_theme.css')
      } else {
        css.setAttribute('href', './static/light_theme.css')
      }
    },
    logout () {
      Cookies.remove('login')
    }
  },
  components: {
    Chart
  }
}
</script>
