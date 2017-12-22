/*********************************************************************************
*                                   工厂模式组件说明                                  
*    author:dengYunFeng                                                 
*    version:###                                                                 
*    createTime: 2017-2-10                                                      
*    实现功能：通过对页面属性的解析，初始化该属性对应的元素，-支持单选下拉框，-简单表格，-文本框,
*    -超链接                                                                            
*                                                                                
*                                                                                
**********************************************************************************/




var factoryObj = function() {

	this.ctrl = null; //根据comType属性获取的元素集合
	//this.init //初始化加载
}
factoryObj.prototype = {
/*factoryObj.prototype.init和factoryObj.init的区别：
用了prototype那么以后你每生成一个新的实例，
它们的init方法用的是同一个内存区域,
而另一种是新分配一个区域来存*/
	init: function (){

		//获取comtype集合
		var comTypeList=$('*[comType]');

		//循环渲染带comType的dom元素
		for(var i=0; i<comTypeList.length; i++){
			this.ctrl = comTypeList[i];//*注意：jq已经转原生了
			this.parse();
		}
	},
	parse: function (){//parse=解析
		var comType = $(this.ctrl).attr("comType");
		switch(comType)
		{

			case "tab"://tab切换效果
				var sameObjName = new childTab();
				sameObjName.ctrl = this.ctrl;
				sameObjName.init();
			break;

			case "countDown"://倒计时效果
				var sameObjName = new childCountDown();
				sameObjName.ctrl = this.ctrl;
				this.ctrl.jsCtrl = sameObjName;
				sameObjName.init();
			break;

			case "singleTable"://简单表格数据加载
				var sameObjName = new childSingleTable();
				sameObjName.ctrl = this.ctrl;
				sameObjName.init();
			break;

			case "singleSelect"://简单的下拉列表美化
				var sameObjName = new childSingleSelect();
				sameObjName.ctrl = this.ctrl;
				sameObjName.init();
			break;

			case "lendonSelect"://级联的下拉列表美化
				var sameObjName = new childLendomSelect();
				sameObjName.ctrl = this.ctrl;
				sameObjName.init();
			break;

			case "messageBox"://级联的下拉列表美化
				var sameObjName = new childMessageBox();
				sameObjName.ctrl = this.ctrl;
				sameObjName.init();
			break;

			case "radio"://单选框
				var sameObjName = new childRadio();
				sameObjName.ctrl = this.ctrl;
				sameObjName.init();
			break;

			case "checkbox"://复选框
				var sameObjName = new childCheckbox();
				sameObjName.ctrl = this.ctrl;
				sameObjName.init();
			break;



		}
	}
}


/*********************************************************************************
*                                   子对象-tab切换                                
*    author:dengYunFeng                                                 
*    version:###                                                                 
*    createTime: 2017-2-10                                                      
*    实现功能：tab切换                                                                      
*                                                                                
*                                                                                
**********************************************************************************/
function childTab(ctrl){
	this.ctrl = null;
};

childTab.prototype = {
	init: function() {
		this.parse();
	},
	parse: function() {
		var aLi=$(this.ctrl).children('ul:first').children('li');
		var aDiv=$(this.ctrl).children('div');
		for(var i=0;i<aLi.length;i++){
			$(aLi[i]).click(function (){
				for(var i=0;i<aLi.length;i++){
					$(aLi[i]).removeClass("active");
					$(aDiv[i]).hide();
				};
				var n=$(this).index();
				$(this).addClass("active");
				$(aDiv[n]).show();
			});
		};
	}
}


/*********************************************************************************
*                                   子对象-倒计时                                                                                                           
*                                                      
*    实现功能：支持倒数时间，并且当倒数时间为0时触发自定义方法                                                              
*                                                           
**********************************************************************************/
function childCountDown() {
	this.ctrl = null;
	this.targetTime = null;
	this.differTime = null;
	this.clearId = null;//每个定时器name
	this.countTime = 0;
	this.template	= "<span></span><font>天</font><span></span>时<span></span>分<span></span>秒";
}

