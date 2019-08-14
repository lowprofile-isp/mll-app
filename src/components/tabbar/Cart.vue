<!--<template>
	<div class="app-Cart">
		
		<header id="header" class="mui-bar mui-bar-nav">
			<router-link to="/product" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">购物车</h1>
		</header>
	
		<div class="mui-card" v-if="!car.length">空空如也，赶快加入购物车吧！</div>
		<div class="mui-card" v-else>
			<div class="mui-card-header">商品列表</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell mui-media" v-for="item in car" :key="item.cid">
							<a href="javascript:;">
								<img class="mui-media-object mui-pull-left" :src="item.pic_md">
								<div class="mui-media-body">
									{{item.title}}
									<p class='mui-ellipsis'>
										<span class="preice">{{item.price}}</span>
										<span class="count">
											<div class="mui-numbox">
												<button class="mui-btn mui-btn-numbox-minus" type="button" @click="cartSub" :data-cid="item.cid">-</button>
												<input class="mui-input-numbox" type="number" :value="item.count"/>
												<button class="mui-btn mui-btn-numbox-plus" type="button" @click="cartAdd" :data-cid="item.cid">+</button>
											</div>
										</span>
									</p>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="mui-card-footer">合计:{{sumCar}}</div>
		</div>
	</div>
</template>-->
<template>
  <div class="page">
    <header id="header" class="mui-bar mui-bar-nav">
      <router-link to="/product" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">购物车</h1>
    </header>
    <div class="mui-card">
      <ul class="mui-table-view">
        <div class="mui-card-header">商品列表</div>
        <li class="mui-table-view-cell mui-media" v-for="(item,index) in car" :key="index">
          <!--选择商品-->
          <!-- <input v-model="checkboxList" :value="item" type="checkbox" @click="selectGoods()" /> -->
          <input v-model="item.is_checked" :value="item" type="checkbox" @click="select" />
          <img class="mui-media-object mui-pull-left" :src="item.pic_md" />
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">
              <span class="preice">{{item.price}}</span>
              <span class="count">
                <div class="mui-numbox">
                  <button
                    class="mui-btn mui-btn-numbox-minus"
                    type="button"
                    :data-cid="item.cid"
                    @click="cartSub"
                  >-</button>
                  <input class="mui-input-numbox" type="number" :value="item.count" />
                  <button class="mui-btn mui-btn-numbox-plus" type="button" :data-cid="item.cid" @click="cartAdd">+</button>
                </div>
              </span>
              <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" @click="car.splice(index,1)">删除</button>
            </p>
          </div>
        </li>
      </ul>
      <div class="car_footer">
        <input name="checkbox1" v-model="allChecked" type="checkbox" @click="selectAll" />
        <span>全选</span>
        <div class="car_footer_r">
          合计：{{total.sumPrice}}元
          <button
            type="button"
            class="mui-btn mui-btn-danger"
            @click="toDo"
          >结算：({{total.totalNum}})</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from "mint-ui";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name:'Cart',
  data() {
    return {
      // selectId: [], //选中的商品id
      allChecked: false, //是否全选
      checkboxList:[]
    };
  },
  methods: {
    updateCart(cid, count) {
      var url =
        this.$store.state.myUrl+"updateCart?cid=" + cid + "&count=" + count;
      this.axios.get(url).then(result => {
        if (result.data.code == 1) {
          Toast(result.data.msg);
        } else {
          Toast(result.data.msg);
        }
      });
    },
    cartSub(e) {
      var cid = e.target.dataset.cid;
      //修改当前购物车项数量
      //1:创建循环car
      for (var item of this.car) {
        //2:判断当前元素cid是否是cid
        if (item.cid == cid && item.count > 1) {
          //3:当前数据减1
          item.count--;
          //5:跟新数据库对应数据减1
          this.updateCart(cid, item.count);
          //4:跳出循环
          break;
        }
      }
    },
    cartAdd(e) {
      var cid = e.target.dataset.cid;
      //修改当前购物车项数量
      //1:创建循环car
      for (var item of this.car) {
        //2:判断当前元素cid是否是cid
        if (item.cid == cid && item.count < 99) {
          //3:当前数据加1
          item.count++;
          this.$store.state.cartCount = item.count
          //5:跟新数据库对应数据加1
          this.updateCart(cid, item.count);
          //4:跳出循环
          break;
        }
      }
    },
    getCar() {
      this.$store.dispatch("getCar");
    },
    // 点击结算
    toDo() {
      if (this.total.totalNum <= 0) {
        Toast("先选中需要结算的商品");
      } else {
        // 结算选中的商品
        var isList = [];
        for (var i in this.car) {
          if (this.car[i].is_checked) {
            isList.push(this.car[i]);
          }
        }
        console.log(isList);
      }
    },
    // (单选)选择商品
    select() {
      // this.car.forEach((item,i)=>{
      //   if(this.car[i].is_checked == undefined){
      //     this.checkboxList.push(item.cid);
      //     console.log(this.checkboxList)
      //     if(this.checkboxList.length == this.car.length){
      //       this.selectAll();
      //     }
      //   }else{
      //     this.checkboxList.splice(i);
      //     console.log(this.checkboxList)
      //   }
      // })
    },
    selectAll() {
      this.car.forEach((item,i)=>{
        this.car[i].is_checked = !this.allChecked;
      })
    }
  },
  created() {
    this.getCar();
  },
  watch: {
    //深度 watcher
    // checkboxList: function() {
    //   if (this.checkboxList.length === this.car.length) {
    //     this.checked = true;
    //   } else {
    //     this.checked = false;
    //   }

    //   deep: true;
    // }
  },
  computed: {
    //计算属性
    // 求总价
    total() {
      var sumPrice = 0,
        totalNum = 0;
      this.car.forEach((item, index) => {
        if (item.is_checked) {
          sumPrice += item.count * item.price;
          totalNum += item.count;
        }
      });
      return { sumPrice, totalNum };
    },
    //获取vuex里的数据
    ...mapState(["car"]) 
  }
};
</script>
<style lang="scss">
.mui-card {
  input {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 0;
    outline: 0 !important;
    background-color: transparent;
    float: left;
    border: 1px solid #ddd;
    border-radius: 50%;
    margin-top: 7px;
    margin-right: 10px;
  }
  .mui-media-body{
      width: 100%;
      overflow: initial !important;
    .mui-ellipsis{
      text-align: right;
    }
  }
  .count {
    margin: 0 10px;
  }
}
.car_footer {
  input {
    margin-left: 30px;
  }
  span {
    vertical-align: -webkit-baseline-middle;
  }
}
.car_footer_r {
  text-align: right;
  .mui-btn {
    margin-right: 15px;
    margin-bottom: 15px;
  }
}
</style>
