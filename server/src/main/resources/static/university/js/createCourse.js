

var currentSelectDayTime;
$(function() {
	currentSelectDayTime = localStorage.getItem("currentSelectDayTime");
	currentSelectDayTime = JSON.parse(currentSelectDayTime);
	console.log("时间与任务点:");
	console.log(currentSelectDayTime);
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
		min: laydate.now(), //设定最小日期为当前日期
		max: '2099-06-16 23:59:59', //最大日期
		istime: true,
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
		min: laydate.now(),
		max: '2099-06-16 23:59:59',
		istime: true,
		istoday: false,
		choose: function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	});
	
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
		if (undefined == idList) {
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
		console.log(subject.info.subjectName);
		$('#epSubjectName').prop('placeholder', subject.info.subjectName);
		$('#epRoomName').text(room.classRoomName);
		$('#epCourseTimeNumber').text(subject.info.standardHours);
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
		checkAndLoadSelectedInfo();
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
	}
}

function checkAndLoadSelectedInfo() {
	
	editPanelModule.selectedClassList = classModule.getSelectedData();;
	editPanelModule.selectedSubject = subjectModule.getSelectedData();
	editPanelModule.selectedRoom = roomModule.getSelectedData();
	
	console.log("已选择的数据:");
	console.log(editPanelModule.selectedClassList);
	console.log(editPanelModule.selectedSubject);
	console.log(editPanelModule.selectedRoom);
	
}















// 