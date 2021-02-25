<template>
  <div id="member">
    <commonHead :page="pageName"></commonHead>
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
            <span>
              <i class="fa fa-smile-o"></i> 会员中心
            </span>
          </div>
          <el-menu-item index="/member">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单查询</span>
          </el-menu-item>
          <el-submenu>
            <template slot="title">
              <i class="el-icon-money"></i>
              <span>资金管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/member/1">资金明细</el-menu-item>
              <el-menu-item index="/member/2">资金预存</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/member/selfpage">
            <i class="el-icon-user"></i>
            <span slot="title">我的信息</span>
          </el-menu-item>
          <!-- <el-menu-item index="/member/account">
            <i class="el-icon-setting"></i>
            <span slot="title">账户管理</span>
          </el-menu-item>-->
        </el-menu>
      </div>
      <div class="block" v-if="isScroll"></div>

      <!-- 面包屑导航 -->
      <div class="main">
        <el-card class="box-card">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/member' }">会员中心</el-breadcrumb-item>
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
  name: 'member',
  data() {
    return {
      pageName: '用户名',
      searchtext: '',
      isScroll: false,
      pathname: '订单查询'
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
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)

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
        if (this.$route.path === '/member') {
          this.pathname = '订单查询'
        }
        if (this.$route.path === '/member/1') {
          this.pathname = '资金明细'
        }
        if (this.$route.path === '/trade/quote') {
          this.pathname = '资金预存'
        }
        if (this.$route.path === '/trade/logistics') {
          this.pathname = '我的信息'
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
#member {
  height: 100%;
}
// 侧边栏导航
.sidenav {
  float: left;
  width: 160px;
  height: 100%;
  font-weight: bold;
}

.sidenavScroll {
  float: left;
  width: 160px;
  height: 100%;
  font-weight: bold;
  position: fixed;
  top: 0;
}

// 占位框
.block {
  width: 160px;
  height: 100%;
  float: left;
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
.el-menu {
  border-right: none;
}
.el-menu-item {
  min-width: 160px;
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
