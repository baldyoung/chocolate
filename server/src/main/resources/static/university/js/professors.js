$(function() {
	// 同步URL中的父级样式
	var parentClass = getQueryVariable('parentClass');
	console.log(parentClass);
	if (undefined != parentClass) {
		parentClass = parentClass.split(',').join(' ');
		document.body.setAttribute('class', parentClass);
	}
});
$(function() {
	var temp = $('#teacherListArea');
	requestAndLoadTeacherList();

});

function requestAndLoadTeacherList() {
	/*
	$.ajax({
		url: XConfig.serverAddress + "staffInfo/all",
		type: 'GET',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				console.log(targetData);
			} else {
				swal('获取商品类型数据失败', data.desc, 'error');
			}
		},
		error: function() {
			swal('服务器连接失败', '请检查网络是否通畅', 'warning');
		}
	});

			var ajaxUrl = "http://localhost:8080/staffInfo/all";
			$.ajax({
				url: ajaxUrl,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function (data) {
					//render(data);
					console.log(data);
				}
			});
			// 成功案例
			var temp = '[{ "staffName":"戴发发" },{ "staffName":"王庆庆" }]';
			$.ajax({
				url: "http://localhost:8080/staffInfo",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				data : temp,
				crossDomain: true,
				success: function (data) {
					console.log(data);
				}
			});
			temp = [{ 'staffName':'戴发发' },{ 'staffName':'王庆庆' }];
			$.ajax({
				url: "http://localhost:8080/staffInfo",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				data : temp,
				crossDomain: true,
				success: function (data) {
					console.log(data);
				}
			});
			*/
			// -----------------
			var temp = '{"id":"1", "staffName":"肖静-男", "staffNation":"中国-南昌"}';
			$.ajax({
				url: "http://localhost:8080/staffInfo/1",
				type: "PATCH",
				/*
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				*/
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				data : temp,
				success: function (data) {
					console.log(data);
				}
			});
			$.ajax({
				url: "http://localhost:8080/staffInfo/all",
				type: "GET",
				/*
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				*/
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				data : null,
				success: function (data) {
					console.log(data);
				}
			});
}
