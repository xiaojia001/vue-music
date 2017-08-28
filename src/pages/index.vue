<template>
	<div>
		<mt-tabbar v-model="selected" fixed>
		  <mt-tab-item id="首页">
		    <i slot="icon" class="fa fa-user-circle-o" ></i>
		    <router-link to="test"></router-link>
		    首页
		  </mt-tab-item>
		  <mt-tab-item id="搜索">
		    <i slot="icon" class="fa fa-search" ></i>
		    <router-link to="/play"></router-link>
		    搜索
		  </mt-tab-item>
		  <mt-tab-item id="发现">
		    <i slot="icon" class="fa fa-user-circle-o" ></i>
		    <router-link to="/test"></router-link>
		    发现
		  </mt-tab-item>
		  <mt-tab-item id="我的">
		    <i slot="icon" class="fa fa-user-circle-o" ></i>
		    <router-link to="/test"></router-link>
		    我的
		  </mt-tab-item>
		</mt-tabbar>
		<transition>
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
	export default {
	data() {
		return {
			username:'aaa',
			selected:'首页',
		}
	},
	methods:{
	
	}
	,
  computed:{
  	name() {
  		return this.$store.state.user_name
  		
  	}
  },
   beforeCreate(){
            this.$router.push({ path: '/home/test' })
        }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mint-tab-item-label a
	display:block
	width:(100%/4)
	height: 55px
	position: absolute
	bottom: 0
.mint-tab-item-icon i
	font-size:24px
</style>