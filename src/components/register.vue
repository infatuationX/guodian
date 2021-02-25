<template>
  <div id="register">
    <commonHead :page="pageName"></commonHead>
    <div class="main center">
      <!-- 登录卡片模块 -->
      <el-card class="box-card">
        <el-form
          ref="registerformref"
          :model="registerform"
          label-position="top"
          :rules="registerrules"
        >
          <h3>用户注册</h3>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerform.name" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerform.password" show-password prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="password2">
            <el-input v-model="registerform.password2" show-password prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerform.email" prefix-icon="fa fa-envelope-o"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <label style="color:#606266">邮箱验证码</label>
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input v-model="registerform.code" prefix-icon="fa fa-qrcode"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="default"
                  plain
                  class="codebutton"
                  @click="sendCode"
                  :disabled="btndisabled"
                >{{btntext}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="check">
            <el-checkbox v-model="registerform.check" checked>
              我已阅读同意
              <span>《国电煤炭交易平台注册条款》</span>
            </el-checkbox>
          </el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
          <div class="logintext">
            <span @click="switchLogin">已有账号？点击登录</span>
          </div>
        </el-form>
      </el-card>
      <!-- 注册表单旁边文字 -->
      <div class="cardtext">
        <div class="title">
          <span class="titletext">用户注册</span>
          <span class="titletext">国电煤炭交易平台</span>
        </div>
        <el-divider></el-divider>
        <el-divider class="divideline"></el-divider>
        <p>用户名需填写组织机构代码或统一社会信用证代码。</p>
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
  </div>
</template>

<script>
import commonHead from './common/CommonHead'
export default {
  components: { commonHead },
  name: 'register',
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        if (value.length < 8 || value.length > 32) {
          callback(new Error('用户名长度在8-32个字符'))
        } else {
          callback()
        }
      }
    }
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
    var checkPass2 = (rule, value, callback) => {
      if (value !== this.registerform.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      var reg = new RegExp(
        '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
      )
      if (!value) {
        callback(new Error('请输入邮箱'))
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入有效的邮箱'))
        } else {
          callback()
        }
      }
    }
    var checkCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    var checkCheckbox = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请同意本平台条款'))
      } else {
        callback()
      }
    }
    return {
      pageName: '登 录',
      // 验证码按钮
      btndisabled: false,
      btntext: '发送验证码',
      codeid: 0,
      registerform: {
        name: '',
        password: '',
        password2: '',
        email: '',
        code: '',
        check: true
      },
      registerrules: {
        name: [{ validator: checkName, trigger: 'blur' }],
        password: [{ validator: checkPass, trigger: 'blur' }],
        password2: [{ validator: checkPass2, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        code: [{ validator: checkCode, trigger: 'blur' }],
        check: [{ validator: checkCheckbox, trigger: 'change' }]
      }
    }
  },
  mounted() {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#4c7fc9')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    sendCode() {
      if (this.btndisabled === true) {
        return true
      } else {
        this.$refs.registerformref.validateField('email', async validate => {
          if (!validate) {
            const { data: res } = await this.$axios.post(
              '/user/sendVerificationCodeToEmail',
              this.$qs.stringify({
                emailaddress: this.registerform.email
              })
            )
            console.log(res)
            if (res.code !== 200) {
              this.$message.error(res.message)
            } else {
              this.codeid = res.data
              this.$message.success('发送成功！')
              this.getsecond(5)
            }
          } else {
            this.$message.error('邮箱格式不正确')
          }
        })
      }
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
    },
    register() {
      let data = {
        id: this.codeid,
        code: this.registerform.code,
        username: this.registerform.name,
        password: this.registerform.password,
        mail: this.registerform.email
      }
      this.$refs.registerformref.validate(async valid => {
        let _this = this
        console.log(valid)
        if (!valid) return
        const { data: res } = await this.$axios.post(
          '/user/register',
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
            message: '注册成功',
            type: 'success'
          })
          setTimeout(function() {
            _this.$router.push('/login')
          }, 500)
        }
      })
    },
    switchLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='less' scoped>
#register {
  height: 100%;
  background-color: #4c7fc9;
}
// 主体区域
// 注册卡片
.box-card {
  float: right;
  margin-top: 100px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.7);
  button {
    width: 100%;
    // background-color: #4bb2df;
  }
  span {
    font-size: 14px;
    color: #169bd5;
    cursor: pointer;
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
  //   发送验证码按钮
  .codebutton {
    width: 139px;
  }
  //   缩短间距
  .el-form-item {
    margin-top: -10px;
  }
  //   最底下登录文字
  .logintext {
    margin-top: 10px;
    width: 100%;
    text-align: center;
    span {
      color: #646060;
    }
  }
}

// 卡片旁文字
.cardtext {
  margin-top: 100px;
  width: 500px;
  float: left;
  .titletext {
    color: #fff;
    font-size: 60px;
    display: block;
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
