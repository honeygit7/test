function fncJsonGet(url, data, success, loadingBarYn) {
	fncJson(url, data, success, 'GET', '', loadingBarYn);
}

function fncJsonPost(url, data, success, loadingBarYn) {
	fncJson(url, data, success, 'POST', 'json', loadingBarYn);
}

function fncJsonDelete(url, data, success, loadingBarYn) {
	fncJson(url, data, success, 'DELETE', '', loadingBarYn);
}

function fncJsonPut(url, data, success, loadingBarYn) {
	fncJson(url, data, success, 'PUT', '', loadingBarYn);
}

function fncAjaxLoad(url, data, callBackFnc, type, loadingBarYn) {
	var ajaxUrl = "";
	if ( url.indexOf("/screen/") == 0 ){
		url = url.replace("/screen/", "");
	}
	ajaxUrl = fncUrlPath(url);
	
	var requestType = 'GET';
	if (typeof type != 'undefined'){
		requestType = type;
	}
	$.ajax({
		url : ajaxUrl,
		type : requestType,
		data : data,
		dataType : 'html',
		success : function(data){
			callBackFnc(data)
		},
		error : function(){
			fncAPICallDataParseError();
		}
	});
}

var formatHelpers = { 
		getDeleteReason: function(type, def) {
			switch(type){
			case 1 : return "음란물"; break;
			case 2 : return "광고물"; break;
			case 3 :  return "비방/욕설 물"; break;
			case 9 :  return "기타사유"; break;
			default : 
				if ( def ) {
					return def; return;
				} else {
					return "N/N"; return;
				}
			}
		},
		mathRound : function(value) {
			return Math.round(value);
		},
		marketDC : function(value1, value2) {
			var price1 = value1.replace(/,/g, "");
			var price2 = value2.replace(/,/g, "");
			return Math.round((price1-price2)/price1*100);
		}	
};

String.prototype.leftTrim = function() {
	return this.replace(/^\s+/,"");
};

String.prototype.nl2br = function(){
	return this.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
}

/**
 * ajax page call ( html 결과값을 특정ID값에 타입별 추가 )
 * @param url
 * @param id
 * @param type
 * @returns
 */
function fncAjaxHtmlLoad(url, id, type){
	var ajaxUrl = "";
	if ( url.indexOf("/screen/") == 0 ){
		url = url.replace("/screen/", "");
	}
	ajaxUrl = fncUrlPath(url);
	
	$.ajax({
		type:'POST',
		url: ajaxUrl,
		dataType:'html', 
		success:function(data){
			data = unescape(data);
			
			if(type == "append"){
				$(id).append(data);
			}else if(type == "html"){
				$(id).html(data);
			}else if(type == "before"){
				$(id).before(data);
			}else if(type == "after"){
				$(id).after(data);
			}
		},
		error : function(){
			fncAPICallDataParseError();
		}
	});
}

/**
 * ajax page call ( 호출 페이지 function 실행, 레이어 출력용 )
 * @param url
 * @param id
 * @param success
 * @returns
 */
function fncAjaxHtmlLoadLayer(url, dataType, callBackFnc, layerId){
	var ajaxUrl = "";
	if ( url.indexOf("/screen/") > -1 ){
		url = url.replace("/screen/", "");
	}
	ajaxUrl = fncUrlPath(url);
	
	$.ajax({
		type:'GET',
		url: ajaxUrl,
		dataType:dataType,
		
		success : function(data) {
			callBackFnc(data, layerId);
		},
		error : function(){
			fncAPICallDataParseError();
			/*console.log("page html load error");*/
		}
	});
}



function calcurateByte(chkString){
	var currentString = new String(chkString);
	var currentLength = currentString.length;
	var tempChkChar;
	var currentSize = 0;
	for (i=0;i<currentLength;i++){
		tempChkChar = currentString.charAt(i);
		if (escape(tempChkChar) =='%0D') { 
			//Carriage Return(\r)인 경우
        }else if(escape(tempChkChar).length > 4){
            currentSize += 2;
        }else{
            currentSize++;
        }
	}
    return currentSize;
}

/**
 * 문자의 byte 체크
 * @param chkString
 * @returns
 */
function calcurateByte(chkString){
	var currentString = new String(chkString);
	var currentLength = currentString.length;
	var tempChkChar;
	var currentSize = 0;
	for (i=0;i<currentLength;i++){
		tempChkChar = currentString.charAt(i);
		if (escape(tempChkChar) =='%0D') { 
			//Carriage Return(\r)인 경우
        }else if(escape(tempChkChar).length > 4){
            currentSize += 2;
        }else{
            currentSize++;
        }
	}
    return currentSize;
}

