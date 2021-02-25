<template>
  <div id="login">
    <!-- 公共头部 -->
    <commonHead :page="pageName"></commonHead>
    <!-- 主体区域 -->
    <div class="main center">
      <!-- 登录卡片模块 -->
      <el-card class="box-card">
        <el-form ref="loginformref" :model="loginform" label-position="top" :rules="loginrule">
          <h3>用户登录</h3>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="loginform.name" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginform.password" show-password prefix-icon="el-icon-lock"></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <label style="color:#606266">验证码</label>
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input v-model="loginform.code" prefix-icon="fa fa-qrcode"></el-input>
              </el-col>
              <el-col :span="6">
                <div class="login-code" @click="refreshCode">
                  <!--验证码组件-->
                  <s-identify :identifyCode="identifyCode"></s-identify>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
          <span @click="dialogFormVisible = true">忘记密码</span>
          <span @click="switchRegister">没有账号？点击注册</span>
        </el-form>
      </el-card>
      <!-- 登录旁边文字 -->
      <div class="cardtext">
        <div class="title">
          <img src="../assets/pic/logo_outline.png" />
          <span class="titletext">用户登录</span>
        </div>
        <el-divider></el-divider>
        <el-divider class="divideline"></el-divider>
        <p>首次登录需转跳至用户类型选择及上传资质页面，完成审核后才能正式使用。</p>
        <p>二次注册信息完善通过后才能享有在平台交易的权利</p>
        <p>
          平台普通用户：
          <br />注册成为平台普通用户，可以查看资讯信息，没有交易权限。
        </p>
        <p>
          平台二次注册用户（正式用户）：
          <br />注册成为平台正式用户，拥有查看资讯信息，煤炭交易，挂牌摘牌等一系列权限，注册成功时，平台方会发放交易用财务账户，财务账户与正式账户绑定，只负责钱财交易。
        </p>
        <span>点击此处阅读详情</span>
        <el-divider></el-divider>
        <div class="contact">
          还有问题？联系我们
          <i class="fa fa-envelope-o"></i>
          <div>
            <span>xxxxxx@xx.com</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="找回密码"
      :visible.sync="dialogFormVisible"
      width="20%"
      :close-on-click-modal="false"
    >
      <el-form :model="findform" :rules="findFormRule" ref="findformref">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="findform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="findform.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="findform.code" autocomplete="off">
            <el-button slot="append" @click="sendCode" :disabled="btndisabled">{{btntext}}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="findPassword">找回密码</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonHead from './common/CommonHead'
import SIdentify from './common/sidentify'

