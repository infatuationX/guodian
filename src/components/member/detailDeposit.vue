<template>
  <div id="quoteDeposit">
    <el-card class="box-card">
      <div class="main">
        <div>
          通知状态
          <el-radio-group v-model="radio" style="margin-left:10px">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">冻结中</el-radio>
            <el-radio :label="3">已解冻</el-radio>
          </el-radio-group>
        </div>
        <div>
          单据编号&nbsp;
          <el-input size="mini" style="width:140px;margin:0 10px"></el-input>供应商名称
          <el-input size="mini" style="width:140px;margin-left:10px"></el-input>
          <el-button type="primary" size="mini">查询</el-button>
        </div>
        <el-table :data="depositData" stripe style="width: 100%" border>
          <el-table-column type="index" :index="indexMethod"></el-table-column>
          <el-table-column prop="id" label="单据号"></el-table-column>
          <el-table-column prop="serialNumber" label="流水号"></el-table-column>
          <el-table-column prop="money" label="流水金额"></el-table-column>
          <el-table-column prop="balance" label="余额"></el-table-column>
          <el-table-column prop="date" label="流水日期" :formatter="formatDate"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          style="margin-top:10px"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'quoteDeposit',
  data() {
    return {
      radio: 1,
      depositData: [],
      indexMethod: 1,
      currentPage4: 1
    }
  },
  created() {
    this.getDepositList()
  },
  methods: {
    async getDepositList() {
      let data = null
      const { data: res } = await this.$axios.post(
        '/user/getCapitalflow',
        data,
        {
          headers: {
            token: window.localStorage.token
          }
        }
      )
      console.log(res)
      if (res.code !== 200) return this.$message.error(res.message)
      this.depositData = res.data
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 日期格式化
    formatDate(row, column, val) {
      if (val === null || val === '') {
        return ''
      }
      let d = val
      return d.substring(0, 10) + '  ' + d.substring(11, 19)
    }
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 10px 20px;
  width: 100%;
}

// 主体
.main {
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
  div {
    &:nth-child(2) {
      margin-top: 10px;
      button {
        margin-left: 20px;
      }
    }
  }
}
</style>
