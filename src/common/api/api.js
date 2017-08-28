import {fetch} from '../utils/fetch'
var baseparms = {
	showapi_appid:41911,
	showapi_sign:"a1c59e895a3e47bb80f8f71af6ee594b"
}
var baseurl="http://route.showapi.com/213-"
export default {
	getlrc(id){
		return fetch(baseurl+'2',Object.assign(baseparms,{musicid:id}))
	},
	gettop(id){
		return fetch(baseurl+'4',Object.assign(baseparms,{topid:id,time:(new Date()).valueOf()}))
	},
	getsongs(keyword){
		return fetch(baseurl+'1',Object.assign(baseparms,{keyword:keyword}))
	}
}
