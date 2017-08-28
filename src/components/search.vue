<template>
  <div class="page-search">
    <div class="search-input">
    	<input class="search"
    		type="text"  
    		placeholder="搜索 歌曲/歌手"
    		autofocus
        v-model="keywords"
        @change="querysongs(keywords)"
      />
      <div class="cancle" @click="back()">取消
    	</div>
    </div>
    <div class="contentlist">
    	<template v-if="contentlist.length">
    		<mt-cell v-for="(item,index) in contentlist" 
    			:is-link="true"
    		 	:key="item.songid"
    		 	:title="item.songname"
    		 	@click.native = "play(index)"
    		>{{item.singername}}</mt-cell>
    	</template>
    </div>
  </div>
</template>

<script>
import api from '../common/api/api'
export default {
  data() {
    return {
      keywords:'',
      contentlist:[]
    };
  },
//watch:{
//	keywords:(newval,oldval) =>{
//		if (newval) {
//				api.getsongs(newval).then(res=>{
//					if (res.showapi_res_body.pagebean.contentlist.length) {
//						this.contentlist = res.showapi_res_body.pagebean.contentlist
//						console.log(res.showapi_res_body)
//					} else{
//						Toast('未搜索到有效的内容！')
//						this.contentlist = [];
//					}				
//				}		
//				)
//		}
//	}
//},
  methods:{
  	back(){
  		this.$store.commit('setSearchVisible')
  		this.clean()
  	},
  	querysongs(val){
  		if(val){
	  			api.getsongs(val).then(res=>{
						if (res.showapi_res_body.pagebean.contentlist.length) {
							this.contentlist = res.showapi_res_body.pagebean.contentlist.slice(0,20)
							//console.log(res.showapi_res_body)
						} else{
							this.$toast('未搜索到有效的内容！')
							setTimeout(()=>{
								this.clean()
							},1000)
						}				
					}		
				)
  		}else{
  			this.contentlist = []
  		}
  	},
  	play(index){
  		var selectItem = this.contentlist[index] 
  		var playList = this.$store.state.Play.playList
  		var isExists =  playList.findIndex((element)=>{
  			if(element.songid == selectItem.songid)
  			{
  				return true
  			}
  		})
  		//console.log(isExists)
  		if(isExists == -1){		
  			this.$store.commit('addToPlayList',selectItem)
  			this.$store.commit('setIndex',playList.length-1)
  			this.$store.commit('setcurrentSong',selectItem)
  		}else{
  			this.$store.commit('setIndex',isExists)
  			this.$store.commit('setcurrentSong',playList[isExists])
  		}
  		//this.clean()
  	},
  	clean(){
  		this.contentlist = []
  		this.keywords = ''
  	}
  },
  computed: {
    playList() {
    	return this.$store.state.Play.playList
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
		flex:5
		border:none
		background-color:#55a772
		color:#ffffff
		padding-left:20px
		outline:none
		font-size:16px
	.cancle
		/*cursor:default*/
		text-align:center
		flex:1
		height:40px
		border:none
		color:#ffffff
		background-color:#31c27c
		line-height:40px
.contentlist
	top:60px
	bottom:0
	position:absolute
	width:100%
	overflow-y: auto
</style>