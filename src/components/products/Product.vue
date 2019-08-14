<template>
	<div class="app-product">
		<header id="header" class="mui-bar mui-bar-nav">
			<router-link to="/home" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">商品</h1>
		</header>
		<div class="product-item" v-for="item in list" :key="item.bid">
			<router-link :to="'/details?bid='+item.bid">
				<img :src="item.pic_md">
			</router-link>
			<i></i>
			<h5 class="title">{{item.title}}</h5>
			<div class="info">
				<div class="price">
					<span class="old">￥{{item.old}}&nbsp;</span>
					<del class="now">￥{{item.price}}</del>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		created(){
			this.getMore();
		},
		methods:{
			getMore(){
				var url="products";
				this.$http.get(url).then(result=>{
					this.list=result.body;
					console.log(result);
				});
			}
		},
		data(){
			return{
				list:[]
			}
		}
	}
</script>
<style>
	.app-product{
		display: flex;	/*最外层设置弹性布局*/
		flex-wrap: wrap; /*子元素换行*/
		justify-content: space-between; /*两端对齐*/
		padding: 7px;
	}
	/*当前商品元素项*/
	.app-product .product-item{
		width:49%;
		border:1px solid #ccc;
		box-shadow:0 0 8px #ccc;
		margin:4px 0;
		padding:2px;
		display: flex;  /*子元素弹性布局*/
		flex-direction: column; /*主轴排列方式:垂直*/
		min-height:210px;   /*最小高度*/
		justify-content: space-between;
	}
	.app-product .product-item h3{
		font-size:18px;
	}
	.app-product .product-item img{
		width:100%;
	}
	/*商品价格*/
	.app-product .product-item .old{
		color:red;
		font-weight: bold;
		font-size:16px;
	}
	.app-product .product-item .now{
		font-size:12px;
		margin-right: 10px;
	}
	.app-product .product-item i{
		width:45px;
		height:18px;
		margin-top:5px;
		background: url(../../img/ziying.gif) no-repeat;
	}
</style>