/**
 * 일정길이 이상 문자 잘라내기
 * @param maxSize
 * @param chkString
 * @returns
 */
function cutString(maxSize, chkString){
	var currentString = new String(chkString);
	var currentLength = currentString.length;
	var tempChkChar;
	var currentSize = 0;
	
	for(i=0; i < currentLength; i++){
		tempChkChar = currentString.charAt(i);
		
		if(escape(tempChkChar).length > 4){
			currentSize += 2;
		}else{
			if(escape(tempChkChar)=='%0A'){ // New Line(\n)인 경우
				//엔터(\r + \n)입력시 (\n)에 해당하는 카운트는 증가시키지 않는다.
			}else{
				currentSize++;
			}
		}

		if(currentSize > maxSize){
			currentString = currentString.substring(0,i);
			break;
		}

	}
	return currentString;
}

/**
 * 문자의 byte 체크
 * @param chkString
 * @returns
 */
function calcurateByte(chkString){
	var currentString = new String(chkString);
	var currentLength = currentString.length;
	var tempChkChar;
	var currentSize = 0;
	for (i=0;i<currentLength;i++){
		tempChkChar = currentString.charAt(i);
		if (escape(tempChkChar) =='%0D') { 
			//Carriage Return(\r)인 경우
        }else if(escape(tempChkChar).length > 4){
            currentSize += 2;
        }else{
            currentSize++;
        }
	}
    return currentSize;
}

/**
 * 일정길이 이상 문자 잘라내기
 * @param maxSize
 * @param chkString
 * @returns
 */
function cutString(maxSize, chkString){
	var currentString = new String(chkString);
	var currentLength = currentString.length;
	var tempChkChar;
	var currentSize = 0;
	
	for(i=0; i < currentLength; i++){
		tempChkChar = currentString.charAt(i);
		
		if(escape(tempChkChar).length > 4){
			currentSize += 2;
		}else{
			if(escape(tempChkChar)=='%0A'){ // New Line(\n)인 경우
				//엔터(\r + \n)입력시 (\n)에 해당하는 카운트는 증가시키지 않는다.
			}else{
				currentSize++;
			}
		}

		if(currentSize > maxSize){
			currentString = currentString.substring(0,i);
			break;
		}

	}
	return currentString;
}

/**
 * Key In 항목의 등록 가능 글자수 체크 이벤트
 * @param maxSize
 * @param chkTarget_jQselector
 * @param printSizeTarget_jQselector
 * @returns
 */
function addMaxInputSizeChkEvent(maxSize, chkTarget_jQselector, printSizeTarget_jQselector){
	
	chkTarget_jQselector.keyup(function(){
		var currentSize = calcurateByte(chkTarget_jQselector.val());
		
		if(currentSize <= maxSize){
        	printSizeTarget_jQselector.text(currentSize);
		}else{
			printSizeTarget_jQselector.text(maxSize);
		}

	    if(currentSize > maxSize) {
		    var resultString = cutString(maxSize, chkTarget_jQselector.val());
		    chkTarget_jQselector.val(resultString);
	        return;
	    }
	});
	
	chkTarget_jQselector.focusout(function(){
		printSizeTarget_jQselector.text(calcurateByte(chkTarget_jQselector.val()));
	});
}

/**
 * 셀렉트 박스 셋팅
 * @param params
 * @returns
 */
function setSelectOption(params){
	var selId = nvl(params.selId);
	var valKey = nvl(params.valKey);
	var opKey = nvl(params.opKey);
	var defaultCd= nvl(params.defaultCd);
	var selectList = params.selectList;
	var spaceNm = params.spaceNm;
	var spaceVal = params.spaceVal;
	
	var obj =  getObj(selId);
	obj.empty();
	if(spaceNm != undefined){
		obj.append('<option value="'+spaceVal+'">'+spaceNm+'</option>')
	}
	if(!this.isEmpty(selectList)){
		html ="";
		for(var i in selectList){
			var strItem = JSON.stringify(selectList[i])
			if(typeof strItem != 'undefined'){
				var item = JSON.parse(strItem);
			}
			if(defaultCd == item[valKey]){
				html+='<option value="'+item[valKey]+'" selected="selected">'+item[opKey]+'</option>'
			}
			html+='<option value="'+item[valKey]+'">'+item[opKey]+'</option>'
		}
		obj.append(html);
	}
}

