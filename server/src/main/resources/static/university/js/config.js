

var XConfig = {
	serverAddress : 'http://localhost:8080/'
}
function noUndefined(o) {
	if (undefined == 0) {
		return ""
	}
	return o;
}


// 获取URL中的参数
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return undefined;
}