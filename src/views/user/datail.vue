<template>
  <div class="app-container">
    <el-form v-loading="listLoading" style="width:60%" v-model="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="头像" prop="userPic">
        <img :src="ruleForm.userPic" width="200" height="200" alt="头像">
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="ruleForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobilePhoneNumber">
        <el-input v-model="ruleForm.mobilePhoneNumber"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { del, getInfo, k, edit } from '@/api/user'
export default {
  data() {
    return {
      rules: {
        nickName: [
          { required: true, message: '请输入昵称名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ]
        // mobilePhoneNumber: [
        //   { required: true, message: '请输入手机号', trigger: 'blur' },
        //   { min: 10, max: 11, message: '请输入正确手机号', trigger: 'blur' }
        // ]
      },
      info: {},
      ruleForm: {
        id: '',
        nickName: '',
        openid: '',
        userPic: '',
        mobilePhoneNumber: '',
        username: ''
      },
      list: [],
      fullName: '',
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    var id = this.$route.params.id
    this.id = id
    console.log(id)
    this.fetchData(id)
  },
  methods: {
    fetchData(objectId) {
      getInfo(objectId).then(response => {
        console.log(response)
        this.ruleForm = response
        // 新变量
        const s = JSON.parse(JSON.stringify(response))
        this.info = s
        this.listLoading = false
      })
    },
    computed: {
      fullName: function(e) {
        console.log('3')
        return this.ruleForm.nickName + '999 ' + this.ruleForm.mobilePhoneNumber
      }
    },
    watch: {
      ruleForm: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
        deep: true
      }
    },
    submitForm(formName) {
      console.log(this.info, 'kkkk', this.list, this.fullName)
      this.$refs[formName].validate(valid => {
        if (valid) {
          var ruleForm = this.ruleForm

          const data = {}
          for (let f in this.info) {
            console.log(f)
            console.log(this.info[f], ruleForm[f])
            if (this.info[f] !== ruleForm[f]) {
              data[f] = ruleForm[f]
            }
          }

          console.log(data)

          // var data = {
          //   mobilePhoneNumber: mobilePhoneNumber,
          //   nickName: ruleForm.nickName
          // }
          // return
          edit(this.id, data).then(response => {
            console.log(response)
            this.info = response
            this.$message({
              message: '恭喜你，修改成功',
              type: 'success',
              onClose: () => {
                this.$router.push({ name: 'List' })
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>