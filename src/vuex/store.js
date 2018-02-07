import Vue from 'vue'
import Vuex from 'vuex'
import local from '../assets/js/local'
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		token: local.fetch('token'),
    navBar: true,
    projects:local.fetch('projects'),
    projectCur:0,
    projectMenu:null,
	},
  //同步操作 commit
	mutations: {
	  //保存token
    saveToken(state,token){
      state.token = token;
      local.save('token',token);
    },
    //删除token
    clearToken(state){
      state.token = null;
      local.remove('token');
      local.remove('projects');
    },
    //移动端侧边栏控制
    isNavBar(state){
      document.body.className = state.navBar ? "is-sidebar-open" : "";
      state.navBar = !state.navBar;
    },
    //移动端侧边栏隐藏
    hideNavBar(state){
      state.navBar = true;
      document.body.className = "";
    },
    //保存项目列表
    updateProjects(state,data){
      state.projects = data;
      local.save('projects',data);
    },
    //保存项目菜单
    saveProMenu(state,data){
      state.projectMenu = data;
    },
    //保存项目菜单指向
    saveProMenuCur(state,num){
      state.projectCur = num;
    }
	},
  //异步操作 dispatch
  actions:{
    //请求项目列表
    updateProjects(store){
      this._vm.$https.get('/api/v2/projects').then(({data}) => {
        store.commit('updateProjects',data);
      }).catch((err) => {
        console.log(err)
      });
    }
  }
});

export default store