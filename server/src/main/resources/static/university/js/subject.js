
var SubjectShowTemplate = undefined;
var subjectListBuffer = [];


$(function() {
	SubjectShowTemplate = $('#subjectShowArea').html();
	// -------------
	setTimeout(function() {
		$('.page-loader-wrapper').fadeOut();
	}, 50);
	requestAndLoadSubjectList();

});

function requestAndLoadSubjectList() {
	$.ajax({
		url: XConfig.serverAddress + "subject",
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
				var target = $('#subjectShowArea');
				target.html('');
				for(var i=0; i<targetData.length; i++) {
					var cell = targetData[i];
					var html = SubjectShowTemplate.replace('#{subjectId}', cell.id);
					html = html.replace('#{subjectName}', cell.subjectName);
					html = html.replace('#{subjectNumber}', cell.subjectNumber);
					html = html.replace('#{standardHours}', cell.standardHours);
					html = html.replace('#{subjectInfo}', cell.subjectInfo);
					target.append(html);
				}
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
	
}