/**
 * empty 확인
 * @param arg
 * @returns
 */
function isEmpty(arg){
	try{
		if ( typeof arg === "object" && $.isEmptyObject(arg) ){
			return true;
		}else{
			var obj = String(arg);
			if(obj==null || obj==undefined || $.trim(obj) =="" || obj=='null' || obj=='undefined' || obj=='{}'){
				return true; 
			}else{
				return false;
			}
		}
	}catch(e){
		return true;
	}
}

/**
 * empty 일 경우 0 리턴
 * @param arg
 * @returns
 */
function isEmptyZero(data) {
	if(data==null || typeof data== "undefined" ){
		return data="0";
	}else{
		return data;
	}
}

/**
 * empty 확인
 * @param arg, defaultStr
 * @returns
 */
function nvl(arg, defaultStr){
	if(this.isEmpty(arg) || arg == "undefined"){
		if(this.isEmpty(defaultStr)){
			return "";
		}else{
			return defaultStr;
		}
	}else{
		return arg;
	}
}

/**
 * id값 셋팅
 * @param id
 * @returns
 */
function getObj(id){
	var item;
	if(typeof id == "string"){
		if(id.substr(0,1) == "#"){
			item = $(id);
		}else{
			item = $("#" + id);
		}
		if(item.length <=0){
			item = $("input[name="+id+"]");
		}
	}else{
		item = id;;
	}
	return item;
}


/**
 * input type="text" 에 숫자만 입력되도록 제한함.
 * 사용 예 : addNumericRestrictFilter($('input[type=text]')); 
 * 변경이력 : 
 *	- 값 입력시 맨마지막으로 이동하는 문제 및 화살표 입력 불가 등 문제 수정. (2012.06.09 by HUH SUNG WOO)
 *	- KeyEvent Tab 추가. (장애인차별법 준수를 위한 KCB 서비스 웹접근성 개선)(2014.10.24 T13225(inoni25))
 *
 * @param	jQuery 셀렉터 (단, input type="text" 인것만 해당됨)
 */
function addNumericRestrictFilter(jQselector){
	jQselector.keydown(function(event){
		if ((event.keyCode >= 48 && event.keyCode <= 57) // 키보드 상단 숫자키
		   || (event.keyCode >= 96 && event.keyCode <= 105) // 키패드 숫자키
		   || event.keyCode == 8  // 백스페이스 키
		   || event.keyCode == 37 // 왼쪽 화살표 키
		   || event.keyCode == 39 // 오른쪽 화살표 키
		   || event.keyCode == 46 // DEL 키
		   || event.keyCode == 35 // END 키
		   || event.keyCode == 36 // HOME 키
		   || event.keyCode == 9 // TAB 키
		){
			 return true;
		} else {
			 return false;
		}
	});
}

/**
 * 연락처 입력 최대크기 체크 
 * @param jQselector
 * @param cipher
 * @returns
 */
function addPhoneMaxInputEvent(jQselector, cipher){
	jQselector.keypress(function(event){
		if(($(this).val().length==cipher)){
			event.preventDefault();
		}
	});	
}

function submitCheck(){
	 if(submitted == true){
		 ("전송중입니다.");
		 return;
	 }
	 submitted = true;
	 if(submitted == true){
		 return true;
	 }else{
		 return false;
	 }
 }

function replaceMailToStar(fullMail){
	if ( $.trim(fullMail) == "" ){
		return;
	}
	var replaceMail = fullMail.replace(/\b(\S+)[^@][^@]+@(\S+)/gi,'$1**@$2');
	return replaceMail;
}
function replacePhoneToStar(fullPhone){
	if ( $.trim(fullPhone) == "" ){
		return;
	}
	var replacePhone = fullPhone.replace(/^(\d+-)(\d{1,2})[^@][^@](-+\d+)/gi,'$1$2**$3');
	return replacePhone;
}



/**
 *  숫자 3자릿수 마다  [,] 구분자 삽입.
 * @param num
 * @returns
 */
function numberWithCommas(num){
	if(num == "" || num == "undefined"){
		return "";
	}else{
		return num.toString().replace(/[^0-9]/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,",");
	}
}

/**
 *  숫자 3자릿수 마다  [,] 구분자 삽입.
 * @param num
 * @returns
 */
