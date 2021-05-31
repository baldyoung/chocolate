

var StudentClassShowTemplate = undefined;
var studentClassListBuffer = []; 
var currentStudentClassId = undefined;
var classStateNames = ['已毕业', '正常', '撤销', '其它'];


$(function(){
	StudentClassShowTemplate = $('#studentClassShowArea').html();
	getAndLoadSpecialtyInfo();
	getAndLoadStaffInfo();
	requestAndLoadStudentClassList();
	$('#newStudentClassBranch').html('<option value="-1">-- 请选择学院 --</option>');
	var branchList = ['软件网工学院', '电子商务学院', '媒体艺术学院', '其它'];
	for(var i=0; i<branchList.length; i++) {
		$('#newStudentClassBranch').append('<option value="'+i+'">'+branchList[i]+'</option>');
	}
	
	//日期范围限制
	var start = laydate({
		elem: '#newStudentClassCreateDate',
		type : 'date',
		format: 'YYYY-MM-DD',
		//min: , //设定最小日期为当前日期
		max: '2099-06-16 23:59:59', //最大日期
		istime: false,
		istoday: false,
		choose: function(datas) {
		},
		ready : function() {
			start.hint('嘻嘻');
		}
	});
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
					cell.classBirthday = noUndefined(cell.classBirthday);
					if (cell.classBirthday != '') {
						cell.classBirthday = toDateFormat(new Date(cell.classBirthday));
					}
					cell.state = noUndefined(cell.state);
					if (cell.state != '') {
						cell.state = parseInt(cell.state);
						cell.stateName = classStateNames[cell.state];
					} else {
						cell.stateName = '';
					}
					cell.branchId = (cell.branchId == undefined ? -1 : cell.branchId);
					console.log(cell.staffName);
					var html = StudentClassShowTemplate.replace("#{studentClassId}", cell.id);
					html = html.replace("#{studentClassName}", cell.className);
					html = html.replace('#{specialtyName}', cell.specialtyName);
					html = html.replace('#{staff}', cell.staffName);
					html = html.replace('#{currentPeopleNumber}', cell.currentStudentAmount);
					html = html.replace('#{createDate}', cell.classBirthday).replace("#{stateName}", cell.stateName);
					html = html.replace('#{index}', index).replace('#{index}', index).replace('#{index}', index);
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
function getAndLoadStudentClass(index) {
	$('#Dep-tab-Boot')[0].click();
	var classRoom = studentClassListBuffer[index];
	$('#newStudentClassSpecialty').val(classRoom.specialtyId);
	$('#newStudentClassName').val(classRoom.className); 
	$('#newStudentClassHolder').val(classRoom.holderStaffId);
	$('#newStudentClassCurrentPeopleNumber').val(classRoom.currentStudentAmount);
	$('#newStudentClassCreatePeopleNumber').val(classRoom.initStudentAmount);
	$('#newStudentClassCreatePeopleNumber').attr('readonly', '');
	$('#newStudentClassCreateDate').val(classRoom.classBirthday);
	$('#newStudentClassBranch').val(classRoom.branchId);
	currentStudentClassId = classRoom.id;
	$('#editAreaTitle').text("修改班级");
}



// 新增班级
function addNewStudentClass() {
	var studentClass = {
		id : currentStudentClassId,
		specialtyId : $('#newStudentClassSpecialty').val(),
		className : $('#newStudentClassName').val(),
		holderStaffId : $('#newStudentClassHolder').val(),
		initStudentAmount : $('#newStudentClassCurrentPeopleNumber').val(),
		currentStudentAmount : $('#newStudentClassCreatePeopleNumber').val(),
		branchId : $('#newStudentClassBranch').val(),
		classBirthday : $('#newStudentClassCreateDate').val()
	};
	if (isEmpty(studentClass.specialtyId, studentClass.className, studentClass.holderStaffId, studentClass.initStudentAmount, studentClass.currentStudentAmount)) {
		alert("请补全信息");
		return;
	}
	if (-1 == studentClass.branchId) {
		studentClass.branchId = '';
	}
	if (undefined != studentClass.id) {
		updateClassRoom(studentClass);
		return;
	}
	
	//studentClass.specialtyId = specialtyListBuffer[studentClass.specialtyId].id;
	//studentClass.holderStaffId = staffListBuffer[studentClass.holderStaffId].id;
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

// 修改指定班级的信息
function updateClassRoom(classRoom) {
	$.ajax({
		url: XConfig.serverAddress + "studentClass/" + classRoom.id,
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

// 删除指定的班级
function removeStudentClassRoom(index) {
	var classRoom = studentClassListBuffer[index];
	if(!confirm("确定删除 "+classRoom.className +" 吗?")) {
		return;
	}
	$.ajax({
		url: XConfig.serverAddress + "studentClass/" + classRoom.id,
		type: 'DELETE',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,//JSON.stringify(list),
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				requestAndLoadStudentClassList();
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

//
function resetEditPanel() {
	$('#editAreaTitle').text("新增班级");
	$('#Dep-add-Boot').find('input').val('');
	$('#Dep-add-Boot').find('select').val('');
	$('#newStudentClassCreatePeopleNumber')[0].removeAttribute('readonly');
	$('#newStudentClassBranch').val('-1');
	currentStudentClassId = undefined;
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
					target.append('<option value="'+cell.id+'"> '+cell.specialtyName+' </option>');
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
					target.append("<option value='" + cell.id + "'> " + cell.staffName + " </option>");
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









