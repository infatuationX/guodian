<template>
  <div id="404">
    <div class="main">
      <img src="@/assets/pic/logo.png" alt />
      页面找不到了...
    </div>
    <div style="margin:0 auto;width:100px">
      <el-button type="primary" plain @click="back">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '404',
  data() {
    return {}
  },
  methods: {
    back() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang='less' scoped>
.main {
  width: 400px;
  margin: 200px auto 30px auto;
  font-size: 40px;
  color: #a4a4a4;
  align-items: center;
  display: flex;
  img {
    width: 100px;
    height: 100px;
    margin-left: 20px;
    overflow: hidden;
  }
}
</style>