function numberDecimalPointWithCommas(num){
	if(num == "" || num == "undefined"){
		return "";
	}else{
		return num.toString().replace(/[^\.0-9]/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,",");
	}
}

/**
 * input type="text" 의 value에 들어간 자릿수(Cipher) 구분자 [,] 제거. 
 * 용도 : 폼 전송 전 호출하여 숫자값만 전송시 사용.
 * 사용 예 : removeCipherComma($('input[name=EXAMPLE]'));
 *
 * @param	jQuery 셀렉터 (단, input type="text" 인것만 해당됨)
 */
function removeCipherComma(jQselector){
	//참고 - 특수문자 regExp : /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
	jQselector.val(jQselector.val().replace(/[,]/gi, ""));
}

/**
 * 날짜를 구분자로 나누어 포맷팅
 * 
 * @param date
 * @param division
 * @returns String
 */
function fncConvertDate(date, division){
	
	var str = "";
	
	if(date != ""){
		if(date.length == 6){
			str = date.substring(0, 2) + division + date.substring(2, 4) + division + date.substring(4);
		}else if(date.length == 8){
			str = date.substring(0, 4) + division + date.substring(4, 6) + division + date.substring(6);
		}else if(date.length == 14){
			str = date.substring(0, 4) + division + date.substring(4, 6) + division + date.substring(6,8);
			str +=  "&nbsp;" +date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12);
		}
	}
	
	return str;
}

/**
 * 날짜를 구분자로 나누어 포맷팅
 * 무조건 YYYYMMDD 형식으로 리턴
 * 
 * @param date
 * @param division
 * @returns String
 */
function fncConvertDate2(date, division){
	
	var str = "";
	if(isEmpty(division)){
		division = ".";
	}
	if(!isEmpty(date)){
		date = date.replace(/[^0-9]/g,"");
		str = date.substring(0, 4) + division + date.substring(4, 6) + division + date.substring(6, 8);
	}
	return str;
}

function fncConvertDate3(date, division){
	var str = "";
	if(date != ""){
		 str =  date.substring(0, 4) + division + date.substring(4, 6) + division + date.substring(6, 8) + " " + date.substring(8, 10) + ":"
         + date.substring(10, 12);
	}
	return str;
}

/**
 * 시간을 구분자로 나누어 포맷팅
 * @param time
 * @param division
 * @returns
 */
function fncConvertTime(time, division){
	
	var str = "";
	
	if(time != ""){
		if(time.length == 4){
			str = time.substring(0, 2) + division + time.substring(2, 4);
		}else if(time.length == 6){
			str = time.substring(0, 2) + division + time.substring(2, 4) + division + time.substring(4);
		}
	}
	
	return str;
}
/**
 * 성명정보 mask 처리 "김*똥" 처리
 * @param str
 * @returns
 */
function fncUsrNameMask(str) {
    var rtnStr = "";
    if (str=='') {
        rtnStr = "";
    } else if (1 == str.length) {
        rtnStr = str;
    } else if (2 == str.length) {
        rtnStr = str.substring(0, 1) + "*";
    } else if (3 == str.length) {
        rtnStr = str.substring(0, 1) + "*" + str.substring(2, str.length);
    } else if (str.length > 3) {
        rtnStr = str.substring(0, 1) + "**" + str.substring(3, str.length);
    } else {
        rtnStr = str;
    }
    return rtnStr;
}

/**
 * 전화번호 mask 처리
 * @param str, division
 * @returns
 */
function fncUsrPhoneMask(str, division) {
    var rtnStr = "";
    if (str=='') {
        rtnStr = "";
    } else if (10 == str.length) {
        rtnStr = str.substring(0, 3) + division + str.substring(3, 4) +"**" + division + str.substring(6, 10);
    } else if (11 == str.length) {
    	rtnStr = str.substring(0, 3) + division + str.substring(3, 5) +"**" + division + str.substring(7, 11);
    } else if (12 == str.length) {
    	rtnStr = str.substring(0, 3) + division + str.substring(3, 6) +"**" + division + str.substring(8, 12);
    } else {
        rtnStr = str;
    }
    return rtnStr;
}

/**
 * 이전 페이지로 이동
 * @returns
 */
function fncHistoryBack(){
	if(typeof document.referrer != "undefined"){
		location.href = document.referrer;
	}else{
		history.back(-1);
		return false;
	}
}

/**
 * 이전 페이지로 이동
 * @returns
 */
