<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <treeTool :treenode="company" :is-root="true" />
        <!-- 组织机构 -->
        <el-tree :data="departs" :props="defaultProps">
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <treeTool
            slot-scope="{data}"
            :show-dialog="showDialog"
            :treenode="data"
            :is-root="false"
            @delDepart="getDepartments"
            @addDepart="addDepart"
            @editDepart="editDepart"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 新增弹层 -->
    <addDepart ref="addDialog" :show-dialog.sync="showDialog" :treenode="treenode" @addDepart="getDepartments" />
  </div>
</template>

<script>
import addDepart from './components/addDepartment.vue'
import treeTool from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { arrayTransTree } from '@/utils'
export default {
  // name:"treeNode",
  components: {
    treeTool,
    addDepart
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: {},
      treenode: {},
      showDialog: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取部门数据
    async getDepartments() {
      const result = await getDepartments()
      console.log(result)
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = result.depts
      this.departs = arrayTransTree(this.departs, '')
      console.log(this.departs)
    },
    // 新增弹层
    addDepart(treenode) {
      // 弹层跳出
      console.log(treenode)
      this.showDialog = true
      this.treenode = treenode
      console.log(this.treenode)
    },
    // 编辑弹层
    editDepart(treenode) {
      console.log(treenode)
      this.showDialog = true
      this.treenode = treenode
      this.$refs.addDialog.getDepartmentDetail(treenode)
    }

  }

}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
