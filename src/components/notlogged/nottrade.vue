<template>
  <div id="notinformation">
    <el-card class="box-card">
      <el-radio v-model="radio" label="1" @change="switchTab">供应市场</el-radio>
      <el-radio v-model="radio" label="2" @change="switchTab">需求市场</el-radio>
      <div v-if="!select">
        <div class="colist" v-for="(item,i) in colist" v-bind:key="i">
          <el-divider></el-divider>
          <div class="cotitle">
            <img src="../../assets/pic/companylogo2.png" />
            {{item.comName}}
            <span>在 {{item.pubdate | formatDate}} 发布</span>
            <span>
              供应数量
              <i>{{item.sq}}</i> 万吨
            </span>
          </div>
          <!-- 公司详情 -->
          <div class="codetail">
            <div>
              <span>空干基灰分</span>
              <span>全硫分</span>
            </div>
            <div>
              <span>
                <i>{{item.adba}}</i> %
              </span>
              <span>
                <i>{{item.s}}</i> %
              </span>
            </div>
            <div>
              <span>挥发分</span>
              <span>全水分</span>
            </div>
            <div>
              <span>
                <i>{{item.vad}}</i> %
              </span>
              <span>
                <i>{{item.m}}</i> %
              </span>
            </div>
            <div>
              <span>
                <i>{{item.price}}</i> 元 / 吨
                <span>一口价</span>
              </span>
              <span style="float:right">
                截止日期 {{item.deadline | formatDate}}
                <el-button type="text" @click="goTo(item.id)">详情 ></el-button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="select">
        <div class="colist" v-for="(item,i) in colist2" v-bind:key="i">
          <el-divider></el-divider>
          <div class="cotitle">
            <img src="../../assets/pic/companylogo.png" />
            {{item.comName}}
            <span>在 {{item.pd | formatDate}} 发布</span>
            <span>
              采购数量
              <i>{{item.pq}}</i> 万吨
            </span>
          </div>
          <!-- 公司详情 -->
          <div class="codetail">
            <div>
              <span>低位发热量</span>
              <span>全硫分</span>
            </div>
            <div>
              <span>
                <i>{{item.qnetar}}</i> Kcal
              </span>
              <span>
                <i>{{item.star}}</i> %
              </span>
            </div>
            <div>
              <span>干燥无灰基挥发分</span>
              <span>全水分</span>
            </div>
            <div>
              <span>
                <i>{{item.dafv}}</i> %
              </span>
              <span>
                <i>{{item.m}}</i> %
              </span>
            </div>
            <div>
              <span>
                <strong>{{item.voc | foramtVoc}}</strong>&nbsp;
                <i>{{item.minPrice}}</i> 元起 / 吨
              </span>
              <span style="float:right">
                截止日期 {{item.deadline | formatDate}}
                <el-button type="text" @click="open">详情 ></el-button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'notinformation',
  data() {
    return {
      radio: '1',
      colist: [],
      select: true,
      colist2: []
    }
  },
  methods: {
    switchTab() {
      this.select = !this.select
    },
    async getbuylist() {
      const { data: res } = await this.$axios.get('/home/sell')
      if (res.code !== 200) return this.$message.error('获取销售列表失败')
      this.colist = res.data
      console.log(res)
    },
    async getSellList() {
      const { data: res } = await this.$axios.get('/home/buy')
      if (res.code !== 200) return this.$message.error('获取销售列表失败')
      this.colist2 = res.data
      console.log(res)
    },
    open() {
      this.$confirm('交易信息登录才能后查看，是否前往登录页面', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {})
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
  filters: {
    formatDate(val) {
      if (val === null || val === '') {
        return ''
      }
      return val.substring(0, 10)
    },
    foramtVoc(val) {
      if (val === null || val === '') {
        return ''
      }
      let index = val.indexOf('&')
      if (index === -1) {
        return val
      } else {
        return val.substring(0, index)
      }
    }
  },
  created() {
    this.getbuylist()
    this.getSellList()
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin-top: 20px;
}

// 公司列表
.colist {
  align-items: center;
  //   公司名字
  .cotitle {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    img {
      border-radius: 50%;
      border: 1px solid #a4a4a4;
      width: 42px;
      height: 42px;
      padding: 2px;
      margin-right: 5px;
    }
    span {
      font-size: 14px;
      color: #a4a4a4;
      font-weight: normal;
      margin-left: 10px;
      &:last-child {
        margin-left: auto;
      }
      i {
        font-style: normal;
        font-size: 18px;
      }
    }
  }
  //   公司详情
  .codetail {
    margin-bottom: 50px;
    div {
      display: inline-block;
      span {
        display: block;
        margin-top: 10px;
        i {
          font-style: normal;
          font-size: 20px;
        }
      }
      &:nth-child(1) {
        margin-left: 50px;
      }
      &:nth-child(n + 2):nth-child(-n + 4) {
        margin-left: 20px;
      }
      // 报价及详情
      &:nth-child(5) {
        float: right;
        span {
          font-size: 24px;
          strong {
            font-size: 32px;
          }
          i {
            font-style: normal;
            font-size: 36px;
            color: #ff5c51;
          }
          span {
            display: inline-block;
            font-size: 14px;
            padding: 2px;
            border-radius: 5px;
            border: 1px solid #a4a4a4;
          }
          &:last-child {
            font-size: 18px;
            color: #a4a4a4;
            button {
              font-size: 18px;
              color: #a4a4a4;
              margin-left: 10px;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>
