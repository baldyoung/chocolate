
var typeId;
$(function() {
	
	init();
});



function init(){
	var type = parseInt(getQueryVariable('type'));
	type = 2;
	typeId = type;
	var urls = ['classRoomList', 'studentClassList', 'teacherList'];
	var targetUrl = urls[type];
	if (targetUrl == undefined) {
		return;
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
	/*
		itemList = [{
			itemName : '',
			itemUrl : ''
		}];
	*/
   $('#sourceArea').html('');
	$.each(itemList, function(index, cell){
		var html = "<div class='sourceItem' onclick='toURL(\""+cell.itemUrl+"\")'>"+cell.itemName+"</div>";
		$('#sourceArea').append(html);
	});
}

function toURL(url){
	location.href = url;
}
