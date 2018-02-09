import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/feedbackList',
    method: 'get',
    params
  })
}

export function getInfo(params) {
  return request({
    url: '/feedback/' + params,
    method: 'get'
  })
}

export function del(params) {
  return request({
    url: '/feedback/' + params,
    method: 'delete'
  })
}