childCountDown.prototype = {
	init: function (){
		if(this.ctrl != null)
		{
			if(this.ctrl.getAttribute("targetTime") != null)
				this.targetTime = this.ctrl.getAttribute("targetTime");
			if(this.ctrl.getAttribute("differTime") != null)
				this.differTime  = this.ctrl.getAttribute("differTime");
			if(this.ctrl.getAttribute("template") != null)
				this.template  = this.ctrl.getAttribute("template");
			this.parse();
		}
	},
	parse: function(){
		var objTimer = this.ctrl;
		this.ctrl.innerHTML=this.template;
		this.countTime=0;
		_this = this;

		this.clearId = setInterval(function(){
			//var a = objTimer;
			//alert(objTimer)
			objTimer.jsCtrl.countTime++;
			objTimer.jsCtrl.getTime();
		},1000);
	},
	getTime: function (){
		var a=this.ctrl.getElementsByTagName('span')[0];
		var b=this.ctrl.getElementsByTagName('span')[1];
		var c=this.ctrl.getElementsByTagName('span')[2];
		var d=this.ctrl.getElementsByTagName('span')[3];
		if(this.ctrl.getAttribute('targetTime')){
			var differTime = this.targetTime-new Date().getTime();
		}
		if(this.ctrl.getAttribute('differTime')){
			var differTime = this.differTime-this.countTime*1000;
		}
		if(differTime<=0){
			a.innerHTML='000';
			b.innerHTML='00';
			c.innerHTML='00';
			d.innerHTML='00';
			clearInterval(this.clearId);
			this.zeroFunc(this.ctrl);
			return;
		}
		var days=parseInt(differTime/(1000*60*60*24))
		var hours = parseInt(differTime%(1000*60*60*24)/(1000*60*60));
		var minutes = parseInt(differTime%(1000*60*60*24)%(1000*60*60)/(1000*60));
		var seconds = parseInt(differTime%(1000*60*60*24)%(1000*60*60)%(1000*60)/1000);
		// console.log(days+' '+hours+' '+minutes+' '+seconds)
		if(days == "0")
		{
			$(a).hide();
			$(a).next().hide();
		}
		else{
			a.innerHTML=days;//this.fillZero(days,3);
		}
		b.innerHTML=this.fillZero(hours,2);
		c.innerHTML=this.fillZero(minutes, 2);
		d.innerHTML=this.fillZero(seconds, 2);
	},
	fillZero: function(num, digit) {
		var str=''+num;
		while(str.length<digit)
		{
			str='0'+str;
		}
		return str;
	},
	zeroFunc: function (){

	}
}



/*********************************************************************************
*                                   子对象-简单表格                                                                                                            
*                                                  
*    实现功能：实现简单表格的数据显示                                                            
*                                                                              
**********************************************************************************/
function childSingleTable() {
	this.ctrl = null;
	this.gloData = {};
}

