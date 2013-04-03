var skins = new Array();


skins.push({
	name:"001【Tudou土豆】自适应皮肤 自动列表",
	src:"pf/01.swf",
	width:560,
	height:420
});
skins.push({
	name:"002【简蓝全屏版】自适应皮肤 春雨收集",
	src:"pf/02.swf",
	width:560,
	height:420
});
skins.push({
	name:"003【博客-雪地 】自适应皮肤 春雨收集",
	src:"pf/03.swf",
	width:560,
	height:420
});
skins.push({
	name:"004【manila 】自适应皮肤 春雨收集",
	src:"pf/04.swf",
	width:560,
	height:420
});
skins.push({
	name:"005【一听皮肤】自适应皮肤 春雨收集",
	src:"pf/05.swf",
	width:560,
	height:420
});
skins.push({
	name:"006【WebPlayer】自适应皮肤 春雨收集",
	src:"pf/06.swf",
	width:560,
	height:420
});
skins.push({
	name:"007【GOM皮肤】自适应皮肤 春雨收集",
	src:"pf/07.swf",
	width:560,
	height:420
});
skins.push({
	name:"008【白色单条】自适应皮肤 春雨收集",
	src:"pf/08.swf",
	width:560,
	height:420
});
skins.push({
	name:"009【仿腾讯视频】自适应皮肤 春雨收集",
	src:"pf/09.swf",
	width:560,
	height:420
});
skins.push({
	name:"010【红影】自适应皮肤 春雨收集",
	src:"pf/10.swf",
	width:560,
	height:420
});

skins.push({
	name:"011【官方】自适应皮肤 春雨收集",
	src:"pf/11.swf",
	width:560,
	height:420
});
skins.push({
	name:"012【皮脚】自适应皮肤 春雨收集",
	src:"pf/12.swf",
	width:560,
	height:420
});
skins.push({
	name:"013【快播黑色】自适应皮肤 春雨收集",
	src:"pf/13.swf",
	width:560,
	height:420
});
skins.push({
	name:"014【迅雷看看】自适应皮肤 春雨收集",
	src:"pf/14.swf",
	width:560,
	height:420
});
skins.push({
	name:"015【VPlayer】自适应皮肤 春雨收集",
	src:"pf/15.swf",
	width:560,
	height:420
});
skins.push({
	name:"016【YouTuBe】自适应皮肤 春雨收集",
	src:"pf/16.swf",
	width:560,
	height:420
});
skins.push({
	name:"017【WebPlayer】黑色背景 春雨收集",
	src:"pf/17.swf",
	width:560,
	height:420
});
skins.push({
	name:"018【WebPlayer】蓝色背景 春雨收集",
	src:"pf/18.swf",
	width:560,
	height:420
});
skins.push({
	name:"019【WebPlayer】YY推荐 sina播放器",
	src:"pf/19.swf",
	width:560,
	height:420
});
skins.push({
	name:"020【WebPlayer】工具条透明版",
	src:"pf/20.swf",
	width:560,
	height:420
});
skins.push({
	name:"021【youtube】自动列表显示版",
	src:"pf/21.swf",
	width:560,
	height:420
});
skins.push({
	name:"022【WebPlayer】工具条透明 不打开列表",
	src:"pf/22.swf",
	width:560,
	height:420
});
skins.push({
	name:"023【juicyblack】论坛专用 不打开列表",
	src:"pf/23.swf",
	width:560,
	height:420
});
skins.push({
	name:"024【QQ影音-迷你型】带缩微图功能",
	src:"pf/24.swf",
	width:600,
	height:400
});
//如有更多Mini皮肤样式，请安装以上格式在此添加即可

