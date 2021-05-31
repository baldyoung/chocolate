
var typeId;
var branchList = ['软件网工学院', '电子商务学院', '媒体艺术学院', '其它'];
var roomTypeNames = ['非电脑房', '电脑房', '其它']
$(function() {
	
	init();
});



function init(){
	var type = parseInt(getQueryVariable('type'));
	typeId = type;
	var urls = ['classRoomList', 'studentClassList', 'teacherList'];
	var targetUrl = urls[type];
	if (targetUrl == undefined) {
		$('#sourceArea').html('<div class="text-center"><h2 style="color:orange;">你不对劲</h2></div>');
		return;
	}
	if (type == 0) {
		$('.defaultTitle').removeClass('selectedTitle');
		$('#roomListTitleSpan').addClass('selectedTitle');
	} else if (type == 1) {
		$('.defaultTitle').removeClass('selectedTitle');
		$('#classListTitleSpan').addClass('selectedTitle');
	} else if (type == 2) {
		$('.defaultTitle').removeClass('selectedTitle');
		$('#teacherListTitleSpan').addClass('selectedTitle');
	}
	$.ajax({
		url: XConfig.serverAddress + "openSource/"+targetUrl,
		type: 'GET',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,
		// JSON.stringify(list)
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				loadSourceItemList(targetData);
			} else {
				//swal('获取数据失败', data.desc, 'error');
				alert('数据获取失败\n'+data.desc);
			}
		},
		error: function() {
			//swal('服务器连接失败', '请检查网络是否通畅', 'warning');
			alert('服务器连接失败');
		}
	});
}

function loadSourceItemList(itemList) {
	$('#sourceArea').html('');
	var target;
	// 对名称进行排序
	itemList = itemList.sort(function(a, b){
		var t = a.itemName.localeCompare(b.itemName, 'zh-CN');
		// console.log(t);
		return t;
	});
	// 展示教室列表
	if (typeId == 0) {
		target = $('#sourceArea');
		// console.log(itemList);
		$.each(itemList, function(index, cell) {
			if (cell.typeId == undefined) {
				cell.typeId = 2;
			}
			cell.itemUrl = "courseMap.html?type=" + typeId + "&id=" + cell.itemId;
			var temp = '<strong>'+cell.itemName + '</strong> (' + cell.standardPeopleNumber + '座) [' + roomTypeNames[cell.typeId] + ']';
			var html = "<div class='sourceItem' onclick='toURL(\""+cell.itemUrl+"\")'>"+temp+"</div>";
			target.append(html);
		});
	}
	// 展示教师列表
	else if (2 == typeId) {
		target = $('#sourceArea');
		// console.log(itemList);
		$.each(itemList, function(index, cell){
			cell.itemUrl = "courseMap.html?type=" + typeId + "&id=" + cell.itemId;
			var temp = '<strong>'+cell.itemName+'</strong>';
			var html = "<div class='sourceItem' onclick='toURL(\""+cell.itemUrl+"\")'>"+temp+"</div>";
			target.append(html);
		});
	}
	// 展示班级列表
	else if (typeId == 1) {
		// 展示各个学院下的班级
		$.each(itemList, function(index, cell){
			target = $('#branch'+cell.typeId);
			if (target.length == 0) {
				// 绘制学院分界线
				var branchHTML = '<div id="branch'+cell.typeId+'"><h3>'+branchList[cell.typeId]+'</h3><hr></hr></div>';
				$('#sourceArea').append(branchHTML);
				target = $('#branch'+cell.typeId);
			}
			cell.itemUrl = "courseMap.html?type=" + typeId + "&id=" + cell.itemId;
			var temp = '<strong>' + cell.itemName + '</strong> (' + cell.currentStudentNumber + '人)<br>' + cell.holderStaffName + ' [TEL:' + cell.holderStaffPhone + ']';
			var html = "<div class='sourceItem' onclick='toURL(\""+cell.itemUrl+"\")'>"+temp+"</div>";
			target.append(html);
		});
	} 
	// ？？？
	else {
		
	}
}

function toURL(url){
	location.href = url;
}




