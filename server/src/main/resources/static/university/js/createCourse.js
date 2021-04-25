

var currentSelectDayTime;
var disengagedInfoBuffer; // 要改名字！！！
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
function toFlag(d, t) {
	return "d" + d + "t" + t;
}
var allStaffMap = {};
var allClassMap = {};
var allRoomMap = {};
// 当前所有的课程图
var allCourseMap = {};
// 未安排的课程资源
var disengagedInfoMap = {
	getValidObject : function(key) {
		var o = disengagedInfoMap[''+key];
		if(undefined == o){
			disengagedInfoMap[''+key] = {
				staffMap : {},
				roomMap : {},
				classMap : {}
			};
		}
		return disengagedInfoMap[''+key];
	}
};
// 已安排的课程资源
var workingInfoMap = {
	getValidObject : function(key) {
		var o = workingInfoMap[''+key];
		if(undefined == o){
			workingInfoMap[''+key] = {
				courseMap : {},
				staffMap : {},
				roomMap : {},
				classMap : {}
			};
		}
		return workingInfoMap[''+key];
	}
};
function checkSystemInfo(staffList, classList, roomList) {
	$.each(staffList, function(index, cell){
		cell.dayTimeMap = {};
		allStaffMap[''+cell.id] = cell;
	});
	$.each(classList, function(index, cell){
		cell.dayTimeMap = {};
		allClassMap[''+cell.id] = cell;
	});
	$.each(roomList, function(index, cell){
		cell.dayTimeMap = {};
		allRoomMap[''+cell.id] = cell;
	});
}
/**
 * 处理 课程数据
 * @param {Object} courseList
 * @param {Object} dayTimeOfCourse
 * @param {Object} classOfCourse
 */
function checkCurrentCourseInfo(courseList, dayTimeOfCourse, classOfCourse) {
	// --------------------------------------------------------------------
	// 绘制课程映射图
	$.each(courseList, function(index, cell) {
		cell.dayTimeMap = {};
		allCourseMap[''+cell.id] = cell;
	});
	// 将各个课程下的班级信息关联到相应的课程对象中
	$.each(classOfCourse, function(index, cell){
		var courseCell = allCourseMap[''+cell.courseId];
		var t = courseCell.classList;
		if (undefined == t) {
			courseCell.classList = [];
		}
		courseCell.classList.push(cell.studentClassId);
	});
	// 进行当前状态下的 课程资源映射图（课程、教师、班级、教室、时间点）
	$.each(dayTimeOfCourse, function(index, cell){
		var target = allCourseMap[''+cell.courseId];
		var dtFlag = toFlag(celll.weekDay, cell.workTime);
		if (target != undefined) {
			var t = workingInfoMap.getValidObject(dtFlag);
			var x = disengagedInfoMap.getValidObject(dtFlag);
			target.dayTimeMap[dtFlag] = t;
			if (undefined != t.courseMap[''+cell.courseId]) {
				console.warn('捕获到异常数据(课程重复):'+cell);
			} else {
				var courseCell = allCourseMap[''+cell.courseId];
				var courseId = courseCell.courseId;
				var staffId = courseCell.staffId;
				var roomId = courseCell.classRoomId;
				// 映射 时间点 -> 课程
				t.courseMap[''+courseId] = courseCell;
				if (undefined != t.staffMap[''+staffId]) {
					console.warn('捕获到异常数据(教师冲突):'+staffId);
				}
				// 映射 时间点 -> 教师
				t.staffMap[''+staffId] = courseCell;
				if (undefined != t.roomMap[''+roomId]) {
					console.warn('捕获到异常数据(教室冲突):'+roomId);
				}
				// 映射 时间点 -> 教室
				t.roomMap[''+roomId] = courseCell;
				// 映射 时间点 -> 班级
				var classList = courseCell.classList;
				if (undefined != classList) {
					$.each(classList, function(index, cell) {
						if (undefined != t.classMap[''+cell]) {
							console.warn('捕获到异常数据(班级冲突):'+cell);
						}
						t.classMap[''+cell] = courseCell;
						allClassMap[''+cell].dayTimeMap[dtFlag] = courseCell;
					});
				}
				// --------------
				allStaffMap[''+staffId].dayTimeMap[dtFlag] = courseCell;
				allRoomMap[''+roomId].dayTimeMap[dtFlag] = courseCell;
			}
		} else {
			console.warn('捕获到异常[课程-时间安排]数据:'+cell);
		}
	});
}
// 统计出空闲数据
function filterDisengagedInfo(startDate, endDate) {
	var data = {};
	for(var d=1; d<=7; d++) {
		for(var t=1; t<=5; t++) {
			data[toFlag(d, t)] = {
				staffList : [],
				classList : [],
				roomList : []
			};
			var temp = workingInfoMap[toFlag(d, t)];
			// 筛选出 空闲的教师
			for(var i in allStaffMap) {
				var ac = true;
				for(var k in temp.staffMap) {
					if (i == k) {
						var course = temp.staffMap[k];
						ac = (course.startDateTimeInFact <= startDate && course.endDateTimeInFact >= startDate) ? false : true;
						break;
					}
				}
				if (ac) {
					data[toFlag(d, t)].staffList.push(allStaffMap[i]);
				}
			}
			// 筛选出 空闲的班级
			for(var i in allClassMap) {
				var ac = true;
				for(var k in temp.classMap) {
					if (i == k) {
						var course = temp.classMap[k];
						ac = (course.startDateTimeInFact <= startDate && course.endDateTimeInFact >= startDate) ? false : true;
						break;
					}
				}
				if (ac) {
					data[toFlag(d, t)].classList.push(allClassMap[i]);
				}
			}
			// 筛选出 空闲的教室
			for(var i in allRoomMap) {
				var ac = true;
				for(var k in temp.roomMap) {
					if (i == k) {
						var course = temp.roomMap[k];
						ac = (course.startDateTimeInFact <= startDate && course.endDateTimeInFact >= startDate) ? false : true;
						break;
					}
				}
				if (ac) {
					data[toFlag(d, t)].roomList.push(allRoomMap[i]);
				}
			}
		}
	}
	return data;
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