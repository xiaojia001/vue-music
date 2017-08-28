<template>
	<div>
		<v-header></v-header>
		<mt-popup style="height:100%;width:100%"
		  v-model="$store.state.Components.searchVisible"
		  position="right">
		 <v-search></v-search>
		</mt-popup>
		<mt-popup style="height:50%;width:100%"
		  v-model="$store.state.Components.listVisible"
		  position="bottom">
		 <v-bottom></v-bottom>
		</mt-popup>
		<mt-popup style="height:100%;width:100%"
		  v-model="$store.state.Components.playVisible"
		  position="top">
		 <v-play></v-play>
		</mt-popup>
		<div class="content-warpper">
		<!--<mt-button type="primary" @click="_setListVisible()">primary</mt-button>
		<mt-button type="primary" @click="_setPlayVisible()" >primary</mt-button>-->
		<v-rank :typeId='5'></v-rank>
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
import {reconvert} from '../common/utils'
import api from '../common/api/api.js'
import header from './header'
import search from './search'
import bottom from './bottomList'
import footer from './footer'
import play from './play'
import rank from './rank'
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
	data(){
		return {
			songid:4833285,
			lrc:{},
			typeIds:[3,5,6,16,17],
			toplist:[]
		}
	},
	components: {
   		'v-header':header,
   		'v-search':search,
   		'v-bottom':bottom,
   		'v-play':play,
   		'v-footer':footer,
   		'v-rank':rank,
	},
	methods:{
		_setListVisible(){
			if(this.$store.state.Play.playList.length)
			{
				this.setListVisible()
			}else{
  			this.$toast({
			  message: '当前歌曲列表为空',
			  position: 'middle',
			  duration: 2000
			})
  		}
		},
		_setPlayVisible(){
			if(this.$store.state.Play.playList.length)
			{
				this.setPlayVisible()
			}else{
  			this.$toast({
			  message: '当前歌曲列表为空',
			  position: 'middle',
			  duration: 2000
			})
  			}
		},
		 ...mapMutations([
      		'setSearchVisible','setListVisible','setPlayVisible'
    	]),
		getLrcbyId(){
			api.getlrc(this.songid).then(res=>{
				var templrc = res.showapi_res_body.lyric
				this.lrc = templrc
				console.log(reconvert(res.showapi_res_body.lyric))
			}		
		)}
		
  },
    computed:{
//	  	searchVisible:{
//	  	get () {
//	    	return this.$store.state.Components.searchVisible
//	    },
//	    set () {
//	    	this.setSearchVisible()
//	    }
//	  		
//	  	},
//	  	ListVisible:{
//		  	get: function() {
//		    	return this.$store.state.Components.listVisible
//		    },
//		    set: function() {
//	      		this.setListVisible()
//		    }
//	  	}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-warpper
	position:absolute
	width: 100%
	top:60px
	bottom:55px
	overflow-y:auto
</style>