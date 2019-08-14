<template>
	<div class="app-login">
		<header id="header" class="mui-bar mui-bar-nav">
			<router-link to="/home" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">用户登录</h1>
		</header>
		<div class="mui-card">
			<div class="mui-card-header">
				<img src="http://127.0.0.1:3001/img/logo.png" />	
			</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<!-- <form action="#"> -->
						用户名: <input type="text" value="" placeholder="请输入用户名" v-model="uname" />
						密码: <input type="password" value="" placeholder="请输入密码" v-model="upwd" />
						<mt-button size="large" @click="handleLogin">登录</mt-button>
					<!-- </form> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return{
				uname:"dangdang",
				upwd:"123"
			}
		},
		created(){

		},
		methods:{
			handleLogin(){
				//1:获取参数
				var u=this.uname;
				var p=this.upwd;
				//2:正则表达式验证
				//3:发送请求
				var url=this.$store.state.myUrl+"login?uname="+u+"&upwd="+p;
				this.axios.get(url).then(result=>{
					if(result.data.code == 1){ 
						//修改全局共享数据signin		传递实参
						this.$store.commit("signin",result.data.uname);
						this.$router.push("/home")  //登录成功跳转到home
					}else{
						Toast("用户名或密码错误")  //登录失败提示信息
					}
				})
			}
		}
	}
</script>
<style>
	.app-login .mint-button--default{
		background: #e62843;
		color:#fff;
	}
	.app-login .mui-card-header{
		justify-content: space-around;
	}
	.app-login .mui-card .mui-card-header>img{
		width:176px;
		height:72px;
	}
</style>