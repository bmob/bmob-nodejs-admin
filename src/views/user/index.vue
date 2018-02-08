<template>
  <div class="app-container">

    <!-- Table -->
    <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>

    <el-dialog title="详细信息" :visible.sync="dialogTableVisible">
      <span>这是一段信息</span>
    </el-dialog>

    <el-table :data="tableData" v-loading.body="listLoading" border style="width: 100%">
      <el-table-column fixed prop="objectId" label="id" width="150"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="province" label="省份">
      </el-table-column>
      <el-table-column prop="openid" label="openid">
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间">
      </el-table-column>
      <el-table-column prop="createdAt" label="加入时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="1000">
    </el-pagination>

  </div>
</template>

<script>
import { getInfo, getList } from '@/api/user'
export default {
  methods: {
    handleClick(row) {
      console.log(row)
      const objectId = row.objectId
      getInfo(objectId).then(response => {
        console.log(response)
      })
      this.dialogTableVisible = true
    },
    handleSizeChange(val) {
      this.pagesize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(val)
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        console.log(response.results)
        this.tableData = response.results
        this.listLoading = false
      })
    }
  },
  created() {
    this.fetchData()
  },
  data() {
    return {
      listQuery: {},
      info: [],
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      dialogTableVisible: false,
      formLabelWidth: '120px',
      tableData: []
    }
  }
}
</script>
