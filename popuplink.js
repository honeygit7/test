/**
 * 포스트 방식으로 팝업을 생성 고정 타겟 사용( Post 파라미터 없음 )
 * @param url
 * @param URL
 * @param varwinname
 */
function fncOpenPopupForPost(url, width, height){

	var form = $("<form></form>");
	form.attr("action", url);
	form.attr("method", "post");
	form.attr("target", "popup");
	$("body").append(form);

	window.open("", "popup", "width="+width+", height="+height+", scrollbars=no ,resizeable=no, left=400, top=100");
	form.submit();
}

/**
 * 포스트 방식으로 팝업을 생성 사용자 지정 타겟 사용( Post 파라미터 없음 )
 * @param url
 * @param name
 * @param width
 * @param height
 */
function fncOpenPopupForPostDynamicName(url, name, width, height){
	var form = $("<form></form>");
	form.attr("action", url);
	form.attr("method", "post");
	form.attr("target", name);
	$("body").append(form);

	window.open("", name, "width="+width+", height="+height+", resizeable=no, left=400, top=100");
	form.submit();
}

/**
 * 포스트 방식으로 팝업을 생성 사용자 지정 타겟 사용 및 top, left값 사용자 입력( Post 파라미터 없음 )
 * @param url
 * @param name
 * @param width
 * @param height
 */
function fncOpenPopupForPostDynamicName(url, name, width, height, top, left){
	var form = $("<form></form>");
	form.attr("action", url);
	form.attr("method", "post");
	form.attr("target", name);
	$("body").append(form);

	window.open("", name, "width="+width+", height="+height+", resizeable=no, left="+left+", top="+top);
	form.submit();

}

/**
 * 포스트 방식으로 팝업 생성 및 객체형 파마리터 사용
 * params = { 'aaa':aaa, 'bbb':bbb }
 * @param url
 * @param name
 * @param width
 * @param height
 */
function fncOpenPopupForPostWithParams(url, name, width, height, params){
	var form = $("<form></form>");
	form.attr("action", url);
	form.attr("method", "post");
	form.attr("target", name);
	
	if(params){
		for(i in params){
			form.append("<input type='hidden' name='"+i+"' value='"+params[i]+"' />");
		}
	}
	$("body").append(form);
	//var popup=window.open("", name, "width="+width+", height="+height+" ,resizeable=no, left="+(($(window).width() - width) / 2)+", top="+(($(window).height() - height) / 2) + ",status=no, location=no, scrollbars=1");
	var popup=window.open("", name, "width="+width+", height="+height+" ,resizeable=no, left="+(($(window).width() - width) / 2)+", top="+(($(window).height() - height) / 2) + ",status=no, location=no, scrollbars=1");
	
	if(typeof popup == "undefined"){
		_htmlMessageConts = '';
		_htmlMessageConts  = "<p>팝업이 차단되어 있습니다.</p>";
		_htmlMessageConts += "<p>차단을 해제해주세요.</p>";
		viewAlertMessageLayer('', _htmlMessageConts, '');
	}else{
		form.submit();
		popup.focus();		
	}
}

/**
 * GET 방식으로 팝업 생성 및 객체형 파마리터 사용
 * params = { 'aaa':aaa, 'bbb':bbb }
 * @param url
 * @param name
 * @param width
 * @param height
 */
function fncOpenPopupForGetWithParams(url, name, width, height, params){
	
	if(url.indexOf("?") > -1){
		url = url+"&popup=true";
	}else{
		url = url+"?popup=true";
	}
	
	if(params){
		for(i in params){
			url += "&"+i+"="+params[i];
		}
	}
	
	var popup=window.open(url, name, "width="+width+", height="+height+" ,resizeable=no, left="+(($(window).width() - width) / 2)+", top="+(($(window).height() - height) / 2) + ",status=no, location=no, scrollbars=1");
	popup.focus();
}
