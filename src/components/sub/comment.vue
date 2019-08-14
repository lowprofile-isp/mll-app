<template>
	<div class="app-comment">
		<h5>评论(<span>{{count}}</span>)</h5>
		<!-- 发表评论区域 -->
		<textarea placeholder="最多120个字" maxlength="120" v-model="msg"></textarea>
		<mt-button size="large" @click="postComment">发表评论</mt-button>
		<!-- 显示评论区域 -->
		<div class="cmt-list">
			<div class="cmt-item" v-for="(item,i) in list" :key="item.id">
				<div class="cmt-info">
					{{i+1}} 楼：用户名:{{item.user_name}} 
					发表时间：{{item.ctime | timeFilter}}
					<div class="cmt-body">
						{{item.content}}
					</div>
				</div>
			</div>
		</div>
		<mt-button size="large" @click="getMore"> 加载更多>> </mt-button>
	</div>
</template>
<script>
  //单独引入 mint-ui 组件Toast 
	import {Toast} from "mint-ui"
	export default {
		data(){
			return{  //数据显示与list相同
				list:[],			//显示数据列表
				pno:0,				//当前页码
				pageSize:9,		//页大小
				pageCount:3,   //总页数
				msg:"",				//评论内容 双向绑定
				point:0,				//点击次数
				count:0
			}
		},
		created(){
			this.getMore();
		},
		methods:{
			postComment(){
				//1:获取用户输入内容，新闻编号，用户名 (为评论区域框添加双向绑定，以便获取内容)
				var msg=this.msg; //评论内容
				var bid=this.bid; //父元素传递的新闻编号
				// console.log(msg+":"+nid+":"+user_name)
				//2:判断如果评论的内容为空
				var size=msg.trim().length; //trim 去除两端空格
				//3:提示评论内容不能为空
				if(size==0){
					Toast("评论内容不能为空！");
					return; //停止函数执行
				}
				//4:发送post请求
				var obj=`bid=${bid}&content=${msg}`
				this.axios.post(this.$store.state.myUrl+"addcomment",obj).then(result=>{
					if(result.data.code==-1){
						Toast(result.data.msg);
						return;
					}
				//5:成功了提示评论发表成功
					var obj=result.data;
					if(obj.code==1){
						//6:提示发表成功
						Toast("评论发表成功！");
						this.msg="";
						//7:显示最新一页数据
						this.pno=0;
						this.list=[];
						this.getMore();
					}else{
						Toast(result.data.msg);
						
					}
				})
				//6:?
			},
			getMore(){
				//1.发送请求获取评论列表 bid
				var bid=this.bid;		//新闻id
				this.pno++;					//页码自增 初始值0
				//true 有数据 false 无数据
				var hasMore=this.pno<=this.pageCount;
				//如果没有页数，停止函数执行
				if(!hasMore){return Toast("没有更多数据了~");}

				var pno=this.pno;		//当前页码
				var pageSize=this.pageSize;	//当前页大小
				var url=this.$store.state.myUrl+"getcomments?pno="+pno+"&bid="+bid+"&pageSize="+pageSize;
				this.axios.get(url).then(result=>{
					//将查询结果追加到list数组
					// //2.追加 list
					var rows=this.list.concat(result.data.data);
					this.list=rows;
					this.count=result.data.count;
				});
				//3.在模板中创建循环显示当前评论列表
				//4.楼层1 2 3 4
				//5.在模板中添加 "加载更多" 按钮
				//6.点击事件
			}
		},
		props:["bid"] //接收父组件传递的参数
	}
</script>
<style>
	.app-comment h3{
		font-size:18px;  /*标题*/
	}
	.app-comment h5{
		font-size: 16px;
		padding:10px;
		color:#000;
	}
	.app-comment h5>span{
		color:blue;
	}
	.app-comment textarea{ /*评论组件多行文本框*/
		font-size: 14px;	/*字体大小*/
		height:68px;		/*高度*/
		margin:0;
	}
	.app-comment .cmt-list{/*显示评论列表*/
		margin:5px 0;
	}
	.app-comment .cmt-list .cmt-item{ /*评论项*/
		border:1px solid #aaa;
		margin-top:15px;
	}
	.app-comment.cmt-list .cmt-info{/*评论内容*/
		line-height:30px;
		background:#ccc;
	}
	/* 按钮样式 */
	.app-comment .mint-button{
		background: #f5f5f5;
	}
	.app-comment .cmt-list .cmt-item .cmt-info{
		color:#aaa;
		background: #fff;
		font-size: 14px;
	}
	.app-comment .cmt-info .cmt-body{
		color:#000;
		font-size: 16px;
		padding:5px 10px;
	}
</style>
