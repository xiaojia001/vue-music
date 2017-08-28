export default {
  state: {
    listVisible: false,
    searchVisible:false,
    playVisible:false

  },
  mutations: {
    setListVisible (state) {
    	state.listVisible=!state.listVisible
    },
    setSearchVisible (state) {
    	state.searchVisible=!state.searchVisible
   	},
   	setPlayVisible (state){
   		state.playVisible=!state.playVisible
   	}
  },
   
  getters: {
    
  }
}
