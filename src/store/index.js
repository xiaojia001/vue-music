import Vue from 'vue'
import Vuex from 'vuex'
import Play from './play'
import Components from './components'
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
    	Play,
    	Components
    	
	}
})