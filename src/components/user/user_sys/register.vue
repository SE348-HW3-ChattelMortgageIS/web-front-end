<style>
  body{
    /*background: url("../../../assets/user_bkgd.png");*/
    background-position: center 10%;
    background-size:cover;
    min-height: 100%;
  }
  .reg-bk{
    width: 100%;
    height: 50vw;
    background: linear-gradient(rgba(29, 38, 49, 0.73), rgba(227, 151, 70, 0));
  }
  .login-card{
    background: rgba(49, 65, 78, 0.78);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    /*backdrop-filter: blur(20px);*/
    margin-top: 50px;
    box-shadow: 0px 5px 20px rgba(29, 38, 49, 0.8);
    padding: 20px;
  }
  .ivu-input-group .ivu-input{
    height: 50px;
    font-size: 30px;
  }
</style>
<template>
  <div class="reg-bk">
    <Col span="12" offset="6" class="login-card">
      <h1 style="color: white; font-size: 60px; font-weight: lighter">CMIS注册账号</h1>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="margin-top: 50px">
        <Row>
        <FormItem prop="user" style="width: 80%;">
          <Input type="text" v-model="formInline.user" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        </Row>
        <Row>
          <FormItem prop="mail" style="width: 80%;">
            <Input v-model="formInline.phone" placeholder="电话">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Row>
        <Row>
        <FormItem prop="password" style="width: 80%;">
          <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        </Row>
        <Row>
          <FormItem prop="passwdCheck" style="width: 80%;">
            <Input type="password" v-model="formInline.passwdCheck"  placeholder="重复密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="type" style="width: 80%;">
            <i-select v-model="model4" style="width:100%; font-size: 20px" size="large">
              <i-option v-for="item in typeList" :value="item.value" v-bind:key="item.name">{{ item.name }}</i-option>
            </i-select>
          </FormItem>
        </Row>
        <Row>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')" style="height: 50px; width: 100px; font-size: 25px; margin-top: 10px">注册</Button>
        </FormItem>
        </Row>
      </Form>
      <Modal
        v-model="modal1"
        title="注册 > 用户名确认"
        @on-ok="ok">
        <h1 style="text-align: center">您确定将要采用以下用户名吗?</h1>
        <h1 style="text-align: center; font-size: 50px">{{this.formInline.user}}</h1>
      </Modal>

      <Modal
        v-model="modal2"
        title="注册 > 注册失败"
      >
        <h1 style="text-align: center">用户名或邮箱已注册，请修改信息。</h1>
      </Modal>

      <Modal
        v-model="modal3"
        title="注册 > 注册成功"
        @on-ok="to_login">
        <h1 style="text-align: center">注册成功！这是您的用户名：</h1>
        <h1 style="text-align: center; font-size: 50px">{{this.formInline.user}}</h1>
        <p style="text-align: center; font-size: 25px">点击确认登录该账号</p>
      </Modal>
    </Col>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重新输入密码！'))
      } else if (value !== this.formInline.password) {
        callback(new Error('密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      modal1: false,
      modal2: false,
      modal3: false,
      model4: 0,
      typeList: [{
        name: '银行方',
        value: 0
      }, {
        name: '借贷方',
        value: 1
      }],
      formInline: {
        user: '',
        password: '',
        passwdCheck: '',
        phone: '',
        type: 0
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 1, message: '密码太短', trigger: 'blur' }
        ],
        passwdCheck: [
          {validator: validatePassCheck, trigger: 'blur'}
        ],
        phone: [
          { required: true, message: '请填写手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modal1 = true
        } else {
          this.$Message.error('请完善信息!')
        }
      })
    },
    ok () {
      // this.$router.push({path: '/user/login'})
      console.log(this.formInline)
      console.log(this.model4)
      this.$axios({
        method: 'post',
        url: '/register',
        data: {
          'username': this.formInline.user,
          'password': this.formInline.password,
          'phone': this.formInline.phone,
          'type': this.model4
        },
        withCredentials: true
      }).then(response => {
        console.log('API response\n', response)
        let status = response.data.state
        if (status === 200) {
          this.modal3 = true
        } else {
          this.modal2 = true
        }
      })
    },
    to_login () {
      this.$router.push({path: '/user/login'})
    }
  }
}
</script>
