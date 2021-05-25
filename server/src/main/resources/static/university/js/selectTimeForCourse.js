

// 当前查阅周
var currentWeekDataBuffer = [];


$(document).ready(function() {
	var slider2 = document.getElementById('basic_slider');
	noUiSlider.create(slider2, {
		range: {
			min: 0,
			max: 10,
		},
		start: [0],
		step: 1,
		pips: {
			mode: 'count',
			values: 11
		}
	});
	slider2.noUiSlider.on('update', function(values, handle) {
		var t = parseInt(values[handle]);
		var tipData = t == 0 ? "本周" : ("未来第" + t + "周");
		$('#currentSelectWeekIndex').text(tipData);
		var weekDays = getTargetWeekDays(t);
		currentWeekDataBuffer = weekDays; // 保存到缓存中
		var temp;
		var currentDay = new Date();
		for (var i = 0; i < weekDays.length; i++) {
			if (weekDays[i].getFullYear() == currentDay.getFullYear() && weekDays[i].getMonth() == currentDay.getMonth() &&
				weekDays[i].getDate() == currentDay.getDate()) {
				temp = "<span >" + weekDays[i].formatDateString +
					"</span><br><span style='color:red;font-weight:bolder; font-size:8px;'>今天</span>";
			} else {
				temp = weekDays[i].formatDateString;
			}
			$('#weekDayDate' + i).html(temp);
		}
		refreshCourseInfo();
	});
});

function refreshCourseInfo() {
	var startDate = currentWeekDataBuffer[0].valueOf();
	for (var i = 1; i <= 9; i++) {
		for (var j = 1; j <= 7; j++) {
			var dayTimeCell = {
				day : j,
				time : i
			};
			var list = [dayTimeCell];
			var result = getTargetDisengagedDataMap(startDate, list);
			var timeTipCellHtml = '<div dayId="'+j+'" timeId="'+i+'" class="timeCellOption" id="timeCellOption' + j + i + '" style="">' +
				'<div class="timeCellContent">' +
				' <i class="fa fa-users"></i> ' + result.classList.length + 
				' <i class="fa fa-user-secret"></i> '+ result.staffList.length + 
				' <i class="fa fa-university"></i> ' + result.roomList.length  + '</div>' +
				'</div>';
			$('#timeCell' + j + i).html(timeTipCellHtml);
		}
	}
	$('.timeCellOption').off('click');
	$('.timeCellOption').on('click', function() {
		var target = $(this);
		if (target.is('.timeCellOption-selected')) {
			target.removeClass('timeCellOption-selected');
		} else {
			target.addClass('timeCellOption-selected');
		}
	});
}

// 获取当前选中的所有时间节点
function getCurrentSelectedDayTime() {
	var cellList = $('.timeCellOption');
	var list = [];
	cellList.each(function(index, cell) {
		var temp = $(cell);
		if (temp.is('.timeCellOption-selected')) {
			list[list.length] = {
				day : temp.attr('dayId'),
				time : temp.attr('timeId')
			};
		}
	});
	return list;
}
// 获取当前选中的时间数据
function getCurrentSelectedResult() {
	var result = {
		startDate : currentWeekDataBuffer[0].formatDateString,
		dayTimeList : getCurrentSelectedDayTime()
	};
	return result;
}
// 准备进行下一步 创建课程操作
function readyToNextOption() {
	var t = getCurrentSelectedResult();
	//document.cookie = "test="+JSON.stringify(t);
	localStorage.setItem("currentSelectDayTime", JSON.stringify(t));
	//alert(localStorage.getItem("test"));
	//alert("");
	console.log(t);
	location.href='./createCourse.html';
}

