/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */
Date.prototype.pattern = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份         
      "d+": this.getDate(), //日         
      "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
      "H+": this.getHours(), //小时         
      "m+": this.getMinutes(), //分         
      "s+": this.getSeconds(), //秒         
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
      "S": this.getMilliseconds()
      //毫秒         
    };
    var week = {
      "0": "/u65e5",
      "1": "/u4e00",
      "2": "/u4e8c",
      "3": "/u4e09",
      "4": "/u56db",
      "5": "/u4e94",
      "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
        .substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt
        .replace(
          RegExp.$1,
          ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" :
              "/u5468") :
            "") +
          week[this.getDay() + ""]);
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
          (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  };
  
  /**
   * 判断参数日期是否从左到右升序
   * @param date1
   * @param date2
   */
  function isDateAscending(date1, date2) {
    var d1 = new Date(date1.replace('-', '/'));
    var d2 = new Date(date2.replace('-', '/'));
    return d1.getTime() < d2.getTime();
  }
  
  function isDateAscending2(date1, date2) {
    var d1 = new Date(date1.replace('-', '/'));
    var d2 = new Date(date2.replace('-', '/'));
    return d1.getTime() <= d2.getTime();
  }
  
  
  
  
  /*************** 一些通 DataGrid 通用的format方法 *****************************/
  
  /**
   * 把.Net输出的 /Date(1445421250444)/ 转化为js 的Date格式
   */
  function getDateByDotNet(txt) {
    return eval('new ' + (txt.replace(/\//g, '')))
  }
  
  /**
   * 日期格式化
   */
  function dateFormatter(value) {
    if (value == undefined || value == null || value == '')
      return value;
    return new Date(value).pattern("yyyy-MM-dd");
  }
  
  /**
   * 日期时间格式化
   */
  function dateTimeFormatter(value) {
    if (value == undefined || value == null || value == '')
      return value;
    return new Date(value).pattern("yyyy-MM-dd HH:mm:ss");
  }
  
  /**
   * 日期时间格式化,根据.Net输出的时间
   */
  function dateTimeFormatterByDotNet(txt) {
    return dateTimeFormatter(getDateByDotNet(txt));
  }
  
  function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
      var tmp = '/(' + arg + '=)([^&]*)/gi';
      tmp = url.replace(eval(tmp), replaceText);
      return tmp;
    } else {
      if (url.match('[\?]')) {
        return url + '&' + replaceText;
      } else {
        return url + '?' + replaceText;
      }
    }
  }
  
  
  /**
   * 生成GUID
   */
  function guid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
  
  /*************** 密码相关的校验方法 start *****************************/
  
  /**
   * model校验对象 0 旧密码 1 新密码 2 重复新密码
   * 密码复杂度校验
   * 新密码不能和旧密码相同
   * 新密码和重复新密码要一致
   * 至少包含数字、大写字母、小写字母、符号中的三种
   * 新密码不能和以往n次密码相同-后台校验
   */
  function pwdCheck(pwdold, pwdnew1, pwdnew2, model) {
  
    if (model == 0) { //旧密码校验
      if (!pwdold) {
        return { state: '0', txt: '请输入旧密码' };
      } else if (!pwdFuZa(pwdold)) {
        return { state: '0', txt: '至少包含数字、大写字母、小写字母、符号中的三种' };
      } else {
        return { state: '1', txt: '' };
      }
    } else if (model == 1) { //新密码校验
      if (!pwdold) {
        return { state: '0', txt: '请先输入旧密码' };
      } else if (!pwdnew1) {
        return { state: '0', txt: '请输入新密码' };
      } else if (!pwdFuZa(pwdnew1)) {
        return { state: '0', txt: '至少包含数字、大写字母、小写字母、符号中的三种' };
      } else if (pwdnew1 == pwdold) {
        return { state: '0', txt: '不能和旧密码相同' };
      } else {
        return { state: '1', txt: '' };
      }
    } else if (model == 2) { //重复新密码校验
      if (!pwdold) {
        return { state: '0', txt: '请先输入旧密码' };
      } else if (!pwdnew1) {
        return { state: '0', txt: '请先输入新密码' };
      } else if (!pwdFuZa(pwdnew2)) {
        return { state: '0', txt: '至少包含数字、大写字母、小写字母、符号中的三种' };
      } else if (pwdnew2 == pwdold) {
        return { state: '0', txt: '不能和旧密码相同' };
      } else if (pwdnew1 != pwdnew2) {
        return { state: '0', txt: '两次输入的密码不一致' };
      } else {
        return { state: '1', txt: '' };
      }
    } else {
      return { state: '0', txt: '输入的校验模式有误' };
    }
  }
  
  /**
   * 密码复杂度校验
   * 至少包含数字、大写字母、小写字母、符号中的三种
   */
  function pwdFuZa(pwd,type=0,min=6,max=12) {
    //必须包含大小字母、数字、特称字符
    if(type == 0){
      var regex = new RegExp(`(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{${min},${max}}`);
    }
    //必须包含字母、数字、特称字符
    else if(type == 1){      
      var regex = new RegExp(`(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{${min},${max}}`);
    }
    //必须包含字母、数字
    else{
      var regex = new RegExp(`(?=.*[0-9])(?=.*[a-zA-Z]).{${min},${max}}`);
    }
    return regex.test(pwd);
  }
  
  /**
   * 邮箱校验
   */
  function checkEmail(str){
    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
  
    return re.test(str);
  }
  
  
  /*************** 密码相关的校验方法 end *****************************/
  
  /*************** 验证码相关的方法 start *****************************/
  
  /**
   * 生成一个随机数
   */
  function randomNum(min, max){
    return Math.random() * (max - min) + min
  }
  
  /**
   * 生成一个随机的颜色
   */
  function randomColor(min=0, max=255,a=1,except) {
    var r = randomNum(min, max);
    var g = randomNum(min, max);
    var b = randomNum(min, max);    
    if(except)
    {
      if(r > except.r && g > except.g && b > except.b )
      {
        randomColor()
      }
    }
    return `rgba(${r},${g},${b},${a})`;//'rgba(' + r + ',' + g + ',' + b + ')';
  };

  /*************** 验证码相关的方法 end *****************************/

  function mobile(){
    var sUserAgent = navigator.userAgent;
    if (sUserAgent.indexOf('Android') > -1) {
      return "Android"
    }
    else if( sUserAgent.indexOf('iPhone') > -1){
      return "iPhone"
    }
    else if( sUserAgent.indexOf('iPad') > -1){
      return "iPad"
    }
    else if(sUserAgent.indexOf('iPod') > -1){
      return "iPod"
    }
    else if( sUserAgent.indexOf('Symbian') > -1){
      return "Symbian"
    }
    return ""
  }

  //随机排序
  function randomSortArray(arr){
    for(var i = 0,len = arr.length;i < len; i++ ){
      var rand = parseInt(Math.random()*len);
      var temp = arr[rand];
      arr[rand] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
  //随机整数
  function getRandomInt(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }

  //获得不重复随机点
  function getRandomPoint(width,height,points,range,start_x=0,start_y=0){
    var mapRect = [];
    for(var i =start_x;i< width;i++)
    {
      for(var j = start_y; j < height;j++)
      {
        mapRect.push({x:i,y:j})
      }
    }
    for(var i in points)
    {
      var point = points[i];
      mapRect = mapRect.filter(a=>{
        return !(Math.abs(a.x - point.x) <range && Math.abs(a.y - point.y) <range);
      })
    }
    var index = getRandomInt(0,mapRect.length);
    return mapRect[index];
  }

  /*************** 验证文字生成方法 start *****************************/
  function imgTextVerificationCode(str_arr,canvas,callback)
  {    
    var cwidth = canvas.width;
    var cheight = canvas.height;

    var font_size = 24;    
    var positions = [];
    var ctx = canvas.getContext("2d");
    //清空画布
    ctx.clearRect(0, 0, cwidth, cheight);

    //设置文字位置
    for(var i in str_arr)
    {
      //避免字数重叠
      var allpoints = positions.map(a=>{
        return {x:a.x,y:a.y}
      })      
      var anger = getRandomInt(0,180)* Math.PI /180;
      var scale = getRandomInt(0,1);
      var point = getRandomPoint(cwidth-font_size,cheight-font_size,allpoints,font_size,font_size,font_size);
      var x_r = randomNum(0,0.5)-0.5;
      var y_r = randomNum(0,0.5)-0.5;
      positions.push({x:point.x,y:point.y,font:str_arr[i],anger:anger,scale:scale,color_0:randomColor(0,180),color_1:randomColor(10,205),x_r:x_r,y_r:y_r})      
    }

    //干扰项
    for(var i=0;i<5;i++){
      ctx.beginPath();
      ctx.moveTo(getRandomInt(0,cwidth),getRandomInt(0,cheight));
      for(var j = 0;j <5;j++){
        ctx.lineTo(getRandomInt(0,cwidth),getRandomInt(0,cheight));
      }      
      ctx.strokeStyle=randomColor(180,230);
      ctx.closePath();
      ctx.stroke();
    }
    for(var i=0;i<200;i++){
      ctx.beginPath();
      var p_x = getRandomInt(0,cwidth);
      var p_y = getRandomInt(0,cheight)
      for(var j = 0;j< 2;j++){
        p_x+=(Math.random()-1)*j;
        p_y+=(Math.random()-1)*j;
        ctx.arc(p_x,p_y,1,0,1*Math.PI);
      }
      
      ctx.closePath();
      ctx.fillStyle=randomColor(150,200);
      ctx.fill();
    }
    
    //绘制
    for(var i in positions)
    {      
      var gradient = ctx.createLinearGradient(0, 0, cwidth, 0);
      gradient.addColorStop(0, positions[i].color_0);
      gradient.addColorStop(0.8, positions[i].color_1);           
      ctx.fillStyle = gradient;      
      ctx.font = font_size+ 'px STHeiti, SimHei';
              
      ctx.save();
      ctx.translate(positions[i].x, positions[i].y);      
      //ctx.rotate(anger);
      ctx.transform(1,positions[i].x_r,positions[i].y_r, 1, 0, 0);
      ctx.fillText(positions[i].font,0,0); 
      ctx.restore();
    }

    //点击图片事件
    var startindex = 0;
    var click_rel = [];    
    canvas.addEventListener("click",(e)=>{  
      e.preventDefault();    
      if(mobile()){
        if (e.targetTouches.length == 1) {
    　　　　 e.preventDefault();// 阻止浏览器默认事件，重要 
            var touch = e.targetTouches[0];
            
            //目标坐标
            var mx = touch.pageX;
            var my = touch.pageY;
          }else{
              alert("不支持多点触摸");
              return;
          }
      }
      else{        
        var mx = e.offsetX;
        var my = e.offsetY;
      }
      //在点击到的地方画点   
      startindex++;
      if(startindex <=str_arr.length){
        ctx.save();  
        ctx.beginPath()     
        ctx.arc(mx,my,15,0,2*Math.PI);      
        ctx.closePath();
        ctx.fillStyle=randomColor(150,250);
        ctx.fill();
        ctx.fillStyle=randomColor(0,125);
        ctx.fillText(startindex,mx-font_size/4,my+font_size/4)   
        ctx.restore()//重置画布状态    
        
        //判断点击结果
        var str_point = positions[startindex-1];
        var distance = Math.pow((str_point.x + font_size/2 - mx),2) + Math.pow((str_point.y - font_size/2 - my),2);
        click_rel.push(distance< Math.pow(font_size,2));
      }  
      callback(startindex,click_rel)   
    },false);    
  }
  /*************** 验证文字生成方法 end *****************************/
 
 function stringIsNullOrEmpty(str){
	 var _type = typeof(str)
	 if(_type == 'undefined')
	 {
		 return true;
	 }
	 if(str == '')
	 {
		 return true;
	 }
	 if(str == null)
	 {
		 return true;
	 }
	 else{
		 return false;
	 }
 }
  
  //获取模块属性
// function getProps(module,){
// 	debugger
//     let arrs = [];
//     if(!content && !except){
//       // for(var i in module)
//       // {
//       //   arrs.push(module[i])      
//       // }
// 		arrs = GetProps(module)
//     }
//     else if(except && !content){
//       for(var i in module)
//       {
//         if(i.indexOf(except) <0){
//           arrs.push(module[i])
//         }
//       }   
//     }
//     else if(content && !except){
//       for(var i in module)
//       {
//         if(i.indexOf(content) >=0){
//           arrs.push(module[i])
//         }
//       }        
//     }    
//     return arrs;    
// }

function getStates(_prop,_parent,arr=[]){
	for(var i in _prop)
	{
		var _type = typeof(_prop[i]);
		if(_type == "object"){
			var _nParent = stringIsNullOrEmpty(_parent) ?i:`${_parent}.${i}`
			var _arr = getStates(_prop[i],_nParent,arr);
		}else{
			if(_parent){
				arr.push(`${_parent}.${i}`)
			}
			else{
				arr.push(i)	
			}			
		}
	}
	return arr;
}

function getActions(_prop,arr=[]){
	for(var i in _prop)
	{
		arr.push(i)
	}
	return arr;
}




//求数组交集
function getIntersection(a,b)
{
  return a.filter(function(v){ return b.indexOf(v) > -1 })
}
//并集
function getUnion(a,b)
{
  return a.concat(b.filter(function(v){ return !(a.indexOf(v) > -1)}));
}
//补集
function getComplement(a,b){
  return a.filter(function(v){ return !(b.indexOf(v) > -1) })
  .concat(b.filter(function(v){ return !(a.indexOf(v) > -1)}))
}
//差集
function getSubtraction(a,b){
  a.filter(function(v){ return b.indexOf(v) == -1 })
}



  
  
  export default {
    getStates,
	getActions,
    getDateByDotNet,
    dateFormatter,
    dateTimeFormatter,
    dateTimeFormatterByDotNet,
    changeURLArg,
    guid,
    pwdFuZa,
    pwdCheck,
    checkEmail,
    randomNum,
    randomColor,
    getIntersection,
    getUnion,
    getComplement,
    getSubtraction,
    imgTextVerificationCode,
    mobile,
    randomSortArray,  
    getRandomInt  
  }
