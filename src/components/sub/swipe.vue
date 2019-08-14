<template>
	<div class="app-swipe">
		<mt-swipe>
			<mt-swipe-item v-for="item in list" :key="item.bid">
				<img :src="item.md" />
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default {
		created(){
			this.getMore();
		},
		methods:{
			getMore(){
				var url="details?bid="+this.bid;
				this.$http.get(url).then(result=>{
					this.list=result.body.pics;
				});
			}
		},
		data(){
			return{
				list:[]
			}
		},
		props:["bid"]  //接受父组件数据
	}
</script>
<style>
	.app-swipe .mint-swipe{height:200px;}
	.app-swipe .mint-swipe img{width:100%;}
</style>