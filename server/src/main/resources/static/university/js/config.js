var XConfig = {
	serverAddress: 'http://localhost:8080/'
}

function noUndefined(o) {
	if (undefined == o || null == o) {
		return ""
	}
	return o;
}

function toSex(sexFlag) {
	if (0 == sexFlag) {
		return "女";
	} else if (1 == sexFlag) {
		return "男";
	}
	return "未知";
}

function isEmpty(o) {
	if (undefined == o || null == o || '' == o) {
		return true;
	}
	return false;
}

function sortById(list) {
	for (var j=0; j<list.length; j++) {
		var t = j;
		for(var i=j+1; i<list.length; i++) {
			if (parseInt(list[i].id) > parseInt(list[t].id)) {
				t = i;
			}
		}
		var temp = list[j];
		list[j] = list[t];
		list[t] = temp;
	}
	console.log(list);
	return list;
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


/*
$.ajax({
	url: XConfig.serverAddress + "staffInfo",
	type: 'GET',
	cache: false,
	dataType: 'json',
	async: true, //设置同步
	contentType: "application/json; charset=utf-8",
	data: null,
	// JSON.stringify(list)
	success: function(data) {
		if (data.code == 0) {
			var targetData = data.data;
			
		} else {
			//swal('获取数据失败', data.desc, 'error');
			alert('操作失败\n'+data.desc);
		}
	},
	error: function() {
		//swal('服务器连接失败', '请检查网络是否通畅', 'warning');
		alert('服务器连接失败');
	}
});

*/