

var currentSelectDayTime;
$(function() {
	createPanelCourseMap();
	createDayTimeMap();
	currentSelectDayTime = localStorage.getItem("currentSelectDayTime");
	currentSelectDayTime = JSON.parse(currentSelectDayTime);
	console.log("时间与任务点:");
	console.log(currentSelectDayTime);
	$.each(currentSelectDayTime.dayTimeList, function(index, cell){
		$('#'+toFlag(cell.day, cell.time)).css('background', '#C0504E');
	});
	$('#seletedDateArea').text('起始时间:'+currentSelectDayTime.startDate);
	
	var disengagedData = getTargetDisengagedDataMap(currentSelectDayTime.startDate, currentSelectDayTime.dayTimeList);
	console.log("空闲资源汇总:");
	console.log(disengagedData);
	classModule.init(disengagedData.classList);
	roomModule.init(disengagedData.roomList);
	subjectModule.init();
	 
	
	//日期范围限制
	var start = laydate({
		elem: '#startDate',
		type : 'date',
		format: 'YYYY-MM-DD',
		min: currentSelectDayTime.startDate + ' 00:00:00', //设定最小日期为当前日期
		max: '2099-06-16 23:59:59', //最大日期
		istime: false,
		istoday: false,
		choose: function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		},
		ready : function() {
			start.hint('嘻嘻');
		}
	});
	var end = laydate({
		elem: '#endDate',
		format: 'YYYY-MM-DD',
		min: currentSelectDayTime.startDate + ' 00:00:00',
		max: '2099-06-16 23:59:59',
		istime: false,
		istoday: false,
		choose: function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	});
	$('#myModal').on('shown.bs.modal', function () {
		checkAndLoadSelectedInfo();
	})
});


function toFlag(d, t) {
	return "d" + d + "t" + t;
}






//
// 班级模块
var classModule = {
	classData : [],
	currentSelectMap : {},
	init : function(classList) {
		$.each(classList, function(index, cell) {
			cell.classId = cell.id;
			cell.currentStudentNumber = cell.currentStudentAmount;
		});
		classModule.classData = classList;
		classModule.loadClassSelectArea(classList);
	},
	loadClassSelectArea : function(data) {
		classModule.classData = data;
		classModule.loadClassData(data);
	},
	loadClassData : function(data) {
		var target = $('#showClassArea');
		var temp;
		target.html('');
		for(var i=0; i<data.length; i++) {
			temp =  '<li onclick="classModule.onCellClick(this)" cellId="'+data[i].classId+'" class="danger-element">' + data[i].className + 
					'<div class="agile-detail">' + 
					'<a href="#" class="pull-right btn btn-xs btn-white">标签</a>' +
					'<i class="fa fa-clock-o"></i> 人数' + data[i].currentStudentNumber +
					'</div>' + 
					'</li>';
			target.append(temp);
		}
	},
	onCellClick : function(t) {
		var target = $(t);
		console.log("你点击了:");
		console.log(target.attr('cellId'));
		if (target.is('.classCellSelected')) {
			target.removeClass('classCellSelected');
			delete classModule.currentSelectMap[target.attr('cellId')];
		} else {
			target.addClass('classCellSelected');
			classModule.currentSelectMap[target.attr('cellId')] = true;
		}
		var classList = [];
		for(var id in classModule.currentSelectMap) {
			classList.push(id);
		}
		subjectModule.init(classList);
	},
	getSelectedData : function() {
		var list = $('.classCellSelected');
		var classList = classModule.classData;
		var result = [];
		for(var i=0; i<list.length; i++) {
			for(var j=0; j<classList.length; j++) {
				if (list[i].getAttribute('cellId') == classList[j].classId) {
					result[result.length] = classList[j];
					break;
				}
			}
		}
		return result;
	}
};


// 教室模块
var roomModule = {
	roomData : [],
	selectedCell : undefined,
	init : function(roomList) {
		$.each(roomList, function(index, cell){
			cell.roomName = cell.classRoomName;
			cell.roomCapacity = cell.standardPeopleAmount;
			cell.roomId = cell.id;
		});
		roomModule.roomData = roomList;
		roomModule.loadRoomData(roomList);
	},
	loadRoomData : function(data) {
		console.log("空闲教室:");
		console.log(data);
		var target = $('#showRoomArea');
		var temp;
		target.html('');
		for(var i=0; i<data.length; i++) {
			temp = '<li onclick="roomModule.onCellClick(this)" cellId="'+data[i].roomId+'" class="info-element">' + data[i].roomName + 
					'<div class="agile-detail">'+
					'<a href="#" class="pull-right btn btn-xs btn-white">标记</a>'+
					'<i class="fa fa-clock-o"></i> 参考容纳'+data[i].roomCapacity+'人'+
					'</div>'+
					'</li>';
			target.append(temp);
		}
	},
	onCellClick : function(t) {
		var target = $(t);
		if (target.is('.roomCellSelected')) {
			target.removeClass('roomCellSelected');
			roomModule.selectedCell = undefined;
		} else {
			if (roomModule.selectedCell != undefined) {
				roomModule.selectedCell.removeClass('roomCellSelected');
			}
			target.addClass('roomCellSelected');
		}
		roomModule.selectedCell = target;
	},
	getSelectedData : function() {
		var list = $('.roomCellSelected');
		var roomList = roomModule.roomData;
		var result = [];
		for(var i=0; i<list.length; i++) {
			for(var j=0; j<roomList.length; j++) {
				if (list[i].getAttribute('cellId') == roomList[j].roomId) {
					result[result.length] = roomList[j];
					break;
				}
			}
		}
		return result[0];
	}
};



