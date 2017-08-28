<template>
	<div class="index-header">
	    <div class="search-input" @click="setSearchVisible()">
	    	<input class="search"
	    		type="text"  
	    		placeholder="搜索 歌曲/歌手"
		        disabled='true'
	      />
	    </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default{
	props:{
		title:{
			type:String,
			default:'首页'
		}
	},
	data() {
		return {
				
		}
	},
	methods:{
		 ...mapMutations([
      	'setSearchVisible'
    	])
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.index-header
	.search-input
		box-sizing:border-box
		width: 100%
		padding:10px 10px 10px 10px
		display:flex
		background-color:#31c27c
		width: 100%
		position:fixed
		top:0
		z-index:1
		.search
			flex:1
			border:none
			background-color:#55a772
			color:#ffffff
			padding-left:20px
			outline:none
			font-size:16px
			height:40px
			display:block
		/*.cancle
			text-align:center
			flex:1
			height:40px
			border:none
			color:#ffffff
			background-color:#31c27c
			line-height:40px*/
</style>