//============================================================================
//保存音乐地址
var musicUrl;
//============================================================================
function getUrl(url) {
	var path = window.location.href.split("?")[0];
	if (path.lastIndexOf("\\") != -1) {
		path = path.slice(0,path.lastIndexOf("\\") + 1);
	} else {
		path = path.slice(0,path.lastIndexOf("/") + 1);
	}	
	return path + url;
}
function $(s) {return document.getElementById(s);}
function checkUrl(o) {
	if (musicUrl != o.value) {
		musicUrl = o.value;
		update();
	}
}
function addSkinList() {
	var ss = $("skinSelect");
	for (var i = 0; i < skins.length; i ++) {
		ss.options.add(new Option(skins[i].name, i));
	}
}
function checkSkin(o) {
	if (o.value) {
		var skin = skins[o.value];
		$("cmp_width").value = skin.width;
		$("cmp_height").value = skin.height;
	} else {
		$("cmp_width").value = "";
		$("cmp_height").value = "";
	}
	update();
}
function update() {
	var cmpurl = [];
	//主播放器地址
	if ($("av01").checked) {
		cmpurl.push("https://dl.dropbox.com/u/51232200/cmp/y.swf?url=v.xml");
	}
	if ($("av56").checked) {
		cmpurl.push("https://dl.dropbox.com/u/51232200/cmp/y.swf?url=o.xml");
	}
	var vars = ["","stream=true"];//var vars = ["url=http://sfsf.tk/yy.xml","lists=","stream=true"]//
	//取得设置
	if ($("cmp_auto_play").checked) {
		vars.push("auto_play=1");
	}
	if ($("cmp_play_mode").checked) {
		vars.push("play_mode=1");
	}
	var bgcolor = $("cmp_bgcolor").value;
	if (bgcolor) {
		vars.push("bgcolor=" + (bgcolor));
	}
	var cmp_type = $("cmp_type").value;
	if (cmp_type) {
		vars.push("type=" + cmp_type);
	}
	//取得音乐地址
	musicUrl = $("musicUrl").value;
	if (musicUrl) {
		$("musicErr").innerHTML = "";
		vars.push("src=" + decodeURIComponent(musicUrl));
	} else {
		$("musicErr").innerHTML = "请输入一个有效的音乐地址";
		errorHandler();
		return;
	}
	//取得皮肤
	var index = $("skinSelect").value;
	if (index) {
		$("skinErr").innerHTML = "";
		vars.push("skin=" + decodeURIComponent(skins[index].src));
	} else {
		$("skinErr").innerHTML = "请选择一个皮肤";
		errorHandler();
		return;
	}
        //取得列表地址
	var lists = $("musiclists").value;
	if (lists) {
		vars.push("lists=" + decodeURIComponent(lists));
	}
        //取得rtmp地址
	var rtmp = $("rtmpdz").value;
	if (rtmp) {
		vars.push("rtmp=" + decodeURIComponent(rtmp));
	}
        //取得歌曲名字地址
	var label = $("musiclabel").value;
	if (label) {
		vars.push("label=" + decodeURIComponent(label));
	}
        //取得播放器地址
	var name = $("musicname").value;
	if (name) {
		vars.push("name=" + decodeURIComponent(name));
	}
       
        
        //取得logo地址
	var logo = $("musiclogo").value;
	if (logo) {
		vars.push("logo=" + decodeURIComponent(logo));
	}
        //取得背景图片地址
	var video_image = $("musicvideo_image").value;
	if (video_image) {
		vars.push("video_image=" + decodeURIComponent(video_image));
	}
        //取得公告内容地址
	var announce_content = $("musicannounce_content").value;
	if (announce_content) {
		vars.push("announce_content=" + decodeURIComponent(announce_content));
	}
        //取得描述内容地址
	var description = $("musicdescription").value;
	if (description) {
		vars.push("description=" + decodeURIComponent(description));
	}
        //取得歌词地址
	var lrc = $("musicLrc").value;
	if (lrc) {
		vars.push("lrc=" + decodeURIComponent(lrc));
	}
	//生成代码
	var url = cmpurl + "" + vars.join("&");
	var cmpw = parseInt($("cmp_width").value);
	var cmph = parseInt($("cmp_height").value);
	//生成html地址
	var html = getcmp("cmp"+Math.random().toString().substring(2, 10), cmpw, cmph, url);
	$("htmlcode").value = html;
	$("yycode").value =  "[flash]http://api.t.sina.com.cn/oauth/authorize?oauth_token=bf7d73df7f09beb173606c305ba05dfa&oauth_callback="+url+"&.swf|"+cmpw+"|"+cmph+"[/flash]";
	$("yycode2").value =  "[image]"+url+"&.BmP|"+cmpw+"|"+cmph+"[/image]";
	$("flashcode").value =  url+"&.swf";
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
	var htm = '<embed src="'+url+'" quality="high" width="'+w+'" height="'+h+'" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>';
	return htm;
}