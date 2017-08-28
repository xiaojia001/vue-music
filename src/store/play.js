export default {
  state: {
    playing: false,
    currentTime: 0,
    duration: 0,
    playMode: 0,
    index: 0,
    playList: [],
    currentSong:{},
    currentLrcIndex:0,
    currentLrc:{
    	timeArr:[],
			lyricsArr:[],
			durationArr:[]
    }
  },
  mutations: {
    addToPlayList (state, item) {
    	state.playList.push(item)
    },
    setIndex (state, index) {
    	state.index = index
   	},
   	setPlayMode (state, index) {
    	state.playMode = index
   	},
   	setcurrentLrcIndex(state, index) {
    	state.currentLrcIndex = index
   	},
   	removeFromList(state, index){
   		state.playList.splice(index,1)
   	},
   	setcurrentTime(state, time) {
    	state.currentTime = time
   	},
   	setduration(state, time) {
    	state.duration = time
   	},
   	setcurrentSong(state, obj) {
    	state.currentSong = obj
   	},
   	setcurrentLrc(state, obj) {
    	state.currentLrc = obj
   	},
   	setplaying(state){
   		state.playing=!state.playing
   	}
  },
   
  getters: {
    
  }
}
