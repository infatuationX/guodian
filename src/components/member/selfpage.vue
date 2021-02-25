<template>
  <div id="selfpage">
    <el-card class="box-card">
      <div class="main">
        <div class="title">
          <span>基本信息</span>
          <el-button size="mini" type="danger" plain @click="dialogFormVisible = true">修改密码</el-button>
          <el-button size="mini" @click="changeEmailFormVisible = true">修改邮箱</el-button>
        </div>
        <table v-if="isFirstUser">
          <tr>
            <td :class="{'error':registerFormCheck.isComNameError}">企业名称：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.comName"
                @blur="checkcomName"
              ></el-input>
            </td>
            <td>企业类型：</td>
            <td>
              <el-input size="mini" style="width:160px" disabled v-model="registerForm.ctype"></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.isLeggNameError}">法人代表：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.leggName"
                @blur="checkleggName"
              ></el-input>
            </td>
            <td :class="{'error':registerFormCheck.isLeggIdcodeError}">法人代表身份证：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.leggIdcode"
                @blur="checkleggIdcode"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.isRegRegionError}">注册地区：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.regRegion"
                @blur="checkregRegion"
              ></el-input>
            </td>
            <td>企业邮箱：</td>
            <td>
              <el-input size="mini" style="width:160px" disabled v-model="registerForm.mail"></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.isContactError}">联系人：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.contact"
                @blur="checkcontact"
              ></el-input>
            </td>
            <td :class="{'error':registerFormCheck.isComCodeError}">企业机构代码：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.comCode"
                @blur="checkcomCode"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.isTelError}">联系电话：</td>
            <td>
              <el-input size="mini" style="width:160px" v-model="registerForm.tel" @blur="checktel"></el-input>
            </td>
            <td :class="{'error':registerFormCheck.isFaxError}">传真：</td>
            <td>
              <el-input size="mini" style="width:160px" v-model="registerForm.fax" @blur="checkfax"></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.isPostcodeError}">邮政编码：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.postcode"
                @blur="checkpostcode"
              ></el-input>
            </td>
            <td :class="{'error':registerFormCheck.isRegMoneyError}">注册资金：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.regMoney"
                @blur="checkregMoney"
              >
                <template slot="append">万元</template>
              </el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.isLicenseCodeError}">营业执照号：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.licenseCode"
                @blur="checklicenseCode"
              ></el-input>
            </td>
            <td :class="{'error':registerFormCheck.isocCodeError}">组织机构代码：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.ocCode"
                @blur="checkocCode"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.iscblCodeError}">经营许可证编号：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.cblCode"
                @blur="checkcblCode"
              ></el-input>
            </td>
            <td :class="{'error':registerFormCheck.istrcCodeError}">税务登记代码：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.trcCode"
                @blur="checktrcCode"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.isopenBankError}">开户银行：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.openBank"
                @blur="checkopenBank"
              ></el-input>
            </td>
            <td :class="{'error':registerFormCheck.isopenBankCodeError}">账号：</td>
            <td>
              <el-input
                size="mini"
                style="width:160px"
                v-model="registerForm.openBankCode"
                @blur="checkopenBankCode"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.iscoalResError}">可控煤矿资源：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="registerForm.coalRes"
                style="width:300px"
                @blur="checkcoalRes"
              ></el-input>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.istransError}">运输方式：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="registerForm.trans"
                style="width:300px"
                @blur="checktrans"
              ></el-input>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td :class="{'error':registerFormCheck.isinfoError}">供应商介绍：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="registerForm.info"
                style="width:300px"
                @blur="checkinfo"
              ></el-input>
            </td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <table v-if="!isFirstUser">
          <tr>
            <td>企业名称：</td>
            <td>{{userinfo.comName}}</td>
            <td>企业类型：</td>
            <td>{{userinfo.ctype}}</td>
          </tr>
          <tr>
            <td>法人代表：</td>
            <td>{{userinfo.leggName}}</td>
            <td>法人代表身份证：</td>
            <td>{{userinfo.leggIdcode}}</td>
          </tr>
          <tr>
            <td>注册地区：</td>
            <td>{{userinfo.regRegion}}</td>
            <td>企业邮箱：</td>
            <td>{{userinfo.mail}}</td>
          </tr>
          <tr>
            <td>联系人：</td>
            <td>{{userinfo.contact}}</td>
            <td>企业机构代码：</td>
            <td>{{userinfo.comCode}}</td>
          </tr>
          <tr>
            <td>联系电话：</td>
            <td>{{userinfo.tel}}</td>
            <td>传真：</td>
            <td>{{userinfo.fax}}</td>
          </tr>
          <tr>
            <td>邮政编码：</td>
            <td>{{userinfo.postcode}}</td>
            <td>注册资金：</td>
            <td>{{userinfo.regMoney}}</td>
          </tr>
          <tr>
            <td>营业执照号：</td>
            <td>{{userinfo.licenseCode}}</td>
            <td>组织机构代码：</td>
            <td>{{userinfo.ocCode}}</td>
          </tr>
          <tr>
            <td>经营许可证编号：</td>
            <td>{{userinfo.cblCode}}</td>
            <td>税务登记代码：</td>
            <td>{{userinfo.trcCode}}</td>
          </tr>
          <tr>
            <td>开户银行：</td>
            <td>{{userinfo.openBank}}</td>
            <td>账号：</td>
            <td>{{userinfo.openBankCode}}</td>
          </tr>
          <tr>
            <td>可控煤矿资源：</td>
            <td colspan="3">{{userinfo.coalRes}}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>运输方式：</td>
            <td colspan="3">{{userinfo.trans}}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>应商介绍：</td>
            <td colspan="3">{{userinfo.info}}</td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <div class="title">
          <span>企业资质</span>
        </div>
        <table v-if="isFirstUser">
          <tr>
            <td>营业执照：</td>
            <td>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>税务登记证</td>
            <td>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>组织机构代码证：</td>
            <td>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>开户许可证：</td>
            <td>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>煤炭经营许可证：</td>
            <td>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>法人身份证：</td>
            <td>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </td>
          </tr>
        </table>
        <table v-if="!isFirstUser">
          <tr>
            <td>营业执照：</td>
            <td>{{userinfo.license}}</td>
            <td>
              <el-button size="small" type="primary">下载</el-button>
            </td>
          </tr>
          <tr>
            <td>税务登记证</td>
            <td>{{userinfo.trc}}</td>
            <td>
              <el-button size="small" type="primary">下载</el-button>
            </td>
          </tr>
          <tr>
            <td>组织机构代码证：</td>
            <td>{{userinfo.oc}}</td>
            <td>
              <el-button size="small" type="primary">下载</el-button>
            </td>
          </tr>
          <tr>
            <td>开户许可证：</td>
            <td>{{userinfo.aqp}}</td>
            <td>
              <el-button size="small" type="primary">下载</el-button>
            </td>
          </tr>
          <tr>
            <td>煤炭经营许可证：</td>
            <td>{{userinfo.cbl}}</td>
            <td>
              <el-button size="small" type="primary">下载</el-button>
            </td>
          </tr>
          <tr>
            <td>法人身份证：</td>
            <td>{{userinfo.lpic}}</td>
            <td>
              <el-button size="small" type="primary">下载</el-button>
            </td>
          </tr>
        </table>
      </div>
      <div class="submitbuttongroup" v-if="isFirstUser">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="danger" plain @click="reset">重置</el-button>
      </div>
    </el-card>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :model="passwordform" :rules="passwordformrules" ref="passwordFormRef">
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="password1">
          <el-input
            v-model="passwordform.password1"
            autocomplete="off"
            style="width:85%"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="重复密码" :label-width="formLabelWidth" prop="password2">
          <el-input
            v-model="passwordform.password2"
            autocomplete="off"
            style="width:85%"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="passwordform.code" autocomplete="off" style="width:85%">
            <el-button slot="append" @click="sendcode" :disabled="btndisabled">{{btntext}}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改邮箱 -->
    <el-dialog
      title="修改邮箱"
      :visible.sync="changeEmailFormVisible"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :model="emailform" :rules="emailformrules" ref="emailformRef">
        <el-form-item label="新邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="emailform.email" autocomplete="off" style="width:85%" type="text"></el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="emailform.code" autocomplete="off" style="width:85%">
            <el-button
              slot="append"
              @click="sendemailcode"
              :disabled="emailbtndisabled"
            >{{emailbtntext}}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeEmailFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeEmail">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'selfpage',
  data() {
    var validatePass = (rule, value, callback) => {
      var reg = new RegExp(
        '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-ZW_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-zW_!@#$%^&*`~()-+=]+$)(?![0-9W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9W_!@#$%^&*`~()-+=]{6,18}$'
      )
      if (value === '') {
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
    var validateRepeatPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value !== this.passwordform.password1) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
    }
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
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
    return {
      dialogFormVisible: false,
      passwordform: {
        password1: '',
        password2: '',
        code: ''
      },
      formLabelWidth: '100px',
      isFirstUser: true,
      userinfo: {},
      // 注册信息
      registerForm: {
        comName: '',
        ctype: '国企',
        leggName: '',
        leggIdcode: '',
        regRegion: '',
        tel: '',
        mail: '',
        fax: '',
        postcode: '',
        contact: '',
        comCode: '',
        regMoney: '',
        licenseCode: '',
        ocCode: '',
        cblCode: '',
        trcCode: '',
        openBank: '',
        openBankCode: '',
        coalRes: '',
        trans: '',
        info: '',
        license: 'aaa',
        trc: 'bbb',
        oc: 'ccc',
        aqp: 'dddd',
        cbl: 'eeee',
        lpic: 'fffff'
      },
      registerFormCheck: {
        isComNameError: false,
        isLeggNameError: false,
        isLeggIdcodeError: false,
        isRegRegionError: false,
        isTelError: false,
        isFaxError: false,
        isContactError: false,
        isComCodeError: false,
        isPostcodeError: false,
        isRegMoneyError: false,
        isLicenseCodeError: false,
        isocCodeError: false,
        iscblCodeError: false,
        istrcCodeError: false,
        isopenBankCodeError: false,
        isopenBankError: false,
        istransError: false,
        isinfoError: false
      },
      passwordformrules: {
        password1: [{ validator: validatePass, trigger: 'blur' }],
        password2: [{ validator: validateRepeatPass, trigger: 'blur' }],
        code: [{ validator: validateCode, trigger: 'blur' }]
      },
      emailformrules: {
        email: [{ validator: checkEmail, trigger: 'blur' }],
        code: [{ validator: validateCode, trigger: 'blur' }]
      },
      // 发送验证码
      btndisabled: false,
      btntext: '发送验证码',
      codeid: 0,
      // 修改邮箱表格
      emailform: {
        email: '',
        code: '',
        codeid: ''
      },
      changeEmailFormVisible: false,
      emailbtndisabled: false,
      emailbtntext: '发送验证码'
    }
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$axios.get('/home/personal', {
        headers: {
          token: window.localStorage.token
        }
      })
      if (res.code !== 200) return this.$message('获取用户信息失败')
      console.log(res)
      this.userinfo = res.data
      this.registerForm.mail = this.userinfo.mail
      if (this.userinfo.rtype === 0) {
        this.isFirstUser = true
      } else {
        this.isFirstUser = false
      }
    },
    // 预检查
    checkcomName() {
      if (
        this.registerForm.comName === '' ||
        this.registerForm.comName === null
      ) {
        this.registerFormCheck.isComNameError = true
        return false
      } else {
        this.registerFormCheck.isComNameError = false
        return true
      }
    },
    checkleggName() {
      if (
        this.registerForm.leggName === '' ||
        this.registerForm.leggName === null
      ) {
        this.registerFormCheck.isLeggNameError = true
        return false
      } else {
        this.registerFormCheck.isLeggNameError = false
        return true
      }
    },
    checkleggIdcode() {
      if (
        this.registerForm.leggIdcode === '' ||
        this.registerForm.leggIdcode === null
      ) {
        this.registerFormCheck.isLeggIdcodeError = true
        return false
      } else {
        this.registerFormCheck.isLeggIdcodeError = false
        return true
      }
    },
    checkregRegion() {
      if (
        this.registerForm.regRegion === '' ||
        this.registerForm.regRegion === null
      ) {
        this.registerFormCheck.isRegRegionError = true
        return false
      } else {
        this.registerFormCheck.isRegRegionError = false
        return true
      }
    },
    checkcontact() {
      if (
        this.registerForm.contact === '' ||
        this.registerForm.contact === null
      ) {
        this.registerFormCheck.isContactError = true
        return false
      } else {
        this.registerFormCheck.isContactError = false
        return true
      }
    },
    checkcomCode() {
      if (
        this.registerForm.comCode === '' ||
        this.registerForm.comCode === null
      ) {
        this.registerFormCheck.isComCodeError = true
        return false
      } else {
        this.registerFormCheck.isComCodeError = false
        return true
      }
    },
    checktel() {
      if (this.registerForm.tel === '' || this.registerForm.tel === null) {
        this.registerFormCheck.isTelError = true
        return false
      } else {
        this.registerFormCheck.isTelError = false
        return true
      }
    },
    checkfax() {
      if (this.registerForm.fax === '' || this.registerForm.fax === null) {
        this.registerFormCheck.isFaxError = true
        return false
      } else {
        this.registerFormCheck.isFaxError = false
        return true
      }
    },
    checkpostcode() {
      if (
        this.registerForm.postcode === '' ||
        this.registerForm.postcode === null
      ) {
        this.registerFormCheck.isPostcodeError = true
        return false
      } else {
        this.registerFormCheck.isPostcodeError = false
        return true
      }
    },
    checkregMoney() {
      if (
        this.registerForm.regMoney === '' ||
        this.registerForm.regMoney === null
      ) {
        this.registerFormCheck.isRegMoneyError = true
        return false
      } else {
        this.registerFormCheck.isRegMoneyError = false
        return true
      }
    },
    checklicenseCode() {
      if (
        this.registerForm.licenseCode === '' ||
        this.registerForm.licenseCode === null
      ) {
        this.registerFormCheck.isLicenseCodeError = true
        return false
      } else {
        this.registerFormCheck.isLicenseCodeError = false
        return true
      }
    },
    checkocCode() {
      if (
        this.registerForm.ocCode === '' ||
        this.registerForm.ocCode === null
      ) {
        this.registerFormCheck.isocCodeError = true
        return false
      } else {
        this.registerFormCheck.isocCodeError = false
        return true
      }
    },
    checkcblCode() {
      if (
        this.registerForm.cblCode === '' ||
        this.registerForm.cblCode === null
      ) {
        this.registerFormCheck.iscblCodeError = true
        return false
      } else {
        this.registerFormCheck.iscblCodeError = false
        return true
      }
    },
    checktrcCode() {
      if (
        this.registerForm.trcCode === '' ||
        this.registerForm.trcCode === null
      ) {
        this.registerFormCheck.istrcCodeError = true
        return false
      } else {
        this.registerFormCheck.istrcCodeError = false
        return true
      }
    },
    checkopenBank() {
      if (
        this.registerForm.openBank === '' ||
        this.registerForm.openBank === null
      ) {
        this.registerFormCheck.isopenBankError = true
        return false
      } else {
        this.registerFormCheck.isopenBankError = false
        return true
      }
    },
    checkopenBankCode() {
      if (
        this.registerForm.openBankCode === '' ||
        this.registerForm.openBankCode === null
      ) {
        this.registerFormCheck.isopenBankCodeError = true
        return false
      } else {
        this.registerFormCheck.isopenBankCodeError = false
        return true
      }
    },
    checkcoalRes() {
      if (
        this.registerForm.coalRes === '' ||
        this.registerForm.coalRes === null
      ) {
        this.registerFormCheck.iscoalResError = true
        return false
      } else {
        this.registerFormCheck.iscoalResError = false
        return true
      }
    },
    checktrans() {
      if (this.registerForm.trans === '' || this.registerForm.trans === null) {
        this.registerFormCheck.istransError = true
        return false
      } else {
        this.registerFormCheck.istransError = false
        return true
      }
    },
    checkinfo() {
      if (this.registerForm.info === '' || this.registerForm.info === null) {
        this.registerFormCheck.isinfoError = true
        return false
      } else {
        this.registerFormCheck.isinfoError = false
        return true
      }
    },
    // 提交
    submit() {
      this.checkcomName()
      this.checkleggName()
      this.checkleggIdcode()
      this.checkregRegion()
      this.checkcontact()
      this.checkcomCode()
      this.checktel()
      this.checkfax()
      this.checkpostcode()
      this.checkregMoney()
      this.checklicenseCode()
      this.checkocCode()
      this.checkcblCode()
      this.checktrcCode()
      this.checkopenBank()
      this.checkopenBankCode()
      this.checkcoalRes()
      this.checktrans()
      this.checkinfo()
      if (
        this.checkcomName() &&
        this.checkleggName() &&
        this.checkleggIdcode() &&
        this.checkregRegion() &&
        this.checkcontact() &&
        this.checkcomCode() &&
        this.checktel() &&
        this.checkfax() &&
        this.checkpostcode() &&
        this.checkregMoney() &&
        this.checklicenseCode() &&
        this.checkocCode() &&
        this.checkcblCode() &&
        this.checktrcCode() &&
        this.checkopenBank() &&
        this.checkopenBankCode() &&
        this.checkcoalRes() &&
        this.checktrans() &&
        this.checkinfo()
      ) {
        this.secondregister()
      } else {
        this.$message.error('请检查填写完整！')
      }
    },
    async secondregister() {
      const { data: res } = await this.$axios.post(
        '/user/register2',
        this.$qs.stringify(this.registerForm),
        {
          headers: {
            token: window.localStorage.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      if (res.code !== 200) return this.$message.error(res.message)
      this.$message.success(res.data)
      this.$router.go(0)
    },
    // 发送验证码
    async sendcode() {
      if (this.btndisabled === true) {
        return true
      } else {
        const { data: res } = await this.$axios.post(
          '/user/sendVerificationCodeToEmail',
          this.$qs.stringify({
            emailaddress: this.userinfo.mail
          })
        )
        console.log(res)
        if (res.code !== 200) {
          return this.$message.error(res.message)
        } else {
          this.codeid = res.data
          this.$message.success('发送成功！')
          this.getsecond(5)
        }
      }
    },
    reset() {
      Object.keys(this.registerForm).forEach(
        key => (this.registerForm[key] = '')
      )
      Object.keys(this.registerFormCheck).forEach(
        key => (this.registerFormCheck[key] = false)
      )
      this.registerForm.mail = this.userinfo.mail
      this.registerForm.ctype = '国企'
    },
    // 发送修改邮箱验证码
    async sendemailcode() {
      if (this.emailform.email === '' || this.emailform.email === null) {
        return this.$message.error('请将邮箱填写完整')
      } else {
        if (this.emailbtndisabled === true) {
          return true
        } else {
          const { data: res } = await this.$axios.post(
            '/user/sendVerificationCodeToEmail',
            this.$qs.stringify({
              emailaddress: this.emailform.email
            })
          )
          console.log(res)
          if (res.code !== 200) {
            return this.$message.error(res.message)
          } else {
            this.emailform.codeid = res.data
            this.$message.success('发送成功！')
            this.getsecond2(5)
          }
        }
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
    // 邮箱button
    getsecond2(wait) {
      let _this = this
      let _wait = wait
      if (wait === 0) {
        this.emailbtndisabled = false
        this.emailbtntext = '获取验证码'
        wait = _wait
      } else {
        this.emailbtndisabled = true
        this.emailbtntext = '验证码(' + wait + 's)'
        wait--
        setTimeout(function() {
          _this.getsecond2(wait)
        }, 1000)
      }
    },
    // 改密码
    changePassword() {
      let data = {
        code: this.passwordform.code,
        password: this.passwordform.password1,
        id: this.codeid
      }
      this.$refs.passwordFormRef.validate(async valid => {
        let _this = this
        if (!valid) return
        const { data: res } = await this.$axios.post(
          '/user/changePasswordByID',
          this.$qs.stringify(data),
          {
            headers: {
              token: window.localStorage.token
            }
          }
        )
        console.log(res)
        if (res.code !== 200) {
          return this.$message.error(res.message)
        } else {
          this.$message.success('修改成功，请重新登录')
          setTimeout(function() {
            _this.$router.push('/login')
          }, 500)
        }
      })
    },
    // 修改邮箱
    changeEmail() {
      let data = {
        code: this.emailform.code,
        mail: this.emailform.email,
        id: this.emailform.codeid
      }
      this.$refs.emailformRef.validate(async valid => {
        let _this = this
        if (!valid) return
        const { data: res } = await this.$axios.post(
          '/user/changeEmailByID',
          this.$qs.stringify(data),
          {
            headers: {
              token: window.localStorage.token
            }
          }
        )
        console.log(res)
        if (res.code !== 200) {
          return this.$message.error(res.message)
        } else {
          this.$message.success('修改成功!')
          setTimeout(function() {
            _this.$router.go(0)
          }, 500)
        }
      })
    }
  },
  created() {
    this.getUserInfo()
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
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
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
    button {
      position: absolute;
      right: 0;
      bottom: 5px;
      &:nth-child(2) {
        right: 90px;
      }
    }
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
  .buttongroup {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    button {
      width: 100px;
      margin-left: 20px;
    }
  }
  .el-upload__tip {
    float: left;
    margin-right: 20px;
  }
  // 发送验证码button
  .codebutton {
    position: absolute;
    right: 60px;
  }
}

.submitbuttongroup {
  text-align: center;
  margin-top: 20px;
  button {
    margin-left: 20px;
  }
}

.error {
  color: red;
}
</style>
