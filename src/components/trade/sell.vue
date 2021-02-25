<template>
  <div id="sell">
    <el-card class="box-card">
      <!-- 搜索模块 -->
      <div class="searchbox">
        <el-input placeholder="请输入公司名、煤炭类型" prefix-icon="el-icon-search" v-model="searchtext">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div style="clear:both"></div>
      <!-- 公司列表 -->
      <!-- 公司名 -->
      <div class="colist" v-for="(item,i) in colist" v-bind:key="i">
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
              <el-button type="text" @click="goTo(item.id)">详情 ></el-button>
            </span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'sell',
  data() {
    return {
      searchtext: '',
      colist: []
    }
  },
  methods: {
    goTo(id) {
      this.$router.push({ path: `/trade/purchasedetail/${id}` })
    },
    async getSellList() {
      const { data: res } = await this.$axios.get('/home/buy')
      if (res.code !== 200) return this.$message.error('获取销售列表失败')
      this.colist = res.data
      console.log(res)
    }
  },
  created() {
    this.getSellList()
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
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 10px 20px;
  width: 100%;
}
// 搜索框
.searchbox {
  float: right;
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
          &:last-child {
            font-size: 18px;
            color: #a4a4a4;
          }
          button {
            font-size: 18px;
            color: #a4a4a4;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