// 学科模块
var subjectModule = {
	subjectData : [],
	selectedCell : undefined,
	subjectStaffBuffer : {}, // 当前学科列表中，学科的部分缓存信息
	init : function(idList) {
		var classIdList = [];
		if (undefined == idList || idList.length == 0) {
			idList = classModule.classData;
			$.each(idList, function(index, cell) {
				classIdList.push(cell.id);
			});
		} else {
			classIdList = idList;
		}
		var data = getUncompletedSubjectForClass(classIdList);
		subjectModule.subjectData = data;
		subjectModule.loadSubjectData(data);
	},
	loadSubjectData : function(data) {
		if (undefined == data) {
			data = [];
		}
		var subjectMap = getDisengagedStaffForSubject(data);
		subjectModule.subjectStaffBuffer = subjectMap;
		var target = $('#showSubjectArea');
		var temp;
		target.html('');
		for(var i=0; i<data.length; i++) {
			temp = '<li onclick="subjectModule.onCellClick(this)" cellId="'+data[i].subjectId+'" class="warning-element">' + data[i].subjectName +
					'<div class="agile-detail">' + 
					'<a href="#" class="pull-right btn btn-xs btn-white">标签</a>'+
					'<i class="fa fa-clock-o"></i> 参考课时'+data[i].standardHours + 
					'<i class="fa fa-clock-o" style="margin-left:10px;"></i> 可授教师'+subjectMap[data[i].subjectId].length+
					'</div>'+
					'</li>';
			target.append(temp);
		}	
	},
	onCellClick : function(t) {
		var target = $(t);
		if (target.is('.subjectCellSelected')) {
			target.removeClass('subjectCellSelected');
			subjectModule.selectedCell = undefined;
		} else {
			if (subjectModule.selectedCell != undefined) {
				subjectModule.selectedCell.removeClass('subjectCellSelected');
			}
			target.addClass('subjectCellSelected');
		}
		subjectModule.selectedCell = target;
	},
	getSelectedData : function() {
		var list = $('.subjectCellSelected');
		var subjectList = subjectModule.subjectData;
		var result = [];
		for(var i=0; i<list.length; i++) {
			for(var j=0; j<subjectList.length; j++) {
				if (list[i].getAttribute('cellId') == subjectList[j].subjectId) {
					var temp = {
						info : subjectList[j],
						staffList : subjectModule.subjectStaffBuffer[subjectList[j].subjectId]
					}
					result[result.length] = temp;
					break;
				}
			}
		}
		return result[0];
	}
};

