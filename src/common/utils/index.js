export const getLastTimeStr = diff => {
  const minute = 60 * 1000 // 1分钟
  const hour = 60 * minute // 1小时
  const day = 24 * hour // 1天
  const month = 31 * day // 月
  const year = 12 * month// 年

  var content = null
  if (diff < 5 * minute) { // 小于5分钟
    content = '刚刚'
  } else if (diff < hour) { // 小于60分钟
    content = Math.floor(diff / 60 / 1000) + '分钟前'
  } else if (diff < day) {
    content = Math.floor(diff / 3600 / 1000) + '小时前'
  } else if (diff < month) {
    content = Math.floor(diff / 24 / 3600 / 1000) + '天前'
  } else if (diff < year) {
    content = Math.floor(diff / day / 31) + '月前'
  } else {
    content = Math.floor(diff / year) + '年前'
  }

  return content
}

export const shuffle = array =>{
	for(var i=array.length-1;i>=0;i--){
		var randomIndex = Math.floor(Math.random()*(i+1))
		var randomItem = array[randomIndex]
		array[randomIndex] = array[i]
		array[i] = randomItem
	}
	//console.log(array)
//	array.forEach((item,index)=>{
//		item.id = index
//	})
	return array
}
//将带unicode的歌词进行处理
export const reconvert = str=>{ 
            str = str.replace(/(\\u)(\w{1,4})/gi,function($0){ 
                return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16))); 
            }); 
            str = str.replace(/(&#x)(\w{1,4});/gi,function($0){ 
                return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16)); 
            }); 
            str = str.replace(/(&#)(\d{1,6});/gi,function($0){ 
                return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"))); 
            }); 
             
            return str; 
       }

export const number2time = value=>{
						var min = Math.floor(value/60)<10?'0'+Math.floor(value/60):Math.floor(value/60)+''
						var sec = Math.floor(value)%60<10?'0'+Math.floor(value)%60:Math.floor(value%60)+''
						return min + ':' + sec
			}
export const time2number =  time=> {
  let tempArr = time.split(':'),
      minute = parseInt(tempArr[0]),
      second = parseInt(tempArr[1]);
  return minute*60+second;
}
export const lyricsAnalysis = lyrics=>{
  let lyricsObj = {
    timeArr: [],
    lyricsArr: [],
    durationArr: []
  };
  let tempArr = lyrics.split('\n');

  tempArr.forEach(item => {
    let splitPoint = item.indexOf(']');
    lyricsObj.timeArr.push(time2number(item.slice(1, splitPoint)));
    lyricsObj.lyricsArr.push(item.slice(splitPoint + 1));
  });
  // count each lyric duration if it's last the default time is 10
  lyricsObj.timeArr.forEach((time, index) => {
    let timeArr = lyricsObj.timeArr;
    lyricsObj.durationArr.push(index == timeArr.length -1 ? 10 : timeArr[index+1]-time);
  });
  return filterLyrics(lyricsObj);
  //return lyricsObj
}

// 过滤掉歌词数组中 空白等待、换行的部分
export const filterLyrics = lyricsObj=> {
  let timeArr = lyricsObj.timeArr || [],
      lyricsArr = lyricsObj.lyricsArr || [],
      durationArr = lyricsObj.durationArr || [];
  let filterArr = [];

  lyricsArr = lyricsArr.filter((item, index) => {
    if (item.trim()) {
      filterArr.push(index);
      return true;
    }
  });
  timeArr = timeArr.filter((item, timeIndex) => filterArr.find(val => timeIndex == val));
  durationArr = durationArr.filter((item, durationIndex) => filterArr.find(val => durationIndex == val));

  return {
    lyricsArr,
    timeArr,
    durationArr
  };
}