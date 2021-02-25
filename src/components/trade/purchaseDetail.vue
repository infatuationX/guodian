<template>
  <div id="quote">
    <el-card class="box-card companycard">
      <div class="cotitle">
        <img src="../../assets/pic/companylogo.png" />
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
            <td>{{companyInfor.capital}}万元</td>
          </tr>
        </table>
      </div>
      <div class="codetail">
        <table>
          <tr>
            <td>挂牌日期</td>
            <td>{{sellInfor.pd | formatDate}}</td>
          </tr>
          <tr>
            <td>有效期至</td>
            <td>{{sellInfor.deadline | formatDate}}</td>
          </tr>
        </table>
        <el-button plain @click="$router.go(-1)">返回</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="main">
        <div class="title">
          <span>基本情况</span>
        </div>
        <table>
          <tr>
            <td>报价截止时间：</td>
            <td>{{sellInfor.deadline | formatDate}}</td>
            <td>交货日期：</td>
            <td
              colspan="3"
            >{{sellInfor.earlistDt | formatDate}} 至 {{sellInfor.latestDt | formatDate}}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>申请单位：</td>
            <td>{{companyInfor.companyName}}</td>
            <td>单据编号：</td>
            <td>{{sellInfor.id}}</td>
            <td>申请人：</td>
            <td>{{sellInfor.proposer}}</td>
          </tr>
          <tr>
            <td>签发人：</td>
            <td>{{sellInfor.issuer}}</td>
            <td>申请日期：</td>
            <td>{{sellInfor.pd | formatDate}}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>煤种：</td>
            <td>{{sellInfor.voc}}</td>
            <td>采购数量：</td>
            <td>{{sellInfor.pq}}万吨</td>
            <td>运输方式：</td>
            <td>{{sellInfor.transport}}</td>
          </tr>
          <tr>
            <td>交货地点：</td>
            <td>{{sellInfor.place}}</td>
            <td>结算方式：</td>
            <td>{{sellInfor.settle}}</td>
            <td>验收方式：</td>
            <td style="width:120px">{{sellInfor.Check}}</td>
          </tr>
          <tr>
            <td>最高限价：</td>
            <td>{{sellInfor.maxPrice}}</td>
            <td>最低限价：</td>
            <td>{{sellInfor.minPrice}}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>结算付款方式：</td>
            <td colspan="5">{{sellInfor.payment}}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>报价保证金缴纳：</td>
            <td>{{sellInfor.qs}}</td>
            <td>履行保证金缴纳：</td>
            <td>{{sellInfor.ps}}</td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <div class="title">
          <span>煤质要求</span>
        </div>
        <table>
          <tr class="trtitle">
            <td colspan="5" style="text-align:left">
              <strong>收到基基准</strong>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>收到基低位发热量Qnet,ar ≥：</td>
            <td>{{sellInfor.qnetar}} Kcal / kg</td>
            <td>收到基全硫St,ar ≤：</td>
            <td>{{sellInfor.star}} %</td>
            <td>全水分 M≤：</td>
            <td style="width:120px">{{sellInfor.m}} %</td>
          </tr>
          <tr>
            <td>收到基灰分Aar ≤：</td>
            <td>{{sellInfor.arr}} %</td>
            <td>收到基挥发分Var：</td>
            <td colspan="3">{{sellInfor.m}} %</td>
            <td></td>
            <td></td>
          </tr>
          <tr class="trtitle">
            <td colspan="5" style="text-align:left">
              <strong>空气干燥基基准</strong>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>空干基水分Mad ≤：</td>
            <td>{{sellInfor.mad}} %</td>
            <td>空干基全硫St,ad ≤：</td>
            <td colspan="3">{{sellInfor.stad}} %</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>空干基挥发分Var：</td>
            <td colspan="5">{{sellInfor.vad}} %</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="trtitle">
            <td colspan="5" style="text-align:left">
              <strong>干基基准</strong>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>干基高位发热量Qgr,d ≥：</td>
            <td>{{sellInfor.qgrd}} Kcal / kg</td>
            <td>干基全硫St,d ≤：</td>
            <td colspan="3">{{sellInfor.std}} %</td>
            <td></td>
            <td></td>
          </tr>
          <tr style="border-bottom:none">
            <td>干燥无灰基挥发分：</td>
            <td colspan="5">{{sellInfor.dafv}} %</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <table class="trremark">
          <tr>
            <td>粒度 ≤：</td>
            <td>{{sellInfor.mm}} mm</td>
            <td>灰熔点ST ≥：</td>
            <td>{{sellInfor.st}} ℃</td>
            <td>哈式可磨系数 ≥：</td>
            <td>{{sellInfor.hgi}} HGI</td>
          </tr>
          <tr>
            <td>备注：</td>
            <td colspan="5">{{sellInfor.comment}}</td>
            <td></td>
            <td></td>
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
    <el-dialog title="摘牌明细" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
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
          <td>供应数量：</td>
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
        <el-button type="primary" @click="comfirmDelist">确认摘牌</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'quote',
  data() {
    return {
      sellInfor: {},
      companyInfor: {},
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
      },
      userinfo: {}
    }
  },
  filters: {
    formatDate(val) {
      if (val === null || val === '') {
        return ''
      }
      return val.substring(0, 10)
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
    // 获取信息
    async getInformation() {
      let data = { buyId: this.$route.params.id }
      const { data: res } = await this.$axios.post(
        'user/get/buy',
        this.$qs.stringify(data),
        {
          headers: {
            token: window.localStorage.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      if (res.code !== 200) return this.$message.error('获取详情失败')
      this.sellInfor = res.data
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
    // 获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$axios.get('/home/personal', {
        headers: {
          token: window.localStorage.token
        }
      })
      if (res.code !== 200) return this.$message('获取用户信息失败')
      this.userinfo = res.data
    },

    // 摘牌
    delist() {
      if (this.userinfo.rtype === 0) {
        this.openMessage()
        return
      }
      if (this.userinfo.id === this.sellInfor.cuserid) {
        return this.$message.error('不能摘自己的商品')
      }
      this.depositForm.price = ''
      this.depositForm.id = this.sellInfor.id
      this.depositForm.company = this.userinfo.comName
      this.depositForm.number = null
      this.depositForm.balance = this.userinfo.balance
      this.depositForm.unfrozenBalance = this.userinfo.ua
      this.depositForm.quotefrozenBalance = this.userinfo.qfa
      this.depositForm.performancefrozenBalance = this.userinfo.pfa
      this.dialogFormVisible = true
    },
    // 提交摘牌
    comfirmDelist() {
      if (
        this.depositForm.number === '' ||
        this.depositForm.number === null ||
        this.depositForm.number <= '0'
      ) {
        return this.$message.error('请填写供应数量')
      } else {
        if (this.depositForm.number > this.sellInfor.pq) {
          return this.$message.error('供应数量不能大于需求数量')
        } else {
          this.$confirm(
            `摘牌该商品需缴纳报价保证金${this.depositForm.price}元`,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            let data = {
              listId: this.sellInfor.id,
              nums: this.depositForm.number
            }
            this.buydelist(data)
          })
        }
      }
    },
    // 实时改变
    changePrice() {
      this.depositForm.price = this.depositForm.number * 10 * 10000
    },
    // 摘牌
    async buydelist(data) {
      let that = this
      const { data: res } = await this.$axios.post(
        '/user/buyDelistingById',
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
        that.$router.push('/trade')
      }, 500)
    }
  },

  created() {
    this.getInformation()
    this.getUserInfo()
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
