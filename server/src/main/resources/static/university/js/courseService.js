

// 所有课程数据的缓存
var allDataBuffer;
// 
var allStaffMap = {};
// 
var allClassMap = {};
//
var allRoomMap = {};
//
var allSubjectMap = {};
//
var allSpecialtyMap = {};
//
var allCourseMap = {};
//
var workingCourseMap = {
	reset : function() {
		for(var d=1; d<=7; d++) {
			for(var t=1; t<=5; t++) {
				var flag = toFlag(d, t);
				delete workingCourseMap[flag];
				workingCourseMap.getValidObject(flag);
			}
		}
	},
	getValidObject : function(key) {
		var o = workingCourseMap[key];
		if(undefined == o){
			workingCourseMap[key] = {
				staffMap : {},
				roomMap : {},
				classMap : {},
				courseMap : {}
			};
		}
		return workingCourseMap[key];
	}
};
// 空闲数据资源映射表
var disengagedDataMap = {
	reset : function() {
		for(var d=1; d<=7; d++) {
			for(var t=1; t<=5; t++) {
				var flag = toFlag(d, t);
				delete disengagedDataMap[flag];
				disengagedDataMap.getValidObject(flag);
			}
		}
	},
	getValidObject : function(key) {
		var o = disengagedDataMap[key];
		if(undefined == o){
			disengagedDataMap[key] = {
				staffList : [],
				roomList : [],
				classList : []
			};
		}
		return disengagedDataMap[key];
	}
}
// 服务初始化
$(function(){
	var t = getTargetWeekDays();
	requestData(t[0].formatDateString);
	calculateStaticData();
});

function toFlag(day, time) {
	return "d"+day+"t"+time;
}

function flagToDayTime(flag){
	var t = flag.replace('d', '');
	t = t.split('t');
	return {
		day : t[0],
		time : t[1]
	};
}

