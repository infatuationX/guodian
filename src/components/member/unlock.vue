<template>
  <div id="quoteDeposit">
    <el-card class="box-card">
      <div class="main">
        <!-- <div>
          通知状态
          <el-radio-group v-model="radio" style="margin-left:10px">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">冻结中</el-radio>
            <el-radio :label="3">已解冻</el-radio>
          </el-radio-group>
        </div>-->
        <div>
          单据编号&nbsp;
          <el-input size="mini" style="width:140px;margin:0 10px"></el-input>供应商名称
          <el-input size="mini" style="width:140px;margin-left:10px"></el-input>
          <el-button type="primary" size="mini">查询</el-button>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" :index="indexMethod"></el-table-column>
          <el-table-column prop="date" label="单据号"></el-table-column>
          <el-table-column prop="name" label="煤种"></el-table-column>
          <el-table-column prop="address" label="采购数量"></el-table-column>
          <el-table-column prop="address" label="采购数量"></el-table-column>
          <el-table-column prop="address" label="收到基低位发热量"></el-table-column>
          <el-table-column prop="address" label="运输方式"></el-table-column>
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
      radio: 3,
      tableData: [],
      indexMethod: 1,
      currentPage4: 1
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
