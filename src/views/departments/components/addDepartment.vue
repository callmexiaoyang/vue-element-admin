<template>
  <el-dialog :title="showTitle" :visible.sync="showDialog" label-width="120px" @close="btnCancel">
    <el-form ref="deptForm" :model="depart" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="depart.name" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="depart.code" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="depart.manager" style="width:80%" placeholder="请选择" @focus="getSimpleName">
          <el-option v-for="item in managerList" :key="item.id" :value="item.username" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="depart.introduce" style="width:80%" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="center">
      <el-button @click="btnCancel">取消</el-button>
      <el-button type="primary" plain @click="btnOk">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, getSimpleName, addDepartment, getDepartmentDetail, editDepartmentDetail } from '@/api/departments'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treenode: {
      type: Object,
      required: true
    }
  },
  data() {
    // 校验是否重复---部门名称
    async function testNameDuplication(rule, value, callback) {
      const { depts } = await getDepartments()
      console.log(this.treenode)
      //   console.log(JSON.parse(JSON.stringify(this.treenode)))
      // 校验通过则同级部门没有重复
      const isOk = depts.filter(item => item.pid === this.treenode.id).every(item => item.name === value)
      isOk ? callback(new Error('名称重复')) : callback()
    }
    // 校验是否重复---部门编码
    async function testCodeDuplication(rule, value, callback) {
      const { depts } = await getDepartments()
      console.log(depts)
      // 校验通过则同级部门没有重复
      const isOk = depts.filter(item => item.pid === this.treenode.id).every(item => item.name !== value)
      isOk ? callback() : callback(new Error('名称重复'))
    }
    return {
      depart: {
        code: '',
        introduce: '',
        manager: '',
        name: ''
        // pid:''
      },
      rules: {
        code:
                [{ required: true, trigger: 'blur', message: '部门编码不能为空' },
                  { max: 50, min: 1, trigger: 'blur', message: '部门编码为1-50个字符' },
                  { validator: testCodeDuplication, trigger: 'blur' }],
        introduce:
                [{ required: true, trigger: 'blur', message: '部门介绍不能为空' },
                  { max: 300, min: 1, trigger: 'blur', message: '部门介绍为1-300个字符' }],
        manager:
                [{ required: true, trigger: 'change', message: '负责人不能为空' }],
        name:
                [{ required: true, trigger: 'blur', message: '部门名称不能为空' },
                  { max: 50, min: 1, trigger: 'blur', message: '部门名称为1-50个字符' },
                  { validator: testNameDuplication, trigger: 'blur' }]
      },
      managerList: []
    }
  },
  computed: {
    showTitle() {
      return this.depart.id ? '编辑部门' : '新增部门'
    }
  },
  created() {
    // 获取负责人列表
    this.getSimpleName()
    // this.getDepartmentDetail()
    console.log(this.treenode)
  },
  methods: {
    async getSimpleName() {
      this.managerList = await getSimpleName()
      console.log(this.treenode)
    },
    async btnOk() {
      // 手动校验表单
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          if (this.depart.id) {
            // 编辑
            await editDepartmentDetail(this.depart)
          } else {
            // 调接口，增加
            await addDepartment({ ...this.depart, pid: this.treenode.id })
          }
          // 刷新数据
          this.$emit('addDepart')
          // 关闭弹层
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnCancel() {
      // 重置表单校验
      this.$refs.deptForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 获取部门详情
    async getDepartmentDetail(node) {
      console.log(JSON.parse(JSON.stringify(this.treenode)))
      this.depart = await getDepartmentDetail(node.id)
      //   this.treenode = node
      console.log(this.depart)
    }
  }
}
</script>

<style>

</style>
