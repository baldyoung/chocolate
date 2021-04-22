
var classRoomShowCellTemplate;
var classRoomListBuffer = [];
var currentClassRoomId;
$(function(){
	classRoomShowCellTemplate = $('#classRoomListArea').html();
	getAndLoadClassRoomList();
});

function getAndLoadClassRoomList() {
	$.ajax({
		url: XConfig.serverAddress + "studentClassRoom",
		type: 'GET',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				targetData = sortById(targetData);
				$('#dataLengthArea').text(targetData.length + '条数据');
				var target = $('#classRoomListArea');
				target.html('');
				$.each(targetData, function(index, cell) {
					cell.classRoomInfo = noUndefined(cell.classRoomInfo);
					cell.classRoomNumber = noUndefined(cell.classRoomNumber);
					cell.typeName = (cell.typeFlag == '1' ? '电脑间' : '非电脑间');
					cell.classRoomSimpleInfo = cell.classRoomInfo.substring(0, 20);
					var html = classRoomShowCellTemplate.replace('#{id}', cell.id);
					html = html.replace('#{index}', index).replace('#{index}', index).replace('#{index}', index);
					html = html.replace('#{classRoomName}', cell.classRoomName);
					html = html.replace('#{classRoomNumber}', cell.classRoomNumber);
					html = html.replace('#{typeName}', cell.typeName);
					html = html.replace('#{standardPeopleAmount}', cell.standardPeopleAmount);
					html = html.replace('#{classRoomSimpleInfo}', cell.classRoomSimpleInfo);
					target.append(html);
				});
				classRoomListBuffer = targetData;
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

function resetEditPanel() {
	$('#classRoom-add-Panel').find('input').val('');
	currentClassRoomId = undefined;
}

function getAndLoadClassRoom(index) {
	$('#addClassRoomBtn')[0].click();
	var cell = classRoomListBuffer[index];
	$('#newClassRoomName').val(cell.classRoomName);
	$('#newClassRoomNumber').val(cell.newClassRoomNumber);
	$('#newClassRoomType').val(cell.typeFlag);
	$('#newClassRoomInfo').val(cell.classRoomInfo);
	$('#newClassRoomNameStandardPeopleAmount').val(cell.standardPeopleAmount);
	currentClassRoomId = cell.id;
}

function getEditPanelInfo() {
	var cell = {
		id : currentClassRoomId,
		classRoomName : $('#newClassRoomName').val(),
		classRoomNumber : $('#newClassRoomNumber').val(),
		typeFlag : $('#newClassRoomType').val(),
		classRoomInfo : $('#newClassRoomInfo').val(), 
		standardPeopleAmount : $('#newClassRoomNameStandardPeopleAmount').val() 
	};
	return cell;
}

function addOrUpdateClassRoom() {
	var newClassRoom = getEditPanelInfo();
	if (isEmpty(newClassRoom.classRoomName, newClassRoom.typeFlag, newClassRoom.standardPeopleAmount)) {
		alert('请补全信息');
		console.log(newClassRoom);
		return ;
	}
	if (undefined != newClassRoom.id) {
		updateClassRoomInfo(newClassRoom);
		return;
	}
	var list = [newClassRoom];
	$.ajax({
		url: XConfig.serverAddress + "studentClassRoom",
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

function updateClassRoomInfo(classRoom) {
	$.ajax({
		url: XConfig.serverAddress + "studentClassRoom/" + classRoom.id,
		type: 'PATCH',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(classRoom),
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				alert('修改成功');
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

function deleteClassRoom(index) {
	var cell = classRoomListBuffer[index];
	if(!confirm("确定删除 " + cell.classRoomName + " 吗?")) {
		return;
	}
	$.ajax({
		url: XConfig.serverAddress + "studentClassRoom/" + cell.id,
		type: 'DELETE',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				getAndLoadClassRoomList();
				alert('删除成功');
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



