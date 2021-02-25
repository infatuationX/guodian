<template>
  <div id="quoteDeposit">
    <el-card class="box-card">
      <div class="main">
        <div class="title">
          <span>保证金账户信息</span>
        </div>
        <table>
          <tr>
            <td>预存账户金额：</td>
            <td class="money">{{depositData.balance}} 元</td>
            <td>未冻结金额：</td>
            <td class="money">{{depositData.ua}} 元</td>
          </tr>
          <tr>
            <td>报价冻结金额：</td>
            <td class="money">{{depositData.qfa}} 元</td>
            <td>履约冻结金额：</td>
            <td class="money">{{depositData.pfa}} 元</td>
          </tr>
        </table>

        <div class="title">
          <span>汇款信息</span>
        </div>
        <table>
          <tr>
            <td :class="{'error':remitCheck.isComNameError}">汇款单位名称：</td>
            <td>
              <el-input
                size="mini"
                style="width:200px"
                v-model="remitDetail.comName"
                @blur="checkComName"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':remitCheck.isBanknameError}">开户行名称：</td>
            <td>
              <el-input
                size="mini"
                style="width:200px"
                v-model="remitDetail.bankName"
                @blur="checkBankName"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':remitCheck.isBankcardIDError}">银行账号：</td>
            <td>
              <el-input
                size="mini"
                style="width:200px"
                v-model="remitDetail.bankcardID"
                @blur="checkBankcardID"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':remitCheck.isRemitPriceError}">汇款金额：</td>
            <td>
              <el-input
                size="mini"
                style="width:200px"
                v-model="remitDetail.remitPrice"
                @blur="checkPrice"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':remitCheck.isRemitTimeError}">汇款时间：</td>
            <td>
              <el-date-picker
                size="mini"
                style="width:200px"
                v-model="remitDetail.remitDate"
                @blur="checkDate"
                @change="checkDate"
                :editable="false"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td :class="{'error':remitCheck.isRemitFileError}">汇款凭证：</td>
            <td>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="http://baidu.com"
                :before-upload="checkFileType"
                :on-preview="handlePreview"
                :on-remove="checkFile"
                :before-remove="beforeRemove"
                :on-success="checkFile"
                :file-list="fileList"
                :data="fileData"
                :auto-upload="false"
                :limit="1"
                :on-exceed="handleExceed"
                :on-change="fileChange"
                accept="image/gif, image/jpeg, image/png, application/pdf"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <span slot="tip" class="el-upload__tip">只能上传jpg/png/PDF文件</span>
              </el-upload>
            </td>
          </tr>
        </table>
        <div class="buttongroup">
          <el-button type="primary" @click="submit">确认</el-button>
          <el-button>返回</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'quoteDeposit',
  data() {
    return {
      fileList: [],
      fileData: null,
      userinfo: {},
      // 账户余额
      depositData: {
        balance: 0,
        ua: 0,
        qfa: 0,
        pfa: 0
      },
      // 汇款详情
      remitDetail: {
        comName: '',
        bankName: '',
        bankcardID: '',
        remitPrice: '',
        remitDate: ''
      },
      remitCheck: {
        isComNameError: false,
        isBanknameError: false,
        isBankcardIDError: false,
        isRemitPriceError: false,
        isRemitTimeError: false,
        isRemitFileError: false
      }
    }
  },
  methods: {
    checkDate() {
      if (
        this.remitDetail.remitDate === '' ||
        this.remitDetail.remitDate === null
      ) {
        this.remitCheck.isRemitTimeError = true
        return false
      } else {
        this.remitCheck.isRemitTimeError = false
        return true
      }
    },
    checkPrice() {
      if (
        this.remitDetail.remitPrice === '' ||
        this.remitDetail.remitPrice === null
      ) {
        this.remitCheck.isRemitPriceError = true
        return false
      } else {
        this.remitCheck.isRemitPriceError = false
        return true
      }
    },
    checkBankcardID() {
      if (
        this.remitDetail.bankcardID === '' ||
        this.remitDetail.bankcardID === null
      ) {
        this.remitCheck.isBankcardIDError = true
        return false
      } else {
        this.remitCheck.isBankcardIDError = false
        return true
      }
    },
    checkBankName() {
      if (
        this.remitDetail.bankName === '' ||
        this.remitDetail.bankName === null
      ) {
        this.remitCheck.isBanknameError = true
        return false
      } else {
        this.remitCheck.isBanknameError = false
        return true
      }
    },
    checkComName() {
      if (
        this.remitDetail.comName === '' ||
        this.remitDetail.comName === null
      ) {
        this.remitCheck.isComNameError = true
        return false
      } else {
        this.remitCheck.isComNameError = false
        return true
      }
    },
    async getBalance() {
      const { data: res } = await this.$axios.get('/home/personal', {
        headers: {
          token: window.localStorage.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(res)
      if (res.code !== 200) return this.$message.error('获取资金失败')
      this.userinfo = res.data
      this.depositData.balance = res.data.balance
      this.depositData.ua = res.data.ua
      this.depositData.qfa = res.data.qfa
      this.depositData.pfa = res.data.pfa
    },
    handlePreview(file, fileList) {
      console.log(file)
      console.log(JSON.parse(JSON.stringify(this.fileList))[0].raw.uid)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 检查文件
    checkFile(file, fileList) {
      let list = JSON.parse(JSON.stringify(this.fileList))
      console.log(list)
      if (list === []) {
        this.remitCheck.isRemitFileError = true
        return false
      } else {
        this.remitCheck.isRemitFileError = false
        return true
      }
    },
    fileChange(file, fileList) {
      this.fileList = fileList
    },
    // 检查文件类型
    checkFileType(file) {
      const isIMAGE =
        file.type === 'image/jpeg' ||
        'image/gif' ||
        'image/png' ||
        'application/pdf'
      const isLt1M = file.size / 10240 / 10240 < 1
      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片或pdf!')
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 10MB!')
      }
      return isIMAGE && isLt1M
    },

    // 提交
    submit() {
      this.checkDate()
      this.checkPrice()
      this.checkBankcardID()
      this.checkBankName()
      this.checkComName()
      if (
        this.checkDate() &&
        this.checkPrice() &&
        this.checkBankcardID() &&
        this.checkBankName() &&
        this.checkComName()
      ) {
        let uid = JSON.parse(JSON.stringify(this.fileList))[0].raw.uid
        let data = {
          ra: this.remitDetail.remitPrice,
          rd: this.remitDetail.remitDate,
          rv: uid
        }
        this.perstore(data)
        console.log(data)
      } else {
        this.$message.error('请填写完整所有信息')
      }
    },
    async perstore(data) {
      let that = this
      const { data: res } = await this.$axios.post(
        '/user/invoiceById',
        this.$qs.stringify(data),
        {
          headers: {
            token: window.localStorage.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      console.log(res)
      if (res.code !== 200) return this.$message.error(res.message)
      this.$message.success(res.data)
      setTimeout(() => {
        that.$router.go(0)
      }, 500)
    }
  },
  created() {
    this.getBalance()
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 10px 20px;
  width: 100%;
}

.error {
  color: red;
}
// 主体
.main {
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
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
    width: 80%;
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
    .money {
      color: #ff5c51;
    }
    .el-upload__tip {
      margin-left: 10px;
    }
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
</style>
