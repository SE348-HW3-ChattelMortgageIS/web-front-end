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
        <Button type="primary" style="font-size: 16px" v-if="row.receiptState === 'IN_EFFECT'" @click="freeUser(index)">申请赎回</Button>
        <Button  style="font-size: 16px" v-else type="warning" ghost>该状态不可赎回</Button>
      </template>
      <template slot-scope="{ row, index }" slot="steel">
        <Button style="font-size: 16px" @click="inspect(index)">{{row.steelRoll.steelRollId}}</Button>
      </template>
      <template slot-scope="{ row, index }" slot="state">
        <Button style="font-size: 16px" v-if="row.receiptState === 'IN_EFFECT'" type="success" ghost>抵押中</Button>
        <Button style="font-size: 16px" v-else-if="row.receiptState === 'NONEFFECTIVE'" type="error" ghost>异常</Button>
        <Button style="font-size: 16px" v-else-if="row.receiptState === 'REDEEMING'" >赎回中</Button>
        <Button style="font-size: 16px" v-else-if="row.receiptState === 'REDEEMED'" >已赎回</Button>
        <Button style="font-size: 16px" v-else-if="row.receiptState === 'UNFINISHED'" >待审核</Button>
      </template>
    </Table>
    <Modal
      v-model="free_modal"
      @on-ok="free_ok">
      <div slot="header" style="font-size: 30px; text-align: center">确认赎回</div>
      <div>
        <h1 style="text-align: center; font-size: 30px">赎回存单ID: {{this.free_user.receiptId}}</h1>
      </div>
    </Modal>
    <Modal
      v-model="inspect_modal"
      >
      <div slot="header" style="font-size: 30px; text-align: center">钢卷信息</div>
      <div>
        <h1 style="text-align: center">ID: {{this.inspect_user.steelRoll.steelRollId}}</h1>
        <h1 style="text-align: center">归属方: {{this.inspect_user.steelRoll.belongTo.username}}</h1>
        <h1 style="text-align: center">价格: {{this.inspect_user.steelRoll.price}}</h1>
        <h1 style="text-align: center">存储位置: {{this.inspect_user.steelRoll.position.code}}</h1>
      </div>
    </Modal>
    <Modal
      v-model="redeem">
      <div slot="header" style="font-size: 30px; text-align: center">提交已赎回订单</div>
      <div>
        <h3 style="text-align: center">{{this.free_user.receiptId}}号存单赎回订单已提交，请等待银行方审核。</h3>
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
        url: '/order/create',
        data: {
          'depositReceiptId': this.free_user.receiptId
        },
        withCredentials: true
      }).then(response => {
        console.log('API response\n', response)
        this.redeem = true
        this.free_user.receiptState = 'REDEEMING'
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
      redeem: false,
      inspect_user: {
        'steelRoll': {
          'belongTo': {},
          'position': {}
        }
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
              params.row.receiptId)]
          }
        },
        {
          title: '抵押钢卷',
          padding: '0px',
          sortable: true,
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
                  fontSize: '16px'
                }
              },
              params.row.startAt)
            ]
          }
        },
        {
          title: '抵押时长(日)',
          key: 'email',
          sortable: true,
          render: (h, params) => {
            return h('div', {
              style: {
                fontSize: '20px'
              }
            }, params.row.morgageDays)
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
