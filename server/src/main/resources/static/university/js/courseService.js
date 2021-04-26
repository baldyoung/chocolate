

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
var workingCourseMap = {};









// 获取课程服务的主数据
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

// 初始化处理当了所有的教师、班级、教室、学科和专业计划
function calculateStaticData(allStaffList, allClassList, allRoomList, allSpecialtyList, allSubjectList, allCourseList, classOfCourse) {
	allStaffMap = {};
	$.each(allStaffList, function(index, cell){
		allStaffMap[cell.id] = cell;
	});
	allClassMap = {};
	$.each(allClassList, function(index, cell){
		allClassMap[cell.id] = cell;
	});
	allRoomMap = {};
	$.each(allRoomList, function(index, cell){
		allRoomMap[cell.id] = cell;
	});
	allSpecialtyMap = {};
	$.each(allSpecialtyList, function(index, cell){
		allSpecialtyMap[cell.id] = cell;
	});
	allSubjectMap = {};
	$.each(allSubjectList, function(index, cell){
		allSubjectMap[cell.id] = cell;
	});
	allCourseMap = {};
	$.each(allCourseList, function(index, cell){
		allCourseMap[cell.id] = cell;
		cell.classList = [];
	});
	$.each(classOfCourse, function(index, cell){
		var t = allCourseMap[cell.courseId];
		var k = allClassMap[cell.studentClassId];
		if (undefined == k || undefined == t) {
			console.warn("脏数据(课程"+t+", 班级:"+k+")");
		} else {
			t.classList.push(k);
		}
	});
}

// 处理课程数据，将其处理成特定的映射表
function drawCourseMap(courseData) {
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


















