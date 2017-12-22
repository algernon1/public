

/*******************js公用方法*************************/

var jBank = {

	/*******************************dom操作*******************************/
	// childNodes 返回当前元素所有子元素的数组
	// firstChild 返回当前元素的第一个下级子元素
	// lastChild 返回当前元素的最后一个子元素
	// nextSibling 返回紧跟在当前元素后面的元素
	// nodeValue 指定表示元素值的读/写属性
	// parentNode 返回元素的父节点
	// previousSibling 返回紧邻当前元素之前的元素


	// getElementById(id) (document) 获取有指定惟一ID属性值文档中的元素
	// getElementsByTagName_r(name) 返回当前元素中有指定标记名的子元素的数组
	// hasChildNodes() 返回一个布尔值，指示元素是否有子元素
	// getAttribute(name) 返回元素的属性值，属性由name指定


	// document.createElement_x(tagName) 文档对象上的createElement_x方法可以创建由tagName指定的元素。如果以串div作为方法参数，就会生成一个div元素
	// document.createTextNode(text) 文档对象的createTextNode方法会创建一个包含静态文本的节点
	// .appendChild(childNode) appendChild方法将指定的节点增加到当前元素的子节点列表（作为一个新的子节点）。例如，可以增加一个option元素，作为select元素的子节点
	// .getAttribute(name)
	// .setAttribute(name, value) 这些方法分别获得和设置元素中name属性的值
	// .insertBefore(newNode, targetNode) 这个方法将节点newNode作为当前元素的子节点插到targetNode元素前面
	// .removeAttribute(name) 这个方法从元素中删除属性name
	// .removeChild(childNode) 这个方法从元素中删除子元素childNode
	// .replaceChild(newNode, oldNode) 这个方法将节点oldNode替换为节点newNode
	// .hasChildnodes() 这个方法返回一个布尔值，指示元素是否有子元素

	//获取行间样式
	getStyle: function (obj, name)//当前对象，要获取的属性名
	{
		return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
	},
	//获取绝对位置
	getPos: function (obj)//obj当前对象，获取当前对象距离跟元素的绝对位置
	{
		var l = 0;
		var t = 0;
		
		while(obj)
		{
			l += obj.offsetLeft;
			t += obj.offsetTop;
			obj = obj.offsetParent;	
		}
		
		return {left:l, top:t};	
	},


	//通过className获取元素
	getByClassName: function (oParent, sClass)//oParent父级元素，classname
	{
		var aEle = oParent.getElementsByTagName('*');
		var aResult = [];
		var re = new RegExp('\\b' + sClass + '\\b', 'i');
		
		for(var i = 0; i < aEle.length; i++)
		{
			if(re.test(aEle[i].className))
			{
				aResult.push(aEle[i]);
			}
		}
		return aResult;
	},
	//元素是否有此样式，返回true/false
	hasClass: function (obj, cls) {  
	    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
	},
	//添加样式
	addClass: function (obj, sClass)
	{ 
	    var aClass = obj.className.split(' ');
	    if (!obj.className)
		{
	        obj.className = sClass;
	        return;
	    }
	    for (var i = 0; i < aClass.length; i++)
		{
	        if (aClass[i] === sClass) return;
	    }
	    obj.className += ' ' + sClass;
	},
	//删除样式样式
	removeClass: function (obj, cls) {  
	    if (hasClass(obj, cls)) {  
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	        obj.className = obj.className.replace(reg, ' ');  
	    }  
	},

	//找到所有子元素
	findAllChild: function(obj){
	    var oList = obj.childNodes;
	    var oArr = [];
	    for(var i=0;i<oList.length;i++){
	        if(oList[i].nodeType == 1){//为了兼容火狐
	            oArr.push(oList);
	        }
	    }
	    //while(oArr)
	    return oArr;
	},


	//找到元素下的所有指定元素
	findALLAppoint: function(oParent,childName){//oParent为父(/祖...)元素js对象，childName
		
		var oAllChild = jBank.findAllChild(oParent);

		var afindALLAppoint = [];

		var pointNum = 0;

		if(childName.indexOf("#")==0){//id

			while(oAllChild.i==childName){
				
			}
		}else if(childName.indexOf(".")==0){//class

		}else{//属性

			for(var i=0; i<oAllChild.length; i++){l    
				if(oAllChild[i].getAttribute(childName)){

					afindALLAppoint[pointNum] = oAllChild[i];

					pointNum++;

				};

			}
		}
		return afindALLAppoint;
	},


	//找到第一个子元素
	findFirstChild: function(){
		
	},






	/******************************事件类********************************/
	//添加监听事件
	addEvent: function(element, type, callback) {
		if (element.addEventListener) {//其他浏览器
			element.addEventListener(type, callback, false);
		} else if (element.attachEvent) {//ie
			element.attachEvent('on' + type, callback)
		} else {
			element['on' + type] = callback;
		};
	},
	//移除事件
	removeEvent: function(element, type, callback) {
		if (element.removeEventListener) {
			element.removeEventListener(type, callback, false);
		} else if ( element.detachEvent ){
			element.detachEvent('on' + type, callback);
		} else {
			element['on' + type] = null;
		}
	},
	//event对象兼容
	getEvent: function(event) {//window.event (ie 6，7,8)
		return event ? event : window.event;
	},
	//target兼容
	getTarget: function(event) {
		var event = jBank.getEvent(event);
		return event.target || event.srcElement
	},
	//阻止事件的默认行为
	preventDefault: function(event) {
		var event = jBank.getEvent(event);
		if (event.preventDefault) {//其他浏览器
			event.preventDefault();
		} else {//ie
			event.returnValue = false;
		}
	},
	//阻止事件流或使用（阻止事件冒泡兼容）
	stopPropagation: function(event) {
		var event = jBank.getEvent(event);
		if (event.stopPropagation) {//其他浏览器
			event.stopPropagation();
		} else { //ie
			event.cancelBubble = true;
		}
	},













	//运动框架
	startMove:function ( obj, json, options )
	{
		options = options || {};
		options.time = options.time || 700;
		options.type = options.type || 'easy_out';
		var start = {};
		var dis = {};
		for( var name in json )
		{
			if( name == 'opacity' )
			{
				start[ name ] = Math.round( parseFloat( getStyle(obj, name) ) * 100 );	
			}
			else
			{
				start[ name ] = parseInt( getStyle(obj, name) );	
			}
			if( isNaN(start[ name ]) )
			{
				switch(name)
				{
					case 'left':
						start[ name ] = obj.offsetLeft;
						break;
					case 'top':
						start[ name ] = obj.offsetTop;
						break;
					case 'width':
						start[ name ] = obj.offsetWidth;
						break;
					case 'height':
						start[ name ] = obj.offssetHeight;
						break;
					case 'marginLeft':
						start[ name ] = 0;
						break;
					case 'marginTop':
						start[ name ] = 0;
						break;
					case 'marginRight':
						start[ name ] = 0;
						break;
					case 'marginBottom':
						start[ name ] = 0;
						break;
					case 'paddingLeft':
						start[ name ] = 0;
						break;
					case 'paddingTop':
						start[ name ] = 0;
						break;
					case 'paddingRight':
						start[ name ] = 0;
						break;
					case 'paddingBottom':
						start[ name ] = 0;
						break;
					case 'opacity':
						start[ name ] = 100;
						break;
					case 'borderLeftWidth':
						start[ name ]= 0; 
						break;
					case 'borderRightWidth':
						start[ name ] = 0;
						break;
					case 'borderTopWidth':
						start[ name ] = 0;
						break;
					case 'borderBottomWidth':
						start[ name ] = 0;
						break;
				}
			}
			dis[ name ] = json[ name ] - start[ name ];	
		}	
		
		var count = parseInt( options.time / 30 );
		var n = 0;
		
		clearInterval( obj.oTimer );
		obj.oTimer = setInterval( function(){
			n++;
			for( var name in json )
			{
				switch( options.type )
				{
					case 'easy_out':
						var a = 1 - n / count;
						var iCur = start[ name ] + dis[ name ] * ( 1 - a * a * a );
						break;	
					case 'easy_in':
						var a = n / count;
						var iCur = start[ name ] + dis[ name ] * ( a * a * a );
						break;
					case 'linear':
						var iCur = start[ name ] + dis[ name ] / count * n;
						break;
				}
				if( name == 'opacity' )
				{
					obj.style.opacity = iCur / 100;
					obj.style.filter = 'alpha(opacity:' + iCur + ')';	
				}
				else
				{
					obj.style[ name ] = iCur + 'px';	
				}	
			}
			if( n == count )
			{
				clearInterval( obj.oTimer );
				options.fn && options.fn( obj );	
			}	
		}, 30 );
	}

};









//图片预加载
function preloadimages(arr, fn){   
    var newimages=[], loadedimages=0
    var postaction=function(){}  //此处增加了一个postaction函数
    var arr=(typeof arr!="object")? [arr] : arr
    function imageloadpost(){
        loadedimages++
        if (loadedimages==arr.length){
            postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
        }
    }
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image();
        newimages[i].src=arr[i]
        newimages[i].onload=function(){
            imageloadpost()
        }
        newimages[i].onerror=function(){
            imageloadpost()
        }
    }
    fn && fn();
}
