import Vue from 'vue'
import Router from 'vue-router'
import Home from "./components/tabbar/Home.vue"
import Product from './components/products/Product.vue'
import Details from './components/products/Details.vue'
import comment from './components/sub/comment.vue'
import Login from './components/login/Login.vue'
import Search from './components/products/Search.vue'
import Cart from './components/tabbar/Cart.vue'
import Mymll from './components/login/Mymll.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path:"/mymll",component:Mymll},
    {path:"/cart",component:Cart,meta: {
      keepAlive: true // 需要被缓存
    }},
    {path:"/search",component:Search},
    {path:"/login",component:Login},
    {path:"/comment",component:comment},
    {path:"/details",component:Details},
    {path:"/product",component:Product},
    {path:'/',redirect:"/home"},
    {path:"/home",component:Home}
  ]
})
