import Vue from 'vue'
//0.1:引入Vuex
import Vuex from "vuex"
import axios from "axios"
import { Toast} from "mint-ui";
import router from './router';
//0.2:注册Vuex组件
Vue.use(Vuex)
//0.3:创建Vuex示例对象
export default new Vuex.Store({
  // state:{
  //   cartCount:0,  //购物车中商品数量
  //   uname:"",
  //   islogin:false
  // },
  // mutations:{   //修改共享数据方法
  //   increment(state,count){state.cartCount+=count},
  //   substract(state){state.cartCount--},
  //   clear(state){state.cartCount=0},
  //   signin(state,uname){
  //     state.uname=uname;
  //     state.islogin=true;
  //   },
  //   signout(){
  //     console.log(123)
  //     this.state.uname="";
  //     this.state.islogin=false;
  //   }
  // },

  state: {
    myUrl:'http://mllapi.applinzi.com/',
    car: [],
    uname: "",
    islogin: false
  },
  mutations: {
    initCar(state, car) {
      state.car = car
    },
    signin(state, uname) {
      state.uname = uname;
      state.islogin = true;
    },
    signout() {
      this.state.uname = "";
      this.state.islogin = false;
    }
  },
  actions: {
    getCar({ commit }) {
      axios.get("http://127.0.0.1:3001/getCarts").then(result => {
        if (result.data.code == 1) {
          commit('initCar', result.data.data)
        } else {
          Toast(result.data.msg);  
          router.push("/login");
        }
      });
    }
  }
})