<template>
  <div id="notlogged">
    <commonHead :page="pageName"></commonHead>
    <div class="center">
      <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{pathname}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import commonHead from '../common/CommonHead'
export default {
  components: { commonHead },
  name: 'notlogged',
  data() {
    return {
      pageName: '登 录',
      searchtext: '',
      pathname: '交易中心'
    }
  },
  mounted() {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#e5eaed')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path === '/not/trade') {
          this.pathname = '销售中心'
        }
        if (this.$route.path === '/not/information') {
          this.pathname = '资讯中心'
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin-top: 20px;
}
</style>
