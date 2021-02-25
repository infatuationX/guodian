<template>
  <div id="trade">
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
            <span>￥交易中心</span>
          </div>
          <el-menu-item index="/trade">
            <i class="el-icon-s-shop"></i>
            <span slot="title">销售中心</span>
          </el-menu-item>
          <el-menu-item index="/trade/purchase">
            <i class="el-icon-goods"></i>
            <span slot="title">采购中心</span>
          </el-menu-item>
          <el-menu-item index="/trade/quote">
            <i class="el-icon-s-claim"></i>
            <span slot="title">用户挂牌</span>
          </el-menu-item>
          <el-menu-item index="/trade/logistics">
            <i class="el-icon-ship"></i>
            <span slot="title">物流信息</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="block" v-if="isScroll"></div>
      <!-- 面包屑导航 -->
      <div class="main">
        <el-card class="box-card">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/trade' }">交易中心</el-breadcrumb-item>
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
  name: 'trade',
  data() {
    return {
      pageName: '用户名',
      searchtext: '',
      isScroll: false,
      pathname: '销售中心'
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
        if (this.$route.path === '/trade') {
          this.pathname = '销售中心'
        }
        if (this.$route.path === '/trade/purchase') {
          this.pathname = '采购中心'
        }
        if (this.$route.path === '/trade/quote') {
          this.pathname = '用户挂牌'
        }
        if (this.$route.path === '/trade/logistics') {
          this.pathname = '物流中心'
        }
      }
    }
  },
  created() {}
}
</script>

<style lang='less' scoped>
#trade {
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

// 占位框
.block {
  width: 150px;
  height: 100%;
  float: left;
}
</style>
