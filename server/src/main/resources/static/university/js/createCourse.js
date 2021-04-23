

var currentSelectDayTime;
var disengagedInfoBuffer;
$(function() {
	currentSelectDayTime = localStorage.getItem("currentSelectDayTime");
	currentSelectDayTime = JSON.parse(currentSelectDayTime);
	console.log("ss");
	console.log(currentSelectDayTime);
	disengagedInfoBuffer = getDisengagedInfo(currentSelectDayTime.startDate); 
	//日期范围限制
	var start = {
		elem: '#startDate',
		format: 'YYYY-MM-DD',
		min: laydate.now(), //设定最小日期为当前日期
		max: '2099-06-16 23:59:59', //最大日期
		istime: true,
		istoday: false,
		choose: function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		}
	};
	var end = {
		elem: '#endDate',
		format: 'YYYY-MM-DD',
		min: laydate.now(),
		max: '2099-06-16 23:59:59',
		istime: true,
		istoday: false,
		choose: function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	laydate(start);
	laydate(end);
	
	// ----------------
	classModule.init();
	subjectModule.init();
	roomModule.init();
});
function getDisengagedInfo(startDate) {
	var result;
	$.ajax({
		url: XConfig.serverAddress + "courseInfo/disengagedInfo/startDate=" + startDate,
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
				result = targetData;
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
	return result;
}
/**
 * 处理当前的课程信息
 */
var courseMapData = {};
function checkCurrentCourseInfo(courseList, dayTimeOfCourse) {
	$.each(courseList, function(index, cell) {
		cell.dayTimeMap = {};
		courseMapData[''+cell.id] = cell;
	});
	$.each(dayTimeOfCourse, function(index, cell){
		var target = course[''+cell.courseId];
		if (target != undefined) {
			target.dayTimeMap['d'+cell.weekDay+'t'+cell.workTime] = true;
		} else {
			console.warn('捕获到异常[课程-时间安排]数据:'+cell);
		}
	});
}






// 班级模块
var classModule = {
	classData : [],
	init : function() {
		classModule.requestAndLoadClassData();
	},
	requestAndLoadClassData : function() {
		var data = [{
				classId : '10011',
				className : '软开APP2001',
				currentStudentNumber : 37,
			}, {
				classId : '10012',
				className : '电商1902',
				currentStudentNumber : 41,
			},  {
				classId : '10013',
				className : '天猫2101',
				currentStudentNumber : 31,
			},  {
				classId : '10014',
				className : '网工1902',
				currentStudentNumber : 10,
			},  {
				classId : '10015',
				className : '环艺2101',
				currentStudentNumber : 39,
			}];
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
		if (target.is('.classCellSelected')) {
			target.removeClass('classCellSelected');
		} else {
			target.addClass('classCellSelected');
		}
	},
	getSelectedData : function() {
		var list = $('classCellSelected');
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

// 学科模块
var subjectModule = {
	subjectData : [],
	selectedCell : undefined,
	init : function() {
		subjectModule.requestAndLoadSubjectData();
	},
	requestAndLoadSubjectData : function() {
		[{
			classId : '10010',
			teachingInfo : [{
				teachingProgramName : '软件开发第一期教学计划',
				subjectList : [{
					subjectName : 'JavaScript',
					subjectId : '20011',
					classHour : 120,
					enableTeacher : [{
						staffId : '100101',
						staffName : '张老师'
					},{
						staffId : '100102',
						staffName : '王老师'
					}]
				}]
			}]
		}];	
					
		var data = [{
					subjectName : 'JavaScript',
					teachingProgramName : '软件开发第二期教学计划',
					classHour : 120,
					enableTeacherNumber : 3,
				},{
					subjectName : 'HTML5+CSS3',
					teachingProgramName : '软件开发第二期教学计划',
					classHour : 100,
					enableTeacherNumber : 5,
				},{
					subjectName : 'C语言',
					teachingProgramName : '软件开发第一期教学计划',
					classHour : 100,
					enableTeacherNumber : 2,
				}];
		subjectModule.subjectData = data;
		subjectModule.loadSubjectData(data);
	},
	loadSubjectData : function(data) {
		var target = $('#showSubjectArea');
		var temp;
		target.html('');
		for(var i=0; i<data.length; i++) {
			temp = '<li onclick="subjectModule.onCellClick(this)" cellId="'+data[i].subjectId+'" class="warning-element">' + data[i].subjectName + ' (' + data[i].teachingProgramName + ')' +
					'<div class="agile-detail">' + 
					'<a href="#" class="pull-right btn btn-xs btn-white">标签</a>'+
					'<i class="fa fa-clock-o"></i> 参考课时'+data[i].classHour + 
					'<i class="fa fa-clock-o" style="margin-left:10px;"></i> 可授教师'+data[i].enableTeacherNumber+
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
		var list = $('subjectCellSelected');
		var subjectList = subjectModule.subjectData;
		var result = [];
		for(var i=0; i<list.length; i++) {
			for(var j=0; j<subjectList.length; j++) {
				if (list[i].getAttribute('cellId') == subjectList[j].subjectId) {
					result[result.length] = subjectList[j];
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
	init : function() {
		roomModule.requestAndLoadRoomModuleData();
	},
	requestAndLoadRoomModuleData : function() {
		var data = [{
				roomName : '教学楼402',
				roomCapacity : 50,
			},{
				roomName : '教学楼306',
				roomCapacity : 50,
			},{
				roomName : '教学楼502',
				roomCapacity : 60,
			},{
				roomName : '教学楼504',
				roomCapacity : 60,
			},{
				roomName : '教学楼506',
				roomCapacity : 60,
			},{
				roomName : '教学楼506',
				roomCapacity : 60,
			},{
				roomName : '教学楼506',
				roomCapacity : 60,
			},{
				roomName : '教学楼506',
				roomCapacity : 60,
			},{
				roomName : '教学楼506',
				roomCapacity : 60,
			},{
				roomName : '教学楼506',
				roomCapacity : 60,
			},{
				roomName : '教学楼506',
				roomCapacity : 60,
			}];
		roomModule.roomData = data;
		roomModule.loadRoomData(data);
	},
	loadRoomData : function(data) {
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
		var list = $('roomCellSelected');
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
		return result;
	}
};

// 每次更新三种元素的选择情况后，对所有可选情况进行信息同步变更
function updateElementInfo() {
	
}















// 