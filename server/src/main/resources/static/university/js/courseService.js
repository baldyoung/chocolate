

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
				delete workingCourseMap[dtFlag(d, t)];
			}
		}
	},
	getValidObject : function(key) {
		var o = workingCourseMap[key];
		if(undefined == o){
			workingCourseMap[key] = {
				staffMap : {},
				roomMap : {},
				classMap : {}
			};
		}
		return workingCourseMap[key];
	}
};
// 服务初始化
$(function(){
	requestData();
	calculateStaticData();
	
	
});

// 获取课程服务的主数据(获取当前10周内的所有课程)
function requestData() {
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
// 获取指定周的所有课程相关数据
function loadTargetData(startDate, endDate) {
	var targetDayTimeOfCourse = [];
	$.each(allDataBuffer, function(index, record) {
		var course = allCourseMap[record.courseId];
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
	});
	allClassMap = {};
	$.each(allDataBuffer.allClassList, function(index, cell){
		allClassMap[cell.id] = cell;
	});
	allRoomMap = {};
	$.each(allDataBuffer.allRoomList, function(index, cell){
		allRoomMap[cell.id] = cell;
	});
	allSpecialtyMap = {};
	$.each(allDataBuffer.allSpecialtyList, function(index, cell){
		allSpecialtyMap[cell.id] = cell;
	});
	allSubjectMap = {};
	$.each(allDataBuffer.allSubjectList, function(index, cell){
		allSubjectMap[cell.id] = cell;
	});
	allCourseMap = {};
	$.each(allDataBuffer.allCourseList, function(index, cell){
		allCourseMap[cell.id] = cell;
		cell.classList = [];
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
				t.staffMap[staffId] = course;
				// 映射 时间点 -> 教室
				if (undefined != t.roomMap[roomId]) {
					console.warn('捕获到异常数据(教室冲突):'+roomId);
				}
				t.roomMap[roomId] = course;
				// 映射 时间点 -> 班级
				var classList = course.classList;
				if (undefined != classList) {
					$.each(classList, function(index, classIdCell) {
						if (undefined != timeNode.classMap[classIdCell]) {
							console.warn('捕获到异常数据(班级冲突):'+classIdCell);
						}
						// 在指定时间节点 添加班级映射
						timeNode.classMap[classIdCell] = course;
						// 在班级图谱的班级节点下 添加时间节点的映射
						allClassMap[classIdCell].dayTimeMap[dtFlag] = course;
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


















