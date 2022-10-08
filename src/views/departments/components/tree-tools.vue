<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%">
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treenode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treenode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operate">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>

  </el-row>
</template>

<script>
import { deleteDepartment } from '@/api/departments'
// 该组件需要对外开放属性 外部需要提供一个对象 对象里需要有name  manager
export default {
  // props可以用数组来接收数据 也可以用对象来接收
  // props: {   props属性: {  配置选项 }  }
  components: {
    // addDepart
  },
  props: {
    //   定义一个props属性
    treenode: {
      type: Object, // 对象类型
      required: true // 要求对方使用您的组件的时候 必须传treeNode属性 如果不传 就会报错
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // showDialog:false
    }
  },
  methods: {
    async operate(command) {
      // 删除
      if (command === 'del') {
        // 二次确认
        await this.$confirm('确定要删除该部门吗')
        // 调接口
        await deleteDepartment(this.treenode.id)
        // 刷新数据,触发父组件自定义事件
        this.$emit('delDepart')
        this.$message.success('删除成功！')
      } else if (command === 'add') {
        // 增加
        // 传值给父组件
        console.log(this.treenode)
        this.$emit('addDepart', this.treenode)
        // 调接口，增加
        // await addDepartment(this.)
        // 刷新数据
      } else if (command === 'edit') {
        // 编辑
        this.$emit('editDepart', this.treenode)
      }
    }
  }
}
</script>
