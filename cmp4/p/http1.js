
var i=window.location;
//alert(i.protocol);
  if(i.protocol=='http:'){
i.href=i.href.replace('http','https');
}