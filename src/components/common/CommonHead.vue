<template>
  <div id="commonHead">
    <!-- 导航栏区域 -->
    <div class="top">
      <div class="center nav">
        <img src="../../assets/pic/logo.png" />
        <ul>
          <li @click="goTo('/')">首 页</li>
          <li @click="goTo(tradepath)" :class="{'active':istrade}">交易中心</li>
          <li @click="goTo(inforpath)" :class="{'active':isinformation}">资讯中心</li>
          <li>物流中心</li>
          <li @click="goTo(memberpath)" :class="{'active':ismember}">会员中心</li>
          <li @click="goTo(pagepath)" @mouseenter="quitenter" @mouseleave="quitleave">
            {{pageName}}
            <div class="quit" v-if="quithappen" @click.stop="quit">
              <span>退 出</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonHead',
  created() {
    if (window.localStorage.getItem('token')) {
      this.islogined = true
    } else {
      this.islogined = false
    }
    if (this.islogined === true) {
      this.tradepath = '/trade'
      this.inforpath = '/information'
      this.memberpath = '/member'
      this.pagepath = '/member'
      this.getUserInfo()
    } else {
      this.pageName = '登 录'
      this.tradepath = '/not/trade'
      this.inforpath = '/not/information'
      this.memberpath = '/login'
      this.pagepath = '/login'
      if (this.$route.path === '/login') {
        this.pageName = '注 册'
        this.pagepath = '/register'
      }
      if (this.$route.path === '/register') {
        this.pageName = '登 录'
        this.pagepath = '/login'
      }
    }
    this.highlight()
  },
  data() {
    return {
      pageName: '',
      pagepath: '',
      islogined: false,
      username: '',
      tradepath: '',
      inforpath: '',
      quithappen: false,
      istrade: false,
      isinformation: false,
      ismember: false
    }
  },

  methods: {
    goTo(url) {
      this.$router.push(url)
    },
    quitenter() {
      if (this.islogined === true) {
        this.quithappen = true
      }
    },
    quitleave() {
      if (this.islogined === true) {
        this.quithappen = false
      }
    },
    quit() {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 获取用户名
    async getUserInfo() {
      const { data: res } = await this.$axios.get('/home/personal', {
        headers: {
          token: window.localStorage.token
        }
      })
      if (res.code !== 200) return
      let name = res.data.username
      if (name.length > 8) {
        this.pageName = name.substring(0, 8) + '...'
      } else {
        this.pageName = res.data.username
      }
    },
    highlight() {
      if (this.$route.path === '/trade' || this.$route.path === '/not/trade') {
        this.istrade = true
        this.ismember = false
        this.isinformation = false
      } else if (
        this.$route.path === '/information' ||
        this.$route.path === '/not/information' ||
        this.$route.path === '/information/news/:id'
      ) {
        this.istrade = false
        this.ismember = false
        this.isinformation = true
      } else if (this.$route.path === '/member') {
        this.istrade = false
        this.ismember = true
        this.isinformation = false
      } else {
        this.istrade = false
        this.ismember = false
        this.isinformation = false
      }
    }
  }
}
</script>

<style lang='less' scoped>
// 导航栏样式
// 导航栏背景
.top {
  width: 100%;
  height: 48px;
  background-color: #484757;
  //color: rgb(142, 152, 159);
  position: relative;
  box-shadow: 0 2px 27px 6px rgba(0, 0, 0, 0.12);
}

// 导航栏
.nav {
  height: 100%;
  line-height: 48px;
  display: flex;
  align-items: center;
  color: #d7d7e0;
  font-size: 18px;

  // logo
  img {
    width: 48px;
    height: 48px;
    margin-right: 10px;
  }

  // 导航区
  ul {
    height: 100%;
    flex: 1;
    margin-left: 265px;
    // 导航按钮
    li {
      width: 80px;
      height: 100%;
      line-height: 100%;
      float: left;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
      color: #98989f;
      &:last-child {
        width: 100px;
        float: right;
      }
      &:hover {
        color: #d7d7e0;
        background-color: #3d3d4a;
      }
    }
    // 导航激活样式
    .active {
      color: #d7d7e0;
    }
  }
  // 退出盒子
  .quit {
    top: 100%;
    width: 100px;
    height: 35px;
    //background-color: pink;
    background-color: #484757;
    position: absolute;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #98989f;
  }
}
</style>
