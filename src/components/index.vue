<template>
  <div id="index">
    <!-- 导航栏区域 -->
    <div class="top">
      <div class="center nav">
        <img src="../assets/pic/logo.png" />
        国电煤炭交易平台
        <ul>
          <li class="active">首 页</li>
          <li @click="goTo(tradepath)">交易中心</li>
          <li @click="goTo(inforpath)">资讯中心</li>
          <li>物流中心</li>
          <li @click="goTo('/member')">会员中心</li>
          <li @click="goTo(userpath)" @mouseenter="quitenter" @mouseleave="quitleave">
            {{username}}
            <div class="quit" v-if="quithappen" @click.stop="quit">
              <span>退 出</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- banner区域 -->
    <div class="banner">
      <!-- 主体 -->
      <div class="center main">
        <div>
          <p>中国第一个大型线上煤炭交易平台</p>
          <p>
            买卖公正、超一手信息、交易便捷……
            <br />你要的这里全都有
          </p>
          <div v-if="islogined">
            <button @click="goTo('/register')">注册</button>
            <button @click="goTo('/login')">登录</button>
          </div>
        </div>
      </div>
      <img src="../assets/pic/banner.jpg" />
    </div>
    <!-- 块状导航区域 -->
    <div class="navblock center">
      <ul>
        <li @click="goTo(tradepath)">
          <i class="fa fa-rmb"></i>交易中心
        </li>
        <li @click="goTo(inforpath)">
          <i class="fa fa-newspaper-o"></i>资讯中心
        </li>
        <li>
          <i class="fa fa-ship"></i>物流中心
        </li>
        <li @click="goTo(userpath)">
          <i class="fa fa-user"></i>会员中心
        </li>
      </ul>
      <div style="clear:both"></div>
      <el-divider></el-divider>
    </div>
    <!-- 信息区 -->

    <el-card class="box-card center">
      <div class="title">
        <img src="../assets/pic/news.png" />
        <strong>行业资讯</strong>
        <el-button type="default" plain size="mini" @click="switchToNewsButton">更多 ></el-button>
      </div>
      <el-table
        :data="newslist"
        stripe
        style="width: 100%;cursor: pointer"
        @row-click="switchToNews"
      >
        <el-table-column prop="id" width="80"></el-table-column>
        <el-table-column prop="title"></el-table-column>
        <el-table-column prop="ctime" :formatter="timeformat" width="150"></el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card center">
      <div class="title">
        <img src="../assets/pic/sell.png" class="sellimg" />
        <strong>销售信息</strong>
        <el-button type="default" plain size="mini" @click="switchToSellButton">更多 ></el-button>
      </div>
      <el-table :data="colist" stripe style="width: 100%">
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column prop="comName" label="公司"></el-table-column>
        <el-table-column prop="voc" label="煤种"></el-table-column>
        <el-table-column prop="pq" label="采购数量"></el-table-column>
        <el-table-column prop="pd" label="发布时间" :formatter="timeformat"></el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card center">
      <div class="title">
        <img src="../assets/pic/purchase.png" class="sellimg" />
        <strong>采购信息</strong>
        <el-button type="default" plain size="mini" @click="switchToBuyButton">更多 ></el-button>
      </div>
      <el-table :data="colist2" stripe style="width: 100%">
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column prop="comName" label="公司"></el-table-column>
        <el-table-column prop="sq" label="供应数量"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="pubdate" label="发布时间" :formatter="timeformat"></el-table-column>
      </el-table>
    </el-card>
    <div style="clear:both"></div>
    <footer class="footer">
      <div>
        网站版权归国家能源集团电子商务有限公司所有 沪ICP备00000000号-0 | 沪公网安备31011802003915号
        <br />地址：上海市青浦区徐泾镇诸光路328号 邮编：201702 电话：400-020-8000（非工作时间：15011089832）
        <br />电子邮箱：fuel@chnenergy.com.cn
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data() {
    return {
      islogined: true,
      quithappen: false,
      tradepath: '',
      inforpath: '',
      userpath: '',
      username: '',
      newslist: [],
      colist: [],
      colist2: []
    }
  },
  methods: {
    goTo(url) {
      this.$router.push(url)
    },
    quitenter() {
      if (this.islogined === false) {
        this.quithappen = true
      }
    },
    quitleave() {
      if (this.islogined === false) {
        this.quithappen = false
      }
    },
    quit() {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 获取新闻
    async getNewslist() {
      const { data: res } = await this.$axios.get('/home/news')
      console.log(res)
      if (res.code !== 200) return this.$message.error('新闻列表渲染失败')
      this.newslist = res.data
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
        this.username = name.substring(0, 8) + '...'
      } else {
        this.username = res.data.username
      }
    },
    // 格式化数据
    timeformat(row, column, val) {
      if (val === null || val === '') {
        return ''
      }
      const date = row[column.property]
      if (date === undefined) {
        return ''
      } else {
        return date.substring(0, 10)
      }
    },
    // 新闻详情跳转
    switchToNews(row, event, column) {
      if (this.islogined === false) {
        this.$router.push({ path: `/information/news/${row.id}` })
      } else {
        this.$router.push({ path: `/not/news/${row.id}` })
      }
    },
    async getSellList() {
      const { data: res } = await this.$axios.get('/home/buy')
      if (res.code !== 200) return this.$message.error('获取销售列表失败')
      this.colist = res.data
      console.log(res)
    },
    async getbuylist() {
      const { data: res } = await this.$axios.get('/home/sell')
      if (res.code !== 200) return this.$message.error('获取销售列表失败')
      this.colist2 = res.data
      console.log(res)
    },
    switchToNewsButton() {
      if (this.islogined === false) {
        this.$router.push('/information')
      } else {
        this.$router.push('/not/information')
      }
    },
    switchToSellButton() {
      if (this.islogined === false) {
        this.$router.push('/trade')
      } else {
        this.$router.push('/not/trade')
      }
    },
    switchToBuyButton() {
      if (this.islogined === false) {
        this.$router.push('/trade/purchase')
      } else {
        this.$router.push('/not/trade')
      }
    }
  },
  created() {
    if (window.localStorage.getItem('token')) {
      this.islogined = false
    } else {
      this.islogined = true
    }
    if (this.islogined === false) {
      this.userpath = '/member'
      this.tradepath = '/trade'
      this.inforpath = '/information'
    } else {
      this.userpath = '/login'
      this.username = '登 录'
      this.tradepath = '/not/trade'
      this.inforpath = '/not/information'
    }
    this.getNewslist()
    this.getUserInfo()
    this.getSellList()
    this.getbuylist()
  }
}
</script>

