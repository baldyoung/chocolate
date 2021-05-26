$(function() {
	courseMap.init();

});
var courseIndexNames = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var courseIndexTimes = ['', '8:30 - 9:10', '9:20 - 10:00', '10:20 - 11:00', '11:10 - 11:50', '15:00 - 15:40',
	'15:50 - 16:30', '?', '?', '?'
];
var currentWeekDays = [];
$(function() {
	currentWeekDays = getTargetWeekDays();
	console.log("周一:"+currentWeekDays[0].formatDateString);
	loadTargetData(currentWeekDays[0].formatDateString);
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
		// 当前资源下的课程
		var courseInfoList = [];
		for(var courseId in currentSourceCourseMap) {
			var tempCourse = currentSourceCourseMap[courseId];
			console.log(tempCourse);
			var tc = {
				courseName : tempCourse.courseName,
				dayTimeList : [],
			};
			for(var fg in tempCourse.dayTimeMap) {
				var tempDayTime = flagToObject(fg);
				tempDayTime.day = parseInt(tempDayTime.day);
				tempDayTime.time = parseInt(tempDayTime.time);
				tempDayTime.typeFlag = tempCourse.dayTimeTypeFlagMap[fg];
				tc.dayTimeList.push(tempDayTime);
			}
			courseInfoList.push(tc);
		}
		$.each(courseInfoList, function(i, cell) {
			courseMap.setCourse(cell);
		});
	}, 1000);
	
/* 	
	console.log("start");
	var courseInfoList = [{
		dayTimeList : [{day:1, time:1}, {day:1, time:2}, {day:1, time:5}, {day:1, time:6}],
		className : 'APP2002',
		courseName : 'Java开发',
		teacherName : '刘老师',
		roomName : '教学楼303',
		startDate : '1621590710534',
		endDate : '1621590910534'
	},{
		dayTimeList : [{day:2, time:1}, {day:2, time:2}],
		className : 'APP2002',
		courseName : 'JavaScript开发',
		teacherName : '刘老师',
		roomName : '教学楼303',
		startDate : '1621590710534',
		endDate : '1621590910534'
	},{
		dayTimeList : [{day:3, time:1}, {day:3, time:2}],
		className : 'APP2002',
		courseName : '数据库开发',
		teacherName : '刘老师',
		roomName : '教学楼303',
		startDate : '1621590710534',
		endDate : '1621590910534'
	}]; */
	
	

});
var courseMap = {
	
	init : function() {
		var courseMapCell = $('.courseMap');
		for (var i = 1; i <= 9; i++) {
			var html = '<tr><td>';
			html += '<div style="height:100%; overflow: hidden;"><div class="text-center" style="height:50%;">第' + courseIndexNames[i] + '节课</div>';
			html += '<div class="text-center hidden-xs" style="height:45%; overflow: hidden;">' + courseIndexTimes[i] + '</div>';
			html += '</div></td>';
			for(var j=1; j<=7; j++) {
				html += '<td id="d'+j+'t'+i+'"></td>';
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
				var temp = '<div style="max-height:100%; height:50px; overflow:visible !important; "><div style="position:relative; height:'+courseDayTimeMap[dayTimeFlag]+'00%; background:green; border-radius:5px;">';
				temp += '<div style="height:33%; text-align:center;">'+courseInfo.courseName+'</div>';
				temp += '<div style="height:33%; text-align:center;">'+courseInfo.teacherName+'</div>';
				temp += '<div style="height:33%; text-align:center;">'+courseInfo.roomName+'</div>';
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

