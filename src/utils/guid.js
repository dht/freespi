const guid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	})
}

const guid8 = () => {
	return guid().substr(0, 8);
}


module.exports = {
	guid: guid,
	guid8: guid8,
}
