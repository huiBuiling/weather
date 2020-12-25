// 获取是哪个平台
const platform = uni.getSystemInfoSync().platform;

// 获取时间戳
const curTime = new Date().getTime().toString().substr(0, 10);

// 获取 2020-01-15日期格式
const getDate = () => {
	let date = new Date();
	const year = date.getFullYear()
	let month = date.getMonth() + 1
	month = month < 10 ? 0+month : month
	const day = date.getDate()
	return year + '-' + month + '-' + day
}

export {
	curTime,
	getDate
}