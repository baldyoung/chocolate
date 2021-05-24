$(function() {
	courseMap.init();

});
var courseIndexNames = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var courseIndexTimes = ['', '8:30 - 9:10', '9:20 - 10:00', '10:20 - 11:00', '11:10 - 11:50', '15:00 - 15:40',
	'15:50 - 16:30', '?', '?', '?'
];
$(function() {
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
	}];
	
	$.each(courseInfoList, function(i, cell) {
		courseMap.setCourse(cell);
	});

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
			var dayTimeFlag = toFlag(cell);
			courseDayTimeMap[dayTimeFlag] = true;
		});
		var list = courseInfo.dayTimeList;
		for(var i=0; i<list.length; i++) {
			var cell = list[i];
			var dayTimeFlag = toFlag(cell);
			if (!courseDayTimeMap[dayTimeFlag]) {
				continue;
			}
			courseDayTimeMap[dayTimeFlag] = 1;
			var nextTimeCell = getTheDayNextTime(cell);
			console.log("下一个时间点:");
			console.log(nextTimeCell); 
			console.log(courseDayTimeMap);
			var nextTime = courseDayTimeMap[toFlag(nextTimeCell)];
			console.log(courseDayTimeMap[toFlag(nextTimeCell)]);
			while(nextTime) {
				courseDayTimeMap[toFlag(nextTimeCell)] = false;
				courseDayTimeMap[dayTimeFlag] += 1;
				nextTimeCell = getTheDayNextTime(nextTimeCell);
				nextTime = courseDayTimeMap[toFlag(nextTimeCell)];
			}
			console.log("一次处理完成");
			console.log(courseDayTimeMap);
		}
		for(var dayTimeFlag in courseDayTimeMap) {
			if (courseDayTimeMap[dayTimeFlag]) {
				var t = $('#'+dayTimeFlag);
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

function toFlag(cell) {
	return "d"+cell.day+"t"+cell.time;
}