childSingleTable.prototype = {
	init: function() {
		this.parse();
	},
	parse: function() {
		this.gloData.reqUrl = $(this.ctrl).attr('reqUrl');
		this.gloData.reqType = $(this.ctrl).attr('reqType');
		this.gloData.reqData = $(this.ctrl).attr('reqData');
		this.ajaxData(this.gloData);
	},
	ajaxData: function(gloData) {
		var _this = this;
		$.ajax({
			url: gloData.reqUrl,
			type: gloData.reqType,
			async: false,
			cache: false,
			data: gloData.reqData,
			dataType:'json',
			success: function (data) {
				var childCtrl = $(_this.ctrl).children().eq(0).clone();//克隆clone(true/false),默认false,不克隆事件
				var resultData = data.resultData;
				$(_this.ctrl).html(childCtrl);
				childCtrl.show();

				//数据展示
				for(var i=0;i<resultData.length;i++){
					childCtrl = $(_this.ctrl).children().eq(0).clone()
					$(_this.ctrl).append(childCtrl);
					for(var j = 0; j < resultData[i].data.length; j++){
						$(_this.ctrl).children().eq(i+1).children().eq(j).html(resultData[i].data[j].value)
					}

				}
				$(_this.ctrl).children().eq(0).hide();
				//分页插件
				$(".tcdPageCode").createPage({
					pageCount:data.allCount,//页数
					current:gloData.reqData.page,//初始化展示页
					backFn:function(p){//当前页
						reqUrl = 'js/data'+p+'.json';
						reqData = {'page':p};
						// $(_this.ctrl).attr('reqUrl',reqUrl);
						// $(_this.ctrl).attr('reqData',reqData);
						_this.gloData.reqUrl = reqUrl;//开发环境上此地址是不变的，可以省略
						_this.gloData.reqData = reqData;
						_this.ajaxData(_this.gloData);
					}
				});
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}

}



/*********************************************************************************
*                                   子对象-单独的下拉框美化                                                                                                           
*                                                                          
*    实现功能：下拉框美化                                                                   
*                                                                                 
**********************************************************************************/
function childSingleSelect(){

}
childSingleSelect.prototype = {
	init: function (){
		this.parse();
	},
	parse: function (){
		var a = $(this.ctrl).attr("reqUrl"),
			b = $(this.ctrl).attr("reqType"),
			c = $(this.ctrl).attr("reqData");
		if( a == null||b == null || c == null){//无ajax
			$(this.ctrl).chosen();
		}else{
			_this = this;
			$.ajax({
				url: a,
				type: b,
				async: false,
				cache: false,
				data: c,
				dataType:'json',
				success: function (data) {
					var data = data.resultData;
						$(_this.ctrl).html("");
					for(var j = 0;j < data.length; j++){
						$(_this.ctrl).append("<option></option>");
						$(_this.ctrl).children().eq(j).html(data[j])
					}
					$(_this.ctrl).chosen();
				},
				error: function (jqXHR, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}
	}
}




/*********************************************************************************
*                                   子对象-联动（级联）下拉框美化                                                                                                           
*                                                                          
*    实现功能：级联下拉框美化                                                                   
*                                                                                 
**********************************************************************************/
function childLendomSelect(){

}

childLendomSelect.prototype = {
	init: function (){
		this.parse();
	},
	parse: function (){
			var a = $(this.ctrl).attr('reqUrl'),
				b = $(this.ctrl).attr('reqType'),
				c = $(this.ctrl).attr('reqData');
			var attr = $(this.ctrl).attr("name");
			_this = this;
			$.ajax({
				url: a,
				type: b,
				async: false,
				cache: false,
				data: c,
				dataType:'json',
				success: function (data) {
					var sucData = data.resultData;
					var num = data.lendonNum;
					var ctrl = $("[name="+attr+"]");

					_this.initSelect(attr, num, sucData);

					ctrl.on('change', function(e, params) {
						var selfCtrl = e.srcElement || e.target;
						for(var i = parseInt($(selfCtrl).attr("lendonindex"))+1;i < num;i++){
							console.log(i)

							_this.parseNextSelect(selfCtrl, num, $("[name="+attr+"]"), attr, sucData);
							selfCtrl = $("[name="+attr+"][lendonindex="+i+"]");

						}
					});
				},
				error: function (jqXHR, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
	},
	initSelect: function (attr, num, sucData) {//初始化加载下拉框数据
		var initDataStr = "sucData";

		for(var i = 0; i < num; i++){
			ctrl = $("[name="+attr+"][lendonIndex="+i+"]");
			ctrl.html('');
			if(i != 0)initDataStr += "[0].data"

			for(var j = 0; j < eval(initDataStr).length; j++){
				var text = eval(initDataStr+"[j]").text;

				ctrl.append("<option></option>");
				ctrl.children().eq(j).html(text)
			}
			ctrl.chosen({placeholder_text_single: '请选择'});
		};

	},
	parseNextSelect: function (selfCtrl, num, ctrl, attr, sucData) {//下拉框onchange之后，解析下一个下拉框数据
		var selfNum = parseInt($(selfCtrl).attr("lendonIndex"));
		if(num == selfNum+1)return;
		var optionSelectNum = $(selfCtrl).prop('selectedIndex');//当前select选中索引值
		var nextSelect = $("[name="+attr+"][lendonIndex="+(selfNum+1)+"]");

		/*获取数据在某一层级开始*/
		var array = [];
		for(var i = 0; i<selfNum+1; i++){
			array[i] = $(ctrl).eq(i).prop('selectedIndex');
		};
		var str = "sucData["+array[0]+"]";
		for(var i = 1; i<array.length; i++){

			str += ".data["+array[i]+"]"
		};
		str = eval(str);
		/*获取数据在某一层级结束*/

		nextSelect.html("");
		for(var i = 0; i < str.data.length; i++){
			var text = str.data[i].text;

			nextSelect.append("<option></option>");
			nextSelect.children().eq(i).html(text)
		}

		nextSelect.trigger('chosen:updated')
	}
}

/*********************************************************************************
*                               弹出提示框控件说明                                     
                                                    
*    实现功能：支持成功，失败提示框
                                                                              
*                                                                                
**********************************************************************************/
function childMessageBox()
{		
	this.html = '<div id="messageBoxWin" class="popup" style="display: none;">';
	this.ctrl			= null;			//点击弹出窗口触发的按钮对象
	this.title			= "";	//弹出框标题
	this.content		= "";			//弹出框内容不能超过20个字
	this.messageType	= "";		//弹出框类型，error:错误   success:成功
	//this.addCallOffFunc/this.addEnsureFunc		= null;			//自定义方法，点击确定/取消按钮自动调用
	this.isBind			= "1";			//是否绑定方法，如果为0，则只初始化模板，自己调用方法
}

childMessageBox.prototype = {
	init: function() {
		(this.ctrl.getAttribute("title") != null) ? this.title = this.ctrl.getAttribute("title") : this.title = "信息提示";
		(this.ctrl.getAttribute("content") != null) ? this.content = this.ctrl.getAttribute("content") : this.content = "";
		(this.ctrl.getAttribute("messageType") != null) ? this.messageType = this.ctrl.getAttribute("messageType") : this.messageType = "success";
		this.parse(this.title, this.content, this.messageType);
	},
	parse: function(title,content,messageType) {
		this.html = this.html + "<div class='title'>";
	    this.html = this.html + "<h2>"+title+"</h2>";
	    this.html = this.html + "<div>";
		this.html = this.html + "<a class='min' href='javascript:;' title='最小化' style='display:none;'></a>";
	    this.html = this.html + "<a class='max' href='javascript:;' title='最大化' style='display:none;'></a>";
	    this.html = this.html + "<a class='revert' href='javascript:;' title='还原' style='display:none;'></a>";
	    this.html = this.html + "<a class='close' href='javascript:;' title='关闭'></a>";
	    this.html = this.html + "</div>";
	    this.html = this.html + "</div>";
	    this.html = this.html + "<div class='content'>";
	    this.html = this.html + "<div class='main'>";
	    this.html = this.html + "<div class='cell'>";
	    this.html = this.html + "<i class='"+messageType+"'></i>";
	    this.html = this.html + "<span>"+content+"</span>";
	    this.html = this.html + "</div>";
	    this.html = this.html + "</div>";
	    this.html = this.html + "<div class='btn'>";
		if(messageType != "success")
			this.html = this.html + "<a href='javascript:' class='btnSecond btnStyle1_1 margR10 callOff'>取消</a>";
	    this.html = this.html + "<a href='javascript:' class='btnOne btnStyle1 ensure'>确 定</a>";
	    this.html = this.html + "</div>";  
	    this.html = this.html + "</div>";
	    this.html = this.html + "</div>";

	    $("body").append(this.html);

	    $(this.ctrl).bind('click',function (){
			openWin(400,220,"messageBoxWin",true);
	    })
	    var _this = this;
	    $("#messageBoxWin .ensure").bind("click",function(){
	    	_this.addEnsureFunc(this,_this);

	    })
	    $("#messageBoxWin .callOff").bind("click",function(){
	    	_this.addCallOffFunc(this,_this);

	    })
	},
	addEnsureFunc: function(btn,obj) {
		
	},
	addCallOffFunc: function(btn,obj) {
		
	}
}





/*********************************************************************************
*                                   子对象-单选框美化                                                                                                          
*                                                                          
*    实现功能：单选框美化                                                              
*                                                                                 
**********************************************************************************/
function childRadio(){

}
childRadio.prototype = {
	init: function (){
		this.parse();
	},
	parse: function (){
		var oName = $(this.ctrl).attr("name");
		var oRadio = $("[name="+oName+"]");
		var cssStyle = null;

		if(oRadio.length == 1){
			cssStyle = oRadio.attr("style");
			// console.log(oRadio.get(0).checked)
			// console.log(oRadio.is(':checked'))
			// console.log(oRadio.attr('checked'))
			if(oRadio.is(':checked')){
				oRadio.after("<a href='javascript:;' class='comRadioYes' style='"+cssStyle+"'></a>");
			}else{
				oRadio.after("<a href='javascript:;' class='comRadioNo' style='"+cssStyle+"'></a>");
			};

			oRadio.next().bind("click",function (){
				if(oRadio.is(':checked')){
					oRadio.attr("checked",false);
					$(this).removeClass("comRadioYes");
					$(this).addClass("comRadioNo");
				}else{
					oRadio.attr("checked",true);
					$(this).removeClass("comRadioNo");
					$(this).addClass("comRadioYes");
				};
			});
		}else if(oRadio.length > 1){
			for(var i = 0; i < oRadio.length; i++){
				cssStyle = $(oRadio[i]).attr("style");
				if($(oRadio[i]).is(':checked')){
					$(oRadio[i]).after("<a href='javascript:;' class='comRadioYes' style='"+cssStyle+"'></a>");
				}else{
					$(oRadio[i]).after("<a href='javascript:;' class='comRadioNo' style='"+cssStyle+"'></a>");
				};

				$(oRadio[i]).next().bind("click",function (){
					if(!$(this).prev().is(':checked')){
						$(oRadio).attr("checked",false);
						$(this).prev().attr("checked",true);
						for(var j = 0; j < oRadio.length; j++){
							$(oRadio[j]).next().removeClass("comRadioYes");
							$(oRadio[j]).next().addClass("comRadioNo");
						}
						$(this).removeClass("comRadioNo");
						$(this).addClass("comRadioYes");
					}
				});
			};
		};
		oRadio.hide();

		
	}
}


/*********************************************************************************
*                                   子对象-复选框美化                                                                                                          
*                                                                          
*    实现功能：复选框美化                                                             
*                                                                                 
**********************************************************************************/
function childCheckbox(){

}
childCheckbox.prototype = {
	init: function (){
		this.parse();
	},
	parse: function (){
		var oName = $(this.ctrl).attr("name");
		var oCheckbox = $("[name="+oName+"]");
		var cssStyle = null;
		for(var i = 0; i < oCheckbox.length; i++){
			cssStyle = $(oCheckbox[i]).attr("style");
			if($(oCheckbox[i]).is(':checked')){
				$(oCheckbox[i]).after("<a href='javascript:;' class='comCheckboxYes' style='"+cssStyle+"'></a>");
			}else{
				$(oCheckbox[i]).after("<a href='javascript:;' class='comCheckboxNo' style='"+cssStyle+"'></a>");
			};
			
			(function(index){
				$(oCheckbox[i]).next().bind("click", function (){
					for(var i = 0; i < oCheckbox.length; i++){};
					if($(this).prev().is(':checked')){
						$(this).prev().attr("checked",false);
						$(this).removeClass("comCheckboxYes");
						$(this).addClass("comCheckboxNo");
					}else{
						$(this).prev().attr("checked",true);
						$(this).removeClass("comCheckboxNo");
						$(this).addClass("comCheckboxYes");
					}
				});	
			})(i);	
		}
		
		oCheckbox.hide()

		
	}
}






window.onload = function() {
	var globalObj = new factoryObj();//实例化对象
	globalObj.init();
}
















