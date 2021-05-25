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
		/* console.log('当前周的数据');
		console.log(workingCourseMap); */
		var type = getQueryVariable('type');
		var id = getQueryVariable('id');
		type = 0;// 0:room、1:class、2:teacher
		id = '1';
		// 获取指定资源下的所有课程数据
		var courseInfoList = [];
		var cm;
		for(var flag in workingCourseMap) {
			if (type == 0) {
				cm = workingCourseMap[flag].roomMap;
			} else if (type == 1) {
				cm = workingCourseMap[flag].classMap;
			} else if (type == 2) {
				cm = workingCourseMap[flag].staffMap;
			}
			if (cm == undefined) {
				continue;
			}
			/* console.log('flag:'+flag);
			console.log('cm:');
			console.log(cm); */
			var tg = cm[id];
			if (tg == undefined) {
				continue;
			}
			//var targetCourse = allClassMap[tg.];
			var tc = {
				courseName : tg.courseName,
				dayTimeList : [],
			};
			for(var fg in tg.dayTimeMap) {
				var tempDayTime = flagToObject(fg);
				tempDayTime.day = parseInt(tempDayTime.day);
				tempDayTime.time = parseInt(tempDayTime.time);
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
		/*
			courseInfo = {
				dayTimeList : ['d1t1'],
				courseName : '',
				teacherName : '',
				startDate : '时间戳',
				endDate : '时间戳'
			}
		*/
		console.log("开始课程数据处理:");
		console.log(courseInfo);
		var courseDayTimeMap = {};
		$.each(courseInfo.dayTimeList, function(index, cell){
			var dayTimeFlag = toFlag(cell.day, cell.time);
			courseDayTimeMap[dayTimeFlag] = true;
		});
		var list = courseInfo.dayTimeList;
		for(var i=0; i<list.length; i++) {
			var cell = list[i];
			var dayTimeFlag = toFlag(cell.day, cell.time);
			if (!courseDayTimeMap[dayTimeFlag]) {
				continue;
			}
			courseDayTimeMap[dayTimeFlag] = 1;
			var nextTimeCell = getTheDayNextTime(cell);
			console.log("下一个时间点:");
			console.log(nextTimeCell); 
			console.log(courseDayTimeMap);
			var nextTime = courseDayTimeMap[toFlag(nextTimeCell.day, nextTimeCell.time)];
			console.log(courseDayTimeMap[toFlag(nextTimeCell.day, nextTimeCell.time)]);
			while(nextTime) {
				courseDayTimeMap[toFlag(nextTimeCell.day, nextTimeCell.time)] = false;
				courseDayTimeMap[dayTimeFlag] += 1;
				nextTimeCell = getTheDayNextTime(nextTimeCell);
				nextTime = courseDayTimeMap[toFlag(nextTimeCell.day, nextTimeCell.time)];
			}
			console.log("一次处理完成");
			console.log(courseDayTimeMap);
		}
		
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