<style lang="less" scoped>
// 导航栏样式
// 导航栏背景
.top {
  width: 100%;
  height: 48px;
  background-color: #484757;
  position: relative;
  box-shadow: 0 2px 27px 6px rgba(0, 0, 0, 0.12);
  z-index: 2;
  //color: rgb(142, 152, 159);
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
    margin-left: 120px;
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
      &:nth-child(6) {
        width: 100px;
        float: right;
        position: relative;
      }
      &:hover {
        color: #d7d7e0;
        background-color: #3d3d4a;
      }
    }
  }

  // 导航激活样式
  .active {
    color: #d7d7e0;
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

// banner区域
.banner {
  background-color: #e5eaed;
  width: 100%;
  height: 500px;
  position: relative;
  // 主体图片
  img {
    width: 656px;
    height: 500px;
    position: absolute;
    top: 0;
    right: 0;
  }
}
// 主体
.main {
  height: 100%;
  display: flex;
  align-items: center;
  color: #62696d;
  p {
    font-size: 20px;
    &:first-child {
      font-size: 30px;
    }
  }
  // 按钮
  button {
    border: 1.5px solid #797979;
    width: 180px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0);
    color: #62696d;
    font-size: 20px;
    cursor: pointer;
    &:nth-child(1) {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      &:hover {
        color: #fff;
        background-color: #000;
        + button {
          background-color: rgba(0, 0, 0, 0);
          color: #000;
        }
      }
    }
    &:nth-child(2) {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      color: #fff;
      background-color: #000;
      transform: translateX(-1.5px);
    }
  }
}

// 块状导航
.navblock {
  ul {
    width: 100%;
    margin-top: 50px;
    li {
      width: 205px;
      height: 205px;
      background-color: #e5eaed;
      float: left;
      font-size: 30px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 60px;
      }
      i {
        margin-bottom: 20px;
        font-size: 80px;
      }
      &:hover {
        background-color: #9f9f9f;
      }
    }
  }
}

// 主页信息区域
.box-card {
  margin-bottom: 20px;
  .title {
    display: flex;
    align-items: center;
    font-size: 16px;
    img {
      width: 48px;
      height: 34px;
      margin-right: 10px;
    }
    button {
      margin-left: auto;
    }
    .sellimg {
      width: 36px;
      height: 37px;
    }
  }
}

// 底部
.footer {
  width: 100%;
  height: 150px;
  margin-top: 20px;
  background-color: #484757;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  position: relative;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
