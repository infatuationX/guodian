<template>
  <div id="order">
    <el-card class="box-card">
      <div class="main">
        <div>
          订单状态
          <el-radio-group v-model="radio" style="margin-left:10px">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">挂牌</el-radio>
            <el-radio :label="3">摘牌</el-radio>
          </el-radio-group>
        </div>
        <div style="margin-bottom:10px">
          单据编号&nbsp;
          <el-input size="mini" style="width:140px;margin:0 10px"></el-input>供应商名称
          <el-input size="mini" style="width:140px;margin-left:10px"></el-input>
          <el-button type="primary" size="mini" class="searchButton">查询</el-button>
        </div>
        <el-table :data="orderInfo" stripe border>
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column prop="listid" label="商品号" align="center"></el-table-column>
          <el-table-column prop="comname" label="交易对象" align="center"></el-table-column>
          <el-table-column prop="num" label="交易数量(万吨)" align="center"></el-table-column>
          <el-table-column prop="date" label="创建时间" :formatter="formatDate" align="center"></el-table-column>
          <el-table-column prop="type" label="订单类型" align="center">
            <template slot-scope="scope">
              <div v-html="formatType(scope.row.type)" style="text-align:center"></div>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="订单状态" align="center">
            <template slot-scope="scope">
              <div v-html="formatStateButton(scope.row)" @click="pay(scope.row)"></div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          style="margin-top:10px"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 缴纳保证金 -->
    <el-dialog title="保证金缴纳明细" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <div class="title">
        <span>基本信息</span>
      </div>
      <table>
        <tr>
          <td>单据编号：</td>
          <td>
            <el-input size="mini" style="width:160px" readonly v-model="depositForm.id"></el-input>
          </td>
          <td>申请单位：</td>
          <td>
            <el-input size="mini" style="width:160px" readonly v-model="depositForm.company"></el-input>
          </td>
        </tr>
      </table>
      <div>
        注：报价保证金收取标准为
        <span style="color:red">10</span>元 / 吨
      </div>
      <div class="title">
        <span>保证金账户信息</span>
      </div>
      <table>
        <tr>
          <td>账户金额：</td>
          <td>
            <el-input size="mini" style="width:160px" readonly v-model="depositForm.balance">
              <template slot="append">元</template>
            </el-input>
          </td>
          <td>未冻结金额：</td>
          <td>
            <el-input
              size="mini"
              style="width:160px"
              readonly
              v-model="depositForm.unfrozenBalance"
            >
              <template slot="append">元</template>
            </el-input>
          </td>
        </tr>
        <tr>
          <td>报价冻结金额：</td>
          <td>
            <el-input
              size="mini"
              style="width:160px"
              readonly
              v-model="depositForm.quotefrozenBalance"
            >
              <template slot="append">元</template>
            </el-input>
          </td>
          <td>履约冻结金额：</td>
          <td>
            <el-input
              size="mini"
              style="width:160px"
              readonly
              v-model="depositForm.performancefrozenBalance"
            >
              <template slot="append">元</template>
            </el-input>
          </td>
        </tr>
        <tr>
          <td>供应数量：</td>
          <td>
            <el-input
              size="mini"
              style="width:160px"
              v-model="depositForm.number"
              @input="changePrice"
              onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
              readonly
            >
              <template slot="append">万吨</template>
            </el-input>
          </td>
          <td>缴纳保证金金额：</td>
          <td>
            <el-input size="mini" style="width:160px;" readonly v-model="depositForm.price">
              <template slot="append">元</template>
            </el-input>
          </td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirmPayment">确认缴纳</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'order',
  data() {
    return {
      radio: 1,
      indexMethod: 1,
      currentPage4: 1,
      orderInfo: [],
      buttontype: '',
      dialogFormVisible: false,
      depositForm: {
        id: '',
        number: '',
        company: '',
        balance: '',
        unfrozenBalance: '',
        quotefrozenBalance: '',
        performancefrozenBalance: '',
        price: '',
        type: '',
        orderid: ''
      },
      userinfo: {}
    }
  },
  created() {
    this.getOrderList()
    this.getUserinfo()
  },
  methods: {
    // 获取订单
    async getOrderList() {
      let data = {}
      const { data: res } = await this.$axios.post(
        '/user/selectDepositInfoByFId',
        data,
        {
          headers: {
            token: window.localStorage.token
          }
        }
      )
      if (res.code !== 200) return this.$message.error('订单信息获取失败')
      console.log(res)
      this.orderInfo = res.data
    },
    // 日期格式化
    formatDate(row, column, val) {
      if (val === null) {
        return ''
      }
      let d = val
      return d.substring(0, 10) + ' ' + d.substring(11, 19)
    },
    // 类型格式化
    formatType(val) {
      if (val === 'buylist') {
        return '<span style="color:#fe2005">采购挂牌</span>'
      }
      if (val === 'selllist') {
        return '<span style="color:#400c8a">供应挂牌</span>'
      }
      if (val === 'buydelist') {
        return '<span style="color:#008212">采购摘牌</span>'
      }
      if (val === 'selldelist') {
        return '<span style="color:#fe7210">供应摘牌</span>'
      }
    },
    formatStateButton(row) {
      if (row.isDelist === 1) {
        if (row.state === 1) {
          return '<span style="display: block;color: #fff;background-color: #67c23a;border-radius: 20px;padding: 2px 0;width: 80px;margin-left: 7px;">已完成</span>'
        }
        if (row.state === 0) {
          this.buttontype = 'info'
          return '<span style="display: block;color: #fff;background-color: #909399;border-radius: 20px;padding: 2px 0;width: 80px;margin-left: 7px;">已下架</span>'
        }
        if (row.state === -1) {
          this.buttontype = 'info'
          return '<span style="display: block;color: #fff;background-color: #909399;border-radius: 20px;padding: 2px 0;width: 80px;margin-left: 7px;">已失效</span>'
        }
      }
      if (row.isDelist === 0) {
        if (row.state === 0) {
          this.buttontype = 'danger'
          return '<span style="display: block;color: #fff;background-color: #f56c6c;border-radius: 20px;padding: 2px 0;width: 80px;margin-left: 7px;cursor: pointer;">待缴纳</span>'
        }
        if (row.state === 1) {
          this.buttontype = 'success'
          return '<span style="display: block;color: #fff;background-color: #67c23a;border-radius: 20px;padding: 2px 0;width: 80px;margin-left: 7px;">已完成</span>'
        }
        if (row.state === -1) {
          this.buttontype = 'info'
          return '<span style="display: block;color: #fff;background-color: #909399;border-radius: 20px;padding: 2px 0;width: 80px;margin-left: 7px;">已失效</span>'
        }
      }
    },
    // 保证金缴纳
    pay(row) {
      if (this.userinfo.rtype !== 10) {
        return this.$message.error('财务用户才可缴纳保证金')
      }
      if (row.isDelist === 1) {
        return
      }
      if (row.isDelist === 0) {
        if (row.state === 0) {
          this.depositForm.orderid = row.orderid
          this.depositForm.id = row.listid
          this.depositForm.price = row.num * 10 * 10000
          this.depositForm.company = this.userinfo.comName
          this.depositForm.balance = this.userinfo.balance
          this.depositForm.unfrozenBalance = this.userinfo.ua
          this.depositForm.quotefrozenBalance = this.userinfo.qfa
          this.depositForm.performancefrozenBalance = this.userinfo.pfa
          this.depositForm.number = row.num
          this.dialogFormVisible = true
          this.depositForm.type = row.type
        }
      }
    },
    // 获取用户信息
    async getUserinfo() {
      const { data: res } = await this.$axios.get('/home/personal', {
        headers: {
          token: window.localStorage.token
        }
      })
      if (res.code !== 200) return this.$message('获取用户信息失败')
      this.userinfo = res.data
    },

    comfirmPayment() {
      if (this.depositForm.unfrozenBalance <= this.depositForm.price) {
        this.$confirm('账户余额不足，是否跳转至充值页面？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$router.push('/member/2')
          })
          .catch(() => {})
      } else {
        this.$confirm(
          `确认缴纳保证金${this.depositForm.price}元摘牌该商品`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            let data = {
              listId: this.depositForm.id,
              aod: this.depositForm.price,
              type: this.depositForm.type,
              orderid: this.depositForm.orderid
            }
            this.payDeposit(data)
          })
          .catch(() => {})
      }
    },
    // 缴纳保证金
    async payDeposit(data) {
      let that = this
      const { data: res } = await this.$axios.post(
        '/user/depositById',
        this.$qs.stringify(data),
        {
          headers: {
            token: window.localStorage.token
          }
        }
      )
      if (res.code !== 200) return this.$message.error(res.message)
      this.$message.success('缴纳成功！')
      setTimeout(() => {
        that.$router.go(0)
      }, 500)
    }
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 10px 20px;
  width: 100%;
}

// 主体
.main {
  width: 95%;
  margin: 0 auto;
  font-size: 14px;
  div {
    &:nth-child(2) {
      margin-top: 10px;
      .searchButton {
        margin-left: 20px;
      }
    }
  }
}

.success {
  display: block;
  color: #fff;
  background-color: #67c23a;
  border-radius: 20px;
  padding: 2px 0;
  width: 80px;
  margin-left: 7px;
}

// 保证金
.title {
  border-bottom: 2px solid #409eff;
  display: flex;
  vertical-align: bottom;
  margin-top: 20px;
  position: relative;
  span {
    color: #fff;
    padding: 5px;
    background-color: #409eff;
    font-weight: bold;
  }
}
table {
  width: 95%;
  margin: 0 auto;
  font-size: 12px;
  border-collapse: collapse;
  tr {
    border-bottom: 1px dashed #a4a4a4;
    td {
      height: 40px;
      &:nth-child(odd) {
        font-weight: bold;
        text-align: right;
      }
    }
  }
  .trtitle {
    background-color: #e1eaff;
    strong {
      font-size: 14px;
    }
  }
}
</style>
