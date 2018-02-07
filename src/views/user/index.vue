<template>
    <div class="app-container">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="date" label="日期" width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="province" label="省份" width="120">
            </el-table-column>
            <el-table-column prop="city" label="市区" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="300">
            </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange"
            :total="1000">
        </el-pagination>
    </div>
</template>

<script>
    import { getList } from '@/api/user'
    export default {
        methods: {
            handleClick(row) {
                console.log(row);
            },
            handleSizeChange(val) {
                this.pagesize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(val);
            },
            fetchData() {
                this.listLoading = true
                getList(this.listQuery).then(response => {
                    console.log(response.results);
                    this.list = response.results
                    this.listLoading = false
                })
            },
            kkk() {
                console.log('val');

            }
        },
        created() {
            this.fetchData();
        },

        data() {
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        }
    }
</script>