<template>
  <div id="information">
    <commonHead></commonHead>
    <!-- 侧边栏导航 -->
    <div class="center" style="height:100%">
      <div :class="isScroll?'sidenavScroll':'sidenav'">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#f5f7f8"
          text-color="#797979"
          active-text-color="#2faee3"
          style="height:100%"
          router
        >
          <div class="navtitle">
            <span>资讯中心</span>
          </div>
          <el-menu-item index="/information">
            <i class="el-icon-s-shop"></i>
            <span slot="title">今日关注</span>
          </el-menu-item>
          <el-menu-item index="/information/internal">
            <i class="el-icon-goods"></i>
            <span slot="title">国内煤价</span>
          </el-menu-item>
          <el-menu-item index="/information/international">
            <i class="el-icon-s-claim"></i>
            <span slot="title">国际煤价</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="block" v-if="isScroll"></div>
      <!-- 面包屑导航 -->
      <div class="main">
        <el-card class="box-card">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/information'}">资讯中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: this.$route.path }">{{pathname}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import commonHead from './common/CommonHead'
export default {
  components: { commonHead },
  name: 'information',
  data() {
    return {
      isScroll: false,
      searchtext: '',
      pathname: '今日关注'
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
        if (this.$route.path === '/information') {
          this.pathname = '今日关注'
        }
        if (this.$route.path === '/information/internal') {
          this.pathname = '国内煤价'
        }
        if (this.$route.path === '/trade/international') {
          this.pathname = '国际煤价'
        }
      }
    }
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop >= 48) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    }
  }
}
</script>

<style lang='less' scoped>
#information {
  height: 100%;
}

// 侧边栏导航
.sidenav {
  float: left;
  width: 150px;
  height: 100%;
  font-weight: bold;
}

.sidenavScroll {
  float: left;
  width: 150px;
  height: 100%;
  font-weight: bold;
  position: fixed;
  top: 0;
}
//   导航标题
.navtitle {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}

// 右边主体
.main {
  float: left;
  width: 800px;
  .box-card {
    margin: 10px 20px;
    width: 100%;
  }
  // 搜索框
  .searchbox {
    float: right;
  }
}
</style>
