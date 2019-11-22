<style>
  .ivu-table th{
    text-align: center !important;
    font-size: 30px;
  }
  .ivu-table-cell{
    text-align: center !important;
    padding: 0px;
  }
  .ivu-tooltip-inner{
    padding: 5px;
    border-radius: 4px;
  }
</style>
<template>
  <div>
    <Table border :columns="columns" :data="this.data_in">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" style="font-size: 16px" v-if="row.inEffect" @click="freeUser(index)">申请赎回</Button>
        <Button  style="font-size: 16px" v-else type="error" ghost>该状态不可赎回</Button>
      </template>
      <template slot-scope="{ row, index }" slot="steel">
        <p>row.steelRoll.id</p>
        <Button style="font-size: 16px" @click="inspect(index)">查看详情</Button>
      </template>
      <template slot-scope="{ row, index }" slot="state">
        <Button style="font-size: 16px" v-if="row.state === 1">正常</Button>
        <Button style="font-size: 16px" v-else type="error" ghost>被禁</Button>
      </template>
    </Table>
    <Modal
      v-model="free_modal"
      @on-ok="free_ok">
      <div slot="header" style="font-size: 30px; text-align: center">解禁用户</div>
      <div>
        <h1 style="text-align: center; font-size: 30px">你确定要解禁该用户吗?</h1>
        <h1 style="text-align: center; font-size: 30px">ID: {{this.free_user.userID}}</h1>
        <h1 style="text-align: center; font-size: 30px">name: {{this.free_user.username}}</h1>
      </div>
    </Modal>
    <Modal
      v-model="inspect_modal"
      width="1100">
      <div slot="header" style="font-size: 30px; text-align: center">钢卷信息</div>
      <div>
        <h1 style="text-align: center">{{this.inspect_user.userID}}</h1>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  methods: {
    freeUser (index) {
      this.free_modal = true
      this.free_user = this.data_in[index]
    },
    free_ok () {
      this.$axios({
        method: 'post',
        url: '/admin/free_user',
        data: {
          'username': this.free_user.username
        },
        withCredentials: true
      }).then(response => {
        console.log('API response\n', response)
        this.users = response.data
        this.free_user.state = 1
      })
    },
    inspect (index) {
      this.inspect_user = this.data_in[index]
      this.inspect_modal = true
    }
  },
  data () {
    return {
      users: [],
      inspect_modal: false,
      inspect_user: {
        username: '',
        userID: ''
      },
      free_modal: false,
      free_user: {
        userID: '',
        username: ''
      },
      fb_modal: false,
      fb_user: {
        userID: '',
        username: ''
      },
      columns: [
        {
          title: '存单ID',
          key: 'id',
          sortable: true,
          render: (h, params) => {
            return [
              h('div', {
                style: {
                  width: '100%',
                  fontSize: '40px'
                }
              },
              params.row.userID)]
          }
        },
        {
          title: '抵押钢卷',
          padding: '0px',
          key: 'id',
          slot: 'steel',
          align: 'center'
        },
        {
          title: '创建日期',
          key: 'name',
          sortable: true,
          render: (h, params) => {
            return [
              h('div', {
                style: {
                  width: '100%',
                  fontSize: '30px',
                  fontWeight: 'bolder'
                }
              },
              params.row.username)
            ]
          }
        },
        {
          title: '抵押日期',
          key: 'email',
          sortable: true,
          render: (h, params) => {
            return h('div', {
              style: {
                fontSize: '20px'
              }
            }, params.row.email)
          }
        },
        {
          title: '存单状态',
          key: 'state',
          sortable: true,
          slot: 'state',
          align: 'center'
        },
        {
          title: '申请赎回',
          padding: '0px',
          key: 'pic',
          slot: 'action',
          align: 'center'
        }
      ],
      user_order: []
    }
  },
  props: {
    data_in: {
      type: Array,
      default: () => []
    }
  },
  components: {
  }
}
</script>
