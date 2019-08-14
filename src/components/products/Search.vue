<template>
	<div class="app-search">
		<header id="header" class="mui-bar mui-bar-nav">
			<router-link to="/home" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">搜索商品</h1>
		</header>
		<div class="mui-card">
			<div class="mui-card-header">
				<input type="text" name="keyword" value="" v-model="keyword" placeholder="关键字"/>
				<input type="text" name="low" value="" v-model="low" placeholder="最低价"/>
				<input type="text" name="high" value="" v-model="high" placeholder="最高价"/>
				<mt-button type="danger" @click="handleSearch">搜索</mt-button>
			</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
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
			</div>
			<div class="mui-card-footer"></div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				keyword:"",
				low:"",
				high:"",
				list:[]
			}
		},
		methods:{
			jumpDetail(even){
				//获取商品编号
				var id=even.target.dataset.id;
				//跳转不同组件
				this.$router.push("/details/"+id)
			},
			handleSearch(){
				//1:获取三个参数
				var keyword=this.keyword;
				var low=this.low;
				var high=this.high;
				if(low==""){
					low=0;
				}
				if(high==""){
					high=2100000000;
				}
				//5:发送ajax
				var url=this.$store.state.myUrl+"search?keyword="+keyword+"&low="+low+"&high="+high;
				this.axios.get(url).then(result=>{
					console.log(result);
					this.list=result.data.data;
				})
			}
		}
	}
</script>
<style>
	.app-search .mui-card{
		background: none;
		margin:0;
	}
	.app-search .mui-card-header input{
		font-size: 14px;
		width:25%;
		border-radius: 20px;
	}
	.app-search .mui-card-header button{
		margin-bottom:15px;
	}
	.app-search .mui-card-header input:nth-child(2){
		margin:0 5px 15px;
	}
	.app-product{
		display: flex;	/*最外层设置弹性布局*/
		flex-wrap: wrap; /*子元素换行*/
		justify-content: space-between; /*两端对齐*/
		padding: 7px;
	}
	/*当前商品元素项*/
	.app-search .product-item{
		float: left;
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
	.app-search .product-item h5{
		height:60px;
	}
	.app-search .product-item h3{
		font-size:18px;
	}
	.app-search .product-item img{
		width:100%;
	}
	/*商品价格*/
	.app-search .product-item .old{
		color:red;
		font-weight: bold;
		font-size:16px;
	}
	.app-search .product-item .now{
		font-size:12px;
		margin-right: 10px;
	}
	.app-search .product-item i{
		width:45px;
		height:18px;
		margin-top:5px;
		background: url(../../img/ziying.gif) no-repeat;
	}
</style>