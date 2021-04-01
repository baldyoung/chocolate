
var SubjectShowTemplate = undefined;
var subjectListBuffer = [];
var currentSubjectId;

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
					cell.id = noUndefined(cell.id);
					cell.subjectName = noUndefined(cell.subjectName);
					cell.subjectNumber = noUndefined(cell.subjectNumber);
					cell.standardHours = noUndefined(cell.standardHours);
					cell.subjectInfo = noUndefined(cell.subjectInfo);
					cell.info = cell.subjectInfo.substring(0, 15);
					var html = SubjectShowTemplate.replace('#{subjectId}', cell.id);
					html = html.replace('#{subjectName}', cell.subjectName);
					html = html.replace('#{subjectNumber}', cell.subjectNumber);
					html = html.replace('#{standardHours}', cell.standardHours);
					html = html.replace('#{subjectInfo}', cell.info);
					html = html.replace('#{index}', i);
					html = html.replace('#{index}', i);
					html = html.replace('#{index}', i);
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

function addNewSubject() {
	var newSubject = {
			id : currentSubjectId,
			subjectName : $('#newSubjectName').val(),
			subjectNumber : $('#newSubjectNumber').val(),
			standardHours : $('#newSubjectStandardHours').val(),
			subjectInfo : $('#newSubjectInfo').val()
		}
	if (isEmpty(newSubject.subjectName)) {
		alert('名称不能为空');
		return ;
	}
	if (undefined != newSubject.id) {
		updateSubject(newSubject);
	}
	var list = [];
	list[0] = newSubject;
	$.ajax({
		url: XConfig.serverAddress + "staffInfo",
		type: 'POST',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(list),
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				resetEditPanel();
				alert('新增成功');
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

function deleteSubject(index) {
	if (!confirm("要删除 "+subjectListBuffer[index].subjectName+" 吗?")) {
		return;
	}
	$.ajax({
		url: XConfig.serverAddress + "staffInfo/" + subjectListBuffer[index].id,
		type: 'DELETE',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				requestAndLoadSubjectList();
				alert("已删除");
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

function updateSubject(subject) {
	$.ajax({
		url: XConfig.serverAddress + "staffInfo/" + subject.id,
		type: 'PATCH',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(subject),
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				alert("修改成功");
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

function getAndLoadSubject(index) {
	resetEditPanel();
	currentSubjectId = subjectListBuffer[index].id;
	$('#Library-tab-Boot')[0].click();
	$('#newSubjectName').val(subjectListBuffer[index].subjectName);
	$('#newSubjectNumber').val(subjectListBuffer[index].subjectNumber);
	$('#newSubjectStandardHours').val(subjectListBuffer[index].standardHours);
	$('#newSubjectInfo').val(subjectListBuffer[index].subjectInfo);
	
}

function resetEditPanel() {
	$('#Library-add-Boot').find('input').val('');
	$('#newSubjectInfo').val('');
	currentSubjectId = undefined;
}






