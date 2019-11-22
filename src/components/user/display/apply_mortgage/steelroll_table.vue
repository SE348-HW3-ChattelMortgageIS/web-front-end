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
        <Button type="primary" style="font-size: 16px" v-if="row.state === 0" @click="freeUser(index)">申请抵押</Button>
        <Button  style="font-size: 16px" v-else type="warning" ghost>不可申请抵押</Button>
      </template>
      <template slot-scope="{ row, index }" slot="belong">
        <p>row.belong_to.name</p>
        <Button  style="font-size: 16px" @click="inspectB(index)">查看详情</Button>
      </template>
      <template slot-scope="{ row, index }" slot="position">
        <p>row.position.name</p>
        <Button  style="font-size: 16px" @click="inspectP(index)">查看详情</Button>
      </template>
      <template slot-scope="{ row, index }" slot="state">
        <Button style="font-size: 16px" v-if="row.state === 0">未抵押</Button>
        <Button style="font-size: 16px" v-else-if="row.state === 1" type="error" ghost>申请中</Button>
        <Button style="font-size: 16px" v-else-if="row.state === 2" type="error" ghost>抵押中</Button>
        <Button style="font-size: 16px" v-else-if="row.state === 3" type="error" ghost>赎回中</Button>
        <Button style="font-size: 16px" v-else-if="row.state === 4" type="error" ghost>异常</Button>
        <Button style="font-size: 16px" v-else-if="row.state === 5" type="error" ghost>已赎回</Button>
      </template>
    </Table>
    <Modal
      v-model="free_modal"
      @on-ok="free_ok">
      <div slot="header" style="font-size: 30px; text-align: center">申请抵押</div>
      <div>
        <h1 style="text-align: center; font-size: 30px">你确定要申请抵押该钢卷吗?</h1>
        <h1 style="text-align: center; font-size: 30px">ID: {{this.free_user.userID}}</h1>
      </div>
    </Modal>
    <Modal
      v-model="inspectb_modal"
      width="1100">
      <div slot="header" style="font-size: 30px; text-align: center">归属方信息</div>
      <div>
        <h1 style="text-align: center">{{inspect_user.belong_to}}</h1>
      </div>
    </Modal>
    <Modal
      v-model="inspectp_modal"
      width="1100">
      <div slot="header" style="font-size: 30px; text-align: center">位置信息</div>
      <div>
        <h1 style="text-align: center">{{inspect_user.position}}</h1>
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
        url: '/*apply_a_mortgage*/',
        // url: '/admin/free_user',
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
    inspectP (index) {
      this.inspect_user = this.data_in[index]
      this.inspectp_modal = true
    },
    inspectB (index) {
      this.inspect_user = this.data_in[index]
      this.inspectb_modal = true
    }
  },
  data () {
    return {
      users: [],
      inspectp_modal: false,
      inspectb_modal: false,
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
          title: '钢卷ID',
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
          title: '锁定状态',
          padding: '0px',
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
          },
          align: 'center'
        },
        {
          title: '归属方',
          key: 'name',
          sortable: true,
          slot: 'belong'
        },
        {
          title: '价格(￥)',
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
          title: '状态',
          key: 'state',
          sortable: true,
          slot: 'state',
          align: 'center'
        },
        {
          title: '暂存场地',
          padding: '0px',
          key: 'pic',
          slot: 'position',
          align: 'center'
        },
        {
          title: '申请抵押',
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
