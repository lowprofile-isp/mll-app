<template>
	<div class="app-home">
		<!-- 1：顶部导航栏 -->
		<div class="mui-content-padded">
			<div class="mui-input-row mui-search">
				<input type="search" class="mui-input-clear" placeholder="搜索商品">
			</div>
			<button class="text-search" @click="jumpDetail">搜索</button>
		</div>
		<!-- 2：轮播图 -->
		<mt-swipe class="mint-swipe">
			<mt-swipe-item v-for="item in obj" :key="item.id">
				<img :src="item.img_url" />
			</mt-swipe-item>
		</mt-swipe>
		<!-- 3：九宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="javascript:;">
					<img src="../../img/main3.png" />
					<div class="mui-media-body">会员</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/product">
					<img src="../../img/main4.png" />
					<div class="mui-media-body">床</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="javascript:;">
					<img src="../../img/main5.png" />
					<div class="mui-media-body">床垫</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="javascript:;">
					<img src="../../img/main6.png" />
					<div class="mui-media-body">沙发</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="javascript:;">
					<img src="../../img/main7.png" />
					<div class="mui-media-body">排行榜</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="javascript:;">
					<img src="../../img/main8.png" />
					<div class="mui-media-body">每日特卖</div>
				</a>
			</li>
			<div>
				<router-link to="/product" href="javascript:;">
					<img src="../../img/65252fb2542cccda62f9066ea83a4b1c.png" />
				</router-link>
				<router-link to="/product" href="javascript:;">
					<img src="../../img/efadf99ba035de2a0267bf4f9c34928b.png" />
				</router-link>
			</div> 
			<div>
				<router-link to="/product" href="javascript:;">
					<img src="../../img/65252fb2542cccda62f9066ea83a4b1c.png" />
				</router-link>
				<router-link to="/product" href="javascript:;">
					<img src="../../img/efadf99ba035de2a0267bf4f9c34928b.png" />
				</router-link>
			</div> 
			<div>
				<router-link to="/product" href="javascript:;">
					<img src="../../img/65252fb2542cccda62f9066ea83a4b1c.png" />
				</router-link>
				<router-link to="/product" href="javascript:;">
					<img src="../../img/efadf99ba035de2a0267bf4f9c34928b.png" />
				</router-link>
			</div> 
		</ul>
	</div>
</template>
<script>
	export default {
		created(){
			this.getImages();
		},
		methods:{
			jumpDetail(even){
				//获取商品编号
				var bid=even.target.dataset.bid;
				//跳转不同组件
				this.$router.push("/search")
			},
			getImages(){
				this.$http.get("imagelist").then(result=>{
					this.obj=result.body;
				})
			}
		},
		data(){
			return {
				obj:[],
				// keywords:[]
			}
		}
	}
</script>
<style>
	/** header **/
	.app-home div.mint-searchbar{
		width:100%;
		background: #fff;
		padding:6px 8px;
	}
	.app-home .mui-search input[type='search']{
		margin:6px;
		padding:0 10px;
		width: 90%;
		background: #eee;
		height:30px;
	}
	/** logo **/
	.app-home .mui-content-padded::before{
		display: inline-block;
		content:"";
		width: 80px;;
		height:20px;
		margin-bottom:12px;
		background: url(../../img/logo.png) center center no-repeat;
		background-size: cover;
	}
	
	/** search **/
	.app-home .mui-content-padded{
		height: 45px;
		background: #fff;
		font-size: 16px;
		position: fixed;
		width: 100%;
		z-index: 1000;
		top:0;
		margin:0;
		padding:0 5px;
		text-align: center;
	} 
	.app-home .mui-search{
		display: inline-block;
		width: 58%;
	}
	.mintui-search{
		margin-top: 3px;
	}
	/** 搜索按钮 **/
	.app-home .mui-content-padded>button{
		padding:6px 7px;
		display: inline-block;
		color:#e62843;
		vertical-align: top;
		margin-top:5px;
	}
  /** 轮播 **/
	.app-home	.mint-swipe>div{
		height:182px;
	}

	.app-home .mint-swipe img{
		width:100%;
		display: block;
		margin: 0 auto;
		
	}
	/** 九宫格 **/
	.app-home ul.mui-grid-9{
		background: -webkit-linear-gradient(top,#c62cdc 0%,#635be4 100%);
		text-align: center;	
		border:none;
	}
	.app-home ul.mui-grid-view img{
		width:100%;
	}
	.app-home ul.mui-grid-view .mui-table-view-cell img{
		width:50px;
		height:50px;
	}
	.app-home ul.mui-grid-view li.mui-table-view-cell{
		border:none;
	}
	.app-home ul.mui-grid-view>div a{
		display: inline-block;
		width:180px;
		height:180px;
		padding:5px 5px;
		margin-top:20px;
	}
</style>
