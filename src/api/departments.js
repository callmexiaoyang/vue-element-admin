import request from '@/utils/request'

// 获取组织机构数组
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

//   删除接口
export function deleteDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

//   新增接口
export function addDepartment(id) {
  return request({
    url: `/company/department`,
    method: 'POST'
  })
}
//   获取负责人列表
export function getSimpleName(id) {
  return request({
    url: `/sys/user/simple`,
    method: 'GET'
  })
}

//   获取部门详情
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}

//   编辑部门
export function editDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'PUT'
  })
}
