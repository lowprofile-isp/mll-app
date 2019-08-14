<template>
  <div class="app-details">
    <header id="header" class="mui-bar mui-bar-nav">
      <router-link to="/product" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">商品详情</h1>
    </header>
    <!-- 轮播图卡片 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe-box :bid="bid"></swipe-box>
        </div>
      </div>
    </div>
    <!-- 商品信息卡片 -->
    <div class="mui-card">
      <div class="mui-card-header">{{content.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            <span class="old">￥{{content.old}}</span>
            <del class="now">￥{{content.price}}</del>
          </div>
          <div class="clearfix specs">
            <div class="f_l">规格：</div>
            <div class="f_l">
              <a
                v-for="sp of specs"
                :class="`specift ${sp.bid==bid?'active':''}`"
                :key="sp.bid"
                :href="`/#/details?bid=${sp.bid}`"
                @click="a"
              >{{sp.spec}}</a>
            </div>
          </div>购买数量
          <div class="mui-numbox">
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="dtlSub">-</button>
            <input class="mui-input-numbox" type="number" readonly value="1" v-model="val" />
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="dtlAdd">+</button>
          </div>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="danger" size="small">立即购买</mt-button>
        <mt-button type="primary" size="small" @click="addCart">加入购物车</mt-button>
      </div>
    </div>

    <!-- 新闻评论子组件 -->
    <comment-box :bid="this.bid"></comment-box>
    <!-- this.bid => 获取的list的bid  :bid传给子组件 comment -->
    <!-- 商品详情 -->
  </div>
</template>
<script>
//引入子组件
import swipe from "../sub/swipe.vue";
import comment from "../sub/comment.vue";
import { Toast } from "mint-ui";
export default {
	inject: ['reload'],
  data() {
    return {
      bid: this.$route.query.bid, //保存参数 以便子组件使用
      pics: [],
      content: { price: 0 },
      specs: [],
      val: 1
    };
  },
  created() {
    //获取商品列表组件传递的参数 bid
    this.getDetails();
  },
  methods: {
    a() {
      //点击跳转自动刷新页面
      this.reload();
    },
    getDetails() {
      var bid = this.$route.query.bid;
      var url = this.$store.state.myUrl + "details?bid=" + bid;
      this.axios.get(url).then(result => {
        this.pics = result.data.pics;
        this.content = result.data.content;
        this.specs = result.data.specs;
      });
    },
    addCart() {
      //1:获取参数 bid count uid
      var bid = this.$route.query.bid;
      var count = this.val;
      //2:发送请求
      var url =
        this.$store.state.myUrl + "addCart?bid=" + bid + "&count=" + count;
      this.axios.get(url).then(result => {
        if (result.data.code == 1) {
          //修改全局共享数据cartCount
          Toast("添加购物车成功");
        } else {
          Toast("添加购物车失败");
        }
      });
    },
    dtlSub() {
      if (this.val > 1) {
        this.val--;
      }
    },
    dtlAdd() {
      if (this.val < 999) {
        this.val++;
      }
    }
  },
  components: {
    //注册子组件
    //子组件名   子组件对象
    "comment-box": comment,
    "swipe-box": swipe
  }
};
</script>
<style>
.app-details .mui-card .mint-swipe {
  height: 230px;
}
.app-details .mui-card .mint-swipe img {
  width: 100%;
}
.app-details .mui-card-content-inner {
  padding: 0;
}
.app-details > div:nth-child(3) .mui-card-content-inner {
  padding: 20px;
}
/*商品价格*/
.app-details .price .old {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
.app-details .price .now {
  font-size: 12px;
  margin-right: 10px;
}
/*规格*/
.clearfix::after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.app-details .specs {
  width: 150px;
}
.f_l {
  float: left;
}
.specift {
  display: inline-block;
  font-weight: 400;
  text-align: center;

  padding: 6px 10px;
  margin: 0 7px 10px 0;
  border: solid 1px #ddd;
  position: relative;
  color: #666;
}
.active {
  color: #e62318;
  background-color: #f5f5f5;
  border-color: #e62318;
  border-width: 1px;
}
/* 评论 */
.app-details .mui-content-padded h3 {
  padding-top: 10px;
}
</style>