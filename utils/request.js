export const myRequest = (options) => {
	uni.showLoading({ mask: true })
	return new Promise((resolve, reject) =>{
		uni.request({
			url: options.url,
			method: options.method || 'GET',
			data: options.data || {},
			dataType:options.dataType || "json",
			success: (res) => {
				if(res.statusCode === 200) {}
				uni.hideLoading();
				resolve(options.type == 2 ? res.data : res.data.result);
			},
			fail: (err) =>{
				uni.hideLoading();
				uni.showToast({
					title: '接口请求失败！'
				});
				reject(err);
			}
		})
	}).catch((err) => {
		uni.hideLoading();
		uni.showToast({
			title: '发生错误！'
		});
	});
}