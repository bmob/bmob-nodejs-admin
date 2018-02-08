import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/users',
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
