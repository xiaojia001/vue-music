<template>
	<div class="rank-warpper">
		<p>{{currentType.name}}排行榜</p>
		<ul v-if="songlist.length>0">
			<li v-for="(item,index) in songlist" 
				key='item.songid'
				@click = "play(index)">
				<img :src="item.albumpic_small" alt="" />
				<span>{{item.songname}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import api from '../common/api/api'
export default{
	data(){
		return{
			typelist:[
			{id:3,name:'欧美'},
			{id:4,name:'流行'},
			{id:5,name:'内地'},
			{id:6,name:'港台'},
			{id:16,name:'韩国'},
			{id:17,name:'日本'},
			{id:26,name:'热歌'},
			{id:27,name:'新歌'},
			{id:28,name:'网络歌曲'},
			{id:32,name:'音乐人'},
			{id:36,name:'K歌金曲'}
			],
			songlist:[]
		}
	},
	props:{
			typeId:{
				type:Number
			}
	},
	computed:{
		currentType(){
			var temp =  this.typelist.filter(item=>item.id==this.typeId)
			return temp[0]
		}
	},
	methods:{
		querytop(id){
	  		api.gettop(id).then(res=>{
				this.songlist = res.showapi_res_body.pagebean.songlist.slice(0,30)
				//console.log(this.songlist)
				}				
							
			)
  		
  	},
	  	play(index){
	  		var selectItem = this.songlist[index]
	  		selectItem.m4a = selectItem.url
	  		var playList = this.$store.state.Play.playList
	  		var isExists =  playList.findIndex((element)=>{
	  			if(element.songid == selectItem.songid)
	  			{
	  				return true
	  			}
	  		})
	  		//console.log(selectItem)
	  		if(isExists == -1){		
	  			this.$store.commit('addToPlayList',selectItem)
	  			this.$store.commit('setIndex',playList.length-1)
	  			this.$store.commit('setcurrentSong',selectItem)
	  		}else{
	  			this.$store.commit('setIndex',isExists)
	  			this.$store.commit('setcurrentSong',playList[isExists])
	  		}
		}
	},
	mounted(){
		this.querytop(this.typeId)
		
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.rank-warpper
	/*display:flex*/
	p
		text-align:center
	ul
		display:flex
		flex-wrap: wrap
		justify-content: space-between
		padding:0
		&>li
			list-style-type:none
			flex-basis: 33%
			img
				width: 100%
			span
				    display: block
				    padding: 2px
				    font-size: 12px
				    line-height: 1.2
				    height: 30px
				    overflow: hidden
				    text-overflow: ellipsis
			
			
</style>