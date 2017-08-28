<template>
	<div>
		<div class="play-warpper-blur" :style="playWarpperBlur">
		</div>
		<div class="play-warpper" >
			<header>
				<p >{{$store.state.Play.currentSong.songname}}</p>
				<img @click="pageVisible()" class="back-icon" src="../assets/arrow-back.png"  />
			</header>
			<mt-swipe class="playswipe" :auto="0" :continuous="false" >
			  <mt-swipe-item>
			  	<p>- {{$store.state.Play.currentSong.singername}} -</p>
			  	<img class="albumpic" :class="{albumTransform: $store.state.Play.playing}" :src="$store.state.Play.currentSong.albumpic_big||'./static/Vue_Music_Blur.png'" />
			  	<p class="lrc">{{currentlrc}}</p>
			  </mt-swipe-item>
			  <mt-swipe-item>
			  	<v-lyric :songid="$store.state.Play.currentSong.songid"></v-lyric>
			  </mt-swipe-item>
			</mt-swipe>
			<div class="timer">
			  	<span>{{$store.state.Play.currentTime|timefilter}}</span>
			  	<mt-range class="songRange"
			  		
			  		v-model="rangeValue" 
			  		:bar-height="2" 
			  		:max="$store.state.Play.duration"></mt-range>
			  	<span>{{$store.state.Play.duration|timefilter}}</span>
			</div>
		 	<div class="play-control">
		 		<audio id="player" 
		 			:src="$store.state.Play.currentSong.m4a" 
		 			ref="playcontrol" 
		 			:loop="$store.state.Play.playMode==0||$store.state.Play.playList.length==1"
		 			@timeupdate='timeupdate()'
		 			@ended="endNextPlay()"
		 			@canplay="prePlay()"
		 			></audio>
		 			<img 
		 				:src="require(`../assets/${playMode}.png`)" 
		 				alt=""
		 				@click="changeMode()" />
		 			<img src="../assets/back.png" @click="preSong()" alt="" />
		 			<img 
		 				:src="require(`@/assets/${$store.state.Play.playing == false ? 'play-2':'pause-2'}.png`)" 
		 				alt=""
		 				@click="playerpauseORplay()" />
		 			<img src="../assets/prev.png" @click="nextSong()" alt="" />
		 			<img src="../assets/list.png" @click="listVisible()">
		 		<!--<mt-button type="primary" @click="playerpause()">primary</mt-button>
		 		<mt-button type="primary" @click="playerplay()">primary</mt-button>-->
		 	</div>
		 	<mt-popup style="height:50%;width:100%;"
			  v-model="$store.state.Components.listVisible"
			  :modal="false"
			  position="bottom">
			 <v-bottom></v-bottom>
			</mt-popup>
		</div>
	</div>
</template>

