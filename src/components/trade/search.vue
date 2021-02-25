<template>
  <div id="search">
    <el-card class="box-card">
      <div class="main">
        <div>
          采购单状态
          <el-radio-group v-model="radio" style="margin-left:10px">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">已下达</el-radio>
            <el-radio :label="3">已提交</el-radio>
            <el-radio :label="4">已发布</el-radio>
            <el-radio :label="5">已作废</el-radio>
          </el-radio-group>
        </div>
        <div>
          采购单号&nbsp;
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
  name: 'search',
  data() {
    return {
      radio: 3,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
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
