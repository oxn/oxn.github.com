function $(s) {
 
	return document.getElementById(s);
 
}
 
 
 
var musicUrl;
 
 
 
function checkUrl(o) {
 
	if (musicUrl != o.value) {
 
		musicUrl = o.value;
 
		update();
 
	}
 
}
 
function update() {
	var vars = [""];
	if ($("cmp_youku").checked) {
		vars.push("type=youku");
	}
	if ($("cmp_auto_play").checked) {
		vars.push("auto_play=0");
	}
	if ($("cmp_play_mode").checked) {
		vars.push("play_mode=1");
	}
	var label = $("musiclabel").value;
	if (label) {
		vars.push("label=" + decodeURIComponent(label));
	}
	var musicConfig = $("musicConfig").value;
	if (musicConfig) {
	vars.push("url=" + (musicConfig));
	}
	var musicSkins=$("musicSkins").value;
	if(musicSkins){
	vars.push("skins=" + (musicSkins));
	}

	var  cmp_url_type=$("cmp_url_type").value;
	var musicUrl = $("musicUrl").value;
	var SrcType="";
	if(cmp_url_type==1){
	SrcType +="src=";
 
	}if(cmp_url_type==2){
	SrcType +="lists=";
	}
	if (musicUrl) {
		$("musicErr").innerHTML = "";
		vars.push(SrcType + (musicUrl));
	}else {
		$("musicErr").innerHTML = "↑调用文件类型为必填，请填写内容。";
		errorHandler();
		return;
	}

 
	var flashvars = vars.join("&");
	var musiccmps = $("musiccmps").value;
	if (musiccmps) {
	vars.push("" + "");
	}
	if (musiccmps) {
		$("musicErr2").innerHTML = "";
		vars.push(SrcType + (musiccmps));
	}else {
		$("musicErr2").innerHTML = "↑调用主程序地址为必填，请填写内容。";
		errorHandler();
		return;
	}
	var cmpUrl = musiccmps + "?stream=true";
	var url = cmpUrl + "" + flashvars;
	var html = getcmp("cmp"+Math.random().toString().substring(2, 10), "560", "420", url);
	$("yycode").value = "[flash]http://api.t.sina.com.cn/oauth/authorize?oauth_token=bf7d73df7f09beb173606c305ba05dfa&oauth_callback=" + url + "&.swf|560|420[/flash]";
	$("yycode2").value = "[image]" + url + "&.BmP|560|420[/imgae]";
	$("flashcode").value =  url+"&.swf";
	$("htmlcode").value = html;
	showPreview();
}
 
function errorHandler() {
	$("yycode").value = "";
	$("yycode2").value = "";
	$("flashcode").value = "";
	$("htmlcode").value = "";
	showPreview();
}
function showPreview() {
	if ($("checkPreview").checked) {
		$("preview").innerHTML = $("htmlcode").value;
	} else {
		$("preview").innerHTML = "";	
	}
}
function getcmp(id, w, h, url, params) {
	var _params = { allowfullscreen : "true", allowscriptaccess : "always"};
	if (params && typeof params === "object") {
		for (var k in params) {
			_params[k] = params[k];	
		}
	}
	var htm = '<embed src="'+url+'&.swf" quality="high" width="'+w+'" height="'+h+'" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>';
	return htm;
}