import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}
