<template>
  <div class="app-container">
    <!-- 1：顶部导航栏 -->
    <!-- 2.router-view -->
    <keep-alive include="Cart">
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
    <!-- 3:tabbar -->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <a class="mui-tab-item" href="#tabbar-with-chat">
        <span class="mui-icon mui-icon-bars"></span>
        <span class="mui-tab-label">分类</span>
      </a>
      <router-link to="/cart" class="mui-tab-item">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <!-- <span class="mui-badge">
              {{$store.getters.optCartCount}}
          </span>-->
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/mymll" class="mui-tab-item">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style>
.app-container {
  padding-bottom: 50px;
  padding-top: 39px;
  overflow-x: hidden;
  max-width: 450px;
  margin: 0 auto;
}
.mui-bar-tab,
.mui-content-padded {
  max-width: 450px;
  margin: 0 auto;
}
.app-container #header {
  background: #e62843;
  height: 48px;
}
.app-container #header .mui-title {
  color: #fff;
  font-weight: 300;
  line-height: 50px;
}
.app-container #header .mui-icon {
  color: #fff;
}
</style>
