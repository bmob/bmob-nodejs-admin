
import axios from 'axios'
// import store from '@/vuex/store'
import router from '../../router'


// ajax封装
let http = {
  ajax: axios,
  axios: axios.create({
    url: '',
    baseURL: 'http://192.168.1.77:8083',
    // baseURL: 'http://192.168.1.13:8080',
    timeout: 5000
  }),
  get (url, data) {
    return new Promise((resolve, reject) => {
      this.axios.get(url, data).then((response) => {
        resolve(response.data)
      }, (response) => {
        reject(response)
      })
    });
  },
  post(url, data, config) {
    return new Promise((resolve, reject) => {
      this.axios.post(url, data, config).then((response) => {
        resolve(response)
      }, (response) => {
        reject(response)
      })
    });
  },
  delete(url, data) {
    return new Promise((resolve, reject) => {
      this.axios.delete(url, data).then((response) => {
        resolve(response.data)
      }, (response) => {
        reject(response)
      })
    });
  },
  put(url, data, config) {
    return new Promise((resolve, reject) => {
      this.axios.put(url, data, config).then((response) => {
        resolve(response)
      }, (response) => {
        reject(response)
      })
    });
  },
  all(url) {
    return new Promise((resolve) => {
      this.ajax.all(url).then(this.ajax.spread((...response) => {
        resolve(response);
      }));
    });
  }
};

http.axios.interceptors.request.use(config => {
  // 给请求头加上token
  if (store.state.token) {
    config.headers.Authorization = store.state.token;
  }
  return config;
}, error => {
  // 请求错误
  return Promise.reject(error);
});

// 添加响应拦截器
http.axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        store.commit('clearToken');
        router.push({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        })
    }
  }
  return Promise.reject(error);
});


export default {
  install: function (vue) {
    vue.prototype.$https = http;
  }
}