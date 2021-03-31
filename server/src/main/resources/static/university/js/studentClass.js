

var StudentClassShowTemplate = undefined;
var studentClassListBuffer = []; 
var currentStudentClassId = undefined;



$(function(){
	StudentClassShowTemplate = $('#studentClassShowArea').html();
	requestAndLoadStudentClassList();
	
	
});
// 获取 班级集合  并加载展示
function requestAndLoadStudentClassList() {
	$.ajax({
		url: XConfig.serverAddress + "studentClass",
		type: 'GET',
		cache: false,
		dataType: 'json',
		async: true, //设置同步
		contentType: "application/json; charset=utf-8",
		data: null,
		success: function(data) {
			if (data.code == 0) {
				var targetData = data.data;
				console.log(targetData);
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
}

// 获取指定 班级 并加载展示
function getAndLoadStudentClass(id) {
	
}



// 
function addNewStudentClass() {
	
}


//
function resetEditPanel(state) {
	if ('add' == state) {
		$('#editAreaTitle').text("新增班级");
		$('#Dep-add-Boot').find('div').val('');
	} else if ('update' == state) {
		$('#editAreaTitle').text("修改班级");
	}
}










