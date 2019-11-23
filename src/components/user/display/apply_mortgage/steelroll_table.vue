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
        <Button type="primary" style="font-size: 16px" v-if="row.steelRollState === 'NOT_MORTGAGED'" @click="freeUser(index)">申请抵押</Button>
        <Button  style="font-size: 16px" v-else type="warning" ghost>不可申请抵押</Button>
      </template>
      <template slot-scope="{ row, index }" slot="belong">
        <Button  style="font-size: 16px" @click="inspectB(index)">{{row.belongTo.username}}</Button>
      </template>
      <template slot-scope="{ row, index }" slot="position">
        <Button  style="font-size: 16px" @click="inspectP(index)">{{row.position.code}}</Button>
      </template>
      <template slot-scope="{ row, index }" slot="state">
        <Button style="font-size: 16px" v-if="row.steelRollState === 'NOT_MORTGAGED'" type="success" ghost>未抵押</Button>
        <Button style="font-size: 16px" v-else-if="row.steelRollState === 'TO_BE_MORTGAGED'" >申请中</Button>
        <Button style="font-size: 16px" v-else-if="row.steelRollState === 'MORTGAGED'">抵押中</Button>
        <Button style="font-size: 16px" v-else-if="row.steelRollState === 'TO_BE_REDEEMED'">赎回中</Button>
        <Button style="font-size: 16px" v-else-if="row.steelRollState === 'ABNORMAL'" type="error" ghost>异常</Button>
        <Button style="font-size: 16px" v-else-if="row.steelRollState === 'REDEEMED'">已赎回</Button>
      </template>
    </Table>
    <Modal
      v-model="free_modal"
      @on-ok="free_ok">
      <div slot="header" style="font-size: 30px; text-align: center">申请抵押</div>
      <div>
        <h1 style="text-align: center; font-size: 30px">钢卷ID: {{this.free_user.steelRollId}}</h1>
        <Input type="number" v-model="mdays" placeholder="抵押天数">
          <p slot="prepend" style="font-size: 20px">抵押天数</p>
        </Input>
      </div>
    </Modal>
    <Modal
      v-model="inspectb_modal"
      >
      <div slot="header" style="font-size: 30px; text-align: center">归属方信息</div>
      <div>
        <h1 style="text-align: center">用户名称：{{inspect_user.belongTo.username}}</h1>
        <h1 style="text-align: center">用户ID：{{inspect_user.belongTo.userId}}</h1>
        <h1 style="text-align: center">联系电话：{{inspect_user.belongTo.phone}}</h1>
      </div>
    </Modal>
    <Modal
      v-model="inspectp_modal"
      >
      <div slot="header" style="font-size: 30px; text-align: center">位置信息</div>
      <div>
        <h1 style="text-align: center">场地编号：{{inspect_user.position.code}}</h1>
        <h1 style="text-align: center">使用中：{{inspect_user.position.inUse}}</h1>
      </div>
    </Modal>
    <Modal
      v-model="models"
    >
      <div slot="header" style="font-size: 30px; text-align: center">申请成功！</div>
      <div>
        <h1 style="text-align: center; font-size: 30px">钢卷ID: {{this.free_user.steelRollId}}</h1>
        <h1 style="text-align: center; font-size: 30px">抵押天数: {{this.mdays}}</h1>
        <p style="text-align: center"> 该申请已提交至银行方审核，请等待。</p>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  methods: {
    freeUser (index) {
      this.free_user = this.data_in[index]
      this.free_modal = true
    },
    free_ok () {
      this.$axios({
        method: 'post',
        url: '/depositcreate?steelrollid=' + this.free_user.steelRollId + '&mortgagedays=' + this.mdays,
        withCredentials: true
      }).then(response => {
        console.log('API response\n', response)
        this.models = true
        this.users = response.data
        this.free_user.steelRollState = 'TO_BE_MORTGAGED'
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
      models: false,
      mdays: 0,
      inspect_user: {
        belongTo: {
          username: '',
          userId: '',
          phone: ''
        },
        position: {
          positionId: '',
          code: '',
          inUser: ''
        }
      },
      free_modal: false,
      free_user: {
        username: '',
        userId: '',
        phone: ''
      },
      fb_modal: false,
      fb_user: {
        username: '',
        userId: '',
        phone: ''
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
              params.row.steelRollId)]
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
              params.row.movable)]
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
            }, params.row.price)
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
          sortable: true,
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
