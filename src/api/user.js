import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/usersList',
    method: 'get',
    params
  })
}

export function getInfo(params) {
  return request({
    url: '/users/' + params,
    method: 'get'
  })
}

export function del(params) {
  return request({
    url: '/users/' + params,
    method: 'delete'
  })
}

// 修改用户信息
export function edit(id, params) {
  return request({
    url: '/users/' + id,
    method: 'put',
    data: params
  })
}
