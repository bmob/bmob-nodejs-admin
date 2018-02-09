<template>
  <div class="app-container">

    <el-dialog title="详细信息" :visible.sync="dialogTableVisible">
      <div>
        <!-- 为了适应大家自定义的各种字段，这里用了循环显示所有字段 -->
        <div id="v-for-object" class="demo">

          <el-row v-for="(value, key) in info">
            <div v-if="key === 'userPic'">
              <el-col :span="12">
                <div class="grid-content bg-purple">{{ key }}</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <!-- {{ value }} -->
                  <img :src="value" width="200" height="200" alt="">
                </div>
              </el-col>
            </div>
            <div v-else>
              <el-col :span="12">
                <div class="grid-content bg-purple">{{ key }}</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">{{ value }}</div>
              </el-col>
            </div>
          </el-row>
          <span style="color:red;">为了适应大家自定义的各种字段，这里用了循环显示所有字段. 大家可以自己控制下</span>
        </div>
      </div>
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
          <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding:10px"></div>
    <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="count">
    </el-pagination>

  </div>
</template>

<script>
import { del, getInfo, getList } from '@/api/user'
export default {
  methods: {
    handleClick(row) {
      console.log(row)
      const objectId = row.objectId
      getInfo(objectId).then(response => {
        console.log(response)
        this.info = response
      })
      this.dialogTableVisible = true
    },
    handleDel(row) {
      console.log(row)
      const objectId = row.objectId
      del(objectId).then(response => {
        console.log(response)
        this.info = response
        // this.$message('submit!')
      })
    },
    handleSizeChange(val) {
      // this.pagesize = val
      // this.listQuery.page = val
      // this.fetchData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(val)
      this.listQuery.page = val
      this.fetchData()
      console.log(`每页 ${val} 条`)
    },
    fetchData() {
      console.log('loading')
      this.listLoading = true
      getList(this.listQuery).then(response => {
        console.log(response.results)
        this.tableData = response.results
        this.count = response.count
        this.listLoading = false
      })
    }
  },
  created() {
    this.fetchData()
  },
  data() {
    return {
      count: 100,
      listQuery: { limit: 8, count: 1 },
      info: {},
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