// 获取课程服务的主数据(获取当前10周内的所有课程)
function requestData(startDate) {
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
				allDataBuffer = result;
				if (allDataBuffer.currentCourseDayTimeInfo == undefined) {
					allDataBuffer.currentCourseDayTimeInfo = [];
				}
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
// 当前课程图所在周的时间数据
var currentWorkingCourseMapStartWeek;
// 获取指定周的所有课程相关数据(startDate是2020-01-01)
function loadTargetData(startDate) {
	console.log('loadTargetDate中的startDate值:'+startDate);
	startDate = new Date(startDate).valueOf();
	console.log('loadTargetData中startDate转换后的值:'+startDate);
	currentWorkingCourseMapStartWeek = getTargetWeekDaysForDate(startDate);
	console.log("当前选定周的日期情况:");
	console.log(currentWorkingCourseMapStartWeek);
	
	var targetDayTimeOfCourse = [];
	$.each(allDataBuffer.currentCourseDayTimeInfo, function(index, record) {
		var course = allCourseMap[record.courseId];
		if (course == undefined) {
			return;
		}
		if (course.startDate <= startDate && startDate <= course.endDate) {
			targetDayTimeOfCourse.push(record);
		}
	});
	drawCourseMap(targetDayTimeOfCourse);
}

// 初始化处理当了所有的教师、班级、教室、学科和专业计划
function calculateStaticData() {
	allStaffMap = {};
	$.each(allDataBuffer.allStaffList, function(index, cell){
		allStaffMap[cell.id] = cell;
		cell.dayTimeMap = {};
		cell.subjectList = [];
	}); 
	allRoomMap = {};
	$.each(allDataBuffer.allRoomList, function(index, cell){
		allRoomMap[cell.id] = cell;
		cell.dayTimeMap = {};
	});
	allSpecialtyMap = {};
	$.each(allDataBuffer.allSpecialtyList, function(index, cell){
		allSpecialtyMap[cell.id] = cell;
		cell.subjectList = [];
	});
	allSubjectMap = {};
	$.each(allDataBuffer.allSubjectList, function(index, cell){
		allSubjectMap[cell.id] = cell;
		cell.subjectId = cell.id;
		cell.performableStaff = [];
	});
	$.each(allDataBuffer.allStaffTeachSubjectList, function(index, cell){
		var staff = allStaffMap[cell.staffId];
		if (staff == undefined) {
			console.warn("脏数据(无法匹配的可授学科记录(教师:"+cell.staffId);
			return;
		}
		var subject = allSubjectMap[cell.subjectId];
		if (undefined == subject) {
			console.warn('脏数据(无法匹配的可授学科记录(学科:'+cell.subjectId);
			return;
		}
		staff.subjectList.push(subject);
		subject.performableStaff.push(staff);
	});
	$.each(allDataBuffer.allSpecialtyPlanList, function(index, cell){
		if (undefined == allSpecialtyMap[cell.specialtyPlanId]) {
			console.warn("检测到脏数据(无法匹配到的专业计划记录)");
		} else {
			allSpecialtyMap[cell.specialtyPlanId].subjectList.push(allSubjectMap[cell.subjectId]);
		}
	});
	allCourseMap = {};
	$.each(allDataBuffer.allCourseList, function(index, cell){
		allCourseMap[cell.id] = cell;
		cell.classList = [];
		cell.startDateTimeInPlan = new Date(cell.startDateTimeInPlan);
		cell.endDateTimeInPlan = new Date(cell.endDateTimeInPlan);
		cell.startDateTimeInFact = new Date(cell.startDateTimeInFact);
		cell.endDateTimeInFact = new Date(cell.endDateTimeInFact);
		cell.startDate = cell.startDateTimeInFact.valueOf();
		cell.endDate = cell.endDateTimeInFact.valueOf();
		cell.dayTimeMap = {};
	});
	allClassMap = {};
	$.each(allDataBuffer.allClassList, function(index, cell){
		allClassMap[cell.id] = cell;
		cell.specialty = allSpecialtyMap[cell.specialtyId];
		cell.dayTimeMap = {};
	});
	
	$.each(allDataBuffer.classOfCourse, function(index, cell){
		var t = allCourseMap[cell.courseId];
		var k = allClassMap[cell.studentClassId];
		if (undefined == k || undefined == t) {
			console.warn("脏数据(课程"+t+", 班级:"+k+")");
		} else {
			t.classList.push(k);
		}
	});
}

// 处理 指定周的 课程数据，将其处理成特定的映射表
function drawCourseMap(dayTimeOfCourse) {
	// 重置 当前周的时间节点图
	workingCourseMap.reset();
	$.each(dayTimeOfCourse, function(index, dayTimeCell){
		var course = allCourseMap[dayTimeCell.courseId];
		var dtFlag = toFlag(dayTimeCell.weekDay, dayTimeCell.workTime);
		// 当前dtFlag所在的日期
		var flagDay = currentWorkingCourseMapStartWeek[parseInt(dayTimeCell.weekDay) - 1];
		if (course.startDate > flagDay.valueOf() || course.endDate < flagDay.valueOf()) {
			// 当前dtFlag所在的日期不在课程时间范围内
			return ;
		}
		if (course != undefined) {
			// 获取时间图谱下的指定时间节点
			var timeNode = workingCourseMap.getValidObject(dtFlag);
			// 获取空闲图谱下的指定时间节点
			//var x = disengagedInfoMap.getValidObject(dtFlag);
			// 关联课程图谱与时间图谱相关的时间节点
			course.dayTimeMap[dtFlag] = timeNode;
			if (undefined != timeNode.courseMap[dayTimeCell.courseId]) {
				console.warn('捕获到异常数据(课程重复):'+dayTimeCell);
			} else {
				var courseId = course.courseId;
				var staffId = course.staffId;
				var roomId = course.classRoomId;
				// 映射 时间点 -> 课程
				timeNode.courseMap[courseId] = course;
				// 映射 时间点 -> 教师
				if (undefined != timeNode.staffMap[''+staffId]) {
					console.warn('捕获到异常数据(教师冲突):'+staffId);
				}
				timeNode.staffMap[staffId] = course;
				// 映射 时间点 -> 教室
				if (undefined != timeNode.roomMap[roomId]) {
					console.warn('捕获到异常数据(教室冲突):'+roomId);
				}
				timeNode.roomMap[roomId] = course;
				// 映射 时间点 -> 班级
				var classList = course.classList;
				if (undefined != classList) {
					$.each(classList, function(index, classIdCell) {
						if (undefined != timeNode.classMap[classIdCell.id]) {
							console.warn('捕获到异常数据(班级冲突):'+classIdCell.id);
						}
						// 在指定时间节点 添加班级映射
						timeNode.classMap[classIdCell.id] = course;
						// 在班级图谱的班级节点下 添加时间节点的映射 
						//console.log("kkk:");
						//console.log(allClassMap[classIdCell.id]);
						allClassMap[classIdCell.id].dayTimeMap[dtFlag] = course;
					});
				}
				// 更新教师图谱下的相应时间节点
				allStaffMap[staffId].dayTimeMap[dtFlag] = course;
				// 更新教室图谱下的相应时间节点
				allRoomMap[roomId].dayTimeMap[dtFlag] = course;
			}
		} else {
			console.warn('捕获到异常[课程-时间安排]数据:'+dayTimeCell);
		}
	});
}

// 统计出 指定周的 空闲课程资源，将其处理成特定的映射表
function drawDisengagedDataMap(workingDataMap) {
	disengagedDataMap.reset();
	for(var d=1; d<=7; d++) {
		for(var t=1; t<=5; t++) {
			var dtFlag = toFlag(d, t);
			var timeNode = disengagedDataMap.getValidObject(dtFlag);
			
			// 统计空闲 老师
			var workingStaffMap = workingDataMap[dtFlag].staffMap;
			for(var staffId in allStaffMap) {
				if (undefined == workingStaffMap[staffId]) {
					timeNode.staffList.push(allStaffMap[staffId]);
				}
			}
			// 统计空闲 班级
			var workingClassMap = workingDataMap[dtFlag].classMap;
			for(var classId in allClassMap) {
				if (undefined == workingClassMap[classId]) {
					timeNode.classList.push(allClassMap[classId]);
				}
			}
			// 统计空闲教室
			var workingRoomMap = workingDataMap[dtFlag].roomMap;
			for(var roomId in allRoomMap) {
				if (undefined == workingRoomMap[roomId]) {
					timeNode.roomList.push(allRoomMap[roomId]);
				}
			}
		}
	}
	return disengagedDataMap;
}

// 获取指定日期后，指定时间点下都空闲的资源（需要业务逻辑上实现：对当前预创建的新课程与后面计划中的课程进行冲突检查！！！）
var targetDisengagedDataMapBuffer = {};
function getTargetDisengagedDataMap(startDate, dayTimeList) {
	loadTargetData(startDate);
	console.log("当前workingCourseMap:");
	console.log(workingCourseMap);
	drawDisengagedDataMap(workingCourseMap);
	var staffMap = {};
	var classMap = {};
	var roomMap = {};
	for(var id in allStaffMap) {
		staffMap[id] = allStaffMap[id];
	}
	for(var id in allClassMap) {
		classMap[id] = allClassMap[id];
	}
	for(var id in allRoomMap) {
		roomMap[id] = allRoomMap[id];
	}
	$.each(dayTimeList, function(index, cell){
		var dtFlag = toFlag(cell.day, cell.time);
		var timeNode = workingCourseMap[dtFlag];
		if (undefined == timeNode) {
			console.warn("异常node:"+dtFlag);
			return;
		}
		for(var staffId in timeNode.staffMap) {
			delete staffMap[staffId];
		}
		for(var classId in timeNode.classMap) {
			delete classMap[classId];
		}
		for(var roomId in timeNode.roomMap) {
			delete roomMap[roomId];
		}
	});
	var result = {
		staffList:[],
		classList:[],
		roomList:[],
	};
	for(var id in staffMap) {
		result.staffList.push(staffMap[id]);
	}
	for(var id in classMap) {
		result.classList.push(classMap[id]);
	}
	for(var id in roomMap) {
		result.roomList.push(roomMap[id]);
	}
	// 缓存一下数据
	targetDisengagedDataMapBuffer = result;
	getDisengagedStaffForSubject();
	return result;
}

// ----------------------------------------------------------------
// 获取指定班级 已经完成的课程
function getCompletedSubjectForClass(classIdList) {
	var result = {};
	$.ajax({
		url: XConfig.serverAddress + "courseInfo/completedCourseInfo",
		type: 'POST',
		cache: false,
		dataType: 'json',
		async: false, //设置同步
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(classIdList),
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				var tempCourseMap = {};
				if (undefined == targetData.courseList) {
					targetData.courseList = [];
				}
				$.each(targetData.courseList, function(index, cell) {
					tempCourseMap[cell.id] = cell;
				});
				var tempClassMap = {};
				if (undefined == targetData.classInCourseList) {
					targetData.classInCourseList = [];
				}
				$.each(targetData.classInCourseList, function(index, cell) {
					var temp = tempClassMap[cell.studentClassId];
					var course = tempCourseMap[cell.courseId];
					if (undefined == course) {
						console.warn("脏数据:"+cell.courseId);
						return;
					}
					if (undefined == temp) {
						temp = {};
						tempClassMap[cell.studentClassId] = temp;
					} 
					temp[course.subjectId] = course;
				});
				result = tempClassMap;
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
var completedSubjectMap = {};
// 获取指定班级 未完成的课程
function getUncompletedSubjectForClass(classIdList) {
	if (undefined == classIdList || classIdList.length == 0) {
		return;
	}
	console.log("目标班级Id:");
	console.log(classIdList);
	completedSubjectMap = getCompletedSubjectForClass(classIdList);
	console.log("已完成的学科");
	console.log(completedSubjectMap);
	var result = [];
	var intersection = {};
	// 获取给定班级都要上的课（取交集）
	$.each(classIdList, function(index, classId){
		console.log("目标班级"+classId);
		console.log(allClassMap[classId]);
		if (undefined == allClassMap[classId].specialty) {
			console.warn("未指定专业的班级:");
			console.warn(allClassMap[classId]);
			return;
		}
		var subjectList = allClassMap[classId].specialty.subjectList;
		$.each(subjectList, function(index, subject) {
			if(intersection[subject.id] == undefined) {
				intersection[subject.id] = 1;
			} else {
				intersection[subject.id] += 1;
			}
		});
	});
	console.log("初步数据交集:");
	console.log(intersection);
	for(var subjectId in intersection) {
		if (intersection[subjectId] < classIdList.length) {
			delete intersection[subjectId];
		}
	}
	// 过滤掉交集中已经完成的学科
	var currentClassCompletedSubjectMap = completedSubjectMap;
	for(var classId in currentClassCompletedSubjectMap) {
		var completedSubjectInClass = currentClassCompletedSubjectMap[classId];
		for(var subjectId in completedSubjectInClass) {
			delete intersection[subjectId];
		}
	}
	console.log("过滤后数据:");
	console.log(intersection);
	// 将交集对象转换为集合
	for(var subjectId in intersection) {
		result.push(allSubjectMap[subjectId]);
	}
	console.log("最终结果:");
	console.log(result);
	return result;
}

// 获取指定 学科在当前空闲资源下的所有可授教师列表
function getDisengagedStaffForSubject(subjectList) { 
	var disengagedStaffList = targetDisengagedDataMapBuffer.staffList;
	var resultMap = {};
	if (undefined == subjectList || 0 == subjectList.length) {
		return resultMap;
	}
	console.log("所有学科:");
	console.log(allSubjectMap);
	$.each(subjectList, function(index, cell){
		console.log("test:");
		console.log(cell);
		
		var subject = allSubjectMap[cell.subjectId];
		console.log(subject);
		var performableStaffList = subject.performableStaff;
		var list = [];
		for(var i=0; i<disengagedStaffList.length; i++) {
			for(var j=0; j<performableStaffList.length; j++) {
				if (disengagedStaffList[i].id == performableStaffList[j].id) {
					list.push(disengagedStaffList[i]);
					break;
				}
			}
		}
		resultMap[cell.subjectId] = list;
	});
	return resultMap;
}












