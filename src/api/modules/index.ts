import {GET,POST,FILE,FILEPOST,PUT,GETNOBASE} from "../api";
const indexUrl=  {
    "centerMap":"/api/map/getCenterMap",
    

    'leftBottom':"/bigscreen/leftBottom", //坐下
    'rightTop':"/bigscreen/alarmNum", //报警次数
    
    'rightBottom':'/api/tourist/getRankingData',// 出行模擬數據
	
	"centerBottom":"/api/tourist/getCenterBottomMock",//中央底部模擬數據
	
	"hotelCount":"/api/hotels/getHotelsCount",//左中 獲取酒店數量統計
	"hotelPriceHistory":"/api/hotels/getHotelPriceHistory",
	"mainlandTourist": "/api/tourist/getMainlandTourist",//左上 獲取內地旅客的統計數據
	"festivalEvents": "/api/event/getFestivalEvents", //獲取節日盛事
	"eventsHolding":"/api/event/getEventsHolding",//仍末结束的活动
	"averageLengthStay": "/api/tourist/getAverageLengthStay", //獲取平均逗留時間
	"enterExitMock":"/api/tourist/getEnterExitMock", //出入境模擬
	
	"hotelMapDetail":"/api/map/getHotelMapDetail"//獲取地图上的酒店詳情
}

export default indexUrl
/**中上--地图 */
export const centerMap=(param:any={})=>{
    return GET(indexUrl.centerMap,param)
}

/**右上--报警次数 */
export const alarmNum=(param:any={})=>{
    return GET(indexUrl.rightTop,param)
}

/**右下--出行模擬 */
export const ranking=(param:any={})=>{
    return GET(indexUrl.rightBottom,param)
}


/**左中--酒店統計 */
export const hotelCount=(param:any={})=>{
	return GET(indexUrl.hotelCount,param)
}

/**左上--內地旅客統計分析 */
export const getMainlandTourist=(param:any={})=>{
	return GET(indexUrl.mainlandTourist,param)
}

/**左下--節日盛事 */
export const getFestivalEvents=(param:any={})=>{
	return GET(indexUrl.festivalEvents,param)
}

/**仍在舉行的活動 */
export const getEventsHolding=(param:any={})=>{
	return GET(indexUrl.eventsHolding,param)
}

/**中下--模擬數據 */
export const getCenterBottomMock=(param:any={})=>{
    return GET(indexUrl.centerBottom,param)
}

/**右上--平均逗留時間*/
export const getAverageStayTime=(param: any={})=>{
	return GET(indexUrl.averageLengthStay,param)
}

/**右中--出入境*/
export const getEnterExitMock=(param: any={})=>{
	return GET(indexUrl.enterExitMock,param)
}

export const getHotelMapDetail=(param: any={})=>{

    return GET(indexUrl.hotelMapDetail,param);
}

/**酒店價格歷史*/
export const getHotelPriceHistory=(param: any={})=>{
	return GET(indexUrl.hotelPriceHistory,param);
}