var editPanelModule = {
	selectedClassList : [], // 已选班级
	selectedSubject : undefined, // 已选学科
	selectedRoom : undefined, // 已选教室
	// ------------------
	seletedStaffCell : undefined,
	init : function() {
	},
	loadCurrentInfo : function() {
		var subject = editPanelModule.selectedSubject;
		var room = editPanelModule.selectedRoom;
		var classList = editPanelModule.selectedClassList;
		//console.log(subject.info.subjectName);
		$('#epSubjectName').val(subject.info.subjectName);
		$('#epRoomName').text(room.classRoomName);
		$('#epCourseTimeNumber').text(subject.info.standardHours);
		$('#epCourseCoefficient').val(subject.info.standardCoefficient);
		// 加载已选班级列表
		var classListArea = $('#epClassList');
		classListArea.html('');
		$.each(classList, function(index, cell) {
			var html = '<button type="button" class="btn btn-w-s btn-default"><i class="fa fa-tag"></i>'+cell.className+'</button>';
			classListArea.append(html);
		});
		// 加载可授教师列表
		var staffListArea = $('#epStaffListArea');
		staffListArea.html('');
		$.each(subject.staffList, function(index, cell){
			var html = '<button staffId="'+cell.id+'" type="button" onclick="editPanelModule.clickStaffCell(this)" class="btn btn-success btn-rounded btn-outline" href="#">'+cell.staffName+'</button> &nbsp;&nbsp;';
			staffListArea.append(html);
		});
	},
	readyCreate : function() {
		$('#myModal input').val('');
		editPanelModule.seletedStaffCell = undefined;
		editPanelModule.loadCurrentInfo();
	},
	clickStaffCell : function(t) {
		var target = $(t);
		if (editPanelModule.seletedStaffCell != undefined) {
			editPanelModule.seletedStaffCell.addClass('btn-outline');
		}
		if (target != editPanelModule.seletedStaffCell) {
			editPanelModule.seletedStaffCell = target;
			target.removeClass('btn-outline');
		}
	},
	getEditInfo : function(){
		var result = {
			courseName : $('#epCourseName').val(),
			subjectId : editPanelModule.selectedSubject.info.id,
			classRoomId : editPanelModule.selectedRoom.id,
			referenceHours : $('#epCourseTimeNumber').text(),
			startDateTimeInPlan : $('#startDate').val(),
			endDateTimeInPlan : $('#endDate').val(),
			classInCourseEntityList : [],
			dateTimeOfCourseEntityList : [],
			staffId : editPanelModule.seletedStaffCell,
			standardCoefficient : $('#epCourseCoefficient').val()
		};
		if (isEmpty(result.startDateTimeInPlan)) {
			alert('课程开始时间不能为空');
			return ;
		}
		if (isEmpty(result.endDateTimeInPlan)) {
			alert('课程结束时间不能为空');
			return ;
		}
		if (isEmpty(result.staffId)) {
			alert('请选择 授课教师');
			return ;
		}
		if (isEmpty(result.standardCoefficient)) {
			alert('请 填写课程系数');
			return ;
		}
		$.each(editPanelModule.selectedClassList, function(index, cell){
			var temp = {
					studentClassId : cell.id
				};
			result.classInCourseEntityList.push(temp);
		});
		$.each(currentSelectDayTime.dayTimeList, function(index, cell){
			var temp = {
					weekDay : cell.day,
					workTime : cell.time
				};
			result.dateTimeOfCourseEntityList.push(temp);
		});
		result.staffId = result.staffId.attr('staffId');
		if (isEmpty(result.courseName) || "" == result.courseName) {
			result.courseName = $('#epSubjectName').val();
		}
		return result;
	},
	postData : function() {
		var data = editPanelModule.getEditInfo();
		if (undefined == data) {
			return;
		}
		var list = [];
		list.push(data);
		$.ajax({
			url: XConfig.serverAddress + "courseInfo",
			type: 'POST',
			cache: false,
			dataType: 'json',
			async: true, //设置同步
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(list),
			success: function(data) {
				if (data.code == 0) {
					var targetData = data.data;
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
		console.log(data);
	}
}

function checkAndLoadSelectedInfo() {
	editPanelModule.selectedClassList = classModule.getSelectedData();;
	editPanelModule.selectedSubject = subjectModule.getSelectedData();
	editPanelModule.selectedRoom = roomModule.getSelectedData();
 
	if (isEmpty(editPanelModule.selectedClassList) || editPanelModule.selectedClassList.length <= 0) {
		$("#myModal").modal('hide');
		alert('请选择 班级');
		return;
	}
	if (isEmpty(editPanelModule.selectedSubject)) {
		alert('请选择 学科');
		$("#myModal").modal('hide');
		return ;
	}
	if (isEmpty(editPanelModule.selectedRoom)) {
		alert('请选择 教室');
		$("#myModal").modal('hide');
		return;
	}
	editPanelModule.readyCreate();
}


// 绘制时间节点图
function createDayTimeMap() {
	var timeNames = ['', '第一节课', '第二节课', '第三节课', '第四节课', '第五节课', '第六节课', '第七节课', '第八节课', '第九节课'];
	var target = $('#selectedDayTimeMapBody');
	target.html('');
	for(var t = 1; t<=9; t++) {
		var html = '<div>';
		for(var d = 0; d < 8; d++) {
			if (d == 0) {
				html += "<div id='d"+d+"t"+t+"' class='dayTimeCellCell '>"+timeNames[t]+"</div>";
			} else {
				html += "<div id='d"+d+"t"+t+"' class='dayTimeCellCell hideContent'><i class='fa fa-check'></i></div>";
			}
		}
		target.append(html);
	}
}

//
function clickSJFD() {
	t = $('#sjfd');
	if (t.hasClass('fa-check')) {
		t.removeClass('fa-check');
	} else {
		t.addClass('fa-check');
	}
}

function createPanelCourseMap() {
	var dayNames = ['时间', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
	var timeNames = [' ', '第一节课', '第二节课', '第三节课', '第四节课', '第五节课', '第六节课', '第七节课', '第八节课', '第九节课'];
	var title = $('#panelCourseMapTitle');
	var body = $('#panelCourseMapBody');
	for(var i=0; i<8; i++) {
		var html = '<div class="panelCourseMapTitleCell">'+dayNames[i]+'</div>';
		title.append(html);
	}
	for(var t=1; t<=9; t++) {
		var html = "<div>";
		for(var d=0; d<=7; d++) {
			if (d == 0) {
				html += "<div class='panelCourseMapBodyCell'>"+timeNames[t]+"</div>";
			} else {
				html += "<div class='panelCourseMapBodyCell'><i class='fa fa-check' style='color:#A1A5AB;'></i></div>";
			}
		}
		body.append(html);
	}
	
}










// 