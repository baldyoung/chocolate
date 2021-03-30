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
	
	requestAndLoadTeacherList();

});

function requestAndLoadTeacherList() {
	$.ajax({
		url: XConfig.serverAddress + "staffInfo",
		type: 'GET',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				console.log(targetData);
				var target = $('#teacherListArea');
				var showTemplate = target.html();
				target.html('');
				console.log(showTemplate);
				for(var i=0; i<targetData.length; i++) {
					var cell = targetData[i];
					var html = showTemplate.replace('#{name}', noUndefined(cell.staffName));
					target.append(html);
				}
			} else {
				//swal('获取数据失败', data.desc, 'error');
			}
		},
		error: function() {
			//swal('服务器连接失败', '请检查网络是否通畅', 'warning');
		}
	});

}
