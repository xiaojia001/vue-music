<template>
	<div class="lrc-warpper">
		<div class="lrc-container">
		<p v-for="(item,index) in lrcobj.lyricsArr" :class="{currentLrc:index==$store.state.Play.currentLrcIndex}">{{item}}</p>
		</div>
	</div>
</template>

<script>
import {reconvert,lyricsAnalysis,time2number,filterLyrics} from '../common/utils'
import api from '../common/api/api'
export default{
	data(){
		return{
			lrc:'加载中',
			lrcobj:{
				timeArr:[],
				lyricsArr:[],
				durationArr:[]
			},
			lrctext:"null"
		}
	},
	methods:{
		getlrc(id){
			api.getlrc(id).then(res=>{
			if (res.showapi_res_code==0) {
				var templrc = res.showapi_res_body.lyric
				this.lrc = reconvert(templrc)
				this.lrcobj = lyricsAnalysis(this.lrc)
				this.$store.commit('setcurrentLrc',this.lrcobj)
				this.$store.commit('setcurrentLrcIndex',0)
					} else{
						this.$toast('未找到对应歌词！')
						this.lrctext='未找到对应歌词!'
					}		
				
			})
		},
		lrctranslate(index){
			var container = document.querySelector('.lrc-container'),
				warpper = document.querySelector('.lrc-warpper')
			var warpperHeight =  warpper.offsetHeight
			var maxLength = this.$store.state.Play.currentLrc.lyricsArr.length
			var midIndex = 1000,
				translate = 0
			for(let i=0;i<maxLength;i++){
				if((i*40-20)>=(warpperHeight/2)){
					midIndex = i-1
					break
				}
			}
			if(this.currentLrcIndex>=midIndex){
				//console.log(midIndex)
				translate = (this.currentLrcIndex-midIndex+1)*40
				container.style.transform="translate(0,-" + translate + "px)"

			}else{
				container.style.transform="translate(0,0)"
			}
		}
	},
	props:{
			songid:{
				type:Number,
				default:0
			}
	},
	watch: {
    	songid(id){
    		this.getlrc(id)
      	},
      	currentTime(time) {
			let	timeArr = this.lrcobj.timeArr,
				lyricsArr = this.lrcobj.lyricsArr
				if(timeArr.length>0){
					timeArr.forEach((item, index) => {
					if(item == parseInt(time)) {
						if(index!=this.$store.state.Play.currentLrcIndex||index==0){
							this.$store.commit('setcurrentLrcIndex',index)
						}
					}
				})
			}
		},
		currentLrcIndex(index){
			if(index>0){
				this.lrctranslate(index)
			}
		}	
    },
    computed: {
    currentTime() {
    	return this.$store.state.Play.currentTime
    },
    currentLrcIndex(){
    	return this.$store.state.Play.currentLrcIndex
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.lrc-warpper
	width: 100%
	height: 100%
	overflow-y:hidden
	background-color:rgba(0,0,0,0.1)
	font-size:14px
	font-weight:300
	.lrc-container
		/*transform:translate(0,-25px)*/
		p
			margin:0
			line-height:40px
			white-space:nowrap
			text-overflow:ellipsis
.currentLrc
	color:#31c27c
</style>