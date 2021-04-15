

var staffShowTemplate; // 职工信息的展示模板
var staffInfoListBuffer; // 职工信息的本地缓存
var currentStaffId = undefined; // 当前选中的职工Id
var subjectCellForStaffTemplate;

$(function() {
	var target = $('#teacherListArea');
	staffShowTemplate = target.html();
	subjectCellForStaffTemplate = $('#subjectListForStaffArea').html();
	$('#subjectListForStaffArea').html('');
	requestAndLoadTeacherList();
	requestAndLoadSubjectList();
	resetEditPanel();
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
				targetData = sortById(targetData);
				staffInfoListBuffer = targetData;
				var target = $('#teacherListArea');
				target.html('');
				for(var i=0; i<targetData.length; i++) {
					var cell = targetData[i];
					cell.staffName = noUndefined(cell.staffName);
					cell.staffNumber = noUndefined(cell.staffNumber);
					cell.id = noUndefined(cell.id);
					cell.staffPhoneNumber = noUndefined(cell.staffPhoneNumber);
					var html = staffShowTemplate.replace('#{name}', cell.staffName);
					html = html.replace('#{number}', cell.staffNumber);
					html = html.replace('#{index}', cell.id);
					html = html.replace('#{index}', cell.id);
					html = html.replace('#{index}', cell.id);
					html = html.replace('#{index}', cell.id);
					html = html.replace('#{sex}', toSex(cell.staffSex));
					html = html.replace('#{phone}', cell.staffPhoneNumber);
					html = html.replace('#{workDate}', '');
					html = html.replace('#{state}', '');
					html = html.replace('#{departmentName}', '');
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

function resetEditPanel() {
	$('#pro-add').find('input').val('');
	$('#newStaffSex').val('2');
	currentStaffId = undefined;
	$('#subjectListForStaffArea').html('');
}

function addNewStaff() {
	var newStaffInfo = {
		id : currentStaffId,
		staffName : $('#newStaffName').val(),
		staffPhoneNumber : $('#newStaffPhoneNumber').val(),
		staffNumber : $('#newStaffNumber').val(),
		staffSex : $('#newStaffSex').val(),
		staffNation : $('#newStaffNation').val(),
		staffRace : $('#newStaffRace').val(),
		teacherCompetencyEntityList : getCurrentSelectSubjectList(),
	}
	if (isEmpty(newStaffInfo.staffName)) {
		alert('姓名不能为空');
		return 0;
	}
	if (!isEmpty(newStaffInfo.id)) {
		// 执行修改操作
		updateStaffInfo(newStaffInfo);
		return;
	}
	var list = [];
	list[0] = newStaffInfo;
	console.log(list);
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
				alert('新增成功');
				resetEditPanel();
			} else {
				alert('新增失败\n'+data.desc);
				//swal('获取数据失败', data.desc, 'error');
			}
		},
		error: function() {
			//swal('服务器连接失败', '请检查网络是否通畅', 'warning');
		}
	});
}

function deleteStaff(id) {
	var i;
	for(i=0; i<staffInfoListBuffer.length; i++) {
		if (staffInfoListBuffer[i].id == id) {
			break;
		}
	}
	if (i >= staffInfoListBuffer.length) {
		alert('系统错误!\nid:'+id+'不存在');
		return;
	}
	if (confirm("确定要删除 "+staffInfoListBuffer[i].staffName+" 吗?")) {
		$.ajax({
			url: XConfig.serverAddress + "staffInfo/" + id,
			type: 'DELETE',
			cache: false,
			dataType: 'json',
			async: true, //设置同步
			contentType: "application/json; charset=utf-8",
			data: null,
			success: function(data) {
				if (data.code == 0) {
					var targetData = data.data;
					requestAndLoadTeacherList();
					alert('删除成功');
				} else {
					//swal('获取数据失败', data.desc, 'error');
					alert('删除失败\n' + data.desc);
				}
			},
			error: function() {
				//swal('服务器连接失败', '请检查网络是否通畅', 'warning');
				alert('服务器连接失败');
			}
		});
	} else {
		alert('已取消删除');
	}
}


function updateStaffInfo(t) {
	$.ajax({
		url: XConfig.serverAddress + "staffInfo/" + t.id,
		type: 'PATCH',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(t),
		success: function(data) {
			if (data.code == 0) {
				alert('修改成功');
			} else {
				alert('操作失败\n'+data.desc);
				//swal('获取数据失败', data.desc, 'error');
			}
		},
		error: function() {
			//swal('服务器连接失败', '请检查网络是否通畅', 'warning');
			alert('服务器连接失败');
		}
	});
	
}

// 加载并展示指定职工的信息
function getAndLoadStaffInfo(id) {
	$('#editStaffInfoBtn')[0].click();
	currentStaffId = id;
	var i;
	for(i=0; i<staffInfoListBuffer.length; i++) {
		if (staffInfoListBuffer[i].id == id) {
			break;
		}
	}
	if (i >= staffInfoListBuffer.length) {
		alert('系统错误!\nid:'+id+'不存在');
		return;
	}
	$('#newStaffName').val(staffInfoListBuffer[i].staffName);
	$('#newStaffSex').val(staffInfoListBuffer[i].staffSex);
	$('#newStaffPhoneNumber').val(staffInfoListBuffer[i].staffPhoneNumber);
	loadSubjectListForStaff(staffInfoListBuffer[i].teacherCompetencyList);
}

// ------------------------------------------ 可授课程列表
var subjectListBuffer = [];

function getSubjectById(id) {
	var t;
	$.each(subjectListBuffer, function(index, cell) {
		if (cell.id == id) {
			t = cell; 
		}
	});
	return t;
}
// 加载指定员工的 可授课程列表
function loadSubjectListForStaff(t) {
	var target = $('#subjectListForStaffArea');
	target.html('');
	$.each(t, function(index, cell){
		cell = getSubjectById(cell.subjectId);
		var html = subjectCellForStaffTemplate.replace('#{subjectId}', cell.subjectId);
		html = html.replace('#{subjectName}', cell.subjectName);
		target.append(html);
	});
}
// 新增 可授学科到当前的老师
function addSubjectForStaff() {
	var target = $('#subjectListForStaffArea');
	var index = $('#newSubjectList').val();
	var subject = subjectListBuffer[index];
	var html = subjectCellForStaffTemplate.replace('#{subjectId}', subject.subjectId);
	html = html.replace('#{subjectName}', subject.subjectName);
	target.append(html);
}
// 删除 当前老师的 指定可授学科
function deleteSubjectForStaff(t) {
	var temp = $(t);
	temp.parent().parent().remove();
}
// 将当前教师的 所有可授课程打包为集合
function getSubjectListForStaff() {
	var target = $('#subjectListForStaffArea');
	var list =[];
	target.forEach(function(index, cell){
		list[list.length] = {
			subjectId : cell.attr('subjectId')
		}
	});
	return list;
}

// ---------------------------------- 
var subjectListBuffer = [];
// 获取所有的学科信息
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
				var target = $("#subjectSelectArea");
				target.html('<option value="-1">-- 请选择 --</option>');
				for(var i=0; i<targetData.length; i++) {
					var cell = targetData[i];
					var html = '<option value="'+i+'">'+cell.subjectName+'</option>';
					target.append(html);
					cell.subjectId = cell.id;
				}
				subjectListBuffer = targetData;
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
// 整理与获取当前教师可授学科列表中的所有 学科
function getCurrentSelectSubjectList() {
	var list = [];
	$('#subjectListForStaffArea').children().each(function(index, cell){
		list[list.length] =  {
			subjectId : $(cell).attr('subjectId')
		};
	});
	return list;
}

function addSubjectForCurrentList() {
	var subjectIndex = $("#subjectSelectArea").val();
	if (-1 == subjectIndex) {
		alert("请选择学科");
	}
	var subject = subjectListBuffer[subjectIndex];
	var html = subjectCellForStaffTemplate.replace('#{subjectId}', subject.id);
	html = html.replace("#{subjectName}", subject.subjectName);
	$('#subjectListForStaffArea').append(html); 	
	$('#closeAddSubjectPanelBtn').click();
}

function removeSubjectForCurrentList(t) {
	$(t).parent().parent().remove();
}