<script>
import bottom from './bottomList'
import lyric from './lyric'
import {number2time} from '../common/utils'
export default{
	data(){
		return{
			maxtime:'',
			playWarpperBlur:{
				backgroundPosition:'top center',
				backgroundSize:'cover',
				backgroundImage:"url("+ this.$store.state.Play.currentSong.albumpic_big +")",
				position:'absolute',
				right:0,
				left:0,
				top:0,
				bottom:0,
				zIndex:-1,
				filter: "blur(10px)",
				backgroundcolor:'#000'
			},
			currentlrc:'歌词加载中',
			drag:false
		}
	},
	components: {
   		'v-bottom':bottom,
   		'v-lyric':lyric
   			
	},
	watch: {
      currentLrcIndex(index){
      	if(this.$store.state.Play.currentLrc.lyricsArr.length>0){
      		this.drag=false
      		this.currentlrc = this.$store.state.Play.currentLrc.lyricsArr[this.$store.state.Play.currentLrcIndex]
      	}
      }
    },
	mounted(){
//		this.$refs.playcontrol.src=this.$store.state.Play.currentSong.m4a
//		this.$refs.playcontrol.play()
	},
	computed: {
		rangeValue: {
		    get () {
		      return this.$store.state.Play.currentTime
		    },
		    set (value) {
		     	var player=document.querySelector('#player')
		     	this.drag = true
	 			player.currentTime = value
		    }
  		},
  		currentLrcIndex(){
  			return this.$store.state.Play.currentLrcIndex
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
 	},
 	methods:{
 		timeupdate(){
 			var player=document.querySelector('#player')
 			var currentTime=parseInt(player.currentTime)||0
//      	var duration=parseInt(player.duration)||0
        	if(currentTime!=this.$store.state.Play.currentTime){
        	this.$store.commit('setcurrentTime',currentTime)
        	}
//      	if(this.$store.state.Play.duration!=duration){
//      	this.$store.commit('setduration',duration)
//      	}
 		},
 		playerpauseORplay(){
 			var player=document.querySelector('#player')
 			if(this.$store.state.Play.playing){
 				player.pause()
 			}else{
 				player.play()
 			}
 			this.$store.commit('setplaying')
 		},
 		preSong(){
 			this.drag = false
 			var songlist = this.$store.state.Play.playList
 			var index=this.$store.state.Play.index
 			if(index>0){
 				this.$store.commit('setcurrentSong',songlist[index-1])
 				this.$store.commit('setIndex',index-1)
 			}else{
 				this.$store.commit('setcurrentSong',songlist[songlist.length-1])
 				this.$store.commit('setIndex',songlist.length-1)
 			}
 		},
 		changeMode(){
 			var modeIndex = this.$store.state.Play.playMode
 			var newIndex = (modeIndex+1)%3 
 			this.$store.commit('setPlayMode',newIndex)
 		},
 		nextSong(){
 			this.OrderNextPlay()
 		},
 		endNextPlay(){
 			if(this.$store.state.Play.playList.length>1)
 			{
	 			this.currentlrc = '歌词加载中'
	 			if(this.$store.state.Play.playMode==1){
	 				this.OrderNextPlay()
	 			}else if(this.$store.state.Play.playMode==2){
	 				this.randomNextPlay()
	 			}	
 			}
 		},
 		OrderNextPlay(){
 			this.drag = false
 			var songlist = this.$store.state.Play.playList
 			var index=this.$store.state.Play.index
 			if(index<songlist.length-1){
 				this.$store.commit('setcurrentSong',songlist[index+1])
 				this.$store.commit('setIndex',index+1)
 			}else{
 				this.$store.commit('setcurrentSong',songlist[0])
 				this.$store.commit('setIndex',0)
 			}
 		},
 		randomNextPlay(){
 			this.drag = false
 			var songlist = this.$store.state.Play.playList
 			var index=this.$store.state.Play.index
 			var newIndex = Math.floor(Math.random()*songlist.length)
 			if(index!=newIndex){
 				this.$store.commit('setcurrentSong',songlist[newIndex])
 				this.$store.commit('setIndex',newIndex)
 			}else{
 				this.randomNextPlay()
 			}
 		},
 		listVisible(){
 			this.$store.commit('setListVisible')
 		},
 		pageVisible(){
 			this.$store.commit('setPlayVisible')
 		},
 		prePlay(){
 			if(this.drag==false){
 			this.playWarpperBlur.backgroundImage="url("+ this.$store.state.Play.currentSong.albumpic_big +")"
 			var player=document.querySelector('#player');
        	var duration=parseInt(player.duration)||0
 			this.$store.commit('setduration',duration)
 			this.play()
 			}
 		},
 		play()
 		{	
 			var player=document.querySelector('#player')
   			if(!this.$store.state.Play.playing){
   				this.$store.commit('setplaying')
   			}
 			player.play()
 			
 		}
 	},
 	filters: {  
    timefilter:number2time
   }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
.playswipe
	width:100%
	position:absolute !important
	height:auto !important
	top:40px
	bottom:160px
	text-align:center
	p
		margin:5px 0
		line-height:30px
		text-align:center
		color:#fff
	.albumpic
		width: 88%		
		max-width:350px
		border-radius:50%
		border: 8px solid rgba(0,0,0,.3)
.play-warpper
	header
		.back-icon
			position:absolute
			top:6px
			left:4px
			width: 24px
			vertical-align:middle
		p
			font-size:20px
			line-height:40px
			margin:0 auto
			text-align:center
			color:#fff
.play-control
	position:absolute
	box-sizing:border-box
	bottom:30px
	width: 100%
	height: 50px
	display:flex
	justify-content: space-between
	align-items:center
	padding:0 20px
	img
		&:first-of-type,&:last-of-type
			width: 24px
			height: 24px
		&:nth-of-type(2),&:nth-of-type(4)
			width: 32px
			height: 32px
		&:nth-of-type(3)
			width: 48px
			height: 48px
.timer
	/*background-color:rgba(0,0,0,0.1)*/
	box-sizing:border-box
	position:absolute
	bottom:120px
	width: 100%
	height: 30px
	padding:0 10px
	display:flex
	align-items: center
	span
		line-height:30px
		color: #bebebe
	.songRange
		flex:1
		margin:0 19px 0 10px
		.mt-range-content
			margin-right: 9px
			.mt-range-runway
				right: -9px
			.mt-range-progress
				background-color:#31c27c
			.mt-range-thumb
				width: 18px
				height: 18px
				top:6px
				background-color:#31c27c
.albumTransform
	animation:albumTransform 20s infinite linear
@keyframes albumTransform
{
    0% {transform: rotate(0deg);transform-origin:center;}
    100% {transform: rotate(360deg);transform-origin:center;}
}
</style>