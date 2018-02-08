import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const AadminTokenKey = 'Admin-Token-Key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAdminToken() {
  return Cookies.get(AadminTokenKey)
}

export function setAdminToken(token) {
  return Cookies.set(AadminTokenKey, token)
}

export function removeAdminToken() {
  return Cookies.remove(AadminTokenKey)
}
