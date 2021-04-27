

// 当前查阅周
var currentWeekDataBuffer = [];












$(document).ready(function() {
	console.log(getTargetWeekDays());
	for (var i = 1; i <= 5; i++) {
		for (var j = 1; j <= 7; j++) {
			var timeTipCellHtml = '<div dayId="'+i+'" timeId="'+j+'" class="timeCellOption" id="timeCellOption' + j + i + '" style="">' +
				'<button type="button" class="btn btn-w-m btn-danger">空闲班级 13</button>' +
				'<button type="button" class="btn btn-w-m btn-primary">空闲教师 10</button>' +
				'<button type="button" class="btn btn-w-m btn-info">空闲教室 120</button>' +
				'</div>';
			$('#timeCell' + j + i).html(timeTipCellHtml);
		}
	}
	$('.timeCellOption').on('click', function() {
		var target = $(this);
		if (target.is('.timeCellOption-selected')) {
			target.removeClass('timeCellOption-selected');
		} else {
			target.addClass('timeCellOption-selected');
		}
	});
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
					"</span><span style='color:red;font-weight:bolder;'>今天</span>";
			} else {
				temp = weekDays[i].formatDateString;
			}
			$('#weekDayDate' + i).html(temp);
		}
	});
});

function getCurrentSelectedDayTime() {
	var cellList = $('.timeCellOption');
	var list = [];
	cellList.each(function(index, cell) {
		var temp = $(cell);
		if (temp.is('.timeCellOption-selected')) {
			list[list.length] = {
				dayIndex : temp.attr('dayId'),
				timeIndex : temp.attr('timeId')
			};
		}
	});
	return list;
}

function getCurrentSelectedResult() {
	var result = {
		startDate : currentWeekDataBuffer[0].formatDateString,
		dayTimeList : getCurrentSelectedDayTime()
	};
	return result;
}


function readyToNextOption() {
	var t = getCurrentSelectedResult();
	//document.cookie = "test="+JSON.stringify(t);
	localStorage.setItem("currentSelectDayTime", JSON.stringify(t));
	//alert(localStorage.getItem("test"));
	//alert("");
	console.log(t);
	location.href='./createCourse.html';
}

