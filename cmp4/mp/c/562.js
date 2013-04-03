function getDirb(){

    var urlb = document.getElementById("txt1b").value;

    var addrb;
    var jb = urlb.indexOf("//")

    if(jb==-1){
   		addrb = urlb;

   	}else{   		addrb = urlb.substr(jb+2);

   	}
    var arr2b = addrb.split("/");    document.getElementById("txt2b").value = "[flash]http://www.56.com/flashApp/v_player_general_cpm.11.01.06.b.swf?auto_start=0&host=c"+arr2b[1].substr(arr2b[0].indexOf(".")+1) 
    	+"&pURLb="+arr2b[3]
    	+"&sURLb="+arr2b[4]
    	+"&URLbid="+arr2b[5].substring(0,arr2b[5].lastIndexOf("."))
    	+"&totaltimes=&effectID=0&flvid=&QQ9020028.swf|560|420[/flash]";
	
}