
var SpecialtyShowTemplate;
var specialtyListBuffer = [];
var currentSpecialtyId;

$(function() {
	specialtyShowTemplate = $('#specialtyListArea').html();
	
	});
/**
 * 获取所有的 专业信息
 */
function requestAndLoadSpecialtyList() {
	$.ajax({
		url: XConfig.serverAddress + "specialty",
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
				targetData = sortById(targetData);
				specialtyListBuffer = targetData;
				var target = $('#specialtyListArea');
				target.html('');
				$.each(targetData, function(index, cell) {
					cell.specialtyName = noUndefined(cell.specialtyName);
					cell.specialtyNumber = noUndefined(cell.specialtyNumber);
					cell.specialtyInfo = noUndefined(cell.specialtyInfo);
					var html = SpecialtyShowTemplate.repalce('#{index}', index);
					html = html.replace('#{specialtyName}', cell.specialtyName);
					html = html.replace('#{specialtyNumber}', cell.specialtyNumber};
					html = html.replace('#{specialtyInfo}', cell.specialtyInfo);
					html = html.repalce('#{index}', index);
					html = html.repalce('#{index}', index);
					html = html.repalce('#{index}', index);
					target.append(html);
				});
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
/**
 * 删除指定的 专业
 * @param {Object} index
 */
function deleteSpecialty(index) {
	if (!confirm("确定删除 "+specialtyListBuffer[index].specialtyName+" 吗?")) {
			return;
	}
	$.ajax({
		url: XConfig.serverAddress + "specialty/" + specialtyListBuffer[index].id,
		type: 'DELETE',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,
		// JSON.stringify(list)
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				requestAndLoadSpecialtyList();
				alert("删除成功");
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
/**
 * 新增一个 专业
 */
function addSpecialty() {
	var newSpecialty = {
		id : currentSpecialtyId,
		specialtyName : $('#newSpecialtyName').val(),
		specialtyNumber : $('#newSpecialtyNumber').val(),
		specialtyInfo : $('#newSpecialtyInfo').val()
	};
	if (isEmpty(newSpecialty.specialtyName)) {
		alert('名称不能为空');
		return;
	}
	if (!isEmpty(newSpecialty.id)) {
		updateSpecialty(newSpecialty);
		return;
	}
	var list = [];
	list.push(newSpecialty);
	$.ajax({
		url: XConfig.serverAddress + "specialty",
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
/**
 * 获取并加载指定的 专业
 * @param {Object} index
 */
function getAndLoadSpecialty(index) {
	var cell = specialtyListBuffer[index];
	$('#newSpecialtyName').val(cell.specialtyName);
	$('#newSpecialtyNumber').val(cell.specialtyNumber);
	$('#newSpecialtyInfo').val(cell.specialtyInfo);
	currentSpecialtyId = cell.id;
}
/**
 * 修改指定的 专业
 * @param {Object} specialty
 */
function updateSpecialty(specialty) {
	$.ajax({
		url: XConfig.serverAddress + "specialty/" + specialty.id,
		type: 'PATCH',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(specialty),
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
/**
 * 重置信息编辑面板
 */
function resetEditPanel() {
	$('#Specialty-add').find('input').val('');
	$('#newSpecialtyInfo').val('');
}
/**
 * 新增操作 的前期准备
 */
function readyToAddOption() {
	resetEditPanel();
	currentSpecialtyId = undefined;
}


// ------------------------------------------------------------------------
// 学科信息缓存
var subjectListBuffer = []; 
// 当前的专业的 学科计划表
var subjectListInCurrentPlan = [];
// 获取并加 学科信息
function requestAndLoadSubjectList() {
	
}
// 将指定学科 添加到当前的专业计划列表中
function addSubjectToSpecialtyPlanList(index) {
	
}
// 从当前的专业计划列表中 删除指定学科
function delSubjectFromSpecialtyPlanList(index) {
	
}
// 修改指定学科 在当前专业计划列表中的 位置
function updateSubjectPositionInSpecialtyPlanList(index, ac) {
	
}