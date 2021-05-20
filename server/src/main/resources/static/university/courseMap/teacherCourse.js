$(function() {
	courseMap.init();

});
var courseIndexNames = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var courseIndexTimes = ['', '8:30 - 9:10', '9:20 - 10:00', '10:20 - 11:00', '11:10 - 11:50', '15:00 - 15:40',
	'15:50 - 16:30', '?', '?', '?'
];
$(function() {

	return;
	var test = $('#test3');
	var temp =
		'<div style="max-height:100%; height:50px; overflow:visible !important; "><div style="height:200%; background:gray; border-radius:5px;">';
	temp += '<div style="height:33%; text-align:center;">语文</div>';
	temp += '<div style="height:33%; text-align:center;">王龙庆</div>';
	temp += '<div style="height:33%; text-align:center;">教学楼303</div>';
	temp += '</div></div>'
	test.css('border-bottom', '0px solid');
	test.append(temp);
	$('#test4').css('border-top', '0px solid');

	var t = test.children()[0];
	console.log(t);
	t = $(t);
	t = $(t.children()[0]);
	t.outerHeight(test.outerHeight() + $('#test4').outerHeight());


	temp =
		'<div style="max-height:100%; height:50px; overflow:visible !important; "><div style="height:100%; background:green; border-radius:5px;">';
	temp += '<div style="height:33%; text-align:center;">语文</div>';
	temp += '<div style="height:33%; text-align:center;">王龙庆</div>';
	temp += '<div style="height:33%; text-align:center;">教学楼303</div>';
	temp += '</div></div>';
	$('#test1').append(temp);

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
				teacherName : ''
			}
		*/
		
	}
	
};
