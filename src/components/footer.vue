<template>
	<div class="index-footer">
		<img 
			src="../assets/arrow-back.png" 
			@click="_setPlayVisible()"
			alt="" />
		<img 
			src="../assets/list.png" 
			@click="_setListVisible()"
			alt="" />
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default{
	data() {
		return {
				
		}
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
      		'setListVisible','setPlayVisible'
    	])
		
  	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.index-footer
	box-sizing:border-box
	display:flex
	width: 100%
	height:55px
	padding:10px 10px 10px 10px
	background-color:#31c27c
	position:fixed
	bottom:0
	z-index:1
	justify-content: space-between
	padding:auto 10px
	img
		width: 30px
</style>