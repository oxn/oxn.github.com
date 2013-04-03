function getDira(){

    var urla = document.getElementById("txt1a").value;

    var addr;
    var ja = urla.indexOf("//")

    if(ja==-1){
   		addra = urla;

   	}else{   		addra = urla.substr(ja+2);

   	}
    var arr2a = addra.split("/");    document.getElementById("txt2a").value = "[flash]http://www.56.com/flashApp/v_player_general_cpm.11.01.06.b.swf?auto_start=0&host="    	+arr2a[1].substr(arr2a[0].indexOf(".")+1) 
    	+"&pURLa="+arr2a[3]
    	+"&sURLa="+arr2a[4]
    	+"&URLaid="+arr2a[5].substring(0,arr2a [5].lastIndexOf("."))
    	+"&totaltimes=&effectID=0&flvid=&QQ9020028.swf|560|420[/flash]";
	
}