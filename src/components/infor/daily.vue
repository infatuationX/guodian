<template>
  <div id="daily">
    <el-card class="box-card">
      <div class="main">
        <el-table :data="newslist" stripe style="cursor: pointer;" @row-click="switchToNews">
          <el-table-column prop="id" width="80"></el-table-column>
          <el-table-column prop="title"></el-table-column>
          <el-table-column prop="ctime" :formatter="timeformat" width="150"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'daily',
  data() {
    return {
      newslist: []
    }
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
    timeformat(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      } else {
        return date.substring(0, 10)
      }
    },
    // 新闻详情跳转
    switchToNews(row, event, column) {
      this.$router.push({ path: `/information/news/${row.id}` })
    }
  },
  created() {
    this.getNewslist()
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 10px 20px;
  width: 100%;
}
</style>
