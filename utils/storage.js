const setItemSync = (key, data) => {
	uni.setStorageSync(key, data);
}

const getItemSync = (key) => {
	return uni.getStorageSync(key);
}

const removeItemSync = (key) => {
	uni.removeStorageSync(key);
}

const clearItemSync = () => {
	uni.clearStorageSync();
} 

export {
	setItemSync,
	getItemSync,
	removeItemSync,
	clearItemSync
}