<template>
	<div>
		<div class="top-warpper">
			<div class="playType">
				<!--<i class="fa fa-random"></i>-->
				<img 
		 			:src="require(`../assets/${playMode}-2.png`)" 
		 			alt=""
		 			@click="changeMode()" />
			</div>
			<div class="playTypeText"  v-if="$store.state.Play.playMode == 0">
				单曲循环
			</div>
			<div class="playTypeText"  v-if="$store.state.Play.playMode == 1">
				循环播放{{$store.state.Play.playList.length}}首
			</div>
			<div class="playTypeText"  v-if="$store.state.Play.playMode == 2">
				随机播放{{$store.state.Play.playList.length}}首
			</div>
			<div class="deleteAllList">
				<i class="fa fa-trash-o"></i>
			</div>
		</div>
		<div class="list-warpper">
			<mt-cell v-for="(item,index) in filterResult"
			:key="item.songid"
	  		:title="item.songname"
	  		:label="item.singername"
	  		:class="{active: index == currentIndex}"
	  		
		  	>
		  	<span class="playsong" @click ="_setIndex(index)">
		  		<i class="fa fa-play" aria-hidden="true"></i>
		  	</span>
		  	<span class="deletesong" @click="_removeFromList(index)">
		  		<i class="fa fa-times" aria-hidden="true"></i>
		  	</span>
			</mt-cell>
	 	 </div>
	 	 <div class="bottom-warpper" @click="setListVisible()">
	 	 	<span class="close">
	 	 		关闭
	 	 	</span>
	 	 </div>
  	</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods:{
  	_setIndex(index){
  		if(this.currentIndex != index)
  		{
  			this.setIndex(index)
  			this.setcurrentSong(this.filterResult[index])
  		}else{
  			this.$toast({
			  message: '歌曲正在播放',
			  position: 'middle',
			  duration: 2000
			})
  		}
  	},
  	_removeFromList(index){
  		if(this.currentIndex != index)
  		{
  			this.removeFromList(index)
  			this.currentIndex-index>0?this.setIndex(this.currentIndex-1):''
  		}else{
  			this.$toast({
			  message: '歌曲正在播放',
			  position: 'middle',
			  duration: 2000
			})
  		}
  	},
  	changeMode(){
 			var modeIndex = this.$store.state.Play.playMode
 			var newIndex = (modeIndex+1)%3 
 			this.$store.commit('setPlayMode',newIndex)
 	},
  	...mapMutations([
      		'setIndex','removeFromList','setListVisible','setcurrentSong'
    	])
  },
  computed: {
    filterResult() {
    	return this.$store.state.Play.playList
    },
    currentIndex() {
    	return this.$store.state.Play.index
    },
    playMode(){
  			switch (this.$store.state.Play.playMode){
  				case 0:
  					return 'singleCycle'
  					break
  				case 1:
  					return 'cycle'
  					break
  				case 2:
  					return 'random'
  					break
  				default:
  					break
  		}
  	}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.list-warpper
	.active
		.mint-cell-title
			.mint-cell-label
				color:#31c27c
			.mint-cell-text
				color:#31c27c
	position:absolute
	top:41px
	bottom:40px
	width:100%
	overflow-y:auto
	.mint-cell-title
		.mint-cell-label
			color:#aaa
		.mint-cell-text
			color:#777
	.playsong
		display:inline-block
		height:30px
		width:27px
		padding-left:3px
		text-align:center
		line-height:30px
		border-radius:50%
		background-color:#aaa
		margin-right:5px
	.deletesong
		display:inline-block
		height:30px
		width:30px
		text-align:center
		line-height:30px
		border-radius:50%
		background-color:#aaa
.top-warpper
	box-sizing:border-box
	position:absolute
	top:0
	border-bottom:1px solid #d9d9d9
	height:41px
	width:100%
	.playTypeText
		position:absolute
		left:42px
		width: 200px
		height: 100%
		text-align:left
		line-height:40px
		font-size:14px
		color:#444
	.playType
		position:absolute
		left:0
		width: 40px
		height: 100%
		text-align:center
		line-height:40px
		img
			vertical-align:middle
			width: 24px
	.deleteAllList
		position:absolute
		right:0
		width: 40px
		height: 100%
		text-align:center
		line-height:40px
		font-size:24px
		color:#aaa
.bottom-warpper
	box-sizing:border-box
	position:absolute
	bottom:0
	border-top:1px solid #d9d9d9
	height:40px
	width:100%
	text-align:center
	line-height:40px
	.close
		display:inline-block
		color:#666
		font-size:20px
.mint-toast
	z-index:4000
</style>