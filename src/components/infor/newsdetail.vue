<template>
  <div id="newsdetail">
    <el-card class="box-card">
      <div class="main">
        <h2>{{newslist[this.$route.params.id - 1].title}}</h2>
        <span>发布时间：{{newslist[this.$route.params.id - 1].ctime | dateFormat}}</span>
      </div>
      <p>{{newslist[this.$route.params.id - 1].content}}</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'newsdetail',
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
    }
  },
  created() {
    this.getNewslist()
  },
  filters: {
    dateFormat(val) {
      if (val === null || val === '') {
        return ''
      }
      return val.substring(0, 10)
    }
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 10px 20px;
  width: 100%;
  height: 100%;
}

.main {
  height: 100%;
  text-align: center;
  span {
    font-size: 14px;
    color: #a4a4a4;
  }
}
</style>
