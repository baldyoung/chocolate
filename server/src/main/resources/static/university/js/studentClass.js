

var StudentClassShowTemplate = undefined;
var studentClassListBuffer = []; 
var currentStudentClassId = undefined;



$(function(){
	StudentClassShowTemplate = $('#studentClassShowArea').html();
	getAndLoadSpecialtyInfo();
	getAndLoadStaffInfo();
	requestAndLoadStudentClassList();
});
// 获取 班级集合  并加载展示
function requestAndLoadStudentClassList() {
	$.ajax({
		url: XConfig.serverAddress + "studentClass",
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
				var target = $('#studentClassShowArea');
				target.html('');
				$.each(targetData, function(index, cell){
					cell.specialtyName = getSpecialtyById(cell.specialtyId).specialtyName;
					cell.staffName = getStaffById(cell.holderStaffId).staffName;
					cell.specialtyName = noUndefined(cell.specialtyName);
					cell.staffName = noUndefined(cell.staffName);
					cell.currentPeopleNumber = noUndefined(cell.currentPeopleNumber);
					cell.createDate = noUndefined(cell.createDate);
					cell.state = noUndefined(cell.state);
					console.log(cell.staffName);
					var html = StudentClassShowTemplate.replace("#{studentClassId}", cell.id);
					html = html.replace("#{studentClassName}", cell.className);
					html = html.replace('#{specialtyName}', cell.specialtyName);
					html = html.replace('#{staff}', cell.staffName);
					html = html.replace('#{currentPeopleNumber}', cell.currentPeopleNumber);
					html = html.replace('#{createDate}', cell.createDate).replace("#{state}", cell.state);
					target.append(html);
				});
				studentClassListBuffer = targetData;
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

// 获取指定 班级 并加载展示
function getAndLoadStudentClass(id) {
	
}



// 新增班级
function addNewStudentClass() {
	var studentClass = {
		specialtyId : $('#newStudentClassSpecialty').val(),
		className : $('#newStudentClassName').val(),
		holderStaffId : $('#newStudentClassHolder').val(),
		initStudentAmount : $('#newStudentClassCurrentPeopleNumber').val(),
		currentStudentAmount : $('#newStudentClassCreatePeopleNumber').val(),
		classBirthday : $('#newStudentClassCreateDate').val()
	};
	if (isEmpty(studentClass.specialtyId, studentClass.className, studentClass.holderStaffId, studentClass.initStudentAmount, studentClass.currentStudentAmount)) {
		alert("请补全信息");
		return;
	}
	studentClass.specialtyId = specialtyListBuffer[studentClass.specialtyId].id;
	studentClass.holderStaffId = staffListBuffer[studentClass.holderStaffId].id;
	var list = [];
	list.push(studentClass);
	$.ajax({
		url: XConfig.serverAddress + "studentClass",
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


//
function resetEditPanel() {
	$('#editAreaTitle').text("新增班级");
	$('#Dep-add-Boot').find('div').val('');
}

// -------------------------------------- 获取初始数据
var specialtyListBuffer = [];
// 获取并初始化专业信息
function getAndLoadSpecialtyInfo() {
	$.ajax({
		url: XConfig.serverAddress + "specialty",
		type: 'GET',
		cache: false,
		dataType: 'json',
		async: false, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,
		// JSON.stringify(list)
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				var target = $('#newStudentClassSpecialty');
				target.html('<option value=""> -- 选择专业 -- </option>');
				$.each(targetData, function(index, cell) {
					target.append('<option value="'+index+'"> '+cell.specialtyName+' </option>');
				});
				specialtyListBuffer = targetData;
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
function getSpecialtyById(id) {
	var t = {
		};
	$.each(specialtyListBuffer, function(index, cell){
		if (cell.id == id) {
			t = cell;
		}
	});
	return t;
}
// 获取并初始化职工信息
var staffListBuffer = [];
function getAndLoadStaffInfo() {
	$.ajax({
		url: XConfig.serverAddress + "staffInfo",
		type: 'GET',
		cache: false,
		dataType: 'json',
		async: false, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,
		// JSON.stringify(list)
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				var target = $('#newStudentClassHolder');
				target.html('<option value=""> -- 选择班主任 -- </option>');
				$.each(targetData, function(index, cell) {
					target.append("<option value='" + index + "'> " + cell.staffName + " </option>");
				});
				staffListBuffer = targetData;
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
function getStaffById(id) {
	var t = {
		};
	$.each(staffListBuffer, function(index, cell) {
		if (cell.id == id){
			t = cell;
		}
	});
	return t;
}









