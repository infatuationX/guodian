<template>
  <div id="quote">
    <el-card class="box-card companycard">
      <div class="cotitle">
        <img src="../../assets/pic/companylogo2.png" />
        <span>{{companyInfor.companyName}}</span>
      </div>
      <div class="codetail">
        <table>
          <tr>
            <td>负责人</td>
            <td>{{companyInfor.person}}</td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td>{{companyInfor.phone}}</td>
          </tr>
          <tr>
            <td>联系地址</td>
            <td>{{companyInfor.address}}</td>
          </tr>
          <tr>
            <td>邮箱</td>
            <td>{{companyInfor.email}}</td>
          </tr>
          <tr>
            <td>注册资本</td>
            <td>{{companyInfor.capital}} 万元</td>
          </tr>
        </table>
      </div>
      <div class="codetail">
        <table>
          <tr>
            <td>挂牌日期</td>
            <td>{{buyInfor.pubdate | formatDate}}</td>
          </tr>
          <tr>
            <td>有效期至</td>
            <td>{{buyInfor.deadline | formatDate}}</td>
          </tr>
        </table>
        <el-button plain @click="$router.go(-1)">返回</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="main">
        <div class="title">
          <span>报价信息</span>
        </div>
        <table>
          <tr>
            <td>供应数量：</td>
            <td>{{buyInfor.sq}} 万吨</td>
            <td>热值 ≥：</td>
            <td>{{buyInfor.rev}} %</td>
            <td>原煤单价：</td>
            <td>{{buyInfor.price}} 元</td>
          </tr>
          <tr>
            <td>全硫 ≤：</td>
            <td>{{buyInfor.s}} %</td>
            <td>产地：</td>
            <td>{{buyInfor.region}}</td>
            <td style="width:160px">运费单价：</td>
            <td>{{buyInfor.transPrice}} 元</td>
          </tr>
          <tr>
            <td>挥发分：</td>
            <td>{{buyInfor.vad}} %</td>
            <td>发货港口：</td>
            <td>{{buyInfor.start}}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>空干基灰分 ≤：</td>
            <td>{{buyInfor.adba}} %</td>
            <td>全水分 ≤：</td>
            <td>{{buyInfor.m}} %</td>
            <td></td>
            <td></td>
          </tr>
        </table>

        <div class="buttongroup">
          <el-button type="primary" @click="delist">摘牌</el-button>
          <el-button type="info" plain @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
    </el-card>
    <!-- 缴纳保证金 -->
    <el-dialog title="订单信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <div class="title">
        <span>基本信息</span>
      </div>
      <table>
        <tr>
          <td>单据编号：</td>
          <td>
            <el-input size="mini" style="width:160px" disabled v-model="depositForm.id"></el-input>
          </td>
          <td>申请单位：</td>
          <td>
            <el-input size="mini" style="width:160px" disabled v-model="depositForm.company"></el-input>
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
            <el-input size="mini" style="width:160px" disabled v-model="depositForm.balance">
              <template slot="append">元</template>
            </el-input>
          </td>
          <td>未冻结金额：</td>
          <td>
            <el-input
              size="mini"
              style="width:160px"
              disabled
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
              disabled
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
              disabled
              v-model="depositForm.performancefrozenBalance"
            >
              <template slot="append">元</template>
            </el-input>
          </td>
        </tr>
        <tr>
          <td>采购数量：</td>
          <td>
            <el-input
              size="mini"
              style="width:160px"
              v-model="depositForm.number"
              @input="changePrice"
              onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
            >
              <template slot="append">万吨</template>
            </el-input>
          </td>
          <td>缴纳保证金金额：</td>
          <td>
            <el-input size="mini" style="width:160px;" disabled v-model="depositForm.price">
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
  name: 'quote',
  data() {
    return {
      buyInfor: {},
      companyInfor: {},
      userinfo: {},
      // 缴纳保障金窗口
      dialogFormVisible: false,
      depositForm: {
        id: '',
        number: '',
        company: '',
        balance: '',
        unfrozenBalance: '',
        quotefrozenBalance: '',
        performancefrozenBalance: '',
        price: ''
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    async getSellInfo() {
      let data = { sellId: this.$route.params.id }
      const { data: res } = await this.$axios.post(
        'user/get/sell',
        this.$qs.stringify(data),
        {
          headers: {
            token: window.localStorage.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      if (res.code !== 200) return this.$message.error('获取详情失败')
      this.buyInfor = res.data
      console.log(res)
      const id = { userId: res.data.cuserid }
      this.getCoInfor(id)
    },
    async getCoInfor(data) {
      const { data: res } = await this.$axios.post(
        '/user/getCompanyInfo',
        this.$qs.stringify(data),
        {
          headers: {
            token: window.localStorage.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      if (res.code !== 200) return this.$message.error('获取公司详情失败')
      this.companyInfor = res.data
      console.log(res)
    },
    async getUserInfo() {
      const { data: res } = await this.$axios.get('/home/personal', {
        headers: {
          token: window.localStorage.token
        }
      })
      if (res.code !== 200) return this.$message('获取用户信息失败')
      this.userinfo = res.data
    },
    openMessage() {
      this.$confirm('完善个人信息后才能摘牌, 是否前往个人信息页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/member/selfpage')
        })
        .catch(() => {})
    },
    // 摘牌
    delist() {
      if (this.userinfo.rtype === 0) {
        this.openMessage()
        return
      }
      if (this.userinfo.id === this.buyInfor.cuserid) {
        return this.$message.error('不能摘自己的商品')
      }
      this.depositForm.price = ''
      this.depositForm.id = this.buyInfor.id
      this.depositForm.company = this.userinfo.comName
      this.depositForm.number = null
      this.depositForm.balance = this.userinfo.balance
      this.depositForm.unfrozenBalance = this.userinfo.ua
      this.depositForm.quotefrozenBalance = this.userinfo.qfa
      this.depositForm.performancefrozenBalance = this.userinfo.pfa
      this.dialogFormVisible = true
    },
    // 确认缴纳
    comfirmPayment() {
      if (
        this.depositForm.number === '' ||
        this.depositForm.number === null ||
        this.depositForm.number <= '0'
      ) {
        return this.$message.error('请填写采购数量')
      } else {
        if (this.depositForm.number > this.buyInfor.sq) {
          return this.$message.error('采购数量不能大于供应数量')
        } else {
          this.$confirm(
            `摘牌该商品需缴纳保证金${this.depositForm.price}元`,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            let data = {
              listId: this.buyInfor.id,
              nums: this.depositForm.number
            }
            this.sellDelist(data)
          })
        }
      }
    },
    // 实时改变
    changePrice() {
      this.depositForm.price = this.depositForm.number * 10 * 10000
    },
    // 摘牌
    async sellDelist(data) {
      let that = this
      const { data: res } = await this.$axios.post(
        '/user/sellDelistingById',
        this.$qs.stringify(data),
        {
          headers: {
            token: window.localStorage.token
          }
        }
      )
      if (res.code !== 200) return this.$message.error(res.message)
      this.$message.success('订单建立成功，请通知财务用户及时缴纳保证金！')
      setTimeout(function() {
        that.$router.push('/trade/purchase')
      }, 500)
    }
  },
  created() {
    this.getSellInfo()
    this.getUserInfo()
  },
  filters: {
    formatDate(val) {
      if (val === null || val === '') {
        return ''
      }
      return val.substring(0, 10)
    }
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 10px 20px;
  width: 100%;
  /deep/ .el-tabs__nav-scroll::after {
    content: none !important;
  }
  /deep/ .el-tabs__item {
    font-size: 20px;
    color: #a4a4a4;
    font-weight: bold;
  }
  /deep/.el-tabs__item.is-active {
    color: #65656a;
  }
}

// 公司信息
.companycard {
  background-color: #f5f7f8;
  .cotitle {
    width: 30%;
    font-weight: bold;
    text-align: center;
    display: inline-block;
    margin-top: 50px;
    img {
      border-radius: 50%;
      border: 1px solid #a4a4a4;
      width: 50px;
      height: 50px;
      padding: 2px;
      margin-right: 5px;
    }
    span {
      display: block;
    }
  }
  .codetail {
    vertical-align: top;
    display: inline-block;
    position: relative;
    tr {
      border: none;
      td {
        padding-left: 20px;
      }
    }
    button {
      margin-top: 50px;
      width: 150px;
      position: absolute;
      transform: translate(20px, 10px);
    }
  }
}

.main {
  width: 100%;
  margin: 20px 5px;
  box-sizing: border-box;
  //   基本情况title
  .title {
    border-bottom: 2px solid #409eff;
    display: flex;
    vertical-align: bottom;
    margin-top: 20px;
    span {
      color: #fff;
      padding: 5px;
      background-color: #409eff;
      font-weight: bold;
    }
  }
  table {
    width: 100%;
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
  .trremark {
    border-top: 1px solid #409eff;
    background-color: #f9f9f9;
  }
  .buttongroup {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    button {
      width: 100px;
      margin-left: 20px;
    }
  }
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
  table {
    width: 90%;
    margin: 0 auto;
    font-size: 12px;
    border-collapse: collapse;
    tr {
      border-bottom: 1px dashed #a4a4a4;
      td {
        height: 40px;
      }
    }
    .trtitle {
      background-color: #e1eaff;
      strong {
        font-size: 14px;
      }
    }
  }
}
</style>