export default {
  name: 'login',
  components: { commonHead, SIdentify },
  data() {
    // 验证码校验
    var checkcode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        console.log(this.identifyCode)
        return callback(new Error('验证码不正确'))
      } else {
        callback()
      }
    }
    // 用户名校验
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      } else {
        if (value.length < 8 || value.length > 32) {
          return callback(new Error('用户名长度在8-32位'))
        } else {
          callback()
        }
      }
    }
    // 密码校验
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    // 找回密码校验
    var checkPass = (rule, value, callback) => {
      var reg = new RegExp(
        '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-ZW_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-zW_!@#$%^&*`~()-+=]+$)(?![0-9W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9W_!@#$%^&*`~()-+=]{6,18}$'
      )
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (!reg.test(value)) {
          callback(
            new Error('密码6-18位，且包含大小写字母和数字，可包含下划线')
          )
        } else {
          callback()
        }
      }
    }
    // 验证邮箱
    var checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    // 验证验证码
    var checkEmailCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      pageName: '注 册',
      loginform: {
        name: '',
        password: '',
        code: ''
      },
      identifyCodes: '1234567890',
      identifyCode: '',
      // text框输入的验证码
      code: '',
      // 登录规则
      loginrule: {
        name: [{ validator: checkUsername, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }],
        code: [{ validator: checkcode, trigger: 'blur' }]
      },
      findFormRule: {
        password: [{ validator: checkPass, trigger: 'blur' }],
        name: [{ validator: checkName, trigger: 'blur' }],
        code: [{ validator: checkEmailCode, trigger: 'blur' }]
      },
      dialogFormVisible: false,
      findform: {
        name: '',
        password: '',
        code: '',
        codeid: ''
      },
      btntext: '获取验证码',
      btndisabled: false
    }
  },

  created() {
    this.refreshCode()
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#4c7fc9')
  },
  methods: {
    // 验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },

    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      console.log(this.identifyCode)
    },
    // 用户登录
    login() {
      let data = {
        username: this.loginform.name,
        password: this.loginform.password
      }
      this.$refs.loginformref.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const { data: res } = await this.$axios.post(
          '/user/login',
          this.$qs.stringify(data)
        )
        console.log(res)
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        } else {
          this.$message({
            showClose: true,
            message: '登陆成功',
            type: 'success'
          })
          window.localStorage.setItem('token', res.data.token)
          this.$router.push('/index')
        }
      })
    },
    switchRegister() {
      this.$router.push('/register')
    },
    // 发送验证码
    sendCode() {
      if (this.findform.name === '' || this.findform.name === null) {
        return this.$message.error('用户名不能为空')
      } else {
        let name = {
          username: this.findform.name
        }
        this.getUserEmail(name)
      }
    },
    // 获取用户邮箱
    async getUserEmail(name) {
      const { data: res } = await this.$axios.post(
        '/user/findEmailByUsername',
        this.$qs.stringify(name)
      )
      if (res.code !== 200) return this.$message.error('用户名不存在')
      console.log(res.data)
      this.sendEmail(res.data)
    },
    // 邮箱发送验证码
    async sendEmail(email) {
      let data = {
        emailaddress: email
      }
      const { data: res } = await this.$axios.post(
        '/user/sendVerificationCodeToEmail',
        this.$qs.stringify(data)
      )
      if (res.code !== 200) return this.$message.error('发送失败')
      this.findform.codeid = res.data
      this.$message.success('发送成功！')
      this.getsecond(5)
    },
    findPassword() {
      this.$refs.findformref.validate(async valid => {
        let that = this
        console.log(valid)
        if (!valid) return
        let data = {
          username: this.findform.name,
          password: this.findform.password,
          id: this.findform.codeid,
          code: this.findform.code
        }
        const { data: res } = await this.$axios.post(
          '/user/findPasswordByUsername',
          this.$qs.stringify(data)
        )
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success('密码找回成功！')
        setTimeout(() => {
          that.$router.go(0)
        }, 500)
      })
    },
    getsecond(wait) {
      let _this = this
      let _wait = wait
      if (wait === 0) {
        this.btndisabled = false
        this.btntext = '获取验证码'
        wait = _wait
      } else {
        this.btndisabled = true
        this.btntext = '验证码(' + wait + 's)'
        wait--
        setTimeout(function() {
          _this.getsecond(wait)
        }, 1000)
      }
    }
  },

  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style lang='less' scoped>
#login {
  height: 100%;
  background-color: #4c7fc9;
}
// 主体区域
// 登录卡片
.box-card {
  float: left;
  margin-top: 100px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.7);
  button {
    width: 100%;
    // background-color: #4bb2df;
  }
  span {
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    &:last-child {
      float: right;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  /*验证码样式*/
  .code {
    width: 124px;
    height: 31px;
    border: 1px solid rgba(186, 186, 186, 1);
  }
  .login-code {
    margin-top: 2px;
    cursor: pointer;
  }
  /deep/ .el-form-item__content::before {
    content: '' !important;
  }
}

// 卡片旁文字
.cardtext {
  margin-top: 100px;
  width: 400px;
  float: right;
  .title {
    display: flex;
    justify-content: center;
  }
  img {
    width: 80px;
    height: 80px;
    margin-right: 50px;
  }
  .titletext {
    color: #fff;
    font-size: 60px;
    &:hover {
      text-decoration: none;
      cursor: default;
    }
  }
  // 分割线第二根
  .divideline {
    width: 100px;
    text-align: right;
  }
  p {
    color: #fff;
  }
  span {
    color: #d0d871;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .contact {
    color: #fff;
    float: right;
    i {
      font-size: 20px;
    }
  }
}
</style>