function fncHistoryBack2(){
	history.back(-2);
	return false;
}

/**
 * 오직 숫자로만 이루어져 있는지 체크 한다.
 *
 * @param	num
 * @return	boolean
 */
function fncIsNumber(num) {
	re = /[0-9]*[0-9]$/;

	if (re.test(num)) {
		return	true;
	}

	return	false;
}

/**
 * 체크박스 모두  체크 & 모두 해제
 * @param obj  전체체크박스명(상단의 전체체크)
 * @param lst   체크박스
 * @returns
 */
function fncCheckBoxAll(obj , lst)
{ 
	if(lst) {
		if (lst.length) {
			for(var i=0; i < lst.length; i++) {
				if(obj.checked == true) { 
					lst[i].checked = true;
				} else {
					lst[i].checked = false;
				}
			}
		} else {
			if(obj.checked == true) {
				lst.checked = true;
			} else {
				lst.checked = false;
			}
		}
	}
}

/**
 * 한글 문자 길이 리턴
 * @param strValue
 * @returns
 */
function fncHangulLength(strValue){
	
    var strLen = strValue.length;
    var totalByte = 0;
    var len = 0;
    var oneChar = "";

    for (var i = 0; i < strLen; i++) {
        oneChar = strValue.charAt(i);
        if (escape(oneChar).length > 4) {
            totalByte += 2;
        } else {
            totalByte++;
        }
    }	
	return totalByte;
}

/**
 * 이메일 유효성 체크
 * @param email
 * @returns
 */
function fncIsEmail(email) {
	var invalidChars = "\"|&;<>!*\'\\"   ;
	for (var i = 0; i < invalidChars.length; i++) {
		if (email.indexOf(invalidChars.charAt ) != -1) {
			return false;
		}
	}
	if (email.indexOf("@")==-1){
		return false;
	}
	if (email.indexOf(" ") != -1){
		return false;
	}
	if (window.RegExp) {
		var reg1str = "(@.*@)|(\\.\\.)|(@\\.)|(\\.@)|(^\\.)";
		var reg2str = "^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$";
		var reg1 = new RegExp (reg1str);
		var reg2 = new RegExp (reg2str);

		if (reg1.test(email) || !reg2.test(email)) {
			return false;
		}
	}
	return true;
}


/**
 * INPUT BOX에 숫자만 입력되도록 제한함.
 * 
 * @param {String(id)} or {Object(DOM or jQuery)}	inputTarget			제한할 INPUT BOX(단, [input type="text"]만 가능)
 * @param {Boolean} 								submitValidFlag		submit시 검증할지 여부(true:검증함, false:검증안함) [선택사항(입력없을경우:false)]
 * 
 * @return {Object(jQuery)} inputTarget (Method Chaining 용도)
 */
function setOnlyNumericInput(inputTarget, submitValidFlag){
	var inputTargetJqObj = convertIntoJQueryObject(inputTarget);
    if(submitValidFlag == null || submitValidFlag == undefined){ 
    	submitValidFlag = false;
    }
	
	inputTargetJqObj.css('ime-mode', 'disabled'); //IE에서 한영 전환 차단 처리
	
	inputTargetJqObj.keydown(function(event){
 		if ((event.keyCode >= 48 && event.keyCode <= 57)){ //키보드 상단 숫자키
			if(event.shiftKey){ //SHIFT 키
				event.preventDefault();
			}
		}
	});
	
	//크롬에서 한글로 전환 후 하나 이상의 키를 동시에 누를 경우 한글이 입력되는것은 막을 수가 없기에 
	//입력된 값에 숫자가 아닌 값이 있을 경우 숫자 이외의 값은 제거한 값으로 변경하도록 추가 처리함.
    inputTargetJqObj.keyup(function(event){
        var value = inputTargetJqObj.val();
        if(isNaN(parseFloat(value)) || !isFinite(value)){ //숫자가 아닐때
           inputTargetJqObj.val(value.replace(/[^0-9]/g,''));
        }
    });
    
    //비 정상적인 접근 및 조작등으로 인해  submit할때  입력되있는 값에 숫자가 아닌 값이 있는 경우 값을 제거한다.
    if(submitValidFlag){
	    inputTargetJqObj.parents('form').submit(function(event) {
	    	var value = inputTargetJqObj.val();
	    	if(value.length > 0 && ( isNaN(parseFloat(value)) || !isFinite(value) ) ){ //입력되어져있는 값이 존재하면서 숫자가 아닐때
	    		inputTargetJqObj.focus(); //포커스 이동
	    		alert("숫자만 입력이 가능합니다.\\r\\n해당 항목의 입력값은 제거 됩니다.");
	    		inputTargetJqObj.val(''); //값 제거
	    	}
	    });
    }
    
	return inputTargetJqObj;
}

