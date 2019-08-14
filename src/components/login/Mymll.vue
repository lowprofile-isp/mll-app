<template>
	<div class="app-mymll">
		<header id="header" class="mui-bar mui-bar-nav">
			<h1 class="mui-title">个人中心</h1>
		</header>
		<button v-if="!this.$store.state.islogin"  @click="login">登录</button>
		<div v-else>
		<a  href="#">Welcome <span id="uname">{{this.$store.state.uname}}</span></a>
    <mt-button type="danger" @click="signout">注销</mt-button>
		</div>
	</div>
</template>
<script>
export default {
	methods:{
		login(){
			this.$router.push("/login")
		},
		signout(){ 
			this.axios.get(
				this.$store.state.myUrl+"signouts"
			).then(res=>{
				this.$store.commit("signout");
			})
		}
	}
}
</script>
<style>
	.app-mymll{
		text-align: center;
		padding-top:50px; 
	}
	.app-mymll button{
		padding:10px 50px;
	}
</style>