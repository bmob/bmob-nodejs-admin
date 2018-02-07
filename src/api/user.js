import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/userList',
    method: 'get',
    params
  })
}
