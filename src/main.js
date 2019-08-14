import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 导入 MUI 的样式表，扩展图标样式，购物车图标
import './lib/mui/css/mui.css'
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
//3.1:引入axios库(VueResource)
import axios from "axios"
//3.2:跨域保存session值
axios.defaults.withCredentials = true;
//3.3:注册组件
Vue.prototype.axios = axios;

//1.引入mint-ui组件
import { Header, Swipe, SwipeItem, Button, Search } from 'mint-ui'
// import Mint from 'mint-ui'
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import 'mint-ui/lib/style.css'
// Vue.use(Mint)
//2.注册Header组件
Vue.component(Header.name, Header);
//3.注册Swipe,SwipeItem,Button组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Search.name, Search);


//4.引入vue-resource 库
import VueResource from 'vue-resource'
//5.注册vue-resource 库
Vue.use(VueResource);
//6.配置vue-resource常见属性
//6.1设置请求服务器根目录
Vue.http.options.root = "http://127.0.0.1:3001/";
//6.2全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//将提交的数据进行转码操作
Vue.http.options.emulateJSON = true;
//7.创建日期类型的过滤器
Vue.filter("timeFilter", function (val) {
  //7.1创建日期对象
  var data = new Date(val);
  //7.2获取年月日分秒
  var y = data.getFullYear();
  var m = data.getMonth() + 1;
  var d = data.getDate();
  var h = data.getHours();
  var mi = data.getMinutes();
  var s = data.getSeconds();
  //7.3格式判断 07 08..
  m < 10 && (m = "0" + m);
  d < 10 && (d = "0" + d);
  //7.4拼接字符串返回
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})

new Vue({
  router,
  render: h => h(App),
  store     //将Vuex对象注册 Vue实例
}).$mount('#app')