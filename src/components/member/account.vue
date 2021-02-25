<template>
  <div id="account">
    <el-card class="box-card">
      <div class="main">
        <div class="title">
          <span>个人信息</span>
        </div>
        <table>
          <tr>
            <td>姓名：</td>
            <td></td>
          </tr>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'account',
  data() {
    return {}
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
    span {
      color: #fff;
      padding: 5px;
      background-color: #409eff;
      font-weight: bold;
    }
  }
}
</style>
