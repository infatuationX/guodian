<template>
  <div id="notinformation">
    <el-card class="box-card">
      <div class="title">
        <img src="@/assets/pic/news.png" />行业资讯
        <el-button type="default" plain size="mini">更多 ></el-button>
      </div>
      <el-table :data="newslist" stripe style="width: 100%" @row-click="switchToNews">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="title"></el-table-column>
        <el-table-column prop="ctime" :formatter="timeformat"></el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div class="title">
        <img src="@/assets/pic/news.png" />国内煤价
        <el-button type="default" plain size="mini">更多 ></el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div class="title">
        <img src="@/assets/pic/news.png" />国际煤价
        <el-button type="default" plain size="mini">更多 ></el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'notinformation',
  data() {
    return {
      newslist: [],
      tableData: []
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
  methods: {
    // 获取新闻
    async getNewslist() {
      const { data: res } = await this.$axios.get('/home/news')
      console.log(res)
      if (res.code !== 200) return this.$message.error('新闻列表渲染失败')
      this.newslist = res.data
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
      this.$router.push({ path: `/not/news/${row.id}` })
    }
  },
  created() {
    this.getNewslist()
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin-top: 20px;
}
.main {
  .title {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      margin-left: auto;
    }
  }
}

// 资讯模块
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
</style>