/**
 * 세자리마다 콤마표시
 * @param str
 * @returns
 */
function setComma(str) { 
	  var text = "" + str;
	  var str    = "" + text.replace(/,/gi,''); // 콤마 제거 
	  var regx    = new RegExp(/(-?\d+)(\d{3})/); 
	  var bExists = text.indexOf(".",0); 
	  var strArr  = text.split('.'); 
	  while(regx.test(strArr[0])){ 
	      strArr[0] = strArr[0].replace(regx,"$1,$2"); 
	  } 
	  if (bExists > -1){ 
	      return strArr[0] + "." + strArr[1];
	  }else{ 
	      return strArr[0];
	  }
} 

/**
 * 파일 확장자 유효성 체크
 * @param fileName    파일명
 * @param allowedExt  허용 파일 확장자 ( jpg|bmp|gif ) 구분자를 갖음
 * @returns
 */
function fncFileExtCheck(fileName, allowedExt){
	if(fileName == null || fileName == ""){
		return;
	}
	
	var fileNameSplits			= fileName.split(".");
	var fileExt					= fileNameSplits[fileNameSplits.length - 1].toLowerCase();
	var splitAllowedExt			= allowedExt.split("|");
	
	for(var i = 0; i < splitAllowedExt.length; i++){
		if(fileExt == splitAllowedExt[i].toLowerCase()){
			return true;
		}
	}
	return false;
	 
}

/**
 * sessionStorage에 값을 추가하여 다음페이지에서 체크
 */
function fncAddPageChk(){
	sessionStorage.setItem("pageChk", true);
}

/**
 * sessionStorage값을 체크하여 잘못된 경로로 진입시 선택된 페이지로 이동
 */
function fncPageChk(scId){
	if(!sessionStorage.getItem("pageChk")){
		fncScreenPageLink(scId);
	}else{
		 sessionStorage.removeItem("pageChk");
	}
}

/**
 * 날짜 유효성체크
 * @param filedateName yyyymmdd/8자리
 * @returns
 */
function fncChkValDate(date) {
	if (isEmpty(date) || date.length != 8){
		return false;
	}

	var year 	= date.substr(0,4);
	var month 	= date.substr(4,2) - 1;
	var day 	= date.substr(6,2);
	var date	= new Date(year, month, day);

	if(date.getFullYear() == year && date.getMonth() == month && date.getDate() == day){
		return true;
	}else{
		return false;
	}
	
}

function replaceHtmlTag(contents){
	return contents.replace(/(<([^>]+)>)/ig,"");
	//return contents.replace(/<(\/)?([a-zA-Z][0-9]*)(\s[a-zA-Z][0-9]*=[^>]*)?(\s)*(\/)?>/ig,"");
}

/**
 * 사업자등록번호 마스크 씌우기
 *
 * @param str
 * @return String
 */
function fncMaskBusiNo(str) {

    if (isEmpty(str)) {
        return str;
    }

    str = $.trim(str);
    return str.substr(0, 3) + "-" + str.substr(3, 5) + "-xxxxx";
}

/**
 * 에러 스크롤 이동
 */
function fncErrorScroll(){
	var errorTop = $('.error').parent().offset().top;
	var headerH  = $('header').outerHeight() || $('.header').outerHeight(); // mw/pc
	$('body, html').scrollTop(errorTop - headerH);
}

/**
 * MW팝업 에러 스크롤 이동
 */
function fncErrorPopScroll(){
	var errorTop = $('.error').parent().position().top
	var headerH  = $('.layerHeader').outerHeight() || $('.header').outerHeight();
	$('.layerPop').scrollTop(errorTop - headerH);
}

/**
 * PC팝업 에러 스크롤 이동
 */
function fncErrorPcPopScroll(){
	var errorTop = $('.layerCont').scrollTop() + $('.error').offsetParent().position().top;
	var headerH  = $('.layerCont').outerHeight() + $('.topCont').outerHeight();
	$('.layerCont').scrollTop(errorTop - headerH);
}

function fncGetDate() {
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getFullMonth() + 1;
	var day = today.getDate();
	return year + month + day;
}