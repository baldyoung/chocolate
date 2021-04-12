
var SpecialtyShowTemplate;
var specialtyListBuffer = [];
var currentSpecialtyId;

$(function() {
	SpecialtyShowTemplate = $('#specialtyListArea').html();
	subjectShowTemplate = $('#specialtyPlanDetailsArea').html();
	$('#specialtyListArea').html('');
	$('#specialtyPlanDetailsArea').html('');
	requestAndLoadSpecialtyList();
	requestAndLoadSubjectList();
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
					var html = SpecialtyShowTemplate.replace('#{index}', cell.id);
					html = html.replace('#{specialtyName}', cell.specialtyName);
					html = html.replace('#{specialtyNumber}', cell.specialtyNumber);
					html = html.replace('#{specialtySimpleInfo}', cell.specialtyInfo.substring(0, 20));
					html = html.replace('#{index}', index);
					html = html.replace('#{index}', index);
					html = html.replace('#{index}', index);
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
		specialtyInfo : $('#newSpecialtyInfo').val(),
		subjectList : getLocalSubjectList()
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
	$('#addNewSpecialtyBtn')[0].click();
	var cell = specialtyListBuffer[index];
	$('#newSpecialtyName').val(cell.specialtyName);
	$('#newSpecialtyNumber').val(cell.specialtyNumber);
	$('#newSpecialtyInfo').val(cell.specialtyInfo);
	currentSpecialtyId = cell.id;
	loadTargetSubjectInPlanArea(cell.subjectList);
	
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
	$('#Specialty-add').find('.panelTitle').text('新增专业');
	$('#Specialty-add').find('input').val('');
	$('#newSpecialtyInfo').val('');
	currentSpecialtyId = undefined;
	$('#specialtyPlanDetailsArea').html('');
}



// ------------------------------------------------------------------------
// 学科信息缓存
var subjectListBuffer = []; 
// 当前的专业的 学科计划表
var subjectListInCurrentPlan = [];
// 专业 学科计划的展示单元 模板
var subjectShowTemplate;
var currentSubjectCell; 
// 获取并加 学科信息
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
				var target = $("#selectSubjectList");
				target.html('<option value="-1">-- 请选择 --</option>');
				for(var i=0; i<targetData.length; i++) {
					var cell = targetData[i];
					var html = '<option value="'+i+'">'+cell.subjectName+'</option>';
					target.append(html);
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
// 将指定学科 添加到当前的专业计划列表中
function addSubjectToSpecialtyPlanList() {
	var index = $('#selectSubjectList').val();
	var temp = subjectListBuffer[index];
	if (temp == undefined) {
		alert("请选择学科");
		return;
	} 
	var cell = {
			subjectId : temp.id,
			referenceHours : $('#newReferenceHours').val(),
			sortParament : $('#newSortParament').val()
		};
	if (undefined != currentSubjectCell) {
		currentSubjectCell.attr('id', 'kk'+index);
		currentSubjectCell.attr('subjectIndex', index);
		currentSubjectCell.attr('subjectId', cell.subjectId);
		currentSubjectCell.attr('referenceHours', cell.referenceHours);
		currentSubjectCell.attr('sortParament', cell.sortParament);
		currentSubjectCell.children().eq(0).children().eq(0).text(temp.subjectName);
		currentSubjectCell.children().eq(0).children().eq(1).text(cell.referenceHours);
		alert('修改成功');
		$('#closeAddSubjectForPlanBtn').click();
		return; 
	}
	var html = subjectShowTemplate.replace('#{subjectName}', temp.subjectName);
	html = html.replace("#{index}", index);
	html = html.replace("#{subjectId}", temp.id);
	html = html.replace("#{subjectId}", temp.id);
	html = html.replace("#{subjectIndex}", index);
	html = html.replace("#{referenceHours}", cell.referenceHours);
	html = html.replace("#{referenceHours}", cell.referenceHours);
	html = html.replace('#{sortParament}', cell.sortParament);
	$('#specialtyPlanDetailsArea').append(html);
	alert("添加成功");
	resetAddSubjectPanel();
	$('#closeAddSubjectForPlanBtn').click();
}
// 加载给定的学科集合到方案列表中
function loadTargetSubjectInPlanArea(t) {
	var target = $('#specialtyPlanDetailsArea');
	target.html('');
	t.forEach(function(index, cell) {
		var temp = getSubjectById(cell.subjectId);
		var html = subjectShowTemplate.replace('#{subjectName}', temp.subjectName);
		html = html.replace("#{index}", temp.index);
		html = html.replace("#{subjectId}", temp.subjectId);
		html = html.replace("#{subjectId}", temp.subjectId);
		html = html.replace("#{subjectIndex}", temp.index);
		html = html.replace("#{referenceHours}", temp.referenceHours);
		html = html.replace("#{referenceHours}", temp.referenceHours);
		html = html.replace('#{sortParament}', temp.sortParament);
		target.append(html);
	});
}
// 获取指定编号的学科信息
function getSubjectById(id) {
	var result;
	subjectListBuffer.forEach(function(index, cell){
		if (cell.id == id) {
			cell.index = index;
			result = cell;
		}
	});
	return result;
}
// 从当前的专业计划列表中 删除指定学科
function delSubjectFromSpecialtyPlanList(t) {
	$(t).parent().parent().remove();
}

// 重置学科新增面板
function resetAddSubjectPanel() {
	$('#editSubjectPanelTitle').text('添加方案课程');
	$('#selectSubjectList').val(-1);
	$('#newReferenceHours').val('');
	$('#newSortParament').val('');
	currentSubjectCell = undefined;
}
/**
 * 准备修改指定的 学科安排
 * @param {Object} t
 */
function readyToUpdate(t) {
	var temp = $(t).parent().parent();
	$('#addSubjectBtn').click();
	$('#editSubjectPanelTitle').text('修改方案课程');
	$('#selectSubjectList').val(temp.attr('subjectIndex'));
	$('#newReferenceHours').val(temp.attr('referenceHours'));
	$('#newSortParament').val(temp.attr('sortParament'));
	currentSubjectCell = temp;
}
/**
 * 修改指定元素 与 上下元素的位置
 * @param {Object} t
 * @param {Object} ac
 */
function changeSubjectPosition(t, ac) {
	var t = $(t).parent().parent();
	if (ac == 1) {
		var target = t.prev();
		if (undefined != target && 0 != target.length) {
			t.remove();
			target.before(t);
		}
	} else if (ac == -1) {
		var target = t.next();
		if (undefined != target && 0 != target.length) {
			t.remove();
			target.after(t);
		}
	}
}

// 获取专业计划计划详情中的 学科集合
function getLocalSubjectList() {
	var target = $('#specialtyPlanDetailsArea');
	var list = [];
	target.forEach(function(index, cell){
		list[list.length] = {
			subjectId:cell.attr('subjectId'),
			referenceHours:cell.attr('referenceHours'),
			sortParament:cell.attr('sortParament')
		}
	});
	return list;
}