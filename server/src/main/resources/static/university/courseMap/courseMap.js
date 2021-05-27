$(function() {
	courseMap.init();

});
var courseIndexNames = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var courseIndexTimes = ['', '8:30 - 9:10', '9:20 - 10:00', '10:20 - 11:00', '11:10 - 11:50', '15:00 - 15:40',
	'15:50 - 16:30', '?', '?', '?'
];
var currentWeekDays = [];
var currentWeekIndex = 0;
$(function() {
	// 获取当前所在周
	currentWeekDays = getTargetWeekDays();
	$('.currentDate').text(currentWeekDays[0].formatDateString + ' 到 ' + currentWeekDays[6].formatDateString);
	console.log("周一:"+currentWeekDays[0].formatDateString);
	
	init(currentWeekDays[0].formatDateString);

});
var courseMap = {
	
	init : function() {
		var courseMapCell = $('.courseMap');
		for (var i = 1; i <= 9; i++) {
			var html = '<tr><td>';
			html += '<div style="height:100%; overflow: hidden;"><div class="text-center" style="height:50%; min-width:50px;">第' + courseIndexNames[i] + '节课</div>';
			html += '<div class="text-center hidden-xs" style="height:45%; overflow: hidden;">' + courseIndexTimes[i] + '</div>';
			html += '</div></td>';
			for(var j=1; j<=7; j++) {
				html += '<td class="dayTimeShowAreaCell" id="d'+j+'t'+i+'"></td>';
			}
			courseMapCell.append(html);
		}
	},
	setCourse : function(courseInfo) {
		console.log("要设置的课程:");
		console.log(courseInfo);
		// 标记每个时间点是否有课
		var courseDayTimeMap = {};
		// 记录每个时间点上的时间安排记录（主要用于记录时间点类型标识）
		var tempCourseDayTimeMap = {};
		// 为当前课程绘制标识图（courseDayTimeMap、tempCourseDayTimeMap）
		$.each(courseInfo.dayTimeList, function(index, cell){
			var dayTimeFlag = toFlag(cell.day, cell.time);
			courseDayTimeMap[dayTimeFlag] = true;
			tempCourseDayTimeMap[dayTimeFlag] = cell;
		});
		// 开始处理当前课程的上课时间安排（合并连续的时间点）
		var list = courseInfo.dayTimeList;
		for(var i=0; i<list.length; i++) {
			var cell = list[i];
			var dayTimeFlag = toFlag(cell.day, cell.time);
			if (!courseDayTimeMap[dayTimeFlag]) {
				// 当前节点已被遍历过
				continue;
			}
			// 初始化当前开始节点
			courseDayTimeMap[dayTimeFlag] = 1;
			var currentTimeCell = cell;
			var nextTimeCell = getTheDayNextTime(cell);
			var hasNextTime = courseDayTimeMap[toFlag(nextTimeCell.day, nextTimeCell.time)];
			while(hasNextTime) {
				currentDayTimeCell = tempCourseDayTimeMap[toFlag(currentTimeCell.day, currentTimeCell.time)];
				nextDayTimeCell = tempCourseDayTimeMap[toFlag(nextTimeCell.day, nextTimeCell.time)];
				if (currentDayTimeCell.typeFlag != nextDayTimeCell.typeFlag) {
					/* console.log("时间点不相等->");
					console.log(currentDayTimeCell);
					console.log(nextDayTimeCell); */
					break;
				}
				courseDayTimeMap[toFlag(nextTimeCell.day, nextTimeCell.time)] = false;
				courseDayTimeMap[toFlag(cell.day, cell.time)] += 1;
				currentTimeCell = nextTimeCell;
				nextTimeCell = getTheDayNextTime(nextTimeCell);
				hasNextTime = courseDayTimeMap[toFlag(nextTimeCell.day, nextTimeCell.time)];
			}
			/* console.log("一次处理完成");
			console.log(courseDayTimeMap); */
		}
		console.log("---->");
		console.log(courseDayTimeMap);
		for(var dayTimeFlag in courseDayTimeMap) {
			if (courseDayTimeMap[dayTimeFlag] != false) {
				var t = $('#'+dayTimeFlag);
				t.html('');
				console.log(tempCourseDayTimeMap[dayTimeFlag]);
				var cName = courseInfo.courseName +  typeFlagName(tempCourseDayTimeMap[dayTimeFlag].typeFlag) ;
				var temp = '<div style="max-height:100%; height:50px; overflow:visible !important; "><div style="position:relative; height:'+courseDayTimeMap[dayTimeFlag]+'00%; background:'+ getCourseColor(tempCourseDayTimeMap[dayTimeFlag].typeFlag)+'; border-radius:5px;">';
				temp += '<div style="height:100%; text-align:center; font-size:10px; ">'+cName + ' ' + courseInfo.info +'</div>';
				
				temp += '</div></div>';
				t.append(temp);
			}
		}
		
	}
	
};


function getTheDayNextTime(dayTimeCell) {
	return {
		day : dayTimeCell.day,
		time : dayTimeCell.time + 1,
	}
}

function getCourseColor(typeFlag) {
	var colors = ['#1E90FF', '#FFD700', '#FAFAD2', '#20B2AA', '#FF6347'];
	if (typeFlag >= colors.length ) {
		typeFlag = colors.length - 1;
	}
	return colors[typeFlag];
}

function typeFlagName(typeFlag) {
	var flagName = ['', '辅导', '实训', '短训', ''];
	if (typeFlag >= flagName.length) {
		typeFlag = flagName.length - 1;
	}
	if (flagName[typeFlag] == '') {
		return '';
	}
	return '(' + flagName[typeFlag] + ')';
}

function changeWeek(t) {
	$('.dayTimeShowAreaCell').html('');
	if (t == 1 && currentWeekIndex < 9) {
		currentWeekIndex += 1;
		currentWeekDays = getTargetWeekDays(currentWeekIndex);
		$('.currentDate').text(currentWeekDays[0].formatDateString + ' 到 ' + currentWeekDays[6].formatDateString);
		init(currentWeekDays[0].formatDateString);
	} else if (t == -1 && currentWeekIndex >= 0) {
		currentWeekIndex -= 1;
		currentWeekDays = getTargetWeekDays(currentWeekIndex);
		$('.currentDate').text(currentWeekDays[0].formatDateString + ' 到 ' + currentWeekDays[6].formatDateString);
		init(currentWeekDays[0].formatDateString);
	}
	console.log(currentWeekIndex);
}

function init(startDate) {
	loadTargetData(startDate);
	setTimeout(function(){
		console.log('当前周的数据');
		console.log(allRoomMap); 
		console.log(allClassMap);
		console.log(allStaffMap);
		var type = getQueryVariable('type');
		var id = getQueryVariable('id');
		var sourceNameText;
		var sourceInfo
		//type = 0;// 0:room、1:class、2:teacher
		//id = '1';
		if (type == 0) {
			sourceNameText = allRoomMap[id].classRoomName;
			sourceInfo = allRoomMap[id];
		} else if (type == 1) {
			sourceNameText = allClassMap[id].className;
			sourceInfo = allClassMap[id];
		} else if (type == 2) {
			sourceNameText = allStaffMap[id].staffName;
			sourceInfo = allStaffMap[id];
		}
		console.log(sourceNameText);
		$('.sourceName').text(sourceNameText);
		// 获取指定资源下的所有课程数据
		if (sourceInfo.dayTimeMap == undefined) {
			// 没课
			return;
		}
		var currentSourceCourseMap = {};
		var cm;
		for(var dayTimeFlag in sourceInfo.dayTimeMap) {
			cm = sourceInfo.dayTimeMap[dayTimeFlag];
			if (cm == undefined) {
				continue;
			}
			currentSourceCourseMap[cm.id] = cm;
		}
		$('#courseListArea').html('');
		// 当前资源下的课程
		var courseInfoList = [];
		for(var courseId in currentSourceCourseMap) {
			var tempCourse = currentSourceCourseMap[courseId];
			
			console.log(tempCourse);
			var tc = {
				courseName : tempCourse.courseName,
				dayTimeList : [],
				info : '',
			};
			// 获取上课时间节点的安排
			for(var fg in tempCourse.dayTimeMap) {
				var tempDayTime = flagToObject(fg);
				tempDayTime.day = parseInt(tempDayTime.day);
				tempDayTime.time = parseInt(tempDayTime.time);
				tempDayTime.typeFlag = tempCourse.dayTimeTypeFlagMap[fg];
				tc.dayTimeList.push(tempDayTime);
			}
			courseInfoList.push(tc);
			if (type != 1) {
				// 获取上课班级的安排
				$.each(tempCourse.classList, function(index, cell){
					var t = (index == 0 ? '' : '/');
					t += cell.className;
					tc.info += t;
				});
			}
			
			// 获取上课教室的安排
			var roomCell = allRoomMap[tempCourse.classRoomId];
			if (type != 0) {
				tc.info += '#' + roomCell.classRoomName;
			}
			// 获取上课老师的安排
			var teacherCell = allStaffMap[tempCourse.staffId];
			if (type != 2) {
				tc.info += '@' + teacherCell.staffName;
			}
			var sd = toDateFormat(tempCourse.startDateTimeInPlan);
			var ed = toDateFormat(tempCourse.endDateTimeInPlan);
			$('#courseListArea').append(tempCourse.courseName+' --- ' + teacherCell.staffName + '(' +sd + ' - ' + ed +')<br>');
		}
		$.each(courseInfoList, function(i, cell) {
			courseMap.setCourse(cell);
		});
	}, 1000);
}


