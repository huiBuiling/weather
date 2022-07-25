/**
 * api接口统一管理
 */
import { getDate } from './index.js'
import { myRequest } from './request.js';

const appkey = '20d2ede0a74e24bd77a7303b6ab9daab';
const appkey2 = '55fe9522b1f5dc6ed24e4daab7ec481b';
// 55fe9522b1f5dc6ed24e4daab7ec481b

// 获取是哪个平台
const platform = uni.getSystemInfoSync().platform;
let fontApi = 'https://way.jd.com';
const fontApi2 = 'http://web.juhe.cn';
// let fontApi = 'https://api.avatardata.cn';
if(process.env.NODE_ENV === 'development' && platform !== 'devtools') {
	// 开发环境且非小程序调试工具
	fontApi = '/api';
}

/**
 * 当前城市数据: curCityData
 * 全部城市: getAllCity
 */
const curCityData = (city) => {
	return myRequest({
		data: {
			city,
			appkey
		},
		url: fontApi + '/jisuapi/weather'
	});
};

const getAllCity = () => {
	return myRequest({
		data: {
			appkey
		},
		url: fontApi + '/jisuapi/weather1'
	});
};

/**
 * 菜谱分类: recipeClassify
 * 菜谱搜索: searchRecipe
 * 按分类检索：recipeCategorySearch
 * 根据id查询详情：recipeDetail
 */
const recipeClassify = (options) => {
	return myRequest({
		data: {
			appkey
		},
		url: fontApi + '/recipe_class'
	});
}

const searchRecipe = (keyword, num = 10) => {
	return myRequest({
		data: {
			keyword,
			num,
			appkey
		},
		url: fontApi + '/search'
	});
}

const recipeCategorySearch = (classid, start) => {
	return myRequest({
		data: {
			classid,
			start,
			appkey
		},
		url: fontApi + '/byclass'
	});
}

const recipeDetail = (id) => {
	return myRequest({
		...options,
		data: {
			appkey
		},
		url: fontApi + '/detail'
	});
}

/**
 * 线路查询：routeInquiry
 * 换乘查询：transferQuery
 */
const routeInquiry = (city, transitno) => {
	return myRequest({
		data: {
			city,
			transitno,
			appkey
		},
		url: fontApi + '/jisuapi/transitLine'
	});
}

const transferQuery = () => {
	return myRequest({
		data: {
			appkey
		},
		url: fontApi + '/jisuapi/transitStation2s'
	});
}

/**
 * joke
 */
const jokeReq = (url, options) => {
	return myRequest({
		data: {
			appkey: appkey2,
			page: options.page || 1,
			maxResult: options.rows || 10,
			time: getDate(),
			showapi_sign: 'bd0592992b4d4050bfc927fe7a4db9f3'
		},
		url: fontApi + url
	});
}

const jockImgData = (options) => {
	return jokeReq('/showapi/tpxh', options)
}

const jockGifData = (options) => {
	return jokeReq('/showapi/dtgxt', options)
}

const jockTextData = (options) => {
	return jokeReq('/showapi/wbxh', options)
}


/**
 * 星座 - 废弃(收费)
 */
// const constellationKey = '506a24170c084c9dbcf07b647833124d';
const constellationKey = 'ea39f123cc8985dcd64542fb7e42a6ea';
const consteApi = (options) => {
	// console.log('api', options)
	return myRequest({
		data: {
			key: constellationKey,
			consName: options.consName || '射手座',
			type: options.type || 'today',
		},
		// url: fontApi + '/Constellation/Query',
		url: fontApi2 + '/constellation/getAll',
		type: 2
	});
}

/**
 * 新闻
	 * 新闻频道：newsMenu
	 * 获取新闻：getNews
	 * 搜索新闻: searchNews
 */
const newsMenu = () => {
	return myRequest({
		data: { appkey: appkey2 },
		url: fontApi + '/jisuapi/channel',
	});
}

const getNews = (options) => {
	return myRequest({
		data: { 
			appkey: appkey2,
			channel: options.channel || '头条',
			start: options.page || 1,
			num: options.num || 10,
		},
		url: fontApi + '/jisuapi/get',
	});
}

const searchNews = (keyword) => {
	return myRequest({
		data: { 
			appkey: appkey2,
			keyword: keyword || '热搜'
		},
		url: fontApi + '/jisuapi/newSearch',
	});
}

export const api = {
    curCityData, getAllCity,
	recipeClassify, searchRecipe, recipeCategorySearch,
	routeInquiry, transferQuery,
	jockImgData, jockGifData, jockTextData,
	consteApi,
	newsMenu, getNews, searchNews,